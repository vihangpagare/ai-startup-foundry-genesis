
export async function fetchMarketResearch(idea: string, exaApiKey: string): Promise<string> {
  try {
    console.log('Fetching market research with Exa API...');
    const searchQuery = `${idea} market analysis trends competition 2024`;
    
    const exaResponse = await fetch('https://api.exa.ai/search', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${exaApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: searchQuery,
        numResults: 3,
        contents: {
          text: true
        },
        textLengthThreshold: 300
      }),
    });
    
    if (exaResponse.ok) {
      const exaData = await exaResponse.json();
      const marketResearch = exaData.results?.map((result: any) => 
        `Source: ${result.title}\nInsight: ${result.text}\n`
      ).join('\n') || '';
      
      console.log('Market research fetched successfully');
      return marketResearch;
    } else {
      const errorText = await exaResponse.text();
      console.log('Exa API call failed:', exaResponse.status, errorText);
      return '';
    }
  } catch (error) {
    console.log('Exa search failed:', error);
    return '';
  }
}
