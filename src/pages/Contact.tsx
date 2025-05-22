// src/components/Contact.tsx
import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import ButtonCustom from '@/components/ui/button-custom';
import { useToast } from '@/hooks/use-toast';
import {
  Instagram,
  Facebook,
  Github,
  Mail,
  Phone,
  Linkedin,
  MapPin,
} from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const sentTime = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Qatar',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    emailjs.send(
      'service_g2ydvsl',
      'template_e3yqpz9',
      {
        from_name: formData.name,
        from_email: formData.email,
        email_subject: formData.subject,
        message_body: formData.message,
        sent_time: sentTime,
      },
      'Iko1bFomXZ2yuTQTf'
    )
      .then(
        () => {
          toast({
            title: 'Message Sent!',
            description: "Thank you for your message. I'll get back to you soon.",
          });
          setFormData({ name: '', email: '', subject: '', message: '' });
          setIsSubmitting(false);
        },
        (error) => {
          console.error('EmailJS error:', error);
          toast({
            title: 'Error Sending Message',
            description: 'Something went wrong—please try again later.',
            variant: 'destructive',
          });
          setIsSubmitting(false);
        }
      );
  };

  return (
    <div>
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Info & Socials */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold">Let's Connect</h2>
              <p className="text-portfolio-muted">
                Have a project or just want to say hi? I'm all ears.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-portfolio-primary/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-portfolio-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Email</h3>
                    <a
                      href="mailto:babro.koy.kari@gmail.com"
                      className="text-portfolio-primary hover:underline"
                    >
                      babro.koy.kari@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-portfolio-primary/20 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-portfolio-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Phone</h3>
                    <a
                      href="tel:+97472128857"
                      className="text-portfolio-primary hover:underline"
                    >
                      +974 72128857
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-portfolio-primary/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-portfolio-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Location</h3>
                    <p className="text-portfolio-muted">Doha, Qatar</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Follow Me</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://www.instagram.com/stagnantwater36/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-portfolio-darker p-3 rounded-full hover:bg-portfolio-primary/20 transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.facebook.com/Zabekri"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-portfolio-darker p-3 rounded-full hover:bg-portfolio-primary/20 transition-colors"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href="https://github.com/bekri?tab=repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-portfolio-darker p-3 rounded-full hover:bg-portfolio-primary/20 transition-colors"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/zakariae-bekri-185372360/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-portfolio-darker p-3 rounded-full hover:bg-portfolio-primary/20 transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-portfolio-darker p-8 rounded-lg border border-portfolio-dark shadow-xl">
              <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-portfolio-dark border border-portfolio-dark/80 rounded-md focus:ring-2 focus:ring-portfolio-primary focus:outline-none"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-portfolio-dark border border-portfolio-dark/80 rounded-md focus:ring-2 focus:ring-portfolio-primary focus:outline-none"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-portfolio-dark border border-portfolio-dark/80 rounded-md focus:ring-2 focus:ring-portfolio-primary focus:outline-none"
                    placeholder="Subject"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 bg-portfolio-dark border border-portfolio-dark/80 rounded-md focus:ring-2 focus:ring-portfolio-primary focus:outline-none resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <ButtonCustom
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </ButtonCustom>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
