'use client'
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { AdminProvider } from '@/contexts/AdminContext';

const AdminLayout: React.FC = () => {
  return (
   
      <div className="min-h-screen bg-background">
        <AdminSidebar />
        <main className="ml-64 min-h-screen">
          <Outlet />
        </main>
      </div>
    
  );
};

export default AdminLayout;