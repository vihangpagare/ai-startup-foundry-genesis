
export interface LandingPageTemplate {
  id: string;
  name: string;
  description: string;
  category: 'saas' | 'service' | 'ecommerce' | 'portfolio' | 'corporate';
  complexity: 'simple' | 'moderate' | 'advanced';
  features: string[];
  previewImage: string;
  tags: string[];
  config: TemplateConfig;
  component: string; // The actual React component code
}

export interface TemplateConfig {
  customizableFields: CustomizableField[];
  colorScheme: ColorScheme;
  sections: TemplateSection[];
  layout: LayoutConfig;
}

export interface CustomizableField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'color' | 'image' | 'boolean';
  placeholder?: string;
  required: boolean;
  section: string;
}

export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface TemplateSection {
  id: string;
  name: string;
  required: boolean;
  customizable: boolean;
  fields: string[];
}

export interface LayoutConfig {
  header: boolean;
  navigation: boolean;
  hero: boolean;
  features: boolean;
  testimonials: boolean;
  pricing: boolean;
  footer: boolean;
}

export interface TemplateCustomization {
  templateId: string;
  fields: Record<string, any>;
  colorScheme: Partial<ColorScheme>;
  enabledSections: string[];
  companyData: {
    name: string;
    tagline: string;
    description: string;
    industry: string;
  };
}
