
import { IdeaData, PackageFile } from './types';
import { generateExecutiveSummary, generateFinancialCSV } from './contentGenerators';
import { generatePDFContent } from './pdfGenerator';

export const createPackageFiles = (ideaData: IdeaData, reports: Record<string, string>): PackageFile[] => {
  return [
    {
      name: `${ideaData.companyName || 'Startup'}_Executive_Summary.txt`,
      content: generateExecutiveSummary(ideaData, reports)
    },
    {
      name: `${ideaData.companyName || 'Startup'}_Complete_Business_Plan.html`,
      content: generatePDFContent(ideaData, reports)
    },
    {
      name: `${ideaData.companyName || 'Startup'}_Business_Plan.md`,
      content: reports['business-plan'] || 'Business plan not generated yet.'
    },
    {
      name: `${ideaData.companyName || 'Startup'}_Marketing_Strategy.md`,
      content: reports['marketing'] || 'Marketing strategy not generated yet.'
    },
    {
      name: `${ideaData.companyName || 'Startup'}_Technical_Specifications.md`,
      content: reports['technical'] || 'Technical specifications not generated yet.'
    },
    {
      name: `${ideaData.companyName || 'Startup'}_Financial_Projections.md`,
      content: reports['financial'] || 'Financial projections not generated yet.'
    },
    {
      name: `${ideaData.companyName || 'Startup'}_Competitive_Analysis.md`,
      content: reports['competitive'] || 'Competitive analysis not generated yet.'
    },
    {
      name: `${ideaData.companyName || 'Startup'}_UX_Design_Specifications.md`,
      content: reports['ux-design'] || 'UX design specifications not generated yet.'
    },
    {
      name: `${ideaData.companyName || 'Startup'}_Landing_Page_Component.tsx`,
      content: reports['landing-page'] || '// Landing page component not generated yet.'
    },
    {
      name: `${ideaData.companyName || 'Startup'}_Financial_Data.csv`,
      content: generateFinancialCSV(ideaData, reports)
    }
  ];
};

export const downloadFiles = (files: PackageFile[]): void => {
  files.forEach(file => {
    const fileType = file.name.endsWith('.tsx') ? 'text/typescript' : 
                    file.name.endsWith('.html') ? 'text/html' :
                    file.name.endsWith('.md') ? 'text/markdown' :
                    file.name.endsWith('.csv') ? 'text/csv' : 'text/plain';
    
    const blob = new Blob([file.content], { type: fileType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });
};
