
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

  console.log('Calling Anthropic API...');
  console.log('Using API key starting with:', anthropicApiKey.substring(0, 15));
  
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
          content: `${systemPrompt}\n\n${userPrompt}`
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

  console.log('Analysis generated successfully, length:', analysis?.length);
  
  return analysis;
}
