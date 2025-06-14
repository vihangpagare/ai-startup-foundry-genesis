
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, TrendingUp, AlertCircle, CheckCircle, Info, Lightbulb, Target, DollarSign, Users, Calendar, BarChart3 } from 'lucide-react';

interface ReportRendererProps {
  content: string;
  title: string;
  type: 'business-plan' | 'marketing' | 'competitive' | 'technical' | 'financial' | 'ux-design';
}

const ReportRenderer: React.FC<ReportRendererProps> = ({ content, title, type }) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'business-plan':
        return <Target className="h-6 w-6" />;
      case 'marketing':
        return <TrendingUp className="h-6 w-6" />;
      case 'competitive':
        return <BarChart3 className="h-6 w-6" />;
      case 'technical':
        return <Info className="h-6 w-6" />;
      case 'financial':
        return <DollarSign className="h-6 w-6" />;
      case 'ux-design':
        return <Users className="h-6 w-6" />;
      default:
        return <Info className="h-6 w-6" />;
    }
  };

  const getTypeGradient = () => {
    switch (type) {
      case 'business-plan':
        return 'from-purple-500 to-pink-500';
      case 'marketing':
        return 'from-blue-500 to-cyan-500';
      case 'competitive':
        return 'from-green-500 to-emerald-500';
      case 'technical':
        return 'from-orange-500 to-red-500';
      case 'financial':
        return 'from-pink-500 to-rose-500';
      case 'ux-design':
        return 'from-indigo-500 to-purple-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const formatContent = (content: string) => {
    // Split content into sections based on headers
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
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg hover:from-gray-100 hover:to-gray-200 transition-all duration-200">
                <div className="flex items-center space-x-3">
                  {expandedSections[sectionId] ? (
                    <ChevronDown className="h-5 w-5 text-purple-600" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-purple-600" />
                  )}
                  <h3 className="text-xl font-semibold text-gray-800">{headerText}</h3>
                </div>
                <Badge variant="outline" className="text-purple-600 border-purple-200">
                  {expandedSections[sectionId] ? 'Collapse' : 'Expand'}
                </Badge>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                <div 
                  className="report-typography prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: formatMarkdown(sectionContent) }}
                />
              </div>
            </CollapsibleContent>
          </Collapsible>
        );
      }
      
      return (
        <div key={index} className="mb-6 p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div 
            className="report-typography prose max-w-none"
            dangerouslySetInnerHTML={{ __html: formatMarkdown(section) }}
          />
        </div>
      );
    });
  };

  const formatMarkdown = (text: string) => {
    return text
      // Headers
      .replace(/^### (.*$)/gm, '<h3 class="text-2xl font-semibold text-gray-700 mb-3 mt-6">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-3xl font-semibold text-gray-700 mb-4 mt-8">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 class="text-4xl font-bold text-gray-800 mb-6">$1</h1>')
      
      // Bold and italic
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-800">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      
      // Lists
      .replace(/^\* (.*$)/gm, '<li class="mb-2">$1</li>')
      .replace(/^- (.*$)/gm, '<li class="mb-2">$1</li>')
      .replace(/^\d+\. (.*$)/gm, '<li class="mb-2">$1</li>')
      
      // Paragraphs
      .replace(/\n\n/g, '</p><p class="text-gray-600 leading-relaxed mb-4">')
      .replace(/^(?!<[h|l|p])/gm, '<p class="text-gray-600 leading-relaxed mb-4">')
      
      // Tables (basic)
      .replace(/\|(.*?)\|/g, (match, content) => {
        const cells = content.split('|').map(cell => cell.trim());
        return `<tr>${cells.map(cell => `<td class="px-4 py-2 border-b border-gray-200">${cell}</td>`).join('')}</tr>`;
      })
      
      // Highlight important information
      .replace(/💡 (.*?)(?=\n|$)/g, '<div class="highlight-box"><div class="flex items-start space-x-2"><div class="text-blue-500 mt-1"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div><div>$1</div></div></div>')
      .replace(/⚠️ (.*?)(?=\n|$)/g, '<div class="warning-box"><div class="flex items-start space-x-2"><div class="text-yellow-500 mt-1"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg></div><div>$1</div></div></div>')
      .replace(/✅ (.*?)(?=\n|$)/g, '<div class="success-box"><div class="flex items-start space-x-2"><div class="text-green-500 mt-1"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg></div><div>$1</div></div></div>');
  };

  return (
    <div className="w-full">
      <div className={`report-header bg-gradient-to-r ${getTypeGradient()}`}>
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white/20 rounded-lg">
            {getTypeIcon()}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">{title}</h1>
            <p className="text-white/80 mt-1">AI-Generated Analysis with Market Research</p>
          </div>
        </div>
      </div>
      
      <div className="report-content">
        {formatContent(content)}
      </div>
    </div>
  );
};

export default ReportRenderer;
