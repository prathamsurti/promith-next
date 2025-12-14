import { forwardRef } from 'react';
import { cn } from '../../utils/helpers';
import type { HTMLAttributes } from 'react';

// Badge variant styles
const badgeVariants = {
  default: 'bg-gray-100 text-gray-800 border-gray-200',
  primary: 'bg-primary/10 text-primary border-primary/20',
  secondary: 'bg-secondary/10 text-secondary border-secondary/20',
  success: 'bg-green-100 text-green-800 border-green-200',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  error: 'bg-red-100 text-red-800 border-red-200',
  info: 'bg-blue-100 text-blue-800 border-blue-200',
};

// Badge size styles
const badgeSizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base',
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof badgeVariants;
  size?: keyof typeof badgeSizes;
  rounded?: boolean;
  withBorder?: boolean;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'default',
      size = 'md',
      rounded = true,
      withBorder = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const variantStyles = badgeVariants[variant];
    const sizeStyles = badgeSizes[size];

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-colors',
          variantStyles,
          sizeStyles,
          rounded ? 'rounded-full' : 'rounded-md',
          withBorder && 'border',
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
