import React from 'react';
import { ContentSection } from '@/types/admin';
import { useAdmin } from '@/contexts/AdminContext';
import EditableField from './EditableField';
import EditableImage from './EditableImage';
import { Badge } from '@/components/ui/badge';

interface ContentSectionCardProps {
  section: ContentSection;
}

const pageColors: Record<string, string> = {
  home: 'bg-primary/10 text-primary',
  services: 'bg-accent/10 text-accent',
  story: 'bg-success/10 text-success',
  contact: 'bg-warning/10 text-warning',
};

const ContentSectionCard: React.FC<ContentSectionCardProps> = ({ section }) => {
  const { updateContentSection } = useAdmin();

  return (
    <div className="admin-card animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <Badge className={pageColors[section.page]}>
          {section.page.charAt(0).toUpperCase() + section.page.slice(1)}
        </Badge>
        <h3 className="font-heading text-lg font-medium">{section.sectionName}</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Image */}
        {section.image !== undefined && (
          <div>
            <label className="text-sm font-medium text-muted-foreground block mb-2">Section Image</label>
            <EditableImage
              src={section.image}
              alt={section.sectionName}
              onSave={(src) => updateContentSection(section.id, { image: src })}
            />
          </div>
        )}

        {/* Text Fields */}
        <div className="space-y-4">
          <EditableField
            label="Title"
            value={section.title}
            onSave={(title) => updateContentSection(section.id, { title })}
            displayClassName="font-heading text-lg font-medium"
          />

          {section.subtitle !== undefined && (
            <EditableField
              label="Subtitle"
              value={section.subtitle || ''}
              onSave={(subtitle) => updateContentSection(section.id, { subtitle })}
              displayClassName="text-sm uppercase tracking-wider text-muted-foreground"
            />
          )}

          {section.description !== undefined && (
            <EditableField
              label="Description"
              value={section.description || ''}
              onSave={(description) => updateContentSection(section.id, { description })}
              type="textarea"
              displayClassName="text-muted-foreground"
            />
          )}

          {section.buttonText !== undefined && (
            <EditableField
              label="Button Text"
              value={section.buttonText || ''}
              onSave={(buttonText) => updateContentSection(section.id, { buttonText })}
              displayClassName="inline-block px-4 py-2 bg-secondary rounded-md text-sm font-medium"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentSectionCard;