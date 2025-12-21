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
      <div className="benefit-graphic-container">
        {graphic === 'analytics' && <AnalyticsGraphic isInView={isInView} />}
        {graphic === 'sync' && <SyncGraphic />}
      </div>

      {/* Text Container */}
      <div className="benefit-text-container">
        <h3 className="benefit-title">{title}</h3>
        <p className="benefit-description">{description}</p>
      </div>
    </div>
  );
};
