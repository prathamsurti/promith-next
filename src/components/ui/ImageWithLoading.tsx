'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface ImageWithLoadingProps extends ImageProps {
  containerClassName?: string;
}

export default function ImageWithLoading({
  alt,
  className,
  onLoad,
  ...props
}: ImageWithLoadingProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <div 
          className={`absolute inset-0 bg-gray-100 animate-pulse z-0 flex items-center justify-center`}
        >
           {/* Optional: You could add a small spinner or icon here if desired */}
        </div>
      )}
      <Image
        alt={alt}
        className={`${className || ''} transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={(e) => {
          setIsLoading(false);
          if (onLoad) onLoad(e);
        }}
        {...props}
      />
    </>
  );
}
