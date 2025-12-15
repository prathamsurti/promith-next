import HeroSection from '@/components/sections/HeroSection';
import FeatureGrid from '@/components/sections/FeatureGrid';
import ProcessSection from '@/components/sections/ProcessSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FounderNote from '@/components/sections/FounderNote';
import WhyChooseUsSection from '@/components/sections/WhyChooseUs';
import { getContent } from '@/lib/content';

export default async function Home() {
  const content = await getContent();

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