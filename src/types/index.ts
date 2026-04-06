export interface NavItem {
  label: string;
  href: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  notIncluded?: string[];
  isPopular?: boolean;
  cta: string;
}

export interface UseCase {
  role: string;
  icon: string;
  description: string;
  queries: string[];
  benefits: string[];
}

export interface SecurityFeature {
  category: string;
  icon: string;
  color: string;
  items: string[];
}

export interface Integration {
  name: string;
  description: string;
  logo: string;
}
