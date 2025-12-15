export type GraphicType = 'analytics' | 'growth' | 'sync';

export interface Benefit {
  title: string;
  description: string;
  graphic: GraphicType;
}

export interface BenefitCardProps {
  title: string;
  description: string;
  graphic: GraphicType;
}
