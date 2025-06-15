
import React from 'react';
import { TemplateCustomization } from '@/types/template';

interface MinimalPortfolioTemplateProps {
  customization: TemplateCustomization;
}

const MinimalPortfolioTemplate = ({ customization }: MinimalPortfolioTemplateProps) => {
  const { fields, colorScheme, companyData } = customization;

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.6', backgroundColor: '#ffffff' }}>
      {/* Header */}
      <div style={{ 
        padding: '2rem', 
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            color: '#1f2937',
            margin: '0 0 0.5rem 0'
          }}>
            {companyData.name}
          </h1>
          <p style={{ color: '#6b7280', margin: 0 }}>
            {companyData.tagline}
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <div style={{ 
        padding: '4rem 2rem', 
        backgroundColor: '#f8fafc',
        textAlign: 'center' 
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '3rem', 
            fontWeight: 'bold', 
            marginBottom: '1rem',
            color: colorScheme.primary,
            margin: '0 0 1rem 0'
          }}>
            {fields.heroTitle || 'Creative Solutions'}
          </h2>
          <p style={{ 
            fontSize: '1.25rem', 
            color: '#6b7280',
            marginBottom: '2rem',
            margin: '0 0 2rem 0'
          }}>
            {fields.heroSubtitle || 'Bringing ideas to life through design and innovation'}
          </p>
          <button 
            style={{
              backgroundColor: colorScheme.primary,
              color: 'white',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            {fields.ctaText || 'View Work'}
          </button>
        </div>
      </div>

      {/* Portfolio Grid */}
      <div style={{ padding: '4rem 2rem', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h3 style={{ 
            textAlign: 'center', 
            fontSize: '2rem', 
            marginBottom: '3rem',
            color: '#1f2937',
            margin: '0 0 3rem 0'
          }}>
            Featured Work
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2rem' 
          }}>
            {[1, 2, 3].map((num) => (
              <div 
                key={num}
                style={{
                  aspectRatio: '1',
                  backgroundColor: '#f8fafc',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '1px solid #e5e7eb',
                  padding: '1rem'
                }}
              >
                <div style={{
                  width: '100%',
                  height: '60%',
                  backgroundColor: '#d1d5db',
                  borderRadius: '0.25rem',
                  marginBottom: '1rem',
                  opacity: 0.6
                }}></div>
                <h4 style={{ 
                  fontSize: '1.1rem', 
                  fontWeight: '600',
                  color: '#1f2937',
                  margin: '0 0 0.5rem 0'
                }}>
                  {fields[`feature${num}Title`] || `Project ${num}`}
                </h4>
                <p style={{ 
                  fontSize: '0.9rem',
                  color: '#6b7280',
                  textAlign: 'center',
                  margin: 0
                }}>
                  {fields[`feature${num}Description`] || `Project description ${num}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div style={{ 
        backgroundColor: colorScheme.primary, 
        color: 'white', 
        padding: '3rem 2rem',
        textAlign: 'center' 
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '2rem', marginBottom: '1rem', margin: '0 0 1rem 0', color: 'white' }}>
            Let's Work Together
          </h3>
          <p style={{ marginBottom: '2rem', opacity: 0.9, color: 'white', margin: '0 0 2rem 0' }}>
            {companyData.description}
          </p>
          <button 
            style={{
              backgroundColor: 'white',
              color: colorScheme.primary,
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer'
            }}
          >
            Get In Touch
          </button>
        </div>
      </div>
    </div>
  );
};

export default MinimalPortfolioTemplate;
