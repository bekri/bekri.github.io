
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Github, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-portfolio-dark py-12 mt-auto">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="text-xl font-bold text-gradient">
              Bekri Zakariae
            </Link>
            <p className="mt-2 text-sm text-portfolio-muted/70">
              Visual Storyteller & 3D Generalist
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center space-y-6 md:space-y-0 md:space-x-12">
            <div>
              <h4 className="font-medium text-sm uppercase tracking-wider mb-3 text-portfolio-primary">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-sm text-portfolio-muted/70 hover:text-portfolio-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-sm text-portfolio-muted/70 hover:text-portfolio-primary transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/portfolio" className="text-sm text-portfolio-muted/70 hover:text-portfolio-primary transition-colors">
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-portfolio-muted/70 hover:text-portfolio-primary transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-sm uppercase tracking-wider mb-3 text-portfolio-primary">
                Connect
              </h4>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/stagnantwater36/" target="_blank" rel="noopener noreferrer" className="text-portfolio-muted/70 hover:text-portfolio-primary transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="https://www.facebook.com/Zabekri" target="_blank" rel="noopener noreferrer" className="text-portfolio-muted/70 hover:text-portfolio-primary transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="https://github.com/bekri?tab=repositories" target="_blank" rel="noopener noreferrer" className="text-portfolio-muted/70 hover:text-portfolio-primary transition-colors">
                  <Github className="h-5 w-5" />
                </a>
                <a href="mailto:babro.koy.kari@gmail.com" className="text-portfolio-muted/70 hover:text-portfolio-primary transition-colors">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-portfolio-darker pt-6 mt-8 text-center md:text-left">
          <p className="text-xs text-portfolio-muted/50">
            © {new Date().getFullYear()} Bekri Zakariae. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
