
import { IdeaData } from './export/types';
import { generatePDFContent } from './export/pdfGenerator';
import { createPackageFiles, downloadFiles } from './export/packageGenerator';

export const exportToPDF = async (ideaData: IdeaData): Promise<boolean> => {
  try {
    // Get generated reports from localStorage
    const storedReports = localStorage.getItem('generatedReports');
    const reports = storedReports ? JSON.parse(storedReports) : {};
    
    // Create a comprehensive PDF content with actual AI-generated data
    const content = generatePDFContent(ideaData, reports);
    
    // Create a blob with the content
    const blob = new Blob([content], { type: 'text/html' });
    
    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${ideaData.companyName || 'Startup'}_Complete_Business_Plan.html`;
    
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
    // Get generated reports from localStorage
    const storedReports = localStorage.getItem('generatedReports');
    const reports = storedReports ? JSON.parse(storedReports) : {};
    
    // Create package files with all deliverables using actual AI content
    const files = createPackageFiles(ideaData, reports);

    // Download each file
    downloadFiles(files);

    return true;
  } catch (error) {
    console.error('Package download error:', error);
    return false;
  }
};
