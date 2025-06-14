
export const exportToPDF = async (ideaData: any) => {
  try {
    // Create comprehensive content for PDF
    const content = generatePDFContent(ideaData);
    
    // Create a blob with HTML content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${ideaData.companyName || 'SaaS'} - Complete Startup Package</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
            h1 { color: #4f46e5; border-bottom: 2px solid #4f46e5; padding-bottom: 10px; }
            h2 { color: #6366f1; margin-top: 30px; }
            h3 { color: #7c3aed; margin-top: 20px; }
            .section { margin-bottom: 30px; page-break-inside: avoid; }
            .highlight { background-color: #f0f9ff; padding: 15px; border-left: 4px solid #4f46e5; margin: 20px 0; }
            .metric { display: inline-block; margin: 10px 20px 10px 0; padding: 10px; background: #f8fafc; border-radius: 8px; }
            .feature-list { list-style-type: none; padding: 0; }
            .feature-list li { padding: 8px 0; border-bottom: 1px solid #e2e8f0; }
            .code-block { background: #1e293b; color: #f1f5f9; padding: 20px; border-radius: 8px; overflow-x: auto; font-family: monospace; white-space: pre-wrap; }
            @media print { body { margin: 0; } .page-break { page-break-before: always; } }
          </style>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `;
    
    // Create and download the HTML file (can be converted to PDF by browser)
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${ideaData.companyName || 'SaaS'}_Startup_Package.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('Error exporting PDF:', error);
    return false;
  }
};

export const downloadCompletePackage = async (ideaData: any) => {
  try {
    // Generate all the files for the complete package
    const files = generateCompletePackage(ideaData);
    
    // Create a zip-like structure with multiple files
    for (const file of files) {
      const blob = new Blob([file.content], { type: file.type });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      // Small delay between downloads
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    return true;
  } catch (error) {
    console.error('Error downloading package:', error);
    return false;
  }
};

const generatePDFContent = (ideaData: any) => {
  const companyName = ideaData?.companyName || 'Your SaaS';
  const idea = ideaData?.idea || 'SaaS Platform';
  
  return `
    <h1>${companyName} - Complete Startup Package</h1>
    
    <div class="highlight">
      <h2>Executive Summary</h2>
      <p><strong>SaaS Concept:</strong> ${idea}</p>
      <p><strong>Target Market:</strong> ${ideaData?.targetAudience || 'Small to medium businesses'}</p>
      <p><strong>Market Size:</strong> $195B+ (SaaS Market)</p>
      <p><strong>Revenue Model:</strong> Subscription-based with tiered pricing</p>
    </div>

    <div class="section page-break">
      <h2>1. Strategic Business Plan</h2>
      <h3>Market Analysis</h3>
      <p>The ${idea.toLowerCase().includes('restaurant') ? 'restaurant technology' : 
         idea.toLowerCase().includes('design') ? 'design tools' : 
         idea.toLowerCase().includes('hr') ? 'HR technology' : 'SaaS'} market presents significant opportunities...</p>
      
      <h3>Competitive Landscape</h3>
      <ul>
        <li>Direct competitors: Mid-market solutions lacking modern UX</li>
        <li>Indirect competitors: Manual processes and legacy tools</li>
        <li>Competitive advantage: AI-powered automation and user-friendly design</li>
      </ul>
      
      <h3>Revenue Projections</h3>
      <div class="metric">Year 1: $250K-500K</div>
      <div class="metric">Year 2: $1M-2M</div>
      <div class="metric">Year 3: $3M-5M</div>
    </div>

    <div class="section page-break">
      <h2>2. Marketing & Growth Strategy</h2>
      <h3>Go-to-Market Plan</h3>
      <ul>
        <li>Phase 1: Beta launch with 50 early adopters</li>
        <li>Phase 2: Content marketing and organic growth</li>
        <li>Phase 3: Paid advertising and partnership channels</li>
      </ul>
      
      <h3>Customer Acquisition Channels</h3>
      <ul class="feature-list">
        <li>Content Marketing & SEO</li>
        <li>Social Media Presence</li>
        <li>Industry Partnerships</li>
        <li>Paid Search & Display</li>
        <li>Referral Programs</li>
      </ul>
    </div>

    <div class="section page-break">
      <h2>3. Technical Architecture</h2>
      <h3>Technology Stack</h3>
      <ul class="feature-list">
        <li>Frontend: React + TypeScript + Tailwind CSS</li>
        <li>Backend: Node.js + Express + PostgreSQL</li>
        <li>Authentication: Firebase Auth / Supabase Auth</li>
        <li>Hosting: Vercel / Netlify + Supabase</li>
        <li>Payments: Stripe integration</li>
        <li>Analytics: Mixpanel + Google Analytics</li>
      </ul>
      
      <h3>MVP Features</h3>
      <ul class="feature-list">
        <li>User authentication and onboarding</li>
        <li>Core feature implementation</li>
        <li>Dashboard and analytics</li>
        <li>Settings and profile management</li>
        <li>Basic admin panel</li>
      </ul>
    </div>

    <div class="section page-break">
      <h2>4. Financial Projections</h2>
      <h3>Startup Costs</h3>
      <ul class="feature-list">
        <li>Development: $50K-100K</li>
        <li>Marketing: $20K-40K</li>
        <li>Operations: $10K-20K</li>
        <li>Legal & Admin: $5K-10K</li>
      </ul>
      
      <h3>Monthly Recurring Revenue (MRR) Growth</h3>
      <div class="metric">Month 6: $10K MRR</div>
      <div class="metric">Month 12: $40K MRR</div>
      <div class="metric">Month 24: $150K MRR</div>
    </div>

    <div class="section page-break">
      <h2>5. Implementation Roadmap</h2>
      <h3>Phase 1: MVP Development (Months 1-3)</h3>
      <ul>
        <li>Core feature development</li>
        <li>Basic UI/UX implementation</li>
        <li>User authentication system</li>
        <li>Initial beta testing</li>
      </ul>
      
      <h3>Phase 2: Market Launch (Months 4-6)</h3>
      <ul>
        <li>Public launch preparation</li>
        <li>Marketing campaign execution</li>
        <li>Customer feedback integration</li>
        <li>Feature refinements</li>
      </ul>
      
      <h3>Phase 3: Scale & Growth (Months 7-12)</h3>
      <ul>
        <li>Advanced feature rollout</li>
        <li>Enterprise customer acquisition</li>
        <li>Team expansion</li>
        <li>Funding preparation</li>
      </ul>
    </div>
  `;
};

const generateCompletePackage = (ideaData: any) => {
  const companyName = ideaData?.companyName || 'YourSaaS';
  
  return [
    {
      name: `${companyName}_Business_Plan.md`,
      type: 'text/markdown',
      content: generateBusinessPlanMarkdown(ideaData)
    },
    {
      name: `${companyName}_Marketing_Strategy.md`,
      type: 'text/markdown',
      content: generateMarketingStrategyMarkdown(ideaData)
    },
    {
      name: `${companyName}_Technical_Specs.md`,
      type: 'text/markdown',
      content: generateTechnicalSpecsMarkdown(ideaData)
    },
    {
      name: 'LandingPage.tsx',
      type: 'text/plain',
      content: generateLandingPageCode(ideaData)
    },
    {
      name: 'package.json',
      type: 'application/json',
      content: generatePackageJson(companyName)
    },
    {
      name: 'README.md',
      type: 'text/markdown',
      content: generateReadme(ideaData)
    }
  ];
};

const generateBusinessPlanMarkdown = (ideaData: any) => {
  return `# ${ideaData?.companyName || 'Your SaaS'} - Business Plan

## Executive Summary
${ideaData?.idea || 'SaaS platform description'}

## Market Analysis
- Target Market: ${ideaData?.targetAudience || 'Small to medium businesses'}
- Market Size: $195B+ global SaaS market
- Growth Rate: 25% annually

## Revenue Model
- Subscription-based pricing
- Freemium to premium conversion
- Enterprise custom pricing

## Financial Projections
- Year 1: $250K-500K ARR
- Year 2: $1M-2M ARR
- Year 3: $3M-5M ARR

## Next Steps
1. MVP Development
2. Beta Testing
3. Market Launch
4. Scale & Growth
`;
};

const generateMarketingStrategyMarkdown = (ideaData: any) => {
  return `# Marketing Strategy - ${ideaData?.companyName || 'Your SaaS'}

## Target Audience
${ideaData?.targetAudience || 'Small to medium businesses'}

## Marketing Channels
- Content Marketing
- Social Media
- Paid Advertising
- Partnerships
- Referral Programs

## Go-to-Market Strategy
1. Beta Launch
2. Product Hunt Launch
3. Content Marketing
4. Paid Acquisition
5. Partnership Development

## Budget Allocation
- Content: 40%
- Paid Ads: 35%
- Events: 15%
- Tools: 10%
`;
};

const generateTechnicalSpecsMarkdown = (ideaData: any) => {
  return `# Technical Specifications - ${ideaData?.companyName || 'Your SaaS'}

## Technology Stack
- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: PostgreSQL
- **Authentication**: Supabase Auth
- **Hosting**: Vercel + Supabase
- **Payments**: Stripe

## Architecture
- Responsive web application
- RESTful API design
- Real-time updates
- Scalable cloud infrastructure

## Security
- JWT authentication
- HTTPS encryption
- Data validation
- Rate limiting
- GDPR compliance

## Performance
- < 3s initial load time
- 99.9% uptime SLA
- Auto-scaling infrastructure
- CDN for global delivery
`;
};

const generateLandingPageCode = (ideaData: any) => {
  const companyName = ideaData?.companyName || 'YourSaaS';
  const idea = ideaData?.idea || 'SaaS platform';
  
  return `import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            ${companyName}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            ${idea}
          </p>
          <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;`;
};

const generatePackageJson = (companyName: string) => {
  return JSON.stringify({
    "name": companyName.toLowerCase().replace(/\s+/g, '-'),
    "version": "1.0.0",
    "type": "module",
    "scripts": {
      "dev": "vite",
      "build": "vite build",
      "preview": "vite preview"
    },
    "dependencies": {
      "react": "^18.3.1",
      "react-dom": "^18.3.1",
      "@radix-ui/react-slot": "^1.1.0",
      "class-variance-authority": "^0.7.1",
      "clsx": "^2.1.1",
      "lucide-react": "^0.462.0",
      "tailwindcss": "^3.4.0"
    },
    "devDependencies": {
      "@types/react": "^18.3.5",
      "@types/react-dom": "^18.3.0",
      "@vitejs/plugin-react": "^4.3.1",
      "typescript": "^5.5.3",
      "vite": "^5.4.1"
    }
  }, null, 2);
};

const generateReadme = (ideaData: any) => {
  return `# ${ideaData?.companyName || 'Your SaaS'} - MVP

## Description
${ideaData?.idea || 'SaaS platform description'}

## Features
- User authentication
- Responsive design
- Modern UI components
- Database integration
- Payment processing ready

## Setup
1. Install dependencies: \`npm install\`
2. Set up environment variables
3. Run development server: \`npm run dev\`
4. Build for production: \`npm run build\`

## Tech Stack
- React + TypeScript
- Tailwind CSS
- Vite
- Supabase

## Next Steps
1. Customize branding and content
2. Integrate with your backend
3. Add analytics and monitoring
4. Deploy to production
5. Gather user feedback

## Support
Contact: [your-email@example.com]
`;
};
