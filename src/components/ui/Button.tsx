import { forwardRef } from 'react';
import Link from 'next/link';
import { cn } from '../../utils/helpers';
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import './Button.css';

// Button variant styles
const buttonVariants = {
  primary: 'bg-primary text-white hover:bg-primary/90 active:bg-primary/80',
  secondary: 'bg-secondary text-white hover:bg-secondary/90 active:bg-secondary/80',
  outline: 'border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white',
  ghost: 'text-primary bg-transparent hover:bg-primary/10 active:bg-primary/20',
  link: 'text-primary underline-offset-4 hover:underline bg-transparent p-0',
  cta: '!bg-black text-white framer-cta-button',
};

// Button size styles
const buttonSizes = {
  sm: 'px-3 py-1.5',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 h-[46.4062px] min-w-[164.875px]',
};

// Base button styles
const baseStyles = 'inline-flex items-center justify-center gap-1.5 rounded-[10px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 font-[Inter,Inter_Placeholder,sans-serif] font-medium text-sm leading-[22.4px]';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
}

export interface ButtonLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  to?: string;
  href?: string;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
}

// Loading spinner component
const LoadingSpinner = () => (
  <svg
    className="animate-spin h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

// Button component
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      icon,
      iconPosition = 'left',
      loading = false,
      fullWidth = false,
      disabled = false,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const variantStyles = buttonVariants[variant];
    const sizeStyles = variant === 'link' ? '' : buttonSizes[size];

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          baseStyles,
          variantStyles,
          sizeStyles,
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {loading && <LoadingSpinner />}
        {!loading && icon && iconPosition === 'left' && icon}
        {children}
        {!loading && icon && iconPosition === 'right' && icon}
      </button>
    );
  }
);

Button.displayName = 'Button';

// ButtonLink component (for navigation)
export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      icon,
      iconPosition = 'left',
      to,
      href,
      fullWidth = false,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const variantStyles = buttonVariants[variant];
    const sizeStyles = variant === 'link' ? '' : buttonSizes[size];

    const classes = cn(
      baseStyles,
      variantStyles,
      sizeStyles,
      fullWidth && 'w-full',
      className
    );

    // Internal link using React Router
    if (to) {
      return (
        <Link href={to} className={classes}>
          {icon && iconPosition === 'left' && icon}
          {children}
          {icon && iconPosition === 'right' && icon}
        </Link>
      );
    }

    // External link or anchor
    return (
      <a ref={ref} href={href} className={classes} {...props}>
        {icon && iconPosition === 'left' && icon}
        {children}
        {icon && iconPosition === 'right' && icon}
      </a>
    );
  }
);

ButtonLink.displayName = 'ButtonLink';

export default Button;
