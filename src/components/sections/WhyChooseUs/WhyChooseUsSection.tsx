'use client';

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
      className="why-choose-section"
    >
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate={isInView ? 'animate' : 'initial'}
          className="section-header"
        >
          <div className="badge-pill">
            <span>{content.whyChooseUs.badge}</span>
          </div>
          <h2 className="gradient-heading">
            {content.whyChooseUs.title}
          </h2>
          <p className="section-subtitle">
            {content.whyChooseUs.subtitle}
          </p>
        </motion.div>

        {/* Benefits Cards Grid */}
        <div className="benefits-grid">
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
        <div className="marquee-container">
          <motion.div
            initial={tagsVariants.initial}
            animate={isInView ? tagsVariants.animate : tagsVariants.initial}
            transition={tagsVariants.transition}
            className="marquee-content"
          >
            {tags.map((tag, index) => (
              <span
                key={index}
                className="tag-pill"
              >
                <span>⚡</span>
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
