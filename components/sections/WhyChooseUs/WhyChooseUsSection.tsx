import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import './styles.css';
import { fadeInUp, tagsVariants } from './animations';
import { BenefitCard } from './components';
import type { Benefit } from './types';
import content from '../../../data/content.json';

// Main Section Component
const WhyChooseUsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const benefits: Benefit[] = content.whyChooseUs.benefits.map(benefit => ({
    title: benefit.title,
    description: benefit.description,
    graphic: benefit.graphic as 'analytics' | 'growth' | 'sync',
  }));

  const tags = [...content.whyChooseUs.tags, ...content.whyChooseUs.tags]; // Duplicate for marquee effect

  return (
    <section
      ref={sectionRef}
      className="why-choose-section relative py-16 sm:py-20 lg:py-24 overflow-hidden"
    >
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate={isInView ? 'animate' : 'initial'}
          className="section-header text-center mb-12 sm:mb-16"
        >
          <div className="badge-pill inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6">
            <span className="text-sm font-medium text-gray-700">{content.whyChooseUs.badge}</span>
          </div>
          <h2 className="gradient-heading mb-6">
            {content.whyChooseUs.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {content.whyChooseUs.subtitle}
          </p>
        </motion.div>

        {/* Benefits Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-items-center">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              title={benefit.title}
              description={benefit.description}
              graphic={benefit.graphic}
            />
          ))}
        </div>

        {/* Bottom tabs/tags - Marquee */}
        <div className="marquee-container" style={{ marginTop: '4rem' }}>
          <motion.div
            initial={tagsVariants.initial}
            animate={isInView ? tagsVariants.animate : tagsVariants.initial}
            transition={tagsVariants.transition}
            className="marquee-content"
          >
            {tags.map((tag, index) => (
              <span
                key={index}
                className="tag-pill px-4 py-2 text-sm font-medium text-gray-700 rounded-full transition-colors cursor-default whitespace-nowrap"
              >
                <span className="mr-2">⚡</span>
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
