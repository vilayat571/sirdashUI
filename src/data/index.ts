import { NavItem, PricingPlan, UseCase, SecurityFeature } from '../types';

export const navItems: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Technology', href: '/#technology' },
  { label: 'Use Cases', href: '/#use-cases' },
  { label: 'Book Demo', href: '/#demo' },
  { label: 'Impressum', href: '/impressum' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Career', href: '/career' },
];

export const statsData = [
  { value: '10x', label: 'Faster insights' },
  { value: '0', label: 'SQL required' },
  { value: '3', label: 'DB integrations' },
  { value: '99.9%', label: 'Uptime SLA' },
];

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Starter',
    price: '€50',
    period: '/month per user',
    description: 'For small teams exploring data analysis',
    features: [
      'Up to 5 users',
      '3 database connections',
      '500 queries per user/month',
      'Basic visualization tools',
      'Standard support',
    ],
    notIncluded: ['Cross-database joins'],
    isPopular: false,
    cta: 'Contact Sales',
  },
  {
    name: 'Professional',
    price: '€150',
    period: '/month per user',
    description: 'For growing teams with advanced needs',
    features: [
      'Up to 20 users',
      '10 database connections',
      '1,000 queries per user/month',
      'Advanced visualization tools',
      'Priority support',
      'Cross-database joins',
    ],
    isPopular: true,
    cta: 'Contact Sales',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'Billed annually',
    description: 'For organizations with complex requirements',
    features: [
      'Unlimited users',
      'Unlimited database connections',
      'Unlimited queries',
      'Custom dashboard builder',
      '24/7 dedicated support',
      'On-premises deployment option',
    ],
    isPopular: false,
    cta: 'Contact Sales',
  },
];

export const useCases: UseCase[] = [
  {
    role: 'Product Manager',
    icon: '📈',
    description: 'Track product metrics, analyze feature adoption, and uncover user behavior patterns without waiting for data team support.',
    queries: [
      '"How has feature X adoption changed since our last release across different user segments?"',
      '"Show me the correlation between feature usage and customer retention over the past 6 months."',
      '"What user demographics are driving the most growth in our premium tier?"',
    ],
    benefits: ['Data-driven product decisions', 'Rapid impact analysis', 'No dependency on data teams'],
  },
  {
    role: 'Data Analyst',
    icon: '📊',
    description: 'Exponentially increase productivity with AI assistance for complex queries across multiple databases, advanced visualizations, and shareable reports.',
    queries: [
      '"Join our sales data with customer support tickets to find correlations between issues and churn."',
      '"Create a cohort analysis of customer retention rates by acquisition channel."',
      '"Show a time series of transaction anomalies across our payment systems for the last quarter."',
    ],
    benefits: ['10x faster analysis workflows', 'Cross-database insights', 'Advanced visualization creation'],
  },
  {
    role: 'Data Scientist',
    icon: '🔬',
    description: 'Streamline data preparation and exploration to focus on high-value modeling and machine learning tasks instead of writing complex queries.',
    queries: [
      '"Extract a balanced dataset of customer features for my churn prediction model."',
      '"Find all anomalous transactions based on historical patterns and prepare a training dataset."',
      '"Identify correlations between user behavior metrics and conversion rates across product lines."',
    ],
    benefits: ['Accelerated data preparation', 'Simplified feature engineering', 'Direct database-to-model workflows'],
  },
];

export const securityFeatures: SecurityFeature[] = [
  {
    category: 'Data Protection',
    icon: '🔒',
    color: 'blue',
    items: [
      'End-to-end TLS 1.3 encryption for all data in transit',
      'AES-256 encryption for metadata at rest',
    ],
  },
  {
    category: 'Access Management',
    icon: '🛡️',
    color: 'purple',
    items: [
      'Granular role-based access control (RBAC)',
      'Row and column-level security policies',
    ],
  },
  {
    category: 'Infrastructure',
    icon: '⚙️',
    color: 'green',
    items: [
      'On-prem, private VPC, or air-gapped installation',
      'Isolated tenant environments in Docker networks',
    ],
  },
  {
    category: 'Audit & Compliance',
    icon: '📋',
    color: 'yellow',
    items: [
      'Immutable audit logs for all system activities',
      'SIEM integration for centralized monitoring',
      'In progress',
    ],
  },
  {
    category: 'Security Testing',
    icon: '🔍',
    color: 'red',
    items: [
      'Weekly dependency vulnerability scans',
      'Container image hardening to CIS Benchmarks',
      'Regular third-party penetration testing',
    ],
  },
  {
    category: 'Data Compliance',
    icon: '✅',
    color: 'indigo',
    items: [
      'GDPR-ready data handling policies',
      'HIPAA-compliant infrastructure options',
      'Data residency options for regulatory compliance',
    ],
  },
];

export const technologyFeatures = [
  {
    title: 'Agentic RAG Intelligence',
    description: "Our advanced Retrieval-Augmented Generation (RAG) model doesn't just respond to queries—it actively shapes responses based on your specific domain knowledge and data context.",
    icon: '🧠',
  },
  {
    title: 'Semantic Data Layer',
    description: 'Our built-in semantic layer interprets your table schemas and creates meaningful connections between disparate data sources, enabling cross-table queries and insights.',
    icon: '🔗',
  },
  {
    title: 'Adaptive SQL Generation',
    description: 'Natural language queries are transformed into precise SQL statements optimized for your specific data structures, with automated joins and relationship mapping.',
    icon: '⚡',
  },
  {
    title: 'Interactive Refinement',
    description: 'Our system learns from every interaction, allowing users to refine queries conversationally and improving accuracy over time through continuous feedback loops.',
    icon: '🔄',
  },
];

export const integrations = [
  { name: 'PostgreSQL', description: 'Open-source relational database', emoji: '🐘' },
  { name: 'Microsoft SQL Server', description: 'Enterprise database platform', emoji: '🪟' },
  { name: 'Oracle Database', description: 'Enterprise-grade database system', emoji: '☁️' },
];

export const aboutCards = [
  {
    title: 'Our Vision',
    description: 'Turn every business question into an instant, trustworthy answer—no SQL required.',
    icon: '🎯',
  },
  {
    title: 'Our Mission',
    description: 'Fuse LLM reasoning, a domain-aware semantic layer, and rock-solid governance so companies can unlock the full value of database — securely, conversationally, and at scale.',
    icon: '🧭',
  },
  {
    title: 'Our Values',
    values: ['Clarity', 'Trust', 'Bold Innovation', 'Customer-First Collaboration'],
    icon: '🛡️',
  },
];
