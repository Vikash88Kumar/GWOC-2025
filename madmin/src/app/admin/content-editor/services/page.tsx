'use client'

import React, { useState, useEffect } from 'react';
import { 
  getServicePage, 
  updateServiceHero, 
  updateServicesList, 
  updateServiceCTA 
} from '../../../../services/service.api';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, Plus, Trash2, Edit2, Sparkles, Image as ImageIcon } from 'lucide-react';

export default function ServicesAdminView() {
  const { toast } = useToast();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const refreshData = async () => {
    try {
      const res = await getServicePage();
      // Ensure we have default objects to prevent crashes if DB is empty
      const cleanData = {
          hero: res.data?.hero || {},
          // ✅ FIX: Access 'servicesList' from backend, not 'services'
          servicesList: res.data?.servicesList || [], 
          cta: res.data?.cta || {}
      };
      setData(cleanData);
    } catch (e) {
      toast({ title: "Error loading data", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refreshData(); }, []);

  if (loading || !data) return <div className="flex justify-center p-20"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>;

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20 p-6 bg-slate-50/50">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading">Services Page Editor</h1>
          <p className="text-muted-foreground">Manage your service offerings and page content</p>
        </div>
        <Button variant="outline" onClick={refreshData}>Refresh Data</Button>
      </div>

      {/* ================= HERO SECTION ================= */}
      <section className="relative border border-border rounded-xl p-6 bg-white shadow-sm overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 to-amber-500" />
        <div className="mb-6">
            <Badge variant="outline" className="mb-2">Hero Section</Badge>
            <h2 className="text-xl font-bold">Page Header</h2>
        </div>
        <HeroEditor data={data.hero} onRefresh={refreshData} />
      </section>

      {/* ================= SERVICES LIST ================= */}
      <section className="relative border border-border rounded-xl p-6 bg-white shadow-sm">
        <div className="mb-6 flex justify-between items-center">
            <div>
                <Badge variant="outline" className="mb-2">Offerings</Badge>
                <h2 className="text-xl font-bold">Services List</h2>
            </div>
        </div>
        {/* ✅ FIX: Pass the corrected data.servicesList here */}
        <ServicesListEditor data={data.servicesList} onRefresh={refreshData} />
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="relative border border-border rounded-xl p-6 bg-slate-900 text-white shadow-sm">
        <div className="mb-6">
            <Badge variant="secondary" className="mb-2 bg-white/20 text-white hover:bg-white/30">Footer CTA</Badge>
            <h2 className="text-xl font-bold">Call to Action</h2>
        </div>
        <CtaEditor data={data.cta} onRefresh={refreshData} />
      </section>

    </div>
  );
}

// ------------------------------------------------------------------
// 1. HERO EDITOR (Unchanged)
// ------------------------------------------------------------------
function HeroEditor({ data, onRefresh }: { data: any, onRefresh: () => void }) {
  const { toast } = useToast();
  const [form, setForm] = useState(data || {});
  const [saving, setSaving] = useState(false);

  useEffect(() => { setForm(data || {}) }, [data]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateServiceHero(form);
      toast({ title: "Hero updated successfully" });
      onRefresh();
    } catch (e) { toast({ title: "Failed to save", variant: "destructive" }); }
    finally { setSaving(false); }
  };

  const updateCta = (key: 'primaryCta' | 'secondaryCta', field: string, value: string) => {
      setForm({ ...form, [key]: { ...form[key], [field]: value } });
  }

  return (
    <div className="grid lg:grid-cols-2 gap-10">
        <div className="space-y-4">
            <div className="space-y-2">
                <Label>Tag (Small Pill)</Label>
                <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <Input value={form.tag} onChange={e => setForm({...form, tag: e.target.value})} className="h-8" />
                </div>
            </div>
            
            <div className="space-y-2">
                <Label>Headline</Label>
                <Textarea 
                    value={form.headline} 
                    onChange={e => setForm({...form, headline: e.target.value})} 
                    className="text-3xl font-bold font-serif min-h-[100px]"
                />
            </div>

            <div className="space-y-2">
                <Label>Sub Headline</Label>
                <Textarea 
                    value={form.subHeadline} 
                    onChange={e => setForm({...form, subHeadline: e.target.value})} 
                    className="text-muted-foreground"
                />
            </div>
        </div>

        <div className="space-y-6 bg-slate-50 p-6 rounded-xl border">
            <h3 className="font-semibold text-sm uppercase text-muted-foreground">Action Buttons</h3>
            
            <div className="space-y-3">
                <Label>Primary Button</Label>
                <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="Label" value={form.primaryCta?.text} onChange={e => updateCta('primaryCta', 'text', e.target.value)} />
                    <Input placeholder="Link #" value={form.primaryCta?.link} onChange={e => updateCta('primaryCta', 'link', e.target.value)} />
                </div>
            </div>

            <div className="space-y-3">
                <Label>Secondary Button</Label>
                <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="Label" value={form.secondaryCta?.text} onChange={e => updateCta('secondaryCta', 'text', e.target.value)} />
                    <Input placeholder="Link (e.g. Instagram)" value={form.secondaryCta?.link} onChange={e => updateCta('secondaryCta', 'link', e.target.value)} />
                </div>
            </div>

            <Button onClick={handleSave} disabled={saving} className="w-full">
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save Hero
            </Button>
        </div>
    </div>
  );
}

// ------------------------------------------------------------------
// 2. SERVICES LIST EDITOR
// ------------------------------------------------------------------
function ServicesListEditor({ data, onRefresh }: { data: any[], onRefresh: () => void }) {
  const { toast } = useToast();
  const [servicesList, setServicesList] = useState(data || []);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sync prop changes to local state
  useEffect(() => { setServicesList(data || []) }, [data]);

  // --- Modal Save (Add/Edit Single Item) ---
  const saveSingleItem = () => {
      let newServices = [...servicesList];
      
      if (editingItem._tempId) {
          // Add New
          const newItem = { ...editingItem };
          delete newItem._tempId;
          newServices.push(newItem);
      } else {
          // Edit Existing
          // Map through and replace if ID matches (or fallback to index if UI-only)
          newServices = newServices.map(s => 
             (s._id && s._id === editingItem._id) ? editingItem : s
          );
      }

      setServicesList(newServices);
      setIsModalOpen(false);

      // Save entire list to backend
      updateServicesList(newServices)
        .then(() => {
          toast({ title: "Service saved" });
          onRefresh();
        })
        .catch(() => {
           toast({ title: "Save failed", variant: "destructive" });
           onRefresh(); // Revert on error
        });
  };

  const openAdd = () => {
      setEditingItem({ _tempId: Date.now(), title: "", description: "", items: [], image: "" });
      setIsModalOpen(true);
  };

  const openEdit = (item: any) => {
      setEditingItem({ ...item }); 
      setIsModalOpen(true);
  };

  const handleDelete = async (index: number) => {
      if(!confirm("Delete this service?")) return;
      
      const newServices = servicesList.filter((_, i) => i !== index);
      setServicesList(newServices); // Optimistic update
      
      try {
        await updateServicesList(newServices);
        toast({ title: "Service deleted" });
      } catch(e) {
        toast({ title: "Delete failed", variant: "destructive" });
        onRefresh(); // Revert
      }
  };

  return (
    <div className="space-y-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesList.map((service, idx) => (
                <div key={idx} className="group border rounded-xl overflow-hidden bg-slate-50 hover:shadow-md transition-all">
                    <div className="relative h-40 bg-slate-200">
                        {service.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={service.image} alt="" className="w-full h-full object-cover" />
                        ) : (
                            <div className="flex items-center justify-center h-full text-muted-foreground"><ImageIcon /></div>
                        )}
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button size="icon" variant="secondary" onClick={() => openEdit(service)}><Edit2 className="w-4 h-4"/></Button>
                            <Button size="icon" variant="destructive" onClick={() => handleDelete(idx)}><Trash2 className="w-4 h-4"/></Button>
                        </div>
                    </div>
                    <div className="p-4 space-y-2">
                        <h3 className="font-bold text-lg leading-tight">{service.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{service.description}</p>
                        <div className="pt-2 flex flex-wrap gap-1">
                            {service.items?.slice(0, 3).map((tag: string, i: number) => (
                                <span key={i} className="text-[10px] bg-white border px-1.5 py-0.5 rounded">{tag}</span>
                            ))}
                            {(service.items?.length || 0) > 3 && <span className="text-[10px] text-muted-foreground">+{service.items.length - 3} more</span>}
                        </div>
                    </div>
                </div>
            ))}
            
            {/* Add Button Card */}
            <button onClick={openAdd} className="border-2 border-dashed rounded-xl h-full min-h-[300px] flex flex-col items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors bg-slate-50/50">
                <Plus className="w-8 h-8 mb-2" />
                <span className="font-medium">Add Service</span>
            </button>
        </div>

        {/* Modal Editor */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader><DialogTitle>{editingItem?._id ? "Edit Service" : "Add Service"}</DialogTitle></DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label>Service Title</Label>
                        <Input value={editingItem?.title || ''} onChange={e => setEditingItem({...editingItem, title: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                        <Label>Image URL</Label>
                        <Input value={editingItem?.image || ''} onChange={e => setEditingItem({...editingItem, image: e.target.value})} placeholder="https://..." />
                    </div>
                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea rows={3} value={editingItem?.description || ''} onChange={e => setEditingItem({...editingItem, description: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                        <Label>Checklist Items (One per line)</Label>
                        <Textarea 
                            rows={5} 
                            value={editingItem?.items?.join('\n') || ''} 
                            onChange={e => setEditingItem({...editingItem, items: e.target.value.split('\n').filter((l:string) => l.trim() !== "")})} 
                            placeholder="Brand Strategy&#10;Logo Design&#10;Typography"
                            className="font-mono text-sm"
                        />
                    </div>
                </div>
                <Button onClick={saveSingleItem} className="w-full">Save Service</Button>
            </DialogContent>
        </Dialog>
    </div>
  );
}

// ------------------------------------------------------------------
// 3. CTA EDITOR (Unchanged)
// ------------------------------------------------------------------
function CtaEditor({ data, onRefresh }: { data: any, onRefresh: () => void }) {
  const { toast } = useToast();
  const [form, setForm] = useState(data || {});
  const [saving, setSaving] = useState(false);

  useEffect(() => { setForm(data || {}) }, [data]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateServiceCTA(form);
      toast({ title: "CTA updated" });
      onRefresh();
    } catch (e) { toast({ title: "Failed", variant: "destructive" }); }
    finally { setSaving(false); }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
            <div className="space-y-2">
                <Label className="text-slate-300">Heading</Label>
                <Input 
                    value={form.heading} 
                    onChange={e => setForm({...form, heading: e.target.value})} 
                    className="bg-slate-800 border-slate-700 text-white font-bold text-lg"
                />
            </div>
            <div className="space-y-2">
                <Label className="text-slate-300">Description</Label>
                <Textarea 
                    value={form.description} 
                    onChange={e => setForm({...form, description: e.target.value})} 
                    className="bg-slate-800 border-slate-700 text-slate-300"
                />
            </div>
        </div>

        <div className="space-y-4 bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <div className="space-y-2">
                <Label className="text-slate-300">Button Text</Label>
                <Input 
                    value={form.buttonText} 
                    onChange={e => setForm({...form, buttonText: e.target.value})} 
                    className="bg-slate-800 border-slate-700 text-white"
                />
            </div>
            <div className="space-y-2">
                <Label className="text-slate-300">Button Link</Label>
                <Input 
                    value={form.buttonLink} 
                    onChange={e => setForm({...form, buttonLink: e.target.value})} 
                    className="bg-slate-800 border-slate-700 text-white"
                />
            </div>
            <Button onClick={handleSave} disabled={saving} variant="secondary" className="w-full mt-4">
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save CTA
            </Button>
        </div>
    </div>
  );
}
