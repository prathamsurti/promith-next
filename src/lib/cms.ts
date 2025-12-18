/**
 * CMS Service (Optional - For Future Use)
 * 
 * This service is currently NOT in use. The site uses /src/data/content.json
 * for all content management.
 * 
 * Keep this file if you plan to integrate a headless CMS (Strapi, Contentful, etc.)
 * in the future. Otherwise, you can safely delete this file.
 */

import 'server-only';

// Server-side environment variables (NOT exposed to client)
const CMS_URL = process.env.CMS_URL;
const CMS_TOKEN = process.env.CMS_TOKEN;
const PREVIEW_ENABLED = process.env.CMS_PREVIEW_ENABLED === 'true';

type CmsResponse<T = unknown> = {
  data: T;
};

const buildHeaders = (): HeadersInit => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (CMS_TOKEN) {
    headers.Authorization = `Bearer ${CMS_TOKEN}`;
  }

  // Preview mode can be handled via Next.js preview mode or request headers
  if (PREVIEW_ENABLED) {
    headers['X-Preview-Mode'] = 'true';
  }

  return headers;
};

const get = async <T = unknown>(pathWithQuery: string): Promise<CmsResponse<T>> => {
  if (!CMS_URL) {
    throw new Error('CMS is not configured (missing CMS_URL)');
  }

  const response = await fetch(`${CMS_URL}${pathWithQuery}`, {
    method: 'GET',
    headers: buildHeaders(),
    next: { revalidate: 3600 }, // Cache for 1 hour (ISR)
  });

  if (!response.ok) {
    throw new Error(`CMS request failed: ${response.status} ${response.statusText}`);
  }

  return { data: (await response.json()) as T };
};

// CMS Service - Strapi API wrapper
export const cmsService = {
  // Hero Section
  getHero: () => get('/hero-section'),

  // Benefits (Why Choose Us section)
  getBenefits: () => get('/benefits?sort=order:asc'),

  // Features (Feature Grid section)
  getFeatures: () => get('/features?sort=order:asc'),

  // Process Steps
  getProcessSteps: () => get('/process-steps?sort=stepNumber:asc'),

  // Testimonials
  getTestimonials: () => get('/testimonials?sort=order:asc'),

  // Navigation Links
  getNavLinks: () => get('/navigation-links?sort=order:asc'),

  // Footer Links
  getFooterLinks: () => get('/footer-links?sort=order:asc'),

  // Social Links
  getSocialLinks: () => get('/social-links'),

  // Site Settings (optional - for global config)
  getSiteSettings: () => get('/site-settings'),

  // Generic content fetcher (for dynamic content types)
  getContent: (contentType: string, params?: Record<string, unknown>) => {
    const queryString = params
      ? `?${new URLSearchParams(params as Record<string, string>)}`
      : '';
    return get(`/${contentType}${queryString}`);
  },
};

// Export a small fetch wrapper for advanced usage
export const cmsApi = { get };

// Helper to check if CMS is configured
export const isCmsConfigured = (): boolean => {
  return Boolean(CMS_URL && CMS_TOKEN);
};

// Helper to get CMS status
export const getCmsStatus = () => ({
  url: CMS_URL,
  hasToken: Boolean(CMS_TOKEN),
  previewEnabled: PREVIEW_ENABLED,
  configured: isCmsConfigured(),
});