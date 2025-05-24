// src/pages/message.tsx
import React from 'react';
import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import Container from '@/components/Container';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'Send a Message',
  description: 'Send emails to employers directly from here.',
};

export default function MessagePage() {
  return (
    <Container>
      <PageHeader
        title="Send a Message"
        description="Use this form to contact employers directly."
      />
      <div className="grid md:grid-cols-1 gap-8 mt-12">
        <div>
          <ContactForm />
        </div>
      </div>
    </Container>
  );
}
