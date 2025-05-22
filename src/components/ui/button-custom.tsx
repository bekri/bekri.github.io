
import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
  href?: string;
  to?: string;
}

const ButtonCustom = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant = 'primary', size = 'md', asChild = false, href, to, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all focus:outline-none focus:ring-2 focus:ring-portfolio-primary/20 disabled:opacity-50 disabled:pointer-events-none";
    
    const variantStyles = {
      primary: "bg-portfolio-primary text-white hover:bg-portfolio-primary/90",
      secondary: "bg-portfolio-secondary text-white hover:bg-portfolio-secondary/90",
      ghost: "bg-transparent hover:bg-portfolio-primary/10 text-portfolio-primary",
      outline: "bg-transparent border border-portfolio-primary text-portfolio-primary hover:bg-portfolio-primary/10"
    };
    
    const sizeStyles = {
      sm: "text-xs px-3 py-1.5 rounded",
      md: "text-sm px-4 py-2 rounded-md",
      lg: "text-base px-6 py-3 rounded-lg"
    };
    
    const styles = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className
    );
    
    if (to) {
      return (
        <Link to={to} className={styles}>
          {children}
        </Link>
      );
    }
    
    if (href) {
      return (
        <a href={href} className={styles}>
          {children}
        </a>
      );
    }
    
    return (
      <button 
        className={styles}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

ButtonCustom.displayName = "ButtonCustom";

export default ButtonCustom;
