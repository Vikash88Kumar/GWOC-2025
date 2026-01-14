"use client";

import React from "react";
import AdminSidebar from "./AdminSidebar";

const AdminLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen bg-muted/30">
      <AdminSidebar />

      {/* If your sidebar is w-64 keep ml-64. If you changed it to w-72 use ml-72 */}
      <main className="ml-64 min-h-screen">
        {/* This container gives breathing space on left & right */}
        <div className="mx-auto max-w-6xl px-6 py-6 md:px-8 md:py-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
