
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Target, TrendingUp, BarChart3, Info, DollarSign, Users,
  CheckCircle, AlertTriangle, Lightbulb, Star, TrendingDown, Shield, Zap
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface SimplifiedReportRendererProps {
  content: string;
  title: string;
  type: 'business-plan' | 'marketing' | 'competitive' | 'technical' | 'financial' | 'ux-design';
}

const SimplifiedReportRenderer: React.FC<SimplifiedReportRendererProps> = ({ content, title, type }) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

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
      case 'business-plan': return 'from-purple-600 via-purple-500 to-pink-500';
      case 'marketing': return 'from-blue-600 via-blue-500 to-cyan-500';
      case 'competitive': return 'from-green-600 via-green-500 to-emerald-500';
      case 'technical': return 'from-orange-600 via-orange-500 to-red-500';
      case 'financial': return 'from-pink-600 via-pink-500 to-rose-500';
      case 'ux-design': return 'from-indigo-600 via-indigo-500 to-purple-500';
      default: return 'from-gray-600 via-gray-500 to-gray-400';
    }
  };

  const getTypeAccentColor = () => {
    switch (type) {
      case 'business-plan': return isDark ? 'text-purple-400' : 'text-purple-600';
      case 'marketing': return isDark ? 'text-blue-400' : 'text-blue-600';
      case 'competitive': return isDark ? 'text-green-400' : 'text-green-600';
      case 'technical': return isDark ? 'text-orange-400' : 'text-orange-600';
      case 'financial': return isDark ? 'text-pink-400' : 'text-pink-600';
      case 'ux-design': return isDark ? 'text-indigo-400' : 'text-indigo-600';
      default: return isDark ? 'text-gray-400' : 'text-gray-600';
    }
  };

  const getSemanticColor = (semanticType: string) => {
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
    return colors[semanticType as keyof typeof colors] || colors.insight;
  };

  const formatEnhancedMarkdown = (text: string) => {
    return text
      // Enhanced headers with gradient styling
      .replace(/^### (.*$)/gm, `<h3 class="text-2xl font-bold bg-gradient-to-r ${getTypeGradient()} bg-clip-text text-transparent mb-4 mt-8 leading-tight">$1</h3>`)
      .replace(/^## (.*$)/gm, `<h2 class="text-3xl font-bold bg-gradient-to-r ${getTypeGradient()} bg-clip-text text-transparent mb-6 mt-10 leading-tight">$1</h2>`)
      .replace(/^# (.*$)/gm, `<h1 class="text-4xl font-bold bg-gradient-to-r ${getTypeGradient()} bg-clip-text text-transparent mb-8 leading-tight">$1</h1>`)
      
      // Enhanced text formatting with accent colors
      .replace(/\*\*(.*?)\*\*/g, `<strong class="font-bold ${getTypeAccentColor()}">$1</strong>`)
      .replace(/\*(.*?)\*/g, '<em class="italic text-muted-foreground">$1</em>')
      
      // Color-coded semantic markers with enhanced styling
      .replace(/🟢\s*(.*?)(?=\n|$)/g, `<div class="semantic-highlight ${getSemanticColor('opportunity')} border rounded-xl p-5 mb-6 shadow-sm"><div class="flex items-start space-x-4"><div class="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center"><svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M13 7l-3 3-3-3"/></svg></div><div class="flex-1"><strong class="font-semibold">Opportunity:</strong> <span class="ml-2">$1</span></div></div></div>`)
      .replace(/✅\s*(.*?)(?=\n|$)/g, `<div class="semantic-highlight ${getSemanticColor('strength')} border rounded-xl p-5 mb-6 shadow-sm"><div class="flex items-start space-x-4"><div class="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center"><svg class="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg></div><div class="flex-1"><strong class="font-semibold">Strength:</strong> <span class="ml-2">$1</span></div></div></div>`)
      .replace(/🔴\s*(.*?)(?=\n|$)/g, `<div class="semantic-highlight ${getSemanticColor('threat')} border rounded-xl p-5 mb-6 shadow-sm"><div class="flex items-start space-x-4"><div class="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center"><svg class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg></div><div class="flex-1"><strong class="font-semibold">Threat:</strong> <span class="ml-2">$1</span></div></div></div>`)
      .replace(/⚠️\s*(.*?)(?=\n|$)/g, `<div class="semantic-highlight ${getSemanticColor('warning')} border rounded-xl p-5 mb-6 shadow-sm"><div class="flex items-start space-x-4"><div class="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center"><svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg></div><div class="flex-1"><strong class="font-semibold">Warning:</strong> <span class="ml-2">$1</span></div></div></div>`)
      .replace(/🟡\s*(.*?)(?=\n|$)/g, `<div class="semantic-highlight ${getSemanticColor('risk')} border rounded-xl p-5 mb-6 shadow-sm"><div class="flex items-start space-x-4"><div class="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center"><svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/></svg></div><div class="flex-1"><strong class="font-semibold">Risk:</strong> <span class="ml-2">$1</span></div></div></div>`)
      .replace(/🔵\s*(.*?)(?=\n|$)/g, `<div class="semantic-highlight ${getSemanticColor('insight')} border rounded-xl p-5 mb-6 shadow-sm"><div class="flex items-start space-x-4"><div class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center"><svg class="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/></svg></div><div class="flex-1"><strong class="font-semibold">Insight:</strong> <span class="ml-2">$1</span></div></div></div>`)
      .replace(/🟣\s*(.*?)(?=\n|$)/g, `<div class="semantic-highlight ${getSemanticColor('financial')} border rounded-xl p-5 mb-6 shadow-sm"><div class="flex items-start space-x-4"><div class="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center"><svg class="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20"><path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"/></svg></div><div class="flex-1"><strong class="font-semibold">Financial:</strong> <span class="ml-2">$1</span></div></div></div>`)
      .replace(/💡\s*(.*?)(?=\n|$)/g, `<div class="semantic-highlight ${getSemanticColor('recommendation')} border rounded-xl p-5 mb-6 shadow-sm"><div class="flex items-start space-x-4"><div class="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center"><svg class="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg></div><div class="flex-1"><strong class="font-semibold">Recommendation:</strong> <span class="ml-2">$1</span></div></div></div>`)
      
      // Enhanced lists with better styling
      .replace(/^\* (.*$)/gm, '<li class="mb-3 text-foreground leading-relaxed">$1</li>')
      .replace(/^- (.*$)/gm, '<li class="mb-3 text-foreground leading-relaxed">$1</li>')
      .replace(/^\d+\. (.*$)/gm, '<li class="mb-3 text-foreground leading-relaxed">$1</li>')
      
      // Enhanced paragraphs with better spacing
      .replace(/\n\n/g, '</p><p class="text-foreground leading-relaxed mb-6 text-lg">')
      .replace(/^(?!<[h|l|p|d])/gm, '<p class="text-foreground leading-relaxed mb-6 text-lg">')
      
      // Quote blocks for important content
      .replace(/> (.*?)(?=\n|$)/g, `<blockquote class="border-l-4 ${getTypeAccentColor().replace('text-', 'border-')} bg-muted/30 pl-6 py-4 my-6 italic text-lg font-medium">$1</blockquote>`);
  };

  return (
    <div className="w-full">
      {/* Enhanced Header with Dynamic Gradient */}
      <div className={`bg-gradient-to-r ${getTypeGradient()} rounded-t-lg shadow-lg`}>
        <div className="flex items-center space-x-4 p-8">
          <div className="p-4 bg-white/20 rounded-xl backdrop-blur-sm">
            {getTypeIcon()}
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white leading-tight">{title}</h1>
            <p className="text-white/90 mt-2 text-lg">Comprehensive AI Analysis & Strategic Insights</p>
          </div>
        </div>
        {/* Decorative gradient overlay */}
        <div className="h-1 bg-gradient-to-r from-white/20 via-white/40 to-white/20"></div>
      </div>
      
      {/* Enhanced Content with Continuous Flow */}
      <div className="bg-card rounded-b-lg shadow-lg">
        <div className="p-8">
          <div 
            className="simplified-report-content prose max-w-none space-y-6"
            dangerouslySetInnerHTML={{ __html: formatEnhancedMarkdown(content) }}
          />
        </div>
      </div>
    </div>
  );
};

export default SimplifiedReportRenderer;
