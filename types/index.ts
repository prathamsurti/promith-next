import type { ReactNode } from 'react';

// Navigation Types
export interface NavLink {
  label: string;
  href: string;
  icon?: ReactNode;
}

export interface SocialLink {
  platform: 'twitter' | 'linkedin' | 'github' | 'instagram';
  url: string;
}

// Button Types
export interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'cta';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  href?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}

// Page Metadata Types
export interface MetaData {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
}

// Form Types
export interface FormFieldProps {
  label?: string;
  error?: string;
  required?: boolean;
  helperText?: string;
}

// Component Types
export interface CardProps {
  variant?: 'default' | 'bordered' | 'elevated' | 'glass';
  className?: string;
  children: ReactNode;
}

export interface BadgeProps {
  label: string;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
}

// Changelog Types
export interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  changes: ChangeItem[];
  tags: string[];
}

export interface ChangeItem {
  type: 'new' | 'improved' | 'fixed' | 'deprecated';
  description: string;
}

// Testimonial Types
export interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating?: number;
}

// Team Member Types
export interface TeamMemberProps {
  name: string;
  role: string;
  avatar: string;
  bio?: string;
  socialLinks?: SocialLink[];
}

// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
}

// Accordion Types
export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpen?: number[];
}
