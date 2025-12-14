// Environment variables (Next.js)
// NOTE: Client-side access requires NEXT_PUBLIC_* variables.
const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL;
const CMS_TOKEN = process.env.NEXT_PUBLIC_CMS_TOKEN;
const PREVIEW_ENABLED = process.env.NEXT_PUBLIC_CMS_PREVIEW_ENABLED === 'true';

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

  if (PREVIEW_ENABLED && typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const isPreview = urlParams.get('preview') === 'true';
    if (isPreview) headers['X-Preview-Mode'] = 'true';
  }

  return headers;
};

const get = async <T = unknown>(pathWithQuery: string): Promise<CmsResponse<T>> => {
  if (!CMS_URL) {
    throw new Error('CMS is not configured (missing NEXT_PUBLIC_CMS_URL)');
  }

  const response = await fetch(`${CMS_URL}${pathWithQuery}`, {
    method: 'GET',
    headers: buildHeaders(),
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