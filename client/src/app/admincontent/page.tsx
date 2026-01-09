'use client'
import React, { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import ContentSectionCard from '@/components/admin/ContentSectionCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ContentEditor: React.FC = () => {
  const { contentSections } = useAdmin();
  const [activeTab, setActiveTab] = useState('all');

  const pages = ['all', 'home', 'services', 'story', 'contact'];

  const filteredSections = activeTab === 'all'
    ? contentSections
    : contentSections.filter(section => section.page === activeTab);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-semibold">Content Editor</h1>
        <p className="text-muted-foreground mt-1">Click on any text or image to edit it</p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="bg-muted">
          {pages.map(page => (
            <TabsTrigger key={page} value={page} className="capitalize">
              {page}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Content Sections */}
      <div className="space-y-6">
        {filteredSections.map((section, index) => (
          <div 
            key={section.id}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <ContentSectionCard section={section} />
          </div>
        ))}
      </div>

      {filteredSections.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No content sections found for this page.
        </div>
      )}
    </div>
  );
};

export default ContentEditor;