
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

  const getSemanticIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <TrendingUp className="w-5 h-5" />;
      case 'strength': return <CheckCircle className="w-5 h-5" />;
      case 'risk': return <AlertTriangle className="w-5 h-5" />;
      case 'threat': return <AlertCircle className="w-5 h-5" />;
      case 'insight': return <Lightbulb className="w-5 h-5" />;
      case 'recommendation': return <Star className="w-5 h-5" />;
      case 'financial': return <DollarSign className="w-5 h-5" />;
      case 'warning': return <Shield className="w-5 h-5" />;
      case 'critical': return <Zap className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
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
      .replace(/🟢\s*(.*?)(?=\n|$)/g, `<div class="semantic-box ${getSemanticColor('opportunity')} border rounded-lg p-4 mb-4"><div class="flex items-start space-x-3">${getSemanticIcon('opportunity')}<div class="flex-1"><strong>Opportunity:</strong> $1</div></div></div>`)
      .replace(/✅\s*(.*?)(?=\n|$)/g, `<div class="semantic-box ${getSemanticColor('strength')} border rounded-lg p-4 mb-4"><div class="flex items-start space-x-3">${getSemanticIcon('strength')}<div class="flex-1"><strong>Strength:</strong> $1</div></div></div>`)
      .replace(/🔴\s*(.*?)(?=\n|$)/g, `<div class="semantic-box ${getSemanticColor('threat')} border rounded-lg p-4 mb-4"><div class="flex items-start space-x-3">${getSemanticIcon('threat')}<div class="flex-1"><strong>Threat:</strong> $1</div></div></div>`)
      .replace(/⚠️\s*(.*?)(?=\n|$)/g, `<div class="semantic-box ${getSemanticColor('warning')} border rounded-lg p-4 mb-4"><div class="flex items-start space-x-3">${getSemanticIcon('warning')}<div class="flex-1"><strong>Warning:</strong> $1</div></div></div>`)
      .replace(/🟡\s*(.*?)(?=\n|$)/g, `<div class="semantic-box ${getSemanticColor('risk')} border rounded-lg p-4 mb-4"><div class="flex items-start space-x-3">${getSemanticIcon('risk')}<div class="flex-1"><strong>Risk:</strong> $1</div></div></div>`)
      .replace(/🔵\s*(.*?)(?=\n|$)/g, `<div class="semantic-box ${getSemanticColor('insight')} border rounded-lg p-4 mb-4"><div class="flex items-start space-x-3">${getSemanticIcon('insight')}<div class="flex-1"><strong>Insight:</strong> $1</div></div></div>`)
      .replace(/🟣\s*(.*?)(?=\n|$)/g, `<div class="semantic-box ${getSemanticColor('financial')} border rounded-lg p-4 mb-4"><div class="flex items-start space-x-3">${getSemanticIcon('financial')}<div class="flex-1"><strong>Financial:</strong> $1</div></div></div>`)
      .replace(/💡\s*(.*?)(?=\n|$)/g, `<div class="semantic-box ${getSemanticColor('recommendation')} border rounded-lg p-4 mb-4"><div class="flex items-start space-x-3">${getSemanticIcon('recommendation')}<div class="flex-1"><strong>Recommendation:</strong> $1</div></div></div>`)
      
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
