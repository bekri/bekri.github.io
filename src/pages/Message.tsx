// src/pages/Message.tsx
import React from "react";
import ContactForm from "@/components/ContactForm";

export default function MessagePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">Send a Message</h1>
      <p className="text-muted-foreground mb-8">
        Use this form to contact employers directly.
      </p>
      <ContactForm />
    </div>
  );
}
