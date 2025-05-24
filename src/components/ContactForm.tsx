import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    toEmail: '',       // Employer's email
    fromName: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    emailjs.send(
      'service_nkgbe42',
      'template_imvpmnt',
      {
        to_email: formData.toEmail,     // important: pass the dynamic recipient email
        from_name: formData.fromName,
        message: formData.message,
      },
      'Iko1bFomXZ2yuTQTf'
    ).then(() => {
      alert('Message sent!');
      setFormData({ toEmail: '', fromName: '', message: '' });
    }, (error) => {
      alert('Failed to send message: ' + error.text);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">Employer Email</label>
        <input
          type="email"
          name="toEmail"
          value={formData.toEmail}
          onChange={handleChange}
          required
          placeholder="employer@example.com"
          className="input-class"
        />
      </div>
      <div>
        <label className="block mb-1">Your Name</label>
        <input
          type="text"
          name="fromName"
          value={formData.fromName}
          onChange={handleChange}
          required
          placeholder="Bekri Zakariae"
          className="input-class"
        />
      </div>
      <div>
        <label className="block mb-1">Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="Write your message here"
          className="textarea-class"
        />
      </div>
      <button type="submit" className="btn-class">
        Send Message
      </button>
    </form>
  );
}
