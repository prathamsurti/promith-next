import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { cardVariants } from '../animations';
import { DefaultBenefitCard, GrowthBenefitCard } from './index';
import type { BenefitCardProps } from '../types';

/**
 * Main BenefitCard component.
 * It acts as a "router" to render the correct layout
 * based on the 'graphic' prop.
 */
export const BenefitCard = ({ title, description, graphic }: BenefitCardProps) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  // Render the standalone 'Growth' card layout
  if (graphic === 'growth') {
    return (
      <motion.div
        ref={cardRef}
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <GrowthBenefitCard title={title} description={description} />
      </motion.div>
    );
  }

  // Render the default 'nested' card layout for 'analytics' and 'sync'
  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <DefaultBenefitCard
        title={title}
        description={description}
        graphic={graphic}
        isInView={isInView}
      />
    </motion.div>
  );
};
