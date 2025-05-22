
import React from 'react';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import ButtonCustom from '@/components/ui/button-custom';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center max-w-lg animate-fade-in opacity-0">
        <h1 className="text-9xl font-bold text-portfolio-primary mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-8">Page Not Found</h2>
        <p className="text-portfolio-muted mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="flex justify-center">
          <ButtonCustom to="/">Return to Homepage</ButtonCustom>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-portfolio-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-portfolio-secondary/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default NotFound;
