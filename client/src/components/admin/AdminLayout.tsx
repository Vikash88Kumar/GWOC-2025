"use client"
import React from 'react';
import AdminSidebar from './AdminSidebar';
// import { AdminProvider } from '@/contexts/AdminContext';

const AdminLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="ml-64 min-h-screen">{children}</main>
    </div>
  );
};

export default AdminLayout;