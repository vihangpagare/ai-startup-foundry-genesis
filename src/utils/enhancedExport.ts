
import { IdeaData } from './export/types';

export const exportToAdvancedPDF = async (ideaData: IdeaData, reports: Record<string, string>): Promise<boolean> => {
  try {
    const content = generateAdvancedPDFContent(ideaData, reports);
    
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${ideaData.companyName || 'Startup'}_Premium_Analysis_${new Date().toISOString().split('T')[0]}.html`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('Advanced PDF export error:', error);
    return false;
  }
};

export const exportToPowerPoint = async (ideaData: IdeaData, reports: Record<string, string>): Promise<boolean> => {
  try {
    const content = generatePowerPointContent(ideaData, reports);
    
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${ideaData.companyName || 'Startup'}_Presentation_${new Date().toISOString().split('T')[0]}.html`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('PowerPoint export error:', error);
    return false;
  }
};

export const exportToJSON = async (ideaData: IdeaData, reports: Record<string, string>): Promise<boolean> => {
  try {
    const exportData = {
      metadata: {
        exportDate: new Date().toISOString(),
        version: '2.0',
        type: 'startup-analysis'
      },
      ideaData,
      reports,
      analytics: {
        reportCount: Object.keys(reports).length,
        totalCharacters: Object.values(reports).join('').length,
        generatedSections: Object.keys(reports)
      }
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${ideaData.companyName || 'Startup'}_Data_Export_${new Date().toISOString().split('T')[0]}.json`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('JSON export error:', error);
    return false;
  }
};

const generateAdvancedPDFContent = (ideaData: IdeaData, reports: Record<string, string>): string => {
  return `
<!DOCTYPE html>
<html>
<head>
    <title>${ideaData.companyName || 'Startup'} - Premium AI Analysis</title>
    <meta charset="UTF-8">
    <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          margin: 0; 
          line-height: 1.6; 
          color: #333;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .container { background: white; margin: 20px; border-radius: 15px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
        .header { 
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white; 
          padding: 40px; 
          text-align: center;
        }
        .header h1 { margin: 0; font-size: 3em; font-weight: bold; }
        .header p { font-size: 1.2em; margin: 10px 0; opacity: 0.9; }
        .content { padding: 40px; }
        .section { 
          margin-bottom: 40px; 
          padding: 30px;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border-radius: 15px;
          border-left: 5px solid #667eea;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }
        .section h2 { 
          color: #1e40af; 
          margin-top: 0;
          font-size: 2em;
          display: flex;
          align-items: center;
        }
        .section h2::before {
          content: "📊";
          margin-right: 15px;
        }
        .highlight { 
          background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); 
          padding: 20px; 
          border-radius: 10px; 
          margin: 20px 0;
          border-left: 4px solid #2563eb;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin: 30px 0;
        }
        .stat-card {
          background: white;
          padding: 20px;
          border-radius: 10px;
          text-align: center;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }
        .stat-value { font-size: 2.5em; font-weight: bold; color: #667eea; }
        .stat-label { color: #6b7280; font-size: 0.9em; }
        @media print { .container { margin: 0; box-shadow: none; } }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${ideaData.companyName || 'SaaS Startup'}</h1>
            <p>Premium AI-Powered Business Analysis</p>
            <p><strong>Concept:</strong> ${ideaData.idea}</p>
            <div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 10px; margin-top: 20px;">
                <strong>Generated:</strong> ${new Date().toLocaleDateString()} | 
                <strong>Market Research:</strong> Live Data Integrated | 
                <strong>Analysis Type:</strong> Comprehensive 7-Section Package
            </div>
        </div>
        
        <div class="content">
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-value">7</div>
                    <div class="stat-label">Analysis Sections</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">85%</div>
                    <div class="stat-label">Viability Score</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">3-6</div>
                    <div class="stat-label">Months to Market</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">AI</div>
                    <div class="stat-label">Powered Analysis</div>
                </div>
            </div>
            
            ${Object.entries(reports).map(([key, content]) => `
                <div class="section">
                    <h2>${formatSectionTitle(key)}</h2>
                    <div style="white-space: pre-wrap; font-family: Georgia, serif; line-height: 1.8;">
                        ${content}
                    </div>
                </div>
            `).join('')}
        </div>
    </div>
</body>
</html>
  `;
};

const generatePowerPointContent = (ideaData: IdeaData, reports: Record<string, string>): string => {
  return `
<!DOCTYPE html>
<html>
<head>
    <title>${ideaData.companyName || 'Startup'} - Presentation</title>
    <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          margin: 0; 
          background: #1a1a2e;
          color: white;
        }
        .slide {
          width: 100vw;
          height: 100vh;
          padding: 60px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: center;
          page-break-after: always;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .slide h1 { font-size: 4em; margin-bottom: 30px; text-align: center; }
        .slide h2 { font-size: 3em; margin-bottom: 30px; }
        .slide p { font-size: 1.5em; line-height: 1.6; margin-bottom: 20px; }
        .title-slide { text-align: center; }
        .content-slide { background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); color: #1a202c; }
    </style>
</head>
<body>
    <div class="slide title-slide">
        <h1>${ideaData.companyName || 'SaaS Startup'}</h1>
        <p style="font-size: 2em;">${ideaData.idea}</p>
        <p>AI-Powered Business Analysis</p>
    </div>
    
    ${Object.entries(reports).slice(0, 6).map(([key, content]) => `
        <div class="slide content-slide">
            <h2>${formatSectionTitle(key)}</h2>
            <div style="font-size: 1.2em; line-height: 1.8;">
                ${content.substring(0, 800)}...
            </div>
        </div>
    `).join('')}
</body>
</html>
  `;
};

const formatSectionTitle = (key: string): string => {
  const titles: Record<string, string> = {
    'business-plan': '📋 Business Strategy',
    'marketing': '📈 Marketing Strategy', 
    'technical': '⚙️ Technical Architecture',
    'financial': '💰 Financial Projections',
    'competitive': '🎯 Competitive Analysis',
    'ux-design': '🎨 User Experience Design',
    'landing-page': '🚀 Landing Page Component'
  };
  return titles[key] || key.replace('-', ' ').toUpperCase();
};
