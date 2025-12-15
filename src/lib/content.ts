import { cache } from 'react';
import contentJson from '@/data/content.json';

// Type definitions for content structure
export type Content = typeof contentJson;

/**
 * Server-side content fetcher with React cache
 * This enables React to deduplicate requests during a single render pass
 * 
 * Content is managed in /src/data/content.json
 * Edit that file to update site content
 */
export const getContent = cache(async (): Promise<Content> => {
  return contentJson;
});

/**
 * Get specific content sections
 */
export const getHeroContent = cache(async () => {
  const content = await getContent();
  return content.hero;
});

export const getFounderNoteContent = cache(async () => {
  const content = await getContent();
  return content.founderNote;
});

export const getTestimonialsContent = cache(async () => {
  const content = await getContent();
  return content.testimonials;
});

export const getFeaturesContent = cache(async () => {
  const content = await getContent();
  return content.features;
});

export const getProcessContent = cache(async () => {
  const content = await getContent();
  return content.process;
});
