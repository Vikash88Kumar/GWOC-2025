export interface ContentSection {
  id: string;
  page: 'home' | 'services' | 'story' | 'contact';
  sectionName: string;
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  buttonText?: string;
  items?: Array<{ id: string; title?: string; subtitle?: string; image?: string }>;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  clientCompany: string;
  clientImage: string;
  content: string;
  rating: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  status: 'new' | 'in-progress' | 'completed' | 'archived';
  message: string;
  adminResponse?: string;
  createdAt: string;
  updatedAt: string;
}