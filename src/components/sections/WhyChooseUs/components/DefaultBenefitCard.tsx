import { AnalyticsGraphic, SyncGraphic } from './index';
import type { BenefitCardProps } from '../types';

/**
 * Default card layout for 'analytics' and 'sync' graphics
 */
export const DefaultBenefitCard = ({
  title,
  description,
  graphic,
  isInView,
}: BenefitCardProps & { isInView: boolean }) => {
  return (
    <div className="benefit-card">
      {/* Graphic Container - Use full width within padding */}
      <div className="absolute top-[27px] left-[30px] right-[30px] h-[176px] z-10">
        {graphic === 'analytics' && <AnalyticsGraphic isInView={isInView} />}
        {graphic === 'sync' && <SyncGraphic />}
      </div>

      {/* Text Container */}
      <div className="relative z-20 flex flex-col items-center gap-[10px] p-[30px] w-full">
        <h3 className="benefit-title">{title}</h3>
        <p className="benefit-description">{description}</p>
      </div>
    </div>
  );
};
