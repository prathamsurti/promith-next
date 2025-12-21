'use client'

import React from 'react'
import ImageWithLoading from '@/components/ui/ImageWithLoading'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import './ProcessSection.css'
// Adjust this import path based on your folder structure
import content from '../../data/content.json' 

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemFadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const itemSlideRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const ProcessSection: React.FC = () => {
  return (
    <section className="process-section" id="process">
      <div className="process-container">
        {/* Header */}
        <motion.div
          className="process-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="process-badge">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="badge-icon">
              <path d="M240,56V200a8,8,0,0,1-8,8H8a8,8,0,0,1,0-16H56V152a8,8,0,0,1,8-8h48V104a8,8,0,0,1,8-8h48V56a8,8,0,0,1,8-8h56A8,8,0,0,1,240,56Z"></path>
            </svg>
            <span>{content.process.badge}</span>
          </div>

          <h2 className="process-title">
            <span className="gradient-text">{content.process.title}</span>
          </h2>

          <p className="process-description">
            {content.process.subtitle}
          </p>
        </motion.div>

        {/* Process Cards */}
        <motion.div
          className="process-grid"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {content.process.steps.map((step, index) => (
            <motion.div
              key={index}
              // Apply slide animation only to the 3rd card (index 2), others fade up
              variants={index === 2 ? itemSlideRight : itemFadeUp}
              className="process-card"
            >
              <div className="process-card-content">
                <div className="process-text">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>

                <div className="process-number">
                  <div className="separator-line"></div>
                  <div className="number-wrapper">
                    <span className="number">{step.number}</span>
                    <div className="step-indicators">
                      {/* FIX: Progress logic. If index is 1, dot 0 and 1 are active. */}
                      {[0, 1, 2].map((dotIndex) => (
                         <div 
                           key={dotIndex} 
                           className={`step-dot ${dotIndex <= index ? 'active' : ''}`}
                         />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="process-image relative">
                <ImageWithLoading 
                  src={step.image} 
                  alt={step.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ProcessSection