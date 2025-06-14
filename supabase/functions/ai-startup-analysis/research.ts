
export async function fetchMarketResearch(idea: string, exaApiKey: string): Promise<string> {
  try {
    console.log('Fetching comprehensive market research with Exa API...');
    
    // Enhanced search queries for comprehensive research
    const searchQueries = [
      `${idea} market analysis size trends growth 2024 2025`,
      `${idea} competitors pricing business model revenue`,
      `${idea} industry report market share statistics`,
      `${idea} startup funding investment venture capital`,
      `${idea} customer demographics target audience behavior`
    ];
    
    let comprehensiveResearch = '';
    
    for (const query of searchQueries) {
      try {
        const exaResponse = await fetch('https://api.exa.ai/search', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${exaApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: query,
            numResults: 5,
            contents: {
              text: true,
              highlights: true
            },
            textLengthThreshold: 500,
            includeSourceUrls: true,
            category: 'company',
            startPublishedDate: '2023-01-01'
          }),
        });
        
        if (exaResponse.ok) {
          const exaData = await exaResponse.json();
          const searchResults = exaData.results?.map((result: any) => 
            `**Source:** ${result.title}
**URL:** ${result.url}
**Published:** ${result.publishedDate || 'Recent'}
**Key Insights:** ${result.text}
**Highlights:** ${result.highlights?.join(', ') || 'N/A'}
---`
          ).join('\n\n') || '';
          
          if (searchResults) {
            comprehensiveResearch += `\n\n### Research Query: "${query}"\n${searchResults}\n`;
          }
        }
        
        // Add delay to respect API rate limits
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (queryError) {
        console.log(`Search query failed: ${query}`, queryError);
      }
    }
    
    // Add market trend analysis
    try {
      const trendResponse = await fetch('https://api.exa.ai/search', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${exaApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `${idea} market trends 2024 growth opportunities challenges`,
          numResults: 3,
          contents: {
            text: true,
            summary: true
          },
          textLengthThreshold: 300,
          startPublishedDate: '2024-01-01'
        }),
      });
      
      if (trendResponse.ok) {
        const trendData = await trendResponse.json();
        const trendAnalysis = trendData.results?.map((result: any) => 
          `**Trend Source:** ${result.title}
**Summary:** ${result.summary || result.text}
**URL:** ${result.url}`
        ).join('\n\n') || '';
        
        if (trendAnalysis) {
          comprehensiveResearch += `\n\n### Market Trends Analysis\n${trendAnalysis}\n`;
        }
      }
    } catch (trendError) {
      console.log('Trend analysis failed:', trendError);
    }
    
    console.log('Comprehensive market research fetched successfully');
    return comprehensiveResearch || 'No comprehensive market research data available.';
  } catch (error) {
    console.log('Enhanced Exa search failed:', error);
    return '';
  }
}

// New function for real-time competitor analysis
export async function fetchCompetitorAnalysis(idea: string, exaApiKey: string): Promise<string> {
  try {
    console.log('Fetching competitor analysis...');
    
    const competitorQueries = [
      `${idea} competitors direct indirect competitive landscape`,
      `${idea} similar companies startups alternatives`,
      `${idea} market leaders pricing models features`
    ];
    
    let competitorData = '';
    
    for (const query of competitorQueries) {
      try {
        const response = await fetch('https://api.exa.ai/search', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${exaApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: query,
            numResults: 4,
            contents: {
              text: true,
              highlights: true
            },
            textLengthThreshold: 400,
            category: 'company'
          }),
        });
        
        if (response.ok) {
          const data = await response.json();
          const results = data.results?.map((result: any) => 
            `**Competitor/Company:** ${result.title}
**Analysis:** ${result.text}
**Key Points:** ${result.highlights?.join(', ') || 'N/A'}
**Source:** ${result.url}
---`
          ).join('\n\n') || '';
          
          if (results) {
            competitorData += `\n\n### Competitor Research: "${query}"\n${results}\n`;
          }
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (queryError) {
        console.log(`Competitor query failed: ${query}`, queryError);
      }
    }
    
    return competitorData;
  } catch (error) {
    console.log('Competitor analysis failed:', error);
    return '';
  }
}

// New function for industry insights
export async function fetchIndustryInsights(idea: string, exaApiKey: string): Promise<string> {
  try {
    console.log('Fetching industry insights...');
    
    const insightQueries = [
      `${idea} industry report market size statistics 2024`,
      `${idea} sector growth opportunities challenges risks`,
      `${idea} market research analyst reports forecasts`
    ];
    
    let insightData = '';
    
    for (const query of insightQueries) {
      try {
        const response = await fetch('https://api.exa.ai/search', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${exaApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: query,
            numResults: 3,
            contents: {
              text: true,
              summary: true
            },
            textLengthThreshold: 600,
            startPublishedDate: '2023-06-01'
          }),
        });
        
        if (response.ok) {
          const data = await response.json();
          const results = data.results?.map((result: any) => 
            `**Industry Report:** ${result.title}
**Insights:** ${result.summary || result.text}
**Source:** ${result.url}
**Published:** ${result.publishedDate || 'Recent'}
---`
          ).join('\n\n') || '';
          
          if (results) {
            insightData += `\n\n### Industry Analysis: "${query}"\n${results}\n`;
          }
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (queryError) {
        console.log(`Industry query failed: ${query}`, queryError);
      }
    }
    
    return insightData;
  } catch (error) {
    console.log('Industry insights failed:', error);
    return '';
  }
}
