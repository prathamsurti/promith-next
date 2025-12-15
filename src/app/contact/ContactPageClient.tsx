'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import './contact.css';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

interface ContactContent {
  badge: string;
  title: string;
  subtitle: string;
  form: {
    fields: {
      name: { label: string; placeholder: string; required: boolean };
      email: { label: string; placeholder: string; required: boolean };
      phone: { label: string; placeholder: string; required: boolean };
      company: { label: string; placeholder: string; required: boolean };
      service: {
        label: string;
        placeholder: string;
        required: boolean;
        options: Array<{ value: string; label: string }>;
      };
      message: { label: string; placeholder: string; required: boolean };
    };
    submitButton: { text: string; loadingText: string };
    successMessage: string;
    errorMessage: string;
  };
  contactInfo: {
    title: string;
    email: { label: string; value: string; href: string };
    phone: { label: string; value: string; href: string };
    address: { label: string; lines: string[] };
  };
  businessHours: {
    title: string;
    schedule: Array<{ days: string; hours: string }>;
  };
  social: {
    title: string;
    links: Array<{ platform: string; url: string }>;
  };
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const slideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function ContactPageClient({
  contactContent,
}: {
  contactContent: ContactContent;
}) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        {/* Header Section */}
        <motion.div
          className="contact-header"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <div className="badge-pill">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              className="badge-icon"
            >
              <path d="M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24ZM84,140a12,12,0,1,1,12-12A12,12,0,0,1,84,140Zm44,0a12,12,0,1,1,12-12A12,12,0,0,1,128,140Zm44,0a12,12,0,1,1,12-12A12,12,0,0,1,172,140Z"></path>
            </svg>
            <span>{contactContent.badge}</span>
          </div>

          <h1 className="contact-title">
            <span className="gradient-text">{contactContent.title}</span>
          </h1>

          <p className="contact-subtitle">{contactContent.subtitle}</p>
        </motion.div>

        <div className="contact-content">
          {/* Contact Form */}
          <motion.div
            className="contact-form-section"
            variants={slideUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-grid">
                {/* Name */}
                <div className="form-field">
                  <label htmlFor="name">
                    {contactContent.form.fields.name.label}
                    {contactContent.form.fields.name.required && ' *'}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required={contactContent.form.fields.name.required}
                    placeholder={contactContent.form.fields.name.placeholder}
                    className="neuro-input"
                  />
                </div>

                {/* Email */}
                <div className="form-field">
                  <label htmlFor="email">
                    {contactContent.form.fields.email.label}
                    {contactContent.form.fields.email.required && ' *'}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required={contactContent.form.fields.email.required}
                    placeholder={contactContent.form.fields.email.placeholder}
                    className="neuro-input"
                  />
                </div>

                {/* Phone */}
                <div className="form-field">
                  <label htmlFor="phone">
                    {contactContent.form.fields.phone.label}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={contactContent.form.fields.phone.placeholder}
                    className="neuro-input"
                  />
                </div>

                {/* Company */}
                <div className="form-field">
                  <label htmlFor="company">
                    {contactContent.form.fields.company.label}
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder={contactContent.form.fields.company.placeholder}
                    className="neuro-input"
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div className="form-field form-field-full">
                <label htmlFor="service">
                  {contactContent.form.fields.service.label}
                  {contactContent.form.fields.service.required && ' *'}
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required={contactContent.form.fields.service.required}
                  className="neuro-select"
                >
                  {contactContent.form.fields.service.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="form-field form-field-full">
                <label htmlFor="message">
                  {contactContent.form.fields.message.label}
                  {contactContent.form.fields.message.required && ' *'}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required={contactContent.form.fields.message.required}
                  rows={6}
                  placeholder={contactContent.form.fields.message.placeholder}
                  className="neuro-textarea"
                />
              </div>

              {/* Submit Button */}
              <div className="form-actions">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit-button"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="spinner" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      {contactContent.form.submitButton.loadingText}
                    </>
                  ) : (
                    <>
                      {contactContent.form.submitButton.text}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 256"
                        className="button-icon"
                      >
                        <path d="M200,64V168a8,8,0,0,1-13.66,5.66L140,127.31,69.66,197.66a8,8,0,0,1-11.32-11.32L128.69,116,82.34,69.66A8,8,0,0,1,88,56H192A8,8,0,0,1,200,64Z"></path>
                      </svg>
                    </>
                  )}
                </button>
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="status-message status-success">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  {contactContent.form.successMessage}
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="status-message status-error">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                  </svg>
                  {contactContent.form.errorMessage}
                </div>
              )}
            </form>
          </motion.div>

          {/* Contact Info Sidebar */}
          <motion.div
            className="contact-info-section"
            variants={slideUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            <div className="info-card">
              <h3 className="info-title">{contactContent.contactInfo.title}</h3>

              <div className="info-item">
                <div className="info-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <div className="info-content">
                  <h4>{contactContent.contactInfo.email.label}</h4>
                  <a href={contactContent.contactInfo.email.href}>
                    {contactContent.contactInfo.email.value}
                  </a>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                </div>
                <div className="info-content">
                  <h4>{contactContent.contactInfo.phone.label}</h4>
                  <a href={contactContent.contactInfo.phone.href}>
                    {contactContent.contactInfo.phone.value}
                  </a>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <div className="info-content">
                  <h4>{contactContent.contactInfo.address.label}</h4>
                  <p>
                    {contactContent.contactInfo.address.lines.map(
                      (line, i) => (
                        <span key={i}>
                          {line}
                          {i <
                            contactContent.contactInfo.address.lines.length -
                              1 && <br />}
                        </span>
                      )
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="info-card">
              <h3 className="info-title">
                {contactContent.businessHours.title}
              </h3>
              <div className="hours-list">
                {contactContent.businessHours.schedule.map((item, index) => (
                  <div key={index} className="hours-item">
                    <span>{item.days}</span>
                    <span>{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="info-card">
              <h3 className="info-title">{contactContent.social.title}</h3>
              <div className="social-links">
                {contactContent.social.links.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={link.platform}
                  >
                    {link.platform === 'linkedin' && (
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    )}
                    {link.platform === 'twitter' && (
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    )}
                    {link.platform === 'github' && (
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
