
export interface LandingPageTemplate {
  id: string;
  name: string;
  description: string;
  category: 'saas' | 'service' | 'ecommerce' | 'portfolio' | 'corporate' | 'startup';
  complexity: 'simple' | 'moderate' | 'advanced' | 'enterprise';
  features: string[];
  previewImage: string;
  tags: string[];
  config: TemplateConfig;
  component: string;
  version: string;
  popularity: number;
  lastUpdated: string;
  author: string;
  premium: boolean;
}

export interface TemplateConfig {
  customizableFields: CustomizableField[];
  colorScheme: ColorScheme;
  typography: TypographyConfig;
  sections: TemplateSection[];
  layout: LayoutConfig;
  animations: AnimationConfig;
  responsiveness: ResponsivenessConfig;
  integrations: IntegrationConfig[];
}

export interface CustomizableField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'color' | 'image' | 'boolean' | 'select' | 'number' | 'url' | 'rich-text';
  placeholder?: string;
  required: boolean;
  section: string;
  validation?: FieldValidation;
  options?: SelectOption[];
  dependencies?: FieldDependency[];
}

export interface FieldValidation {
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  min?: number;
  max?: number;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface FieldDependency {
  field: string;
  value: any;
  condition: 'equals' | 'not-equals' | 'contains';
}

export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  muted: string;
  border: string;
  success: string;
  warning: string;
  error: string;
}

export interface TypographyConfig {
  fontFamily: {
    heading: string;
    body: string;
    mono: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
  };
  fontWeight: {
    normal: string;
    medium: string;
    semibold: string;
    bold: string;
  };
}

export interface TemplateSection {
  id: string;
  name: string;
  description: string;
  required: boolean;
  customizable: boolean;
  fields: string[];
  variants: SectionVariant[];
  position: number;
  dependencies?: string[];
}

export interface SectionVariant {
  id: string;
  name: string;
  description: string;
  preview: string;
  complexity: 'simple' | 'moderate' | 'advanced';
}

export interface LayoutConfig {
  header: HeaderConfig;
  navigation: NavigationConfig;
  hero: HeroConfig;
  features: boolean;
  testimonials: boolean;
  pricing: boolean;
  footer: FooterConfig;
  sidebar?: SidebarConfig;
}

export interface HeaderConfig {
  enabled: boolean;
  variant: 'minimal' | 'standard' | 'mega' | 'centered';
  sticky: boolean;
  transparent: boolean;
}

export interface NavigationConfig {
  enabled: boolean;
  type: 'horizontal' | 'vertical' | 'mega' | 'mobile-drawer';
  items: NavigationItem[];
}

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

export interface HeroConfig {
  enabled: boolean;
  variant: 'minimal' | 'centered' | 'split' | 'video' | 'animated' | 'gradient';
  backgroundType: 'solid' | 'gradient' | 'image' | 'video' | 'pattern';
  height: 'auto' | 'screen' | 'large' | 'medium';
}

export interface FooterConfig {
  enabled: boolean;
  variant: 'minimal' | 'standard' | 'extended' | 'newsletter';
  columns: number;
}

export interface SidebarConfig {
  enabled: boolean;
  position: 'left' | 'right';
  variant: 'fixed' | 'overlay' | 'push';
}

export interface AnimationConfig {
  enabled: boolean;
  type: 'none' | 'subtle' | 'moderate' | 'rich';
  transitions: TransitionConfig[];
  parallax: boolean;
  scrollAnimations: boolean;
}

export interface TransitionConfig {
  element: string;
  animation: string;
  duration: number;
  delay: number;
  easing: string;
}

export interface ResponsivenessConfig {
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  mobileFirst: boolean;
  adaptiveImages: boolean;
  touchOptimized: boolean;
}

export interface IntegrationConfig {
  id: string;
  name: string;
  type: 'analytics' | 'payments' | 'email' | 'social' | 'chat' | 'forms';
  enabled: boolean;
  config: Record<string, any>;
}

export interface TemplateCustomization {
  templateId: string;
  fields: Record<string, any>;
  colorScheme: ColorScheme;
  typography: TypographyConfig;
  enabledSections: string[];
  sectionVariants: Record<string, string>;
  animations: Partial<AnimationConfig>;
  companyData: CompanyData;
  integrations: Record<string, any>;
}

export interface CompanyData {
  name: string;
  tagline: string;
  description: string;
  industry: string;
  website?: string;
  email?: string;
  phone?: string;
  address?: string;
  socialMedia?: SocialMediaLinks;
  branding?: BrandingAssets;
}

export interface SocialMediaLinks {
  twitter?: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  github?: string;
}

export interface BrandingAssets {
  logo?: string;
  favicon?: string;
  brandColors?: string[];
  fonts?: string[];
}

export interface TemplateCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  templates: string[];
  featured: boolean;
}

export interface TemplateMetrics {
  views: number;
  downloads: number;
  rating: number;
  reviews: number;
  conversionRate?: number;
}
