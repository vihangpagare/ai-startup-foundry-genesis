
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, TrendingUp, BarChart3, Code, DollarSign, Users } from 'lucide-react';

interface FallbackReportProps {
  type: 'business-plan' | 'marketing' | 'competitive' | 'technical' | 'financial' | 'ux-design';
  ideaData: any;
}

const FallbackReport: React.FC<FallbackReportProps> = ({ type, ideaData }) => {
  const getTypeIcon = () => {
    switch (type) {
      case 'business-plan': return <FileText className="h-6 w-6" />;
      case 'marketing': return <TrendingUp className="h-6 w-6" />;
      case 'competitive': return <BarChart3 className="h-6 w-6" />;
      case 'technical': return <Code className="h-6 w-6" />;
      case 'financial': return <DollarSign className="h-6 w-6" />;
      case 'ux-design': return <Users className="h-6 w-6" />;
      default: return <FileText className="h-6 w-6" />;
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

  const getFallbackContent = () => {
    const companyName = ideaData?.companyName || 'Your SaaS Startup';
    const idea = ideaData?.idea || 'your innovative idea';

    switch (type) {
      case 'business-plan':
        return `## Executive Summary

${companyName} is positioned to revolutionize the market with ${idea}. Our business model focuses on delivering exceptional value to our target audience while maintaining sustainable growth.

## Market Opportunity

The target market shows significant potential for growth, with increasing demand for innovative solutions in this space.

## Revenue Model

Our revenue strategy includes multiple streams:
- Subscription-based pricing tiers
- Premium feature upgrades
- Enterprise solutions

## Growth Strategy

We plan to scale through:
- Product-led growth
- Strategic partnerships
- Content marketing
- Customer referrals`;

      case 'marketing':
        return `## Marketing Strategy Overview

Our marketing approach for ${companyName} focuses on reaching the right audience with compelling messaging about ${idea}.

## Target Audience

Primary target segments include early adopters and industry professionals who value innovation and efficiency.

## Marketing Channels

Key channels for customer acquisition:
- Digital marketing (SEO, SEM, social media)
- Content marketing and thought leadership
- Partnership marketing
- Direct sales outreach

## Brand Positioning

We position ourselves as the leading solution for customers seeking innovative approaches to their challenges.`;

      case 'competitive':
        return `## Competitive Landscape

The market for ${idea} includes several established players and emerging startups.

## Key Competitors

- Established market leaders with significant market share
- Emerging startups with innovative approaches
- Adjacent solutions that address similar problems

## Competitive Advantages

${companyName} differentiates through:
- Unique value proposition
- Superior user experience
- Innovative technology approach
- Strong customer focus

## Market Positioning

We occupy a unique position in the market by combining innovation with practical solutions.`;

      case 'technical':
        return `## Technical Architecture

${companyName} is built on modern, scalable technology stack designed for performance and reliability.

## Technology Stack

- Frontend: React, TypeScript, Modern UI frameworks
- Backend: Scalable cloud infrastructure
- Database: Optimized data storage solutions
- Security: Enterprise-grade security measures

## Development Approach

- Agile development methodology
- Continuous integration and deployment
- Automated testing and quality assurance
- Scalable cloud infrastructure

## Security & Compliance

Built with security-first principles and industry compliance standards.`;

      case 'financial':
        return `## Financial Projections

${companyName} shows strong potential for sustainable revenue growth and profitability.

## Revenue Projections

Year 1: Focus on product development and early customer acquisition
Year 2: Scaling customer base and revenue growth
Year 3: Market expansion and optimization

## Cost Structure

Primary costs include:
- Technology infrastructure
- Team and talent acquisition
- Marketing and customer acquisition
- Operations and overhead

## Funding Requirements

Initial funding will support product development, team building, and market entry.`;

      case 'ux-design':
        return `## User Experience Design

${companyName} prioritizes user-centered design to deliver exceptional experiences.

## Design Principles

- User-first approach
- Intuitive navigation
- Responsive design
- Accessibility compliance

## User Journey

Optimized user flows from discovery to conversion and retention.

## Interface Design

- Clean, modern interface
- Consistent design system
- Mobile-responsive layouts
- Performance optimization

## Usability Testing

Continuous user feedback and iterative improvements based on real user behavior.`;

      default:
        return 'Report content is being generated...';
    }
  };

  return (
    <div className="w-full">
      <div className={`report-header bg-gradient-to-r ${getTypeGradient()} rounded-t-lg`}>
        <div className="flex items-center space-x-4 p-6">
          <div className="p-3 bg-white/20 rounded-lg">
            {getTypeIcon()}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">
              {type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </h1>
            <p className="text-white/80 mt-1">Fallback Analysis Available</p>
          </div>
        </div>
      </div>
      
      <div className="report-content bg-card rounded-b-lg">
        <div className="mb-6 p-6 bg-card rounded-lg border border-border shadow-sm">
          <div className="mb-4">
            <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">
              Using Fallback Content
            </Badge>
          </div>
          <div className="prose prose-gray max-w-none">
            <div className="whitespace-pre-wrap text-foreground leading-relaxed">
              {getFallbackContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FallbackReport;
