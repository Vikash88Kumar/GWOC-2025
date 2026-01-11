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
  // Home: Hero
  {
    id: 'home-hero',
    page: 'home',
    sectionName: 'Hero Section',
    title: 'Creating strategic, confident and timeless designs with you at the centre.',
    subtitle: 'We ensure your brand feels like home to those it serves.',
    buttonText: "LET'S GET STARTED",
    image: '/front.jpeg',
  },
  // Home: Intro / CTA
  {
    id: 'home-intro',
    page: 'home',
    sectionName: 'Intro',
    title: 'Ready to buy Aceternity Pro?',
    description: 'Unlock premium components, advanced animations, and exclusive templates to build stunning modern interfaces.',
    buttonText: 'View Pricing',
  },
  // Home: Work Heading
  {
    id: 'home-work-heading',
    page: 'home',
    sectionName: 'Work Heading',
    title: 'Glimpse into our work',
    subtitle: 'Portfolio — 2026',
  },
  // Home: Projects (single section with items array)
  {
    id: 'home-projects',
    page: 'home',
    sectionName: 'Projects',
    title: 'Our Projects',
    items: [
      {
        id: 'p1',
        title: 'NANDAN COFFEE',
        subtitle: 'October 2023 - Ongoing',
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1000',
      },
      {
        id: 'p2',
        title: 'PASTEL PATISSERIE',
        subtitle: 'December 2024',
        image: 'https://images.unsplash.com/photo-1551443874-329402506e76?q=80&w=1000',
      },
      {
        id: 'p3',
        title: 'SEEKHO SIKHAO FOUNDATION',
        subtitle: 'September 2023 - Ongoing',
        image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1000',
      },
      {
        id: 'p4',
        title: 'MANA',
        subtitle: 'October 2024',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000',
      },
    ],
  },
  // Testimonials header (kept as editable section)
  {
    id: 'home-testimonials-heading',
    page: 'home',
    sectionName: 'Testimonials Heading',
    title: 'What People Say',
    description: 'Real client feedback from our partners and collaborators.',
  },
  // Stats / Numbers (single section with items)
  {
    id: 'home-stats',
    page: 'home',
    sectionName: 'Stats',
    title: 'Our story in numbers',
    items: [
      { id: 's1', title: '15 +', subtitle: 'Industries Served' },
      { id: 's2', title: '74', subtitle: 'Happy Clients' },
      { id: 's3', title: '3,700+', subtitle: 'Paper Goods Sold' },
      { id: 's4', title: '10,000+', subtitle: 'Online Community' },
    ],
  },
  // Footer CTA
  {
    id: 'home-footer-cta',
    page: 'home',
    sectionName: 'Footer CTA',
    title: 'Ready to elevate your brand?',
    buttonText: 'Contact Us',
  },
  // Extra placeholder (for any additional text/image you want editable under home)
  {
    id: 'home-extra-1',
    page: 'home',
    sectionName: 'Extra',
    title: 'Extra content',
    image: '/placeholder.svg',
  },
  // Fallback existing pages keepers
  {
    id: 'services-hero',
    page: 'services',
    sectionName: 'Services Hero',
    title: 'Our Services',
    description: 'From brand strategy to visual identity, we offer comprehensive branding solutions.',
    image: '/placeholder.svg',
  },
  // Services list (editable collection of service cards)
  {
    id: 'services-list',
    page: 'services',
    sectionName: 'Services',
    title: 'Our Services',
    description: 'We help ambitious brands grow through strategic storytelling, stunning visuals, and high-impact digital experiences.',
    items: [
      {
        id: 'svc-01',
        title: 'Brand Identity',
        description: 'We help you define a clear, cohesive identity — one that reflects your purpose, connects with the right audience, and builds long-term trust.',
        list: [
          'Brand Strategy',
          'Brand Questionnaire',
          'Creative Direction',
          'Logo Suite',
          'Color Palettes',
          'Typography',
          'Brand Guidelines',
        ],
        image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1200',
      },
      {
        id: 'svc-02',
        title: 'Packaging & Marketing',
        description: "Your packaging is your first impression. We make sure it's memorable — combining strategy with bold visuals to turn browsers into buyers.",
        list: [
          'Custom Product Boxes',
          'Stickers and Seals',
          'Butter Paper',
          'Thank You Cards',
          'Product Labels',
          'Business Cards',
          'Brochures',
        ],
        image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=1200',
      },
      {
        id: 'svc-03',
        title: 'Website Design',
        description: 'A well-designed website should do more than just exist — it should convert. We build clean, intuitive, and scalable websites.',
        list: [
          'Visual Design & Moodboard',
          'Sitemap',
          'UI/UX Design',
          'Up to 15 Product Listings',
          'SEO Optimization',
          'Speed Optimization',
          'Mobile Responsive',
        ],
        image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1200',
      },
    ],
  },
  {
    id: 'story-our',
    page: 'story',
    sectionName: 'Our Story',
    title: 'The Bloom Journey',
    description: 'Founded with a passion for authentic brand storytelling, Bloom Branding has grown to serve clients worldwide.',
    image: '/placeholder.svg',
  },
  // Story: Timeline (single editable section)
  {
    id: 'story-timeline',
    page: 'story',
    sectionName: 'Timeline',
    title: 'Our Journey',
    description: 'A timeline of milestones that shaped our growth.',
    items: [
      {
        id: 'm2018',
        title: 'The Beginning',
        subtitle: '2018',
        description: 'Founded with a vision to revolutionize brand storytelling. Started with just 3 passionate creatives.',
      },
      {
        id: 'm2019',
        title: 'First Major Client',
        subtitle: '2019',
        description: 'Landed our first enterprise client, delivering a complete brand transformation that increased their market presence by 200%.',
      },
      {
        id: 'm2020',
        title: 'Team Expansion',
        subtitle: '2020',
        description: 'Grew to 15 team members. Pivoted to remote-first culture, expanding our talent pool globally.',
      },
      {
        id: 'm2021',
        title: 'Going Global',
        subtitle: '2021',
        description: 'Opened virtual offices across 3 continents. Served clients in 12+ countries with localized marketing strategies.',
      },
      {
        id: 'm2023',
        title: 'Innovation Award',
        subtitle: '2023',
        description: "Recognized as 'Most Innovative Marketing Agency' for our AI-powered design solutions.",
      },
      {
        id: 'm2024',
        title: 'New Horizons',
        subtitle: '2024',
        description: 'Launching new service verticals and partnerships. 50+ happy clients and counting.',
      },
    ],
  },
  {
    id: 'contact-header',
    page: 'contact',
    sectionName: 'Contact Header',
    title: 'Get in Touch',
    description: "Ready to transform your brand? We'd love to hear from you.",
  },
];

const initialTestimonials: Testimonial[] = [
  {
    id: 't1',
    clientName: 'Sarah Chen',
    clientRole: 'Product Manager',
    clientCompany: 'TechFlow',
    clientImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop',
    content: "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
    rating: 5,
    status: 'approved',
    createdAt: '2025-06-01',
  },
  {
    id: 't2',
    clientName: 'Michael Rodriguez',
    clientRole: 'CTO',
    clientCompany: 'InnovateSphere',
    clientImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop',
    content: "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
    rating: 5,
    status: 'approved',
    createdAt: '2025-06-05',
  },
  {
    id: 't3',
    clientName: 'Emily Watson',
    clientRole: 'Operations Director',
    clientCompany: 'CloudScale',
    clientImage: 'https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop',
    content: "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
    rating: 5,
    status: 'approved',
    createdAt: '2025-06-10',
  },
  {
    id: 't4',
    clientName: 'James Kim',
    clientRole: 'Engineering Lead',
    clientCompany: 'DataPro',
    clientImage: 'https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop',
    content: "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
    rating: 5,
    status: 'approved',
    createdAt: '2025-06-15',
  },
  {
    id: 't5',
    clientName: 'Lisa Thompson',
    clientRole: 'VP of Technology',
    clientCompany: 'FutureNet',
    clientImage: 'https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop',
    content: "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
    rating: 5,
    status: 'approved',
    createdAt: '2025-06-20',
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