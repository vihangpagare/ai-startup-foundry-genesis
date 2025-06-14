
export interface AnalysisRequest {
  idea: string;
  companyName?: string;
  targetAudience?: string;
  problemStatement?: string;
  solution?: string;
  uniqueValue?: string;
  analysisType: 'business-plan' | 'marketing' | 'technical' | 'financial' | 'competitive' | 'ux-design' | 'landing-page';
}

export interface AnalysisResponse {
  success: boolean;
  analysis?: string;
  marketData?: string;
  error?: string;
}
