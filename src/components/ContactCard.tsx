// src/components/ContactCard.tsx
import React from 'react';

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  text: string;
  href?: string;
  isLink?: boolean;
}

const ContactCard: React.FC<ContactCardProps> = ({
  icon,
  title,
  text,
  href,
  isLink = false,
}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-portfolio-primary/20 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="font-medium text-sm">{title}</h3>
        {isLink && href ? (
          <a
            href={href}
            className="text-portfolio-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {text}
          </a>
        ) : (
          <p className="text-portfolio-muted">{text}</p>
        )}
      </div>
    </div>
  );
};

export default ContactCard;
