'use client';

import HeroSection from '@/components/sections/HeroSection';
import FeatureGrid from '@/components/sections/FeatureGrid';
import ProcessSection from '@/components/sections/ProcessSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FounderNote from '@/components/sections/FounderNote';
import WhyChooseUsSection from '@/components/sections/WhyChooseUs'; 
import { useContent } from '@/hooks/useContent';

export default function Home() {
  const { content, loading, error } = useContent();

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-10">Error loading content</div>;
  if (!content) return null;

  return (
    <>
      <HeroSection title={content.hero.title} subtitle={content.hero.subtitle} />
      <FounderNote
        quote={content.founderNote.quote}
        founderName={content.founderNote.founderName}
        founderTitle={content.founderNote.founderTitle}
        founderImage={content.founderNote.founderImage}
      />
      <WhyChooseUsSection />
      <FeatureGrid />
      <ProcessSection />
      <TestimonialsSection
        title={content.testimonials.title}
        subtitle={content.testimonials.subtitle}
        testimonials={content.testimonials.testimonials}
      />
    </>
  );
}