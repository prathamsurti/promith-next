import type { Metadata } from 'next';
import { getContent } from '@/lib/content';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Promith. We\'re here to help transform your business with AI-powered solutions.',
  openGraph: {
    title: 'Contact Us | Promith',
    description: 'Get in touch with Promith. We\'re here to help transform your business.',
  },
};

export default async function ContactPage() {
  const content = await getContent();
  const contactContent = content.contact;

  return <ContactPageClient contactContent={contactContent} />;
}
