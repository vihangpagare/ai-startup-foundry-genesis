
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  ChevronDown, ChevronRight, TrendingUp, AlertCircle, CheckCircle, 
  Info, Lightbulb, Target, DollarSign, Users, Calendar, BarChart3,
  AlertTriangle, Star, TrendingDown, Shield, Zap
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface EnhancedReportRendererProps {
  content: string;
  title: string;
  type: 'business-plan' | 'marketing' | 'competitive' | 'technical' | 'financial' | 'ux-design';
}

const EnhancedReportRenderer: React.FC<EnhancedReportRendererProps> = ({ content, title, type }) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'business-plan': return <Target className="h-6 w-6" />;
      case 'marketing': return <TrendingUp className="h-6 w-6" />;
      case 'competitive': return <BarChart3 className="h-6 w-6" />;
      case 'technical': return <Info className="h-6 w-6" />;
      case 'financial': return <DollarSign className="h-6 w-6" />;
      case 'ux-design': return <Users className="h-6 w-6" />;
      default: return <Info className="h-6 w-6" />;
    }
  };

  const getTypeGradient = () => {
    switch (type) {
      case 'business-plan': return 'from-purple-500 to-pink-500';
      case 'marketing': return 'from-blue-500 to-cyan-500';
      case 'competitive': return 'from-green-500 to-emerald-500';
      case 'technical': return 'from-orange-500 to-red-500';
      case 'financial': return 'from-pink-500 to-rose-500';
      case 'ux-design': return 'from-indigo-500 to-purple-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getSemanticColor = (type: string) => {
    const colors = {
      opportunity: isDark ? 'text-green-400 bg-green-500/10 border-green-500/20' : 'text-green-700 bg-green-50 border-green-200',
      strength: isDark ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-emerald-700 bg-emerald-50 border-emerald-200',
      risk: isDark ? 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' : 'text-yellow-700 bg-yellow-50 border-yellow-200',
      threat: isDark ? 'text-red-400 bg-red-500/10 border-red-500/20' : 'text-red-700 bg-red-50 border-red-200',
      insight: isDark ? 'text-blue-400 bg-blue-500/10 border-blue-500/20' : 'text-blue-700 bg-blue-50 border-blue-200',
      recommendation: isDark ? 'text-purple-400 bg-purple-500/10 border-purple-500/20' : 'text-purple-700 bg-purple-50 border-purple-200',
      financial: isDark ? 'text-pink-400 bg-pink-500/10 border-pink-500/20' : 'text-pink-700 bg-pink-50 border-pink-200',
      warning: isDark ? 'text-orange-400 bg-orange-500/10 border-orange-500/20' : 'text-orange-700 bg-orange-50 border-orange-200',
      critical: isDark ? 'text-red-500 bg-red-600/10 border-red-600/30' : 'text-red-800 bg-red-100 border-red-300'
    };
    return colors[type as keyof typeof colors] || colors.insight;
  };

  const formatContent = (content: string) => {
    const sections = content.split(/(?=##\s)/);
    
    return sections.map((section, index) => {
      if (!section.trim()) return null;
      
      const lines = section.split('\n');
      const headerLine = lines[0];
      const isHeader = headerLine.startsWith('##');
      
      if (isHeader) {
        const headerText = headerLine.replace(/^##\s*/, '').trim();
        const sectionContent = lines.slice(1).join('\n');
        const sectionId = `section-${index}`;
        
        return (
          <Collapsible key={index} className="mb-6">
            <CollapsibleTrigger 
              className="w-full text-left"
              onClick={() => toggleSection(sectionId)}
            >
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-muted/30 to-muted/50 rounded-lg hover:from-muted/50 hover:to-muted/70 transition-all duration-200 border border-border">
                <div className="flex items-center space-x-3">
                  {expandedSections[sectionId] ? (
                    <ChevronDown className="h-5 w-5 text-primary" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-primary" />
                  )}
                  <h3 className="text-xl font-semibold text-foreground">{headerText}</h3>
                </div>
                <Badge variant="outline" className="text-primary border-primary/20">
                  {expandedSections[sectionId] ? 'Collapse' : 'Expand'}
                </Badge>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <div className="p-6 bg-card rounded-lg border border-border shadow-sm">
                <div 
                  className="enhanced-report-typography prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: formatEnhancedMarkdown(sectionContent) }}
                />
              </div>
            </CollapsibleContent>
          </Collapsible>
        );
      }
      
      return (
        <div key={index} className="mb-6 p-6 bg-card rounded-lg border border-border shadow-sm">
          <div 
            className="enhanced-report-typography prose max-w-none"
            dangerouslySetInnerHTML={{ __html: formatEnhancedMarkdown(section) }}
          />
        </div>
      );
    });
  };

  const formatEnhancedMarkdown = (text: string) => {
    return text
      // Enhanced headers with semantic styling
      .replace(/^### (.*$)/gm, '<h3 class="text-2xl font-bold text-foreground mb-4 mt-6 border-b border-border pb-2">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-3xl font-bold text-foreground mb-6 mt-8">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 class="text-4xl font-bold text-foreground mb-8">$1</h1>')
      
      // Enhanced text formatting
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-foreground">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-muted-foreground">$1</em>')
      
      // Enhanced semantic markers with color coding
      .replace(/🟢\s*(.*?)(?=\n|$)/g, `<div class="semantic-box ${getSemanticColor('opportunity')} border rounded-lg p-4 mb-4"><div class="flex items-start space-x-3"><div class="text-green-500 mt-1"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M13 7l-3 3-3-3"/></svg></div><div class="flex-1"><strong>Opportunity:</strong> $1</div></div></div>`)
      .replace(/✅\s*(.*?)(?=\n|$)/g, `<div class="semantic-box ${getSemanticColor('strength')} border rounded-lg p-4 mb-4"><div class="flex items-start space-x-3"><div class="text-green-500 mt-1"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg></div><div class="flex-1"><strong>Strength:</strong> $1</div></div></div>`)
      .replace(/🔴\s*(.*?)(?=\n|$)/g, `<div class="semantic-box ${getSemanticColor('threat')} border rounded-lg p-4 mb-4"><div class="flex items-start space-x-3"><div class="text-red-500 mt-1"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg></div><div class="flex-1"><strong>Threat:</strong> $1</div></div></div>`)
      .replace(/⚠️\s*(.*?)(?=\n|$)/g, `<div class="semantic-box ${getSemanticColor('warning')} border rounded-lg p-4 mb-4"><div class="flex items-start space-x-3"><div class="text-yellow-500 mt-1"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg></div><div class="flex-1"><strong>Warning:</strong> $1</div></div></div>`)
      .replace(/🟡\s*(.*?)(?=\n|$)/g, `<div class="semantic-box ${getSemanticColor('risk')} border rounded-lg p-4 mb-4"><div class="flex items-start space-x-3"><div class="text-yellow-500 mt-1"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/></svg></div><div class="flex-1"><strong>Risk:</strong> $1</div></div></div>`)
      .replace(/🔵\s*(.*?)(?=\n|$)/g, `<div class="semantic-box ${getSemanticColor('insight')} border rounded-lg p-4 mb-4"><div class="flex items-start space-x-3"><div class="text-blue-500 mt-1"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/></svg></div><div class="flex-1"><strong>Insight:</strong> $1</div></div></div>`)
      .replace(/🟣\s*(.*?)(?=\n|$)/g, `<div class="semantic-box ${getSemanticColor('financial')} border rounded-lg p-4 mb-4"><div class="flex items-start space-x-3"><div class="text-purple-500 mt-1"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"/></svg></div><div class="flex-1"><strong>Financial:</strong> $1</div></div></div>`)
      .replace(/💡\s*(.*?)(?=\n|$)/g, `<div class="semantic-box ${getSemanticColor('recommendation')} border rounded-lg p-4 mb-4"><div class="flex items-start space-x-3"><div class="text-purple-500 mt-1"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg></div><div class="flex-1"><strong>Recommendation:</strong> $1</div></div></div>`)
      
      // Enhanced lists with better styling
      .replace(/^\* (.*$)/gm, '<li class="mb-2 text-foreground">$1</li>')
      .replace(/^- (.*$)/gm, '<li class="mb-2 text-foreground">$1</li>')
      .replace(/^\d+\. (.*$)/gm, '<li class="mb-2 text-foreground">$1</li>')
      
      // Enhanced paragraphs
      .replace(/\n\n/g, '</p><p class="text-foreground leading-relaxed mb-4">')
      .replace(/^(?!<[h|l|p|d])/gm, '<p class="text-foreground leading-relaxed mb-4">')
      
      // Enhanced tables with theme-aware styling
      .replace(/\|(.*?)\|/g, (match, content) => {
        const cells = content.split('|').map(cell => cell.trim());
        return `<tr class="border-b border-border">${cells.map(cell => `<td class="px-4 py-3 text-foreground">${cell}</td>`).join('')}</tr>`;
      });
  };

  return (
    <div className="w-full">
      <div className={`report-header bg-gradient-to-r ${getTypeGradient()} rounded-t-lg`}>
        <div className="flex items-center space-x-4 p-6">
          <div className="p-3 bg-white/20 rounded-lg">
            {getTypeIcon()}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">{title}</h1>
            <p className="text-white/80 mt-1">Enhanced AI Analysis with Color-Coded Insights</p>
          </div>
        </div>
      </div>
      
      <div className="report-content bg-background rounded-b-lg">
        {formatContent(content)}
      </div>
    </div>
  );
};

export default EnhancedReportRenderer;
