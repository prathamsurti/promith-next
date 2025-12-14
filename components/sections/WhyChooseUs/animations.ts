import type { Transition, Variants } from 'framer-motion';

export const springTransition: Transition = {
	type: 'spring',
	stiffness: 300,
	damping: 30,
	mass: 0.8,
};

export const cardVariants: Variants = {
	hidden: { opacity: 0, y: 16 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
	},
};

export const fadeInUp: Variants = {
	initial: { opacity: 0, y: 20 },
	animate: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
	},
};

export const tagsVariants = {
	initial: { x: 0 },
	animate: { x: '-50%' },
	transition: {
		duration: 20,
		ease: 'linear',
		repeat: Infinity,
	} as const,
};

export const needleTransition: Transition = {
	duration: 0.6,
	ease: [0.16, 1, 0.3, 1],
};

export const dotAppearanceVariants: Variants = {
	hidden: { opacity: 0, scale: 0 },
	visible: { opacity: 1, scale: 1 },
};

export const dotAppearanceLeftTransition: Transition = {
	...springTransition,
	delay: 0.1,
};

export const dotAppearanceRightTransition: Transition = {
	...springTransition,
	delay: 0.2,
};
