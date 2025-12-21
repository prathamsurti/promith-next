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
  logoSrc?: string;
  ctaButtons?: ButtonProps[];
  backgroundGradient?: string;
  backgroundImage?: string;
  centered?: boolean;
}

const HeroSection = ({
  title,
  subtitle,
  logoSrc = content.navigation.logo,
  ctaButtons = content.hero.ctaButtons as ButtonProps[],
  backgroundGradient = '',
  backgroundImage,
  centered = true,
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
      className={`relative overflow-hidden ${backgroundGradient}`}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : { backgroundColor: '#f5f5f5' }
      }
    >
      {/* Background overlay */}
      {backgroundImage && (
        <div className="hero-overlay" aria-hidden />
      )}

      {/* Main Content */}
      <motion.div
        className="hero-section-container"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Logo + Title */}
        <motion.div
          className="hero-title-container"
          variants={slideUp}
        >
          {logoSrc && (
            <div className="hero-logo-wrapper">
              {/* Logo commented out as per user's code */}
              {/* <img 
                src={logoSrc} 
                alt="Promith Logo" 
                className="hero-logo-image"
                style={{
                  width: content.hero.logoSize?.width || '80px',
                  height: content.hero.logoSize?.height || '80px'
                }}
              /> */}
            </div>
          )}

          <h1 className="hero-title">
            {typeof title === 'string' ? (
              <span className="hero-title-gradient">
                {title}
              </span>
            ) : (
              title
            )}
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="hero-subtitle"
          variants={slideUp}
        >
          {subtitle}
        </motion.p>

        {/* CTA Buttons */}
        {convertedCtaButtons.length > 0 && (
          <motion.div
            className="flex"
            variants={fadeIn}
          >
            {convertedCtaButtons.map((button, index) => (
              <ButtonLink
                key={index}
                variant={button.variant || 'primary'}
                size={button.size || 'lg'}
                to={button.href}
                icon={button.icon}
                iconPosition={button.iconPosition}
              >
                {button.label}
              </ButtonLink>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Hero Card at Bottom */}
      <div className="hero-card-bottom" />

      {/* Background Video */}
      <div className="hero-video-container">
        <video
          src={content.hero.backgroundVideo}
          loop
          muted
          playsInline
          autoPlay
          className="hero-video"
        />
      </div>
    </section>
  );
};

export default HeroSection;
