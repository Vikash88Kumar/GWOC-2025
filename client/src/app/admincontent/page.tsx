'use client'
import React, { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import ContentSectionCard from '@/components/admin/ContentSectionCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminLayout from '@/components/admin/AdminLayout';
import { Badge } from '@/components/ui/badge';
import { Edit3, Layout, MousePointer2 } from 'lucide-react';

const ContentEditor: React.FC = () => {
  const { contentSections } = useAdmin();
  const [activeTab, setActiveTab] = useState('all');

  const pages = ['all', 'home', 'services', 'story', 'contact'];

  const filteredSections = activeTab === 'all'
    ? contentSections
    : contentSections.filter(section => section.page === activeTab);

  return (
    <div className="relative min-h-screen p-6 lg:p-10 max-w-[1600px] mx-auto space-y-8 overflow-hidden">

      {/* Content Layer */}
      <div className="relative z-10 space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-slate-900 rounded-lg">
                <Edit3 className="w-5 h-5 text-white" />
              </div>
              <Badge variant="outline" className="text-slate-500 uppercase tracking-tighter border-slate-200">
                Live Preview Mode
              </Badge>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">Content Editor</h1>
            <p className="text-muted-foreground text-lg mt-2 flex items-center gap-2">
              <MousePointer2 className="w-4 h-4" /> Click on any text or image to edit live
            </p>
          </div>

          <div className="bg-white border rounded-xl px-6 py-3 shadow-sm flex items-center gap-4">
            <div className="text-right border-r pr-4 border-slate-100">
              <span className="text-xs text-muted-foreground block uppercase font-bold">Sections</span>
              <span className="text-xl font-semibold text-slate-900">{filteredSections.length}</span>
            </div>
            <div className="text-right">
              <span className="text-xs text-muted-foreground block uppercase font-bold">Status</span>
              <span className="text-sm font-medium text-emerald-600 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Published
              </span>
            </div>
          </div>
        </div>

        {/* Tabs - Glassmorphism Style */}
        <div className="sticky top-0 z-20 pt-2 pb-4 bg-background/80 backdrop-blur-md">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-slate-100/50 p-1 border border-slate-200 rounded-2xl h-auto flex-wrap sm:flex-nowrap">
              {pages.map(page => (
                <TabsTrigger 
                  key={page} 
                  value={page} 
                  className="capitalize px-8 py-2.5 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-slate-900 text-slate-500 font-medium transition-all"
                >
                  {page}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Content Sections Grid */}
        <div className="grid gap-8">
          {filteredSections.map((section, index) => (
            <div 
              key={section.id}
              className="group relative transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-slate-100 group-hover:bg-slate-900 rounded-full transition-colors" />
              
              <div className="flex items-center gap-2 mb-3 px-2">
                <Layout className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Section: {section.id}
                </span>
                <Badge variant="secondary" className="ml-2 bg-slate-100 text-[10px] uppercase">
                  {section.page}
                </Badge>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm group-hover:shadow-xl group-hover:border-slate-300 transition-all overflow-hidden">
                <ContentSectionCard section={section} />
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredSections.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
            <div className="bg-white p-6 rounded-full shadow-sm mb-4">
              <Layout className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900">No content found</h3>
            <p className="text-muted-foreground max-w-xs mx-auto mt-2">
              We couldn't find any editable sections for the "{activeTab}" page.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <AdminLayout>
      <ContentEditor />
    </AdminLayout>
  );
}