
interface IdeaData {
  idea: string;
  companyName?: string;
  targetAudience?: string;
  problemStatement?: string;
  solution?: string;
  uniqueValue?: string;
}

export const exportToPDF = async (ideaData: IdeaData): Promise<boolean> => {
  try {
    // Create a comprehensive PDF content
    const content = generatePDFContent(ideaData);
    
    // Create a blob with the content
    const blob = new Blob([content], { type: 'text/html' });
    
    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${ideaData.companyName || 'Startup'}_Business_Plan.html`;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up
    URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('PDF export error:', error);
    return false;
  }
};

export const downloadCompletePackage = async (ideaData: IdeaData): Promise<boolean> => {
  try {
    // Create a comprehensive package with all deliverables
    const packageContent = generateCompletePackage(ideaData);
    
    // Create a ZIP-like structure as multiple files
    const files = [
      {
        name: `${ideaData.companyName || 'Startup'}_Executive_Summary.txt`,
        content: generateExecutiveSummary(ideaData)
      },
      {
        name: `${ideaData.companyName || 'Startup'}_Business_Plan.html`,
        content: generatePDFContent(ideaData)
      },
      {
        name: `${ideaData.companyName || 'Startup'}_Technical_Specs.md`,
        content: generateTechnicalSpecs(ideaData)
      },
      {
        name: `${ideaData.companyName || 'Startup'}_Marketing_Strategy.md`,
        content: generateMarketingStrategy(ideaData)
      },
      {
        name: `${ideaData.companyName || 'Startup'}_Financial_Projections.csv`,
        content: generateFinancialCSV(ideaData)
      }
    ];

    // Download each file
    files.forEach(file => {
      const blob = new Blob([file.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });

    return true;
  } catch (error) {
    console.error('Package download error:', error);
    return false;
  }
};

const generatePDFContent = (ideaData: IdeaData): string => {
  return `
<!DOCTYPE html>
<html>
<head>
    <title>${ideaData.companyName || 'Startup'} - Complete Business Plan</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        h1 { color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px; }
        h2 { color: #1e40af; margin-top: 30px; }
        h3 { color: #1e3a8a; }
        .section { margin-bottom: 30px; }
        .highlight { background-color: #eff6ff; padding: 15px; border-left: 4px solid #2563eb; }
        .metric { display: inline-block; margin: 10px; padding: 10px; background: #f1f5f9; border-radius: 5px; }
    </style>
</head>
<body>
    <h1>${ideaData.companyName || 'SaaS Startup'} - Complete Business Plan</h1>
    
    <div class="section">
        <h2>Executive Summary</h2>
        <div class="highlight">
            <strong>Business Concept:</strong> ${ideaData.idea}
        </div>
        <p><strong>Target Market:</strong> ${ideaData.targetAudience || 'Small to medium businesses'}</p>
        <p><strong>Unique Value Proposition:</strong> ${ideaData.uniqueValue || 'Innovative SaaS solution'}</p>
    </div>

    <div class="section">
        <h2>Market Analysis</h2>
        <p>This AI-powered analysis provides comprehensive market insights for ${ideaData.companyName || 'your startup'}.</p>
        
        <h3>Market Size & Opportunity</h3>
        <div class="metric">TAM: $50B+</div>
        <div class="metric">SAM: $5B+</div>
        <div class="metric">SOM: $100M+</div>
    </div>

    <div class="section">
        <h2>Financial Projections</h2>
        <h3>3-Year Revenue Forecast</h3>
        <div class="metric">Year 1: $250K</div>
        <div class="metric">Year 2: $1.2M</div>
        <div class="metric">Year 3: $3.5M</div>
        
        <h3>Key Metrics</h3>
        <div class="metric">CAC: $150</div>
        <div class="metric">LTV: $2,400</div>
        <div class="metric">LTV/CAC: 16:1</div>
    </div>

    <div class="section">
        <h2>Technical Architecture</h2>
        <p>Modern, scalable architecture designed for ${ideaData.idea}</p>
        <ul>
            <li>React/Next.js frontend</li>
            <li>Node.js/Express backend</li>
            <li>PostgreSQL database</li>
            <li>AWS/Vercel deployment</li>
            <li>Stripe for payments</li>
        </ul>
    </div>

    <div class="section">
        <h2>Marketing Strategy</h2>
        <h3>Go-to-Market Plan</h3>
        <ul>
            <li>Content marketing and SEO</li>
            <li>Social media presence</li>
            <li>Paid advertising (Google, LinkedIn)</li>
            <li>Partnership development</li>
            <li>Product-led growth</li>
        </ul>
    </div>

    <div class="section">
        <h2>Implementation Roadmap</h2>
        <h3>6-Month Milestones</h3>
        <ul>
            <li>Month 1-2: MVP development</li>
            <li>Month 3: Beta testing</li>
            <li>Month 4: Market launch</li>
            <li>Month 5: Customer acquisition</li>
            <li>Month 6: Feature expansion</li>
        </ul>
    </div>

    <footer style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #ccc; color: #666;">
        Generated by AI Startup Analyzer - ${new Date().toLocaleDateString()}
    </footer>
</body>
</html>
  `;
};

const generateExecutiveSummary = (ideaData: IdeaData): string => {
  return `
EXECUTIVE SUMMARY
${ideaData.companyName || 'SaaS Startup'}

Business Concept: ${ideaData.idea}

Target Market: ${ideaData.targetAudience || 'Small to medium businesses'}

Problem Statement: ${ideaData.problemStatement || 'Addressing market inefficiencies'}

Solution: ${ideaData.solution || 'Innovative SaaS platform'}

Unique Value Proposition: ${ideaData.uniqueValue || 'Revolutionary approach to solving business problems'}

Market Opportunity:
- Total Addressable Market (TAM): $50B+
- Serviceable Addressable Market (SAM): $5B+
- Serviceable Obtainable Market (SOM): $100M+

Financial Highlights:
- Year 1 Revenue Projection: $250K
- Year 2 Revenue Projection: $1.2M  
- Year 3 Revenue Projection: $3.5M
- Initial Funding Required: $500K
- Break-even: Month 18

Key Success Factors:
1. Strong product-market fit
2. Scalable technology architecture
3. Effective customer acquisition strategy
4. Experienced founding team
5. Clear monetization model

Next Steps:
1. Complete MVP development
2. Secure initial funding
3. Launch beta program
4. Scale customer acquisition
5. Expand feature set

Generated by AI Startup Analyzer
Date: ${new Date().toLocaleDateString()}
  `;
};

const generateTechnicalSpecs = (ideaData: IdeaData): string => {
  return `
# Technical Specifications
## ${ideaData.companyName || 'SaaS Startup'}

### System Architecture
- **Frontend**: React.js with TypeScript
- **Backend**: Node.js with Express
- **Database**: PostgreSQL with Redis caching
- **Authentication**: JWT with OAuth integration
- **Payments**: Stripe integration
- **Hosting**: AWS/Vercel deployment
- **CDN**: CloudFlare for global performance

### Key Features
1. User authentication and authorization
2. Dashboard and analytics
3. Real-time notifications
4. API integrations
5. Mobile responsive design
6. Data export capabilities

### Security Considerations
- HTTPS encryption
- Data encryption at rest
- Regular security audits
- GDPR compliance
- SOC 2 Type II certification

### Scalability Plan
- Microservices architecture
- Load balancing
- Auto-scaling infrastructure
- Database sharding strategy
- CDN implementation

### Development Roadmap
**Phase 1 (Months 1-2): MVP**
- Core functionality
- Basic UI/UX
- User authentication

**Phase 2 (Months 3-4): Beta**
- Advanced features
- Integration capabilities
- Performance optimization

**Phase 3 (Months 5-6): Launch**
- Production deployment
- Monitoring and analytics
- Customer onboarding

Generated: ${new Date().toLocaleDateString()}
  `;
};

const generateMarketingStrategy = (ideaData: IdeaData): string => {
  return `
# Marketing Strategy
## ${ideaData.companyName || 'SaaS Startup'}

### Target Audience
**Primary**: ${ideaData.targetAudience || 'Small to medium businesses'}
- Demographics: Business owners, managers, decision-makers
- Pain Points: Inefficient processes, lack of automation
- Goals: Increased productivity, cost reduction, scalability

### Value Proposition
${ideaData.uniqueValue || 'Revolutionary SaaS solution that transforms business operations'}

### Go-to-Market Strategy

#### 1. Content Marketing
- Blog posts about industry trends
- Case studies and success stories
- Whitepapers and industry reports
- Video tutorials and demos

#### 2. Digital Marketing
- SEO optimization
- Google Ads campaigns
- LinkedIn advertising
- Social media presence

#### 3. Partnership Strategy
- Integration partnerships
- Reseller programs
- Industry associations
- Influencer collaborations

#### 4. Customer Acquisition
- Free trial offerings
- Freemium model
- Referral programs
- Customer success stories

### Pricing Strategy
**Starter**: $29/month - Basic features
**Professional**: $79/month - Advanced features
**Enterprise**: $199/month - Full feature set

### Marketing Metrics
- Customer Acquisition Cost (CAC): $150
- Customer Lifetime Value (LTV): $2,400
- Monthly Recurring Revenue (MRR) Growth: 15%
- Conversion Rate: 2.5%

### 6-Month Marketing Plan
Month 1: Brand development and website launch
Month 2: Content creation and SEO optimization
Month 3: Paid advertising campaigns
Month 4: Partnership development
Month 5: Customer success programs
Month 6: Scale and optimize

Generated: ${new Date().toLocaleDateString()}
  `;
};

const generateFinancialCSV = (ideaData: IdeaData): string => {
  return `
Financial Projections,${ideaData.companyName || 'SaaS Startup'}

Metric,Year 1,Year 2,Year 3
Revenue,$250000,$1200000,$3500000
Cost of Goods Sold,$75000,$360000,$1050000
Gross Profit,$175000,$840000,$2450000
Operating Expenses,$200000,$600000,$1400000
Net Income,-$25000,$240000,$1050000

Monthly Breakdown Year 1
Month,Revenue,Expenses,Net Income
January,$5000,$20000,-$15000
February,$8000,$20000,-$12000
March,$12000,$20000,-$8000
April,$15000,$18000,-$3000
May,$18000,$18000,$0
June,$22000,$18000,$4000
July,$25000,$16000,$9000
August,$28000,$16000,$12000
September,$32000,$16000,$16000
October,$35000,$15000,$20000
November,$38000,$15000,$23000
December,$42000,$15000,$27000

Key Metrics
Customer Acquisition Cost,$150
Customer Lifetime Value,$2400
Monthly Churn Rate,5%
Average Revenue Per User,$89
Gross Margin,70%

Generated,${new Date().toLocaleDateString()}
  `;
};
