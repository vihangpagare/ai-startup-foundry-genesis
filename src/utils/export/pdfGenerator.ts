
import { IdeaData } from './types';

export const generatePDFContent = (ideaData: IdeaData, reports: Record<string, string>): string => {
  const businessPlan = reports['business-plan'] || 'Business plan analysis not available.';
  const marketingStrategy = reports['marketing'] || 'Marketing strategy analysis not available.';
  const technicalSpecs = reports['technical'] || 'Technical specifications not available.';
  const financialProjections = reports['financial'] || 'Financial projections not available.';
  const competitiveAnalysis = reports['competitive'] || 'Competitive analysis not available.';
  const uxDesign = reports['ux-design'] || 'UX design specifications not available.';

  return `
<!DOCTYPE html>
<html>
<head>
    <title>${ideaData.companyName || 'Startup'} - Complete AI-Generated Business Analysis</title>
    <meta charset="UTF-8">
    <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          margin: 40px; 
          line-height: 1.6; 
          color: #333;
          background: #fff;
        }
        h1 { 
          color: #2563eb; 
          border-bottom: 3px solid #2563eb; 
          padding-bottom: 15px; 
          margin-bottom: 30px;
          font-size: 2.5em;
        }
        h2 { 
          color: #1e40af; 
          margin-top: 40px; 
          margin-bottom: 20px;
          font-size: 1.8em;
          border-left: 4px solid #3b82f6;
          padding-left: 15px;
        }
        h3 { 
          color: #1e3a8a; 
          margin-top: 25px;
          font-size: 1.3em;
        }
        .section { 
          margin-bottom: 40px; 
          padding: 25px;
          background: #f8fafc;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }
        .highlight { 
          background-color: #eff6ff; 
          padding: 20px; 
          border-left: 4px solid #2563eb; 
          margin: 20px 0;
          border-radius: 4px;
        }
        .ai-content {
          background: #fff;
          padding: 20px;
          border-radius: 6px;
          border: 1px solid #d1d5db;
          white-space: pre-wrap;
          font-family: Georgia, serif;
          line-height: 1.7;
        }
        .header-info {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px;
          border-radius: 8px;
          margin-bottom: 30px;
        }
        .generation-info {
          text-align: center;
          padding: 20px;
          background: #f0f9ff;
          border: 1px solid #0284c7;
          border-radius: 6px;
          margin: 30px 0;
        }
        @media print {
          body { margin: 20px; }
          .section { break-inside: avoid; }
        }
    </style>
</head>
<body>
    <div class="header-info">
        <h1 style="color: white; border: none; margin: 0;">
            ${ideaData.companyName || 'SaaS Startup'} - AI-Generated Business Analysis
        </h1>
        <p style="font-size: 1.2em; margin: 10px 0;">
            <strong>Business Concept:</strong> ${ideaData.idea}
        </p>
        <p><strong>Target Market:</strong> ${ideaData.targetAudience || 'Not specified'}</p>
        <p><strong>Unique Value Proposition:</strong> ${ideaData.uniqueValue || 'Not specified'}</p>
    </div>

    <div class="generation-info">
        <h3>📊 AI-Powered Analysis Report</h3>
        <p>This comprehensive business analysis was generated using advanced AI technology powered by Claude AI. 
        All sections contain detailed, business-specific insights and recommendations.</p>
        <p><strong>Generated on:</strong> ${new Date().toLocaleDateString()} | 
        <strong>Analysis Type:</strong> Complete 7-Section Business Package</p>
    </div>
    
    <div class="section">
        <h2>📋 Business Plan Analysis</h2>
        <div class="ai-content">${businessPlan}</div>
    </div>

    <div class="section">
        <h2>📈 Marketing Strategy</h2>
        <div class="ai-content">${marketingStrategy}</div>
    </div>

    <div class="section">
        <h2>⚙️ Technical Specifications</h2>
        <div class="ai-content">${technicalSpecs}</div>
    </div>

    <div class="section">
        <h2>💰 Financial Projections</h2>
        <div class="ai-content">${financialProjections}</div>
    </div>

    <div class="section">
        <h2>🎯 Competitive Analysis</h2>
        <div class="ai-content">${competitiveAnalysis}</div>
    </div>

    <div class="section">
        <h2>🎨 UX Design Specifications</h2>
        <div class="ai-content">${uxDesign}</div>
    </div>

    <footer style="margin-top: 50px; padding-top: 20px; border-top: 2px solid #ccc; color: #666; text-align: center;">
        <p><strong>AI Startup Analyzer</strong> - Powered by Claude AI</p>
        <p>Generated: ${new Date().toLocaleDateString()} | 
        Complete Business Analysis Package for ${ideaData.companyName || 'Your Startup'}</p>
        <p style="font-size: 0.9em;">This analysis contains AI-generated insights specific to your business concept.</p>
    </footer>
</body>
</html>
  `;
};
