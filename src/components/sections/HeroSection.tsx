'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ButtonLink } from '../ui/Button';
import { fadeIn, slideUp, staggerContainer } from '../../utils/animations';
import type { ButtonProps } from '../../types';
import './HeroSection.css';

export interface HeroSectionProps {
  title: string | ReactNode;
  subtitle: string;
  logoSrc?: string;
  ctaButtons?: ButtonProps[];
  backgroundGradient?: string;
  backgroundImage?: string;
  showParticles?: boolean;
  centered?: boolean;
}

const HeroSection = ({
  title,
  subtitle,
  logoSrc,
  ctaButtons = [],
  backgroundGradient = '',
  backgroundImage,
  centered = true,
}: HeroSectionProps) => {
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
      {/* Background overlay for image */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
      )}

      <motion.div
        className={`hero-section-container ${
          centered ? 'text-center' : ''
        }`}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Logo & Title Container */}
        <motion.div className="hero-title-container" variants={slideUp}>
          {/* Logo without background */}
          {logoSrc && (
            <div className="hero-logo-wrapper">
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

          {/* Title with gradient text */}
          <h1 className="hero-title">
            {typeof title === 'string' ? (
              <span className="hero-title-gradient">{title}</span>
            ) : (
              title
            )}
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p className="hero-subtitle" variants={slideUp}>
          {subtitle}
        </motion.p>

        {/* CTA Buttons */}
        {ctaButtons.length > 0 && (
          <motion.div
            className={`flex flex-col sm:flex-row gap-4 ${
              centered ? 'justify-center' : ''
            }`}
            variants={fadeIn}
          >
            {ctaButtons.map((button, index) => (
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
          src="/2K Animation.mp4"
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
