'use client';

import { motion } from 'framer-motion';
import { pushToDataLayer, GTM_EVENTS } from '@/utils/gtm';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'white';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  trackEvent?: {
    name: string;
    location: string;
  };
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  onClick,
  trackEvent,
  type = 'button',
  disabled = false
}: ButtonProps) => {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
    white: 'bg-white text-blue-600 hover:bg-gray-100',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const handleClick = () => {
    // Track button click in GTM if trackEvent is provided
    if (trackEvent && typeof window !== 'undefined') {
      pushToDataLayer(GTM_EVENTS.BUTTON_CLICK, {
        button_name: trackEvent.name,
        button_location: trackEvent.location,
        button_variant: variant,
      });
    }

    // Call original onClick handler
    if (onClick) {
      onClick();
    }
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={`${variants[variant]} ${sizes[size]} rounded-full font-semibold transition-all duration-300 ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={handleClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

export default Button;