
import React from 'react';
import { TemplateCustomization } from '@/types/template';

interface BusinessServiceTemplateProps {
  customization: TemplateCustomization;
}

const BusinessServiceTemplate = ({ customization }: BusinessServiceTemplateProps) => {
  const { fields, colorScheme, companyData } = customization;

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.6', backgroundColor: '#ffffff' }}>
      {/* Navigation */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '1rem 2rem',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            color: colorScheme.primary,
            margin: 0
          }}>
            {companyData.name}
          </h1>
          <button 
            style={{
              backgroundColor: colorScheme.primary,
              color: 'white',
              padding: '0.5rem 1rem',
              fontSize: '0.9rem',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            {fields.ctaText || 'Contact Us'}
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div style={{ 
        padding: '5rem 2rem', 
        backgroundColor: '#f8fafc' 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '3rem',
            alignItems: 'center' 
          }}>
            <div>
              <h2 style={{ 
                fontSize: '3rem', 
                fontWeight: 'bold', 
                marginBottom: '1rem',
                color: '#1f2937',
                margin: '0 0 1rem 0'
              }}>
                {fields.heroTitle || 'Professional Services'}
              </h2>
              <p style={{ 
                fontSize: '1.25rem', 
                color: '#6b7280',
                marginBottom: '2rem',
                margin: '0 0 2rem 0'
              }}>
                {fields.heroSubtitle || companyData.description}
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                  style={{
                    backgroundColor: colorScheme.primary,
                    color: 'white',
                    padding: '1rem 2rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    border: 'none',
                    borderRadius: '0.375rem',
                    cursor: 'pointer'
                  }}
                >
                  {fields.ctaText || 'Get Started'}
                </button>
                <button 
                  style={{
                    backgroundColor: 'transparent',
                    color: colorScheme.primary,
                    padding: '1rem 2rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    border: `2px solid ${colorScheme.primary}`,
                    borderRadius: '0.375rem',
                    cursor: 'pointer'
                  }}
                >
                  Learn More
                </button>
              </div>
            </div>
            <div style={{
              height: '400px',
              backgroundColor: '#d1d5db',
              borderRadius: '1rem',
              opacity: 0.6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6b7280',
              fontSize: '1.2rem',
              fontWeight: '600'
            }}>
              Hero Image
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div style={{ padding: '4rem 2rem', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h3 style={{ 
            textAlign: 'center', 
            fontSize: '2.5rem', 
            marginBottom: '3rem',
            color: '#1f2937',
            margin: '0 0 3rem 0'
          }}>
            Our Services
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '2rem' 
          }}>
            {[1, 2, 3].map((num) => (
              <div 
                key={num}
                style={{
                  padding: '2rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '1rem',
                  textAlign: 'left',
                  backgroundColor: 'white'
                }}
              >
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  backgroundColor: colorScheme.primary,
                  borderRadius: '0.5rem',
                  marginBottom: '1rem'
                }}></div>
                <h4 style={{ 
                  fontSize: '1.5rem', 
                  marginBottom: '1rem',
                  color: '#1f2937',
                  margin: '0 0 1rem 0'
                }}>
                  {fields[`feature${num}Title`] || `Service ${num}`}
                </h4>
                <p style={{ color: '#6b7280', marginBottom: '1.5rem', margin: '0 0 1.5rem 0' }}>
                  {fields[`feature${num}Description`] || `Professional service description ${num}`}
                </p>
                <button 
                  style={{
                    color: colorScheme.primary,
                    backgroundColor: 'transparent',
                    border: 'none',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Learn More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{ 
        backgroundColor: colorScheme.primary, 
        color: 'white', 
        padding: '4rem 2rem',
        textAlign: 'center' 
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '2.5rem', marginBottom: '1rem', margin: '0 0 1rem 0', color: 'white' }}>
            Ready to Get Started?
          </h3>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9, color: 'white', margin: '0 0 2rem 0' }}>
            Contact us today to discuss how we can help your business grow.
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
              cursor: 'pointer'
            }}
          >
            Contact Us Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessServiceTemplate;
