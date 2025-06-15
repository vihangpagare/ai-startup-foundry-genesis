
import React from 'react';
import { TemplateCustomization } from '@/types/template';

interface ModernSaaSTemplateProps {
  customization: TemplateCustomization;
}

const ModernSaaSTemplate = ({ customization }: ModernSaaSTemplateProps) => {
  const { fields, colorScheme, companyData } = customization;

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.6', backgroundColor: '#ffffff' }}>
      {/* Hero Section */}
      <div 
        style={{ 
          background: `linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.secondary})`,
          color: 'white',
          padding: '4rem 2rem',
          textAlign: 'center'
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: 'bold', 
            marginBottom: '1rem',
            margin: '0 0 1rem 0',
            color: 'white'
          }}>
            {fields.heroTitle || companyData.name}
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            marginBottom: '2rem',
            opacity: 0.95,
            color: 'white'
          }}>
            {fields.heroSubtitle || companyData.tagline}
          </p>
          <button 
            style={{
              backgroundColor: 'white',
              color: colorScheme.primary,
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              fontWeight: '600',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {fields.ctaText || 'Get Started'}
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ padding: '4rem 2rem', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center', 
            fontSize: '2.5rem', 
            marginBottom: '3rem',
            color: '#1f2937',
            margin: '0 0 3rem 0'
          }}>
            Features
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem' 
          }}>
            {[1, 2, 3].map((num) => (
              <div 
                key={num}
                style={{
                  padding: '2rem',
                  backgroundColor: 'white',
                  borderRadius: '1rem',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  textAlign: 'center',
                  border: '1px solid #e5e7eb'
                }}
              >
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  marginBottom: '1rem',
                  color: colorScheme.primary,
                  margin: '0 0 1rem 0'
                }}>
                  {fields[`feature${num}Title`] || `Feature ${num}`}
                </h3>
                <p style={{ color: '#6b7280', margin: 0 }}>
                  {fields[`feature${num}Description`] || `Description for feature ${num}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ 
        backgroundColor: '#1f2937', 
        color: 'white', 
        padding: '2rem',
        textAlign: 'center' 
      }}>
        <p style={{ margin: 0 }}>&copy; 2024 {companyData.name}. All rights reserved.</p>
      </div>
    </div>
  );
};

export default ModernSaaSTemplate;
