
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Eye,
  Code,
  Edit,
  Zap,
  Brain,
  Smartphone,
  BarChart3,
  Settings,
  Users
} from 'lucide-react';
import { AppCustomization } from '@/types/appTemplate';
import BusinessSpecificPages from './BusinessSpecificPages';

interface AppPreviewProps {
  customization: AppCustomization;
  onEdit: () => void;
}

// Enhanced Navigation Component
const AppNavigation = ({ 
  customization, 
  currentPage, 
  onPageChange 
}: { 
  customization: AppCustomization;
  currentPage: string;
  onPageChange: (page: string) => void;
}) => {
  // Generate navigation based on business model
  const getBusinessNavigation = () => {
    const businessModel = customization.fields.businessModel || '';
    const primaryFeature = customization.fields.primaryFeature || 'Dashboard';
    
    const baseNav = [
      { 
        label: primaryFeature, 
        href: '/', 
        icon: businessModel.includes('inventory') ? 'Package' : 
              businessModel.includes('marketplace') ? 'ShoppingCart' : 
              businessModel.includes('analytics') ? 'BarChart3' : 'Zap'
      },
      { label: 'Analytics', href: '/analytics', icon: 'BarChart3' },
      { label: 'Account', href: '/account', icon: 'User' }
    ];

    return baseNav;
  };

  const navItems = getBusinessNavigation();
  
  return (
    <nav className="bg-white shadow-sm border-b" style={{ borderBottomColor: customization.colorScheme.border }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: customization.colorScheme.primary }}
                >
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-bold" style={{ color: customization.colorScheme.primary }}>
                  {customization.appName}
                </h1>
              </div>
            </div>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              {navItems.map(item => (
                <button
                  key={item.href}
                  onClick={() => onPageChange(item.href)}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors ${
                    currentPage === item.href
                      ? 'border-current'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                  style={{ 
                    color: currentPage === item.href 
                      ? customization.colorScheme.primary 
                      : customization.colorScheme.muted 
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge 
              variant="outline" 
              className="bg-green-50 text-green-700 border-green-200"
            >
              Live Demo
            </Badge>
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const AppPreview = ({ customization, onEdit }: AppPreviewProps) => {
  const [currentPage, setCurrentPage] = useState('/');

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-4">
      {/* Enhanced Preview Controls */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg border shadow-sm">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-gray-900">SaaS App Prototype</h3>
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
            <Brain className="h-3 w-3 mr-1" />
            AI-Generated
          </Badge>
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
            <Eye className="h-3 w-3 mr-1" />
            Interactive
          </Badge>
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
            <Smartphone className="h-3 w-3 mr-1" />
            {customization.fields.businessModel || 'Custom SaaS'}
          </Badge>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Regenerate
          </Button>
          <Button variant="outline">
            <Code className="h-4 w-4 mr-2" />
            View Code
          </Button>
        </div>
      </div>

      {/* App Preview Frame */}
      <div className="border rounded-lg overflow-hidden bg-white shadow-lg">
        {/* Browser Chrome */}
        <div className="bg-gray-100 px-4 py-3 border-b flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
          <div className="flex-1 ml-4">
            <div className="bg-white rounded px-3 py-1 text-sm text-gray-600 font-mono">
              {customization.appName.toLowerCase().replace(/\s+/g, '')}.com{currentPage}
            </div>
          </div>
          <div className="text-xs text-gray-500">
            {customization.fields.businessModel} SaaS
          </div>
        </div>
        
        {/* App Content */}
        <div className="h-[700px] overflow-auto">
          <AppNavigation 
            customization={customization} 
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
          <BusinessSpecificPages 
            customization={customization} 
            currentPage={currentPage} 
          />
        </div>
      </div>

      {/* App Information */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border">
        <h4 className="font-semibold text-gray-900 mb-3">About This SaaS Application</h4>
        <p className="text-gray-700 mb-4">{customization.appDescription}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
          <div>
            <span className="font-medium text-gray-900">Business Model:</span>
            <p className="text-gray-600">{customization.fields.businessModel || 'Custom Platform'}</p>
          </div>
          <div>
            <span className="font-medium text-gray-900">Primary Feature:</span>
            <p className="text-gray-600">{customization.fields.primaryFeature || 'Core Functionality'}</p>
          </div>
          <div>
            <span className="font-medium text-gray-900">Target Users:</span>
            <p className="text-gray-600">{customization.fields.userType || 'Business Users'}</p>
          </div>
          <div>
            <span className="font-medium text-gray-900">Industry:</span>
            <p className="text-gray-600">{customization.companyData.industry}</p>
          </div>
        </div>

        {/* Core Features */}
        {customization.enabledFeatures && customization.enabledFeatures.length > 0 && (
          <div>
            <span className="font-medium text-gray-900 block mb-2">Core Features:</span>
            <div className="flex flex-wrap gap-2">
              {customization.enabledFeatures.slice(0, 6).map((feature, index) => (
                <Badge key={index} variant="secondary" className="bg-white text-gray-700">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppPreview;
