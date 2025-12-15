import type { Metadata } from 'next';
import { getContent } from '@/lib/content';

/**
 * Generate dynamic metadata for the home page
 */
export async function generateHomeMetadata(): Promise<Metadata> {
  const content = await getContent();
  
  return {
    title: content.hero.title,
    description: content.hero.subtitle,
  };
}

/**
 * Generate metadata for contact page
 */
export const contactMetadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Promith. We\'re here to help transform your business.',
  openGraph: {
    title: 'Contact Us | Promith',
    description: 'Get in touch with Promith. We\'re here to help transform your business.',
  },
};
