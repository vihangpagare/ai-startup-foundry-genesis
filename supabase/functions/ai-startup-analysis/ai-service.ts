
import { AnalysisRequest } from './types.ts';
import { getSystemPrompt, buildUserPrompt } from './prompts.ts';

export async function generateAnalysis(
  request: AnalysisRequest,
  marketResearch: string,
  openaiApiKey: string
): Promise<string> {
  const { idea, companyName, targetAudience, problemStatement, solution, uniqueValue, analysisType } = request;
  
  const systemPrompt = getSystemPrompt(analysisType);
  const userPrompt = buildUserPrompt(idea, companyName, targetAudience, problemStatement, solution, uniqueValue, marketResearch, analysisType);

  console.log('Calling OpenAI API with enhanced research data...');
  console.log('Using API key starting with:', openaiApiKey.substring(0, 15));
  console.log('Market research data length:', marketResearch.length);
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openaiApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      max_tokens: 8000,
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

  console.log('Enhanced analysis generated successfully, length:', analysis?.length);
  
  return analysis;
}
