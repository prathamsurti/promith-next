'use client';

import React from 'react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ButtonLink } from '../ui/Button'
import './FeatureGrid.css'
import content from '../../data/content.json'

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const FeatureGrid: React.FC = () => {
  // Convert JSON icon data to React elements for CTA buttons
  const ctaButtons = content.features.ctaButtons.map(button => ({
    ...button,
    variant: button.variant as 'cta' | 'outline' | 'primary' | 'secondary' | 'ghost' | 'link',
    size: button.size as 'sm' | 'md' | 'lg',
    iconPosition: button.iconPosition as 'left' | 'right',
    icon: button.icon ? (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox={button.icon.viewBox} className="w-4 h-4">
        <path d={button.icon.content}></path>
      </svg>
    ) : undefined
  }));

  return (
    <section className="feature-section" id="features">
      <div className="feature-container">
        {/* Header with badge, title, and description */}
        <motion.div
          className="feature-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          <div className="feature-badge">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="badge-icon">
              <path d="M223.68,66.15,135.68,18a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,120,47.65,76,128,32l80.35,44Zm8,99.64V133.83l80-43.78v85.76Z"></path>
            </svg>
            <span>{content.features.badge}</span>
          </div>

          <h2 className="feature-title">
            <span className="gradient-text">{content.features.title}</span>
          </h2>

          <p className="feature-description">
            {content.features.subtitle}
          </p>
        </motion.div>

        {/* Feature Grid Container */}
        <div className="feature-grid-wrapper">
          {/* First Grid: 60% - 40% */}
          <motion.div
            className="feature-grid feature-grid-60-40"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
          >
            {content.features.features.slice(0, 2).map((feature, index) => (
              <motion.div
                key={index}
                variants={item}
                className={`feature-card ${feature.isLarge ? 'feature-card-large' : ''}`}
              >
                {feature.image && (
                  <div className="feature-card-image">
                    <img src={feature.image} alt={feature.title} />
                    <div className="feature-card-overlay"></div>
                  </div>
                )}
                <div className="feature-card-content">
                  {feature.icon && (
                    <div className="feature-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox={feature.icon.viewBox}>
                        <path d={feature.icon.content}></path>
                      </svg>
                    </div>
                  )}
                  <div className="feature-text">
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Second Grid: 40% - 60% */}
          <motion.div
            className="feature-grid feature-grid-40-60"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
          >
            {content.features.features.slice(2, 4).map((feature, index) => (
              <motion.div
                key={index + 2}
                variants={item}
                className={`feature-card ${feature.isLarge ? 'feature-card-large' : ''}`}
              >
                {feature.image && (
                  <div className="feature-card-image">
                    <img src={feature.image} alt={feature.title} />
                    <div className="feature-card-overlay"></div>
                  </div>
                )}
                <div className="feature-card-content">
                  {feature.icon && (
                    <div className="feature-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox={feature.icon.viewBox}>
                        <path d={feature.icon.content}></path>
                      </svg>
                    </div>
                  )}
                  <div className="feature-text">
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA Buttons */}
        <motion.div
          className="feature-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {ctaButtons.map((button, index) => (
            <ButtonLink
              key={index}
              to={button.href}
              variant={button.variant}
              size={button.size}
              className={`cta-button ${button.variant === 'cta' ? 'cta-primary' : 'cta-secondary'}`}
              icon={button.icon}
              iconPosition={button.iconPosition}
            >
              {button.label}
            </ButtonLink>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default FeatureGrid
