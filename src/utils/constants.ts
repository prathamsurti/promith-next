// Breakpoints
export const BREAKPOINTS = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Colors
export const COLORS = {
  primary: '#8855ff',
  secondary: '#6366f1',
  dark: '#0a0a0a',
  light: '#f5f5f5',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
} as const;

// Transitions
export const TRANSITIONS = {
  fast: 150,
  base: 300,
  slow: 500,
  slower: 700,
} as const;

// Z-Index
export const Z_INDEX = {
  auto: 'auto',
  0: 0,
  10: 10,
  20: 20,
  30: 30,
  40: 40,
  50: 50,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  toast: 1080,
} as const;

// Navigation Links
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/#services' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Contact', href: '/contact' },
] as const;

// Footer Links
export const FOOTER_LINKS = {
  company: [
    { label: 'About', href: '/about' },
    { label: 'Team', href: '/team' },
    { label: 'Careers', href: '/careers' },
  ],
  resources: [
    { label: 'Changelog', href: '/changelog' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
  social: [
    { platform: 'linkedin', url: 'https://linkedin.com/company/promith' },
    { platform: 'instagram', url: 'https://www.instagram.com/promithuk/' },
  ],
} as const;

// Contact Information
export const CONTACT_INFO = {
  email: 'hello@promith.com',
  phone: '+1 (555) 123-4567',
  address: 'San Francisco, CA',
} as const;
