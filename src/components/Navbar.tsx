
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

type NavItemProps = {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const NavItem = ({ to, children, className, onClick }: NavItemProps) => (
  <RouterLink
    to={to}
    className={cn(
      "relative px-3 py-2 text-sm font-medium transition-colors hover:text-portfolio-primary",
      "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-portfolio-primary after:transition-all hover:after:w-full",
      className
    )}
    onClick={onClick}
  >
    {children}
  </RouterLink>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-portfolio-background/90 backdrop-blur-md shadow-md" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <RouterLink to="/" className="text-xl md:text-2xl font-bold text-gradient">
            Bekri Zakariae
          </RouterLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/about">About</NavItem>
            <NavItem to="/portfolio">Portfolio</NavItem>
            <NavItem to="/contact">Contact</NavItem>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span
              className={cn(
                "block w-6 h-0.5 bg-portfolio-text rounded transition-all duration-300 -mb-1",
                isMobileMenuOpen && "translate-y-1.5 rotate-45"
              )}
            ></span>
            <span
              className={cn(
                "block w-6 h-0.5 bg-portfolio-text rounded transition-all duration-300 my-1",
                isMobileMenuOpen && "opacity-0"
              )}
            ></span>
            <span
              className={cn(
                "block w-6 h-0.5 bg-portfolio-text rounded transition-all duration-300 -mt-1",
                isMobileMenuOpen && "translate-y-[-5px] -rotate-45"
              )}
            ></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden bg-portfolio-background/95 backdrop-blur-md border-t border-portfolio-dark",
          "absolute w-full left-0 transition-all duration-300 overflow-hidden",
          isMobileMenuOpen ? "max-h-64" : "max-h-0"
        )}
      >
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-col space-y-3 pb-4">
            <NavItem to="/" className="block w-full" onClick={closeMobileMenu}>Home</NavItem>
            <NavItem to="/about" className="block w-full" onClick={closeMobileMenu}>About</NavItem>
            <NavItem to="/portfolio" className="block w-full" onClick={closeMobileMenu}>Portfolio</NavItem>
            <NavItem to="/contact" className="block w-full" onClick={closeMobileMenu}>Contact</NavItem>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
