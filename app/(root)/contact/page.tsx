'use client'; // Make the component client-side for form handling

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Replace with your email or API endpoint
    const email = 'miracleaudu766@gmail.com'; // Replace with your email address
    const subject = `New Message from ${formData.name}`;
    const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0AMessage: ${formData.message}`;

    // Open default mail client
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 sm:py-10 mt-8" style={{paddingTop: '5rem'}}>
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h2 className="h1-bold">Contact Us</h2>
            <p className="p-regular-20 md:p-regular-24" style={{fontSize: '1rem'}}>
              Have questions or need assistance? Reach out to our team, and we'll be happy to help!
            </p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#contact-form">
                Get in Touch
              </Link>
            </Button>
          </div>
          <Image
            src="/assets/images/contact.png"
            alt="contact"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h3 className="h2-bold">Send Us a Message</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="p-regular-16 border border-gray-300 rounded-lg p-3"
            required
            style={{fontSize: '1rem'}}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="p-regular-16 border border-gray-300 rounded-lg p-3"
            required
            style={{fontSize: '1rem'}}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="p-regular-16 border border-gray-300 rounded-lg p-3"
            rows={5}
            required
            style={{fontSize: '1rem'}}
          />
          <Button type="submit" size="lg" className="button w-full sm:w-fit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Submit'}
          </Button>
        </form>

        {isSubmitted && (
          <p className="p-regular-20 text-green-600" style={{fontSize: '1rem', color: 'green'}}>
            Thank you for your message! We'll get back to you soon.
          </p>
        )}
      </section>

      {/* Contact Information Section */}
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 sm:py-10">
        <div className="wrapper">
          <h3 className="h2-bold" style={{marginBottom: '1rem'}}>Contact Information</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" >
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h5 className="h3-bold">Email</h5>
              <p className="p-regular-16" style={{fontSize: '1rem'}}>
                <a href="mailto:miracleaudu766@.com" className="text-primary-500 hover:underline" >
                miracleaudu766@gmail.com
                </a>
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h5 className="h3-bold">Phone</h5>
              <p className="p-regular-16" style={{fontSize: '1rem'}}>
                <a href="tel:+2349034302771" className="text-primary-500 hover:underline">
                  +234 90 3430 2771 
                </a>
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h5 className="h3-bold">Address</h5>
              <p className="p-regular-16" style={{fontSize: '1rem'}}>
                123 Event Street, Kaduna, Nigeria
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
