'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import AdminLayout from '@/components/admin/AdminLayout';
import { Badge } from '@/components/ui/badge';
import { Edit3, MousePointer2 } from 'lucide-react';

export default function ContentEditorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const pages = [
    { key: 'home', label: 'home', href: '/admin/content-editor/home' },
    { key: 'services', label: 'services', href: '/admin/content-editor/services' },
    { key: 'story', label: 'story', href: '/admin/content-editor/story' },
    { key: 'contact', label: 'contact', href: '/admin/content-editor/contact' },
    { key: 'founder', label: 'founder', href: '/admin/content-editor/founder' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <AdminLayout>
      <div className="relative min-h-screen p-6 lg:p-10 max-w-[1600px] mx-auto space-y-8 overflow-hidden">
        <div className="relative z-10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-slate-900 rounded-lg">
                  <Edit3 className="w-5 h-5 text-white" />
                </div>
                <Badge variant="outline" className="text-slate-500 uppercase tracking-tighter border-slate-200">
                  Admin Panel
                </Badge>
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-slate-900">Content Editor</h1>

              <p className="text-muted-foreground text-lg mt-2 flex items-center gap-2">
                <MousePointer2 className="w-4 h-4" /> Use the navbar to navigate pages
              </p>
            </div>
          </div>

          {/* Navbar */}
          <div className="sticky top-0 z-20 pt-2 pb-4 bg-background/80 backdrop-blur-md">
            <div className="bg-slate-100/50 p-1 border border-slate-200 rounded-2xl h-auto flex flex-wrap sm:flex-nowrap">
              {pages.map((p) => {
                const active = isActive(p.href);

                return (
                  <Link
                    key={p.key}
                    href={p.href}
                    className={[
                      'capitalize px-8 py-2.5 rounded-xl font-medium transition-all',
                      active
                        ? 'bg-white shadow-md text-slate-900'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-white/60',
                    ].join(' ')}
                  >
                    {p.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Children (sub-page content) */}
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </AdminLayout>
  );
}
