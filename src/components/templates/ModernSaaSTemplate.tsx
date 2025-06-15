
import React from 'react';
import { TemplateCustomization } from '@/types/template';

interface ModernSaaSTemplateProps {
  customization: TemplateCustomization;
}

const ModernSaaSTemplate = ({ customization }: ModernSaaSTemplateProps) => {
  const { fields, colorScheme, companyData } = customization;

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.6' }}>
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
            margin: '0 0 1rem 0'
          }}>
            {fields.heroTitle || companyData.name}
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            marginBottom: '2rem',
            opacity: 0.9 
          }}>
            {fields.heroSubtitle || companyData.tagline}
          </p>
          <button 
            style={{
              backgroundColor: colorScheme.accent,
              color: 'white',
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              fontWeight: '600',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {fields.ctaText || 'Get Started'}
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ padding: '4rem 2rem', backgroundColor: colorScheme.background }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center', 
            fontSize: '2.5rem', 
            marginBottom: '3rem',
            color: colorScheme.text 
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
                  textAlign: 'center'
                }}
              >
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  marginBottom: '1rem',
                  color: colorScheme.primary 
                }}>
                  {fields[`feature${num}Title`] || `Feature ${num}`}
                </h3>
                <p style={{ color: colorScheme.muted }}>
                  {fields[`feature${num}Description`] || `Description for feature ${num}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ 
        backgroundColor: colorScheme.text, 
        color: 'white', 
        padding: '2rem',
        textAlign: 'center' 
      }}>
        <p>&copy; 2024 {companyData.name}. All rights reserved.</p>
      </div>
    </div>
  );
};

export default ModernSaaSTemplate;
