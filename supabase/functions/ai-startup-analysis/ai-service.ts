
import { AnalysisRequest } from './types.ts';
import { getSystemPrompt, buildUserPrompt } from './prompts.ts';

export async function generateAnalysis(
  request: AnalysisRequest,
  marketResearch: string,
  anthropicApiKey: string
): Promise<string> {
  const { idea, companyName, targetAudience, problemStatement, solution, uniqueValue, analysisType } = request;
  
  const systemPrompt = getSystemPrompt(analysisType);
  const userPrompt = buildUserPrompt(idea, companyName, targetAudience, problemStatement, solution, uniqueValue, marketResearch, analysisType);

  console.log('Calling Anthropic API with enhanced research data...');
  console.log('Using API key starting with:', anthropicApiKey.substring(0, 15));
  console.log('Market research data length:', marketResearch.length);
  
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': anthropicApiKey,
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 8000,
      temperature: 0.7,
      messages: [
        {
          role: 'user',
          content: `${systemPrompt}\n\n${userPrompt}

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

  console.log('Anthropic API response status:', response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Anthropic API error details:', errorText);
    throw new Error(`Anthropic API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const analysis = data.content[0].text;

  console.log('Enhanced analysis generated successfully, length:', analysis?.length);
  
  return analysis;
}
