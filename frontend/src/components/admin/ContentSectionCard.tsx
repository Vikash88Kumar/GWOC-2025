import React, { useState } from 'react';
import { ContentSection } from '@/types/admin';
import { useAdmin } from '@/contexts/AdminContext';
import EditableField from './EditableField';
import EditableImage from './EditableImage';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash, Plus, Edit3 } from 'lucide-react';

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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<{ title?: string; subtitle?: string; description?: string }>({});

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

      {/* Items list editor (for sections that have items arrays like Projects) */}
      {section.items && (
        <div className="mt-6 space-y-4">
          <label className="text-sm font-medium text-muted-foreground block mb-2">Items</label>
          <div className="space-y-4">
            {section.items.map((item, idx) => (
              <div key={item.id || idx} className="flex gap-4 items-start">
                {/* Only show image editor if the item already has an image field */}
                {item.image !== undefined && (
                  <div className="w-48">
                    <EditableImage
                      src={item.image}
                      alt={item.title}
                      onSave={(src) => {
                        const newItems = section.items!.map((it, i) => i === idx ? { ...it, image: src } : it);
                        updateContentSection(section.id, { items: newItems });
                      }}
                    />
                  </div>
                )}

                <div className="flex-1 space-y-2">
                  {/* For founder sections, provide a single "Edit" button that opens a unified editor for title/subtitle/description */}
                  {(section.page === 'founder' || section.id === 'story-timeline') ? (
                    <FounderItemEditor
                      section={section}
                      item={item}
                      idx={idx}
                      editingIdState={[editingId, setEditingId]}
                      draftState={[draft, setDraft]}
                    />
                  ) : (
                    <>
                      <EditableField
                        label="Title"
                        value={item.title || ''}
                        onSave={(title) => {
                          const newItems = section.items!.map((it, i) => i === idx ? { ...it, title } : it);
                          updateContentSection(section.id, { items: newItems });
                        }}
                      />
                      <EditableField
                        label="Subtitle"
                        value={item.subtitle || ''}
                        onSave={(subtitle) => {
                          const newItems = section.items!.map((it, i) => i === idx ? { ...it, subtitle } : it);
                          updateContentSection(section.id, { items: newItems });
                        }}
                      />

                      {/* Description (multi-line) */}
                      {item.description !== undefined && (
                        <EditableField
                          label="Description"
                          type="textarea"
                          value={item.description || ''}
                          onSave={(description) => {
                            const newItems = section.items!.map((it, i) => i === idx ? { ...it, description } : it);
                            updateContentSection(section.id, { items: newItems });
                          }}
                        />
                      )}

                      {/* List of bullets */}
                      {item.list !== undefined && (
                        <ListEditor
                          section={section}
                          itemIndex={idx}
                          item={item}
                        />
                      )}
                    </>
                  )}

                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      const newItems = section.items!.filter((_, i) => i !== idx);
                      updateContentSection(section.id, { items: newItems });
                    }}
                  >
                    <Trash className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}

            <div>
              <Button
                onClick={() => {
                  // If existing items have an `image` property, include image in new item; otherwise omit it (used for stats)
                  const hasImage = (section.items || []).some(it => it.image !== undefined);
                  const newItem = hasImage
                    ? { id: Date.now().toString(), title: 'New Project', subtitle: '', image: '' }
                    : { id: Date.now().toString(), title: 'New Item', subtitle: '' };
                  updateContentSection(section.id, { items: [...(section.items || []), newItem] });
                }}
              >
                <Plus className="w-4 h-4 mr-2" /> Add Item
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


// Inline ListEditor component to provide single-textarea list editing per-item
function ListEditor({ section, itemIndex, item }: { section: ContentSection; itemIndex: number; item: any }) {
  const { updateContentSection } = useAdmin();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [listText, setListText] = useState('');

  const startEdit = () => {
    setEditingId(item.id || itemIndex.toString());
    setListText((item.list || []).join('\n'));
  };

  const save = () => {
    const newList = listText
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);
    const newItems = section.items!.map((it, i) => (i === itemIndex ? { ...it, list: newList } : it));
    updateContentSection(section.id, { items: newItems });
    setEditingId(null);
  };

  const cancel = () => {
    setEditingId(null);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground block">List Items</label>
      {editingId === (item.id || itemIndex.toString()) ? (
        <div className="space-y-2">
          <textarea
            className="w-full rounded-md border p-3 font-sans text-sm"
            rows={6}
            value={listText}
            onChange={(e) => setListText(e.target.value)}
          />
          <div className="flex gap-2">
            <Button onClick={save}>Save</Button>
            <Button variant="outline" onClick={cancel}>Cancel</Button>
          </div>
        </div>
      ) : (
        <div>
          <ul className="list-disc ml-6 space-y-1">
            {(item.list || []).map((li: string, i: number) => (
              <li key={i} className="text-sm text-muted-foreground">{li}</li>
            ))}
          </ul>
          <div className="mt-2">
            <Button onClick={startEdit}>Edit List</Button>
          </div>
        </div>
      )}
    </div>
  );
}


// FounderItemEditor: unified per-item editor for founder sections
function FounderItemEditor({ section, item, idx, editingIdState, draftState }:{ section: ContentSection; item:any; idx:number; editingIdState:[string|null, (id:string|null)=>void]; draftState:[{ title?:string; subtitle?:string; description?:string }, (d:any)=>void] }){
  const { updateContentSection } = useAdmin();
  const [editingId, setEditingId] = editingIdState;
  const [draft, setDraft] = draftState;
  const id = item.id || idx.toString();

  const startEdit = () => {
    setDraft({ title: item.title || '', subtitle: item.subtitle || '', description: item.description || '' });
    setEditingId(id);
  };

  const save = () => {
    const newItems = section.items!.map((it, i) => i === idx ? { ...it, title: draft.title, subtitle: draft.subtitle, description: draft.description } : it);
    updateContentSection(section.id, { items: newItems });
    setEditingId(null);
    setDraft({});
  };

  const cancel = () => {
    setEditingId(null);
    setDraft({});
  };

  if (editingId === id) {
    return (
      <div className="space-y-3">
        <label className="text-sm font-medium text-muted-foreground block">Title</label>
        <input className="w-full rounded-md border p-2" value={draft.title || ''} onChange={(e)=>setDraft({...draft, title:e.target.value})} />

        <label className="text-sm font-medium text-muted-foreground block">Subtitle</label>
        <input className="w-full rounded-md border p-2" value={draft.subtitle || ''} onChange={(e)=>setDraft({...draft, subtitle:e.target.value})} />

        <label className="text-sm font-medium text-muted-foreground block">Description</label>
        <textarea className="w-full rounded-md border p-2" rows={4} value={draft.description || ''} onChange={(e)=>setDraft({...draft, description:e.target.value})} />

        <div className="flex gap-2">
          <Button onClick={save}>Save</Button>
          <Button variant="outline" onClick={cancel}>Cancel</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start justify-between">
      <div>
        <div className="font-semibold">{item.title}</div>
        <div className="text-sm text-muted-foreground">{item.subtitle}</div>
        {item.description && <div className="text-sm mt-2">{item.description}</div>}
      </div>
      <div>
        <Button variant="ghost" size="icon" onClick={startEdit} aria-label="Edit item" title="Edit">
          <Edit3 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

export default ContentSectionCard;