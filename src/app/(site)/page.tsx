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
      {!content.hero.hidden && (
        <HeroSection 
          title={content.hero.title} 
          subtitle={content.hero.subtitle} 
          backgroundImage="/awd.png"
        />
      )}
      {!content.founderNote.hidden && (
        <FounderNote
          quote={content.founderNote.quote}
          founderName={content.founderNote.founderName}
          founderTitle={content.founderNote.founderTitle}
          founderImage={content.founderNote.founderImage}
        />
      )}
      {!content.whyChooseUs.hidden && <WhyChooseUsSection />}
      {!content.features.hidden && <FeatureGrid />}
      {!content.process.hidden && <ProcessSection />}
      {!content.testimonials.hidden && (
        <TestimonialsSection
          title={content.testimonials.title}
          subtitle={content.testimonials.subtitle}
          testimonials={content.testimonials.testimonials}
        />
      )}
    </>
  );
}