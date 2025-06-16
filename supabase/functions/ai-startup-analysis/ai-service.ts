import { AnalysisRequest } from './types.ts';
import { getSystemPrompt, buildUserPrompt } from './prompts.ts';

// Function to estimate token count (rough estimation: 1 token ≈ 4 characters)
function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

// Function to truncate market research if it's too large
function truncateMarketResearch(marketResearch: string, maxTokens: number = 20000): string {
  const estimatedTokens = estimateTokens(marketResearch);
  
  if (estimatedTokens <= maxTokens) {
    return marketResearch;
  }
  
  // Calculate how much to keep (leaving some buffer)
  const targetLength = Math.floor(maxTokens * 4 * 0.8); // 80% of max to leave buffer
  
  if (marketResearch.length <= targetLength) {
    return marketResearch;
  }
  
  // Truncate and add notice
  const truncated = marketResearch.substring(0, targetLength);
  return truncated + '\n\n[Note: Market research data truncated due to size limits]';
}

export async function generateAnalysis(
  request: AnalysisRequest,
  marketResearch: string,
  openaiApiKey: string
): Promise<string> {
  const { idea, companyName, targetAudience, problemStatement, solution, uniqueValue, analysisType } = request;
  
  // Truncate market research if it's too large
  const truncatedMarketResearch = truncateMarketResearch(marketResearch, 15000);
  
  const systemPrompt = getSystemPrompt(analysisType);
  const userPrompt = buildUserPrompt(idea, companyName, targetAudience, problemStatement, solution, uniqueValue, truncatedMarketResearch, analysisType);

  // Estimate total tokens to ensure we stay under limits
  const systemTokens = estimateTokens(systemPrompt);
  const userTokens = estimateTokens(userPrompt);
  const totalInputTokens = systemTokens + userTokens;
  
  console.log('Token estimation:', {
    systemTokens,
    userTokens,
    totalInputTokens,
    marketResearchLength: truncatedMarketResearch.length,
    originalMarketResearchLength: marketResearch.length
  });

  // If still too large, further reduce the prompt
  if (totalInputTokens > 25000) {
    console.log('Prompt still too large, using minimal market research');
    const minimalResearch = truncatedMarketResearch.substring(0, 2000) + '\n[Market research summary truncated for processing]';
    const minimalUserPrompt = buildUserPrompt(idea, companyName, targetAudience, problemStatement, solution, uniqueValue, minimalResearch, analysisType);
    
    console.log('Using minimal prompt with estimated tokens:', estimateTokens(systemPrompt + minimalUserPrompt));
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        max_tokens: 4000,
        temperature: 0.7,
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: minimalUserPrompt
          }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error details:', errorText);
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  console.log('Calling OpenAI API with optimized request...');
  console.log('Using API key starting with:', openaiApiKey.substring(0, 15));
  console.log('Market research data length:', truncatedMarketResearch.length);
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openaiApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      max_tokens: 6000,
      temperature: 0.7,
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: `${userPrompt}

IMPORTANT FORMATTING REQUIREMENTS:
1. Use proper markdown formatting with headers (##, ###), lists, and emphasis
2. Include emojis strategically to make content more engaging and youthful
3. Use tables for data comparison and structured information
4. Add visual separators and call-out boxes using markdown
5. Format financial data, percentages, and key metrics prominently
6. Use bullet points and numbered lists for better readability
7. Include section dividers and visual hierarchy
8. Make the content scannable with clear headings and subheadings
9. Add actionable insights and next steps clearly highlighted
10. Use bold and italic text strategically for emphasis

The output should be visually appealing, well-structured, and easy to read with modern formatting that appeals to young entrepreneurs.`
        }
      ],
    }),
  });

  console.log('OpenAI API response status:', response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('OpenAI API error details:', errorText);
    throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const analysis = data.choices[0].message.content;

  console.log('Analysis generated successfully, length:', analysis?.length);
  
  return analysis;
}
