
export interface AppTemplate {
  id: string;
  name: string;
  description: string;
  category: 'saas-dashboard' | 'ecommerce' | 'service-platform' | 'analytics' | 'portfolio';
  complexity: 'simple' | 'moderate' | 'advanced';
  features: string[];
  previewImage: string;
  tags: string[];
  pages: AppPage[];
  config: AppTemplateConfig;
  version: string;
  popularity: number;
  lastUpdated: string;
  author: string;
  premium: boolean;
}

export interface AppPage {
  id: string;
  name: string;
  route: string;
  description: string;
  components: AppComponent[];
  layout: 'default' | 'sidebar' | 'full-width' | 'centered';
  navigation: NavigationConfig;
}

export interface AppComponent {
  id: string;
  type: 'header' | 'navigation' | 'content' | 'sidebar' | 'footer' | 'modal' | 'form' | 'chart' | 'table' | 'card';
  name: string;
  props: Record<string, any>;
  customizable: boolean;
  required: boolean;
}

export interface AppTemplateConfig {
  customizableFields: AppCustomizableField[];
  colorScheme: ColorScheme;
  typography: TypographyConfig;
  routing: RoutingConfig;
  dataStructure: DataStructure;
  mockData: MockDataConfig;
  features: FeatureConfig[];
}

export interface AppCustomizableField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'color' | 'image' | 'boolean' | 'select' | 'number' | 'url' | 'array';
  placeholder?: string;
  required: boolean;
  page: string;
  component: string;
  validation?: FieldValidation;
  options?: SelectOption[];
}

export interface RoutingConfig {
  pages: RouteConfig[];
  navigation: NavigationItem[];
  defaultRoute: string;
}

export interface RouteConfig {
  path: string;
  name: string;
  component: string;
  protected: boolean;
  exact: boolean;
}

export interface DataStructure {
  entities: DataEntity[];
  relationships: DataRelationship[];
  apiEndpoints: ApiEndpoint[];
}

export interface DataEntity {
  name: string;
  fields: DataField[];
  mockCount: number;
}

export interface DataField {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'date' | 'array' | 'object';
  required: boolean;
  mockStrategy: 'random' | 'realistic' | 'industry-specific';
}

export interface DataRelationship {
  from: string;
  to: string;
  type: 'one-to-one' | 'one-to-many' | 'many-to-many';
}

export interface ApiEndpoint {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  entity: string;
  mockResponse: any;
}

export interface MockDataConfig {
  enabled: boolean;
  realistic: boolean;
  industrySpecific: boolean;
  dataSize: 'small' | 'medium' | 'large';
}

export interface FeatureConfig {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  page: string;
  component: string;
  dependencies: string[];
}

export interface AppCustomization {
  templateId: string;
  fields: Record<string, any>;
  colorScheme: ColorScheme;
  typography: TypographyConfig;
  enabledFeatures: string[];
  mockData: Record<string, any[]>;
  companyData: CompanyData;
  routing: RoutingConfig;
  appName: string;
  appDescription: string;
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

export interface NavigationConfig {
  type: 'tabs' | 'sidebar' | 'header' | 'bottom';
  items: NavigationItem[];
  position: 'top' | 'bottom' | 'left' | 'right';
}

export interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavigationItem[];
}

export interface CompanyData {
  name: string;
  tagline: string;
  description: string;
  industry: string;
  website?: string;
  email?: string;
  phone?: string;
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
