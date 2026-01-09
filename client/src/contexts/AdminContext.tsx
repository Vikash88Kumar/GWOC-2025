'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ContentSection, Testimonial, Client } from '@/types/admin';

interface AdminContextType {
  contentSections: ContentSection[];
  testimonials: Testimonial[];
  clients: Client[];
  updateContentSection: (id: string, updates: Partial<ContentSection>) => void;
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => void;
  updateTestimonial: (id: string, updates: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
  addClient: (client: Omit<Client, 'id'>) => void;
  updateClient: (id: string, updates: Partial<Client>) => void;
  deleteClient: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const initialContentSections: ContentSection[] = [
  {
    id: '1',
    page: 'home',
    sectionName: 'Hero Section',
    title: 'Creating strategic, confident and timeless designs with you at the centre.',
    subtitle: 'WE ENSURE YOUR BRAND FEELS LIKE HOME TO THOSE IT SERVES.',
    buttonText: "LET'S GET STARTED",
    image: '/placeholder.svg',
  },
  {
    id: '2',
    page: 'home',
    sectionName: 'About Preview',
    title: 'Who We Are',
    description: 'We are a creative branding studio dedicated to helping businesses discover their unique voice and visual identity.',
    image: '/placeholder.svg',
  },
  {
    id: '3',
    page: 'services',
    sectionName: 'Services Hero',
    title: 'Our Services',
    description: 'From brand strategy to visual identity, we offer comprehensive branding solutions.',
    image: '/placeholder.svg',
  },
  {
    id: '4',
    page: 'story',
    sectionName: 'Our Story',
    title: 'The Bloom Journey',
    description: 'Founded with a passion for authentic brand storytelling, Bloom Branding has grown to serve clients worldwide.',
    image: '/placeholder.svg',
  },
  {
    id: '5',
    page: 'contact',
    sectionName: 'Contact Header',
    title: 'Get in Touch',
    description: "Ready to transform your brand? We'd love to hear from you.",
  },
];

const initialTestimonials: Testimonial[] = [
  {
    id: '1',
    clientName: 'Sarah Mitchell',
    clientRole: 'CEO',
    clientCompany: 'Lumina Studios',
    clientImage: '/placeholder.svg',
    content: 'Bloom Branding transformed our entire visual identity. Their attention to detail and understanding of our vision was remarkable.',
    rating: 5,
    status: 'approved',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    clientName: 'James Chen',
    clientRole: 'Founder',
    clientCompany: 'TechFlow',
    clientImage: '/placeholder.svg',
    content: 'Working with the Bloom team was an absolute pleasure. They delivered beyond our expectations.',
    rating: 5,
    status: 'approved',
    createdAt: '2024-02-20',
  },
  {
    id: '3',
    clientName: 'Emma Roberts',
    clientRole: 'Marketing Director',
    clientCompany: 'Green Earth Co',
    clientImage: '/placeholder.svg',
    content: 'The branding package we received was exactly what we needed to stand out in our market.',
    rating: 4,
    status: 'pending',
    createdAt: '2024-03-10',
  },
];

const initialClients: Client[] = [
  {
    id: '1',
    name: 'Michael Thompson',
    email: 'michael@example.com',
    phone: '+1 234 567 890',
    company: 'Artisan Coffee Co.',
    projectType: 'Full Branding',
    status: 'in-progress',
    message: 'Looking for a complete brand overhaul for our specialty coffee brand.',
    adminResponse: 'Thank you for reaching out! We would love to work with you on this project.',
    createdAt: '2024-03-01',
    updatedAt: '2024-03-05',
  },
  {
    id: '2',
    name: 'Lisa Wang',
    email: 'lisa@startup.io',
    phone: '+1 987 654 321',
    company: 'InnovateTech',
    projectType: 'Logo Design',
    status: 'new',
    message: 'Need a modern logo for our AI startup.',
    createdAt: '2024-03-12',
    updatedAt: '2024-03-12',
  },
  {
    id: '3',
    name: 'Robert Garcia',
    email: 'robert@lawfirm.com',
    phone: '+1 555 123 456',
    company: 'Garcia & Associates',
    projectType: 'Brand Strategy',
    status: 'completed',
    message: 'Interested in repositioning our law firm brand.',
    adminResponse: 'Project completed successfully. Thank you for choosing Bloom Branding!',
    createdAt: '2024-01-20',
    updatedAt: '2024-02-28',
  },
];

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [contentSections, setContentSections] = useState<ContentSection[]>(initialContentSections);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [clients, setClients] = useState<Client[]>(initialClients);

  const updateContentSection = (id: string, updates: Partial<ContentSection>) => {
    setContentSections(prev =>
      prev.map(section =>
        section.id === id ? { ...section, ...updates } : section
      )
    );
  };

  const addTestimonial = (testimonial: Omit<Testimonial, 'id'>) => {
    const newTestimonial: Testimonial = {
      ...testimonial,
      id: Date.now().toString(),
    };
    setTestimonials(prev => [...prev, newTestimonial]);
  };

  const updateTestimonial = (id: string, updates: Partial<Testimonial>) => {
    setTestimonials(prev =>
      prev.map(testimonial =>
        testimonial.id === id ? { ...testimonial, ...updates } : testimonial
      )
    );
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(testimonial => testimonial.id !== id));
  };

  const addClient = (client: Omit<Client, 'id'>) => {
    const newClient: Client = {
      ...client,
      id: Date.now().toString(),
    };
    setClients(prev => [...prev, newClient]);
  };

  const updateClient = (id: string, updates: Partial<Client>) => {
    setClients(prev =>
      prev.map(client =>
        client.id === id ? { ...client, ...updates, updatedAt: new Date().toISOString().split('T')[0] } : client
      )
    );
  };

  const deleteClient = (id: string) => {
    setClients(prev => prev.filter(client => client.id !== id));
  };

  return (
    <AdminContext.Provider
      value={{
        contentSections,
        testimonials,
        clients,
        updateContentSection,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        addClient,
        updateClient,
        deleteClient,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};