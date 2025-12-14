import { forwardRef, useId, useState } from 'react';
import { cn } from '../../utils/helpers';
import type { ChangeEvent, TextareaHTMLAttributes } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showCount?: boolean;
  maxLength?: number;
  fullWidth?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      showCount = false,
      maxLength,
      fullWidth = false,
      resize = 'vertical',
      className,
      disabled,
      required,
      id,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [charCount, setCharCount] = useState(
      typeof value === 'string' ? value.length : 0
    );
    const generatedId = useId();
    const textareaId = id ?? generatedId;

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      onChange?.(e);
    };

    const resizeClasses = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize',
    };

    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
        {/* Label */}
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              'text-sm font-medium text-gray-700',
              disabled && 'text-gray-400'
            )}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Textarea field */}
        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          required={required}
          maxLength={maxLength}
          value={value}
          onChange={handleChange}
          className={cn(
            'w-full px-4 py-2.5 text-base text-gray-900 bg-white border rounded-lg transition-all duration-200',
            'placeholder:text-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
            'disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed',
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 hover:border-gray-400',
            resizeClasses[resize],
            className
          )}
          {...props}
        />

        {/* Footer with helper text and character count */}
        <div className="flex items-center justify-between gap-2">
          {/* Helper text or error message */}
          {(helperText || error) && (
            <p
              className={cn(
                'text-sm flex-1',
                error ? 'text-red-500' : 'text-gray-500'
              )}
            >
              {error || helperText}
            </p>
          )}

          {/* Character count */}
          {showCount && (
            <p className="text-sm text-gray-500">
              {charCount}
              {maxLength && `/${maxLength}`}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
