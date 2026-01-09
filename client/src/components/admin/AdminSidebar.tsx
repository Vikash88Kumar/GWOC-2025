"use client"
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileEdit, 
  MessageSquareQuote, 
  Users, 
  Settings,
  Star
} from 'lucide-react';

const AdminSidebar: React.FC = () => {
  const navItems = [
    { href: '/admindashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admincontent', icon: FileEdit, label: 'Content Editor' },
    { href: '/admintestimonials', icon: MessageSquareQuote, label: 'Testimonials' },
    { href: '/adminclient', icon: Users, label: 'Clients' },
  ];

  const pathname = usePathname() || '/';

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-sidebar-primary rounded-lg flex items-center justify-center">
            <Star className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="font-heading text-lg text-sidebar-foreground font-semibold">Bloom</h1>
            <p className="text-xs text-sidebar-foreground/60">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-link ${isActive ? 'active' : ''}`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <Link
          href="/adminsetting"
          className={`sidebar-link ${pathname === '/adminsetting' ? 'active' : ''}`}
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;