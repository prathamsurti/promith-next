import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  needleTransition,
  dotAppearanceVariants,
  dotAppearanceLeftTransition,
  dotAppearanceRightTransition,
} from '../animations';

/**
 * Analytics Graphic (Rotating Gauge)
 * Proper animation sequence with state management
 */
export const AnalyticsGraphic = ({ isInView }: { isInView: boolean }) => {
  const [showAllDots, setShowAllDots] = useState(false);
  const [needleRotation, setNeedleRotation] = useState(-68);

  useEffect(() => {
    if (!isInView) return;

    let running = true;

    // Animation cycle: needle rotates VERY FAST → STOPS 2s → dots appear → needle returns VERY FAST → STOPS 2s → repeat
    const animationCycle = async () => {
      while (running) {
        // Phase 1: Initial state - only 1 dot visible (right top), needle at -68°
        setShowAllDots(false);
        setNeedleRotation(-68);

        // REST at left endpoint for 2 seconds
        await new Promise((resolve) => setTimeout(resolve, 2000));
        if (!running) break;

        // Phase 2: Needle rotates VERY FAST from -68° to 68° (0.6 seconds) - only 1 dot visible
        setNeedleRotation(68);

        // Phase 3: Wait for needle to reach 68° (0.6 seconds), THEN show other 2 dots
        await new Promise((resolve) => setTimeout(resolve, 600));
        if (!running) break;

        // Needle STOPS at 68° - show all 3 dots
        setShowAllDots(true);

        // Phase 4: REST at right endpoint with all 3 dots visible for 2 seconds
        await new Promise((resolve) => setTimeout(resolve, 2000));
        if (!running) break;

        // Phase 5: Needle rotates back VERY FAST from 68° to -68° (0.6 seconds)
        setNeedleRotation(-68);

        // Phase 6: Hide the 2 extra dots immediately when needle starts returning
        setShowAllDots(false);

        // Wait for needle to complete return journey (0.6 seconds)
        await new Promise((resolve) => setTimeout(resolve, 600));
        if (!running) break;
      }
    };

    animationCycle();

    return () => {
      running = false;
    };
  }, [isInView]);

  return (
    <div className="relative w-full h-full">
      {/* Main rotating gauge container */}
      <div className="gauge-outer-container absolute w-[176px] h-[176px] left-1/2 top-0">
        <div className="gauge-container">
          {/* Gauge needle */}
          <motion.div
            className="gauge-needle"
            animate={{ rotate: needleRotation }}
            transition={needleTransition}
          >
            {/* Needle base container */}
            <div className="needle-base">
              {/* Inner dot */}
              <div className="needle-dot" />
            </div>
          </motion.div>

          {/* Decorative dot 1 (left top) - appears after needle completes */}
          <motion.div
            variants={dotAppearanceVariants}
            animate={showAllDots ? 'visible' : 'hidden'}
            transition={dotAppearanceLeftTransition}
            className="decorative-dot decorative-dot-animated absolute left-[40px] top-[35px]"
          />

          {/* Decorative dot 2 (right top) - ALWAYS VISIBLE (initial dot) */}
          <div className="decorative-dot absolute right-[50px] top-[25px]" />

          {/* Decorative dot 3 (right bottom) - appears after needle completes */}
          <motion.div
            variants={dotAppearanceVariants}
            animate={showAllDots ? 'visible' : 'hidden'}
            transition={dotAppearanceRightTransition}
            className="decorative-dot decorative-dot-animated absolute right-[34px] bottom-[45px]"
          />
        </div>
      </div>
    </div>
  );
};
