'use client';

import { motion } from 'framer-motion';
import { ButtonLink } from '../ui/Button';
import { fadeIn, slideUp, staggerContainer } from '../../utils/animations';
import type { ButtonProps } from '../../types';
import content from '../../data/content.json';
import './HeroSection.css';

export interface HeroSectionProps {
  title: string | React.ReactNode;
  subtitle: string;
  ctaButtons?: ButtonProps[];
  backgroundImage?: string;
}

const HeroSection = ({
  title,
  subtitle,
  ctaButtons = content.hero.ctaButtons as any,
  backgroundImage,
}: HeroSectionProps) => {
  // Convert JSON icon data to React elements for CTA buttons
  const convertedCtaButtons = ctaButtons.map(button => ({
    ...button,
    variant: button.variant as 'cta' | 'outline' | 'primary' | 'secondary' | 'ghost' | 'link',
    size: button.size as 'sm' | 'md' | 'lg',
    iconPosition: button.iconPosition as 'left' | 'right',
    icon: button.icon && typeof button.icon === 'object' && 'viewBox' in button.icon ? (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox={(button.icon as any).viewBox} className="w-4 h-4">
        <path d={(button.icon as any).content}></path>
      </svg>
    ) : undefined
  }));

  return (
    <section
      className="hero-section"
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      {/* Main Content */}
      <motion.div
        className="hero-section-container"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Centered text content */}
        <div className="hero-text-content">
          {/* Title */}
          <motion.div
            className="hero-title-container"
            variants={slideUp}
          >
            <h1 className="hero-title">{title}</h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="hero-subtitle"
            variants={slideUp}
          >
            {subtitle}
          </motion.p>
        </div>

      </motion.div>
    </section>
  );
};

export default HeroSection;
