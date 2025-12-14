import { motion, useInView } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { springTransition } from '../animations';
import type { BenefitCardProps } from '../types';

/**
 * Standalone card layout for 'growth' graphic
 */
export const GrowthBenefitCard = ({
  title,
  description,
}: Omit<BenefitCardProps, 'graphic'>) => {
  const [isAfterState, setIsAfterState] = useState(false);
  const graphicRef = useRef(null);
  const isInView = useInView(graphicRef, { once: true, amount: 0.5 });

  // Loop animation between BEFORE and AFTER states
  useEffect(() => {
    if (!isInView) return;
    
    // Start the loop after initial delay
    const initialTimer = setTimeout(() => {
      setIsAfterState(true);
    }, 1000);

    // Set up continuous loop
    const loopInterval = setInterval(() => {
      setIsAfterState((prev) => !prev);
    }, 3000); // Toggle every 3 seconds

    return () => {
      clearTimeout(initialTimer);
      clearInterval(loopInterval);
    };
  }, [isInView]);

  return (
    <div className="benefit-card benefit-card-with-padding">
      {/* Graphic Elements */}
      <div ref={graphicRef} className="absolute top-[27px] left-[30px] right-[30px] h-[176px] z-10">
        {/* Vertical "BEFORE" / "AFTER" Label */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -rotate-90">
          <div className="before-after-label">
            <motion.span
              className="absolute text-gray-500"
              animate={{
                y: isAfterState ? '-100%' : '0%',
                opacity: isAfterState ? 0 : 1,
              }}
              transition={springTransition}
            >
              BEFORE
            </motion.span>
            <motion.span
              className="absolute text-gray-500"
              animate={{
                y: isAfterState ? '0%' : '100%',
                opacity: isAfterState ? 1 : 0,
              }}
              transition={springTransition}
            >
              AFTER
            </motion.span>
          </div>
        </div>

        {/* Chart Area */}
        <div className="absolute top-0 bottom-0 left-16 right-4">
          {/* Bars Container */}
          <div className="absolute bottom-0 left-0 right-0 h-3/4 flex justify-between items-end px-2">
            <motion.div
              className="chart-bar"
              initial={{ height: '4rem' }}
              animate={{ height: isAfterState ? '8rem' : '4rem' }}
              transition={springTransition}
            />
            <motion.div
              className="chart-bar"
              initial={{ height: '6rem' }}
              animate={{ height: isAfterState ? '7rem' : '6rem' }}
              transition={springTransition}
            />
            <motion.div
              className="chart-bar"
              initial={{ height: '7rem' }}
              animate={{ height: isAfterState ? '3rem' : '7rem' }}
              transition={springTransition}
            />
            <motion.div
              className="chart-bar"
              initial={{ height: '8rem' }}
              animate={{ height: isAfterState ? '4rem' : '8rem' }}
              transition={springTransition}
            />
          </div>

          {/* Automation Pill - follows Bar 2 height */}
          <motion.div
            className="metric-pill"
            initial={{ bottom: '6.5rem' }}
            animate={{
              bottom: isAfterState ? '7.5rem' : '6.5rem',
            }}
            style={{
              left: '1rem',
            }}
            transition={springTransition}
          >
            <motion.span
              key={isAfterState ? 'auto-after' : 'auto-before'}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {isAfterState ? '80% Automation' : '20% Automation'}
            </motion.span>
          </motion.div>

          {/* Cost Pill - follows Bar 4 height */}
          <motion.div
            className="metric-pill"
            initial={{ bottom: '8.5rem' }}
            animate={{
              bottom: isAfterState ? '4.5rem' : '8.5rem',
            }}
            style={{
              right: '1rem',
            }}
            transition={springTransition}
          >
            <motion.span
              key={isAfterState ? 'cost-after' : 'cost-before'}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {isAfterState ? '10% Cost' : '60% Cost'}
            </motion.span>
          </motion.div>
        </div>
      </div>

      {/* Text Container */}
      <div className="relative z-20 flex flex-col items-center gap-[10px] w-full">
        <h3 className="benefit-title">{title}</h3>
        <p className="benefit-description">{description}</p>
      </div>
    </div>
  );
};
