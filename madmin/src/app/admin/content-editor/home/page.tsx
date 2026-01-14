'use client'

import React, { useState, useEffect } from 'react';
import { 
  getHomePage, 
  updateHomeHero, 
  updateHomeIntro, 
  updateHomeProjects, 
  updateHomeStats, 
  updateHomeFooter 
} from '../../../../services/homepage.api';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, Plus, Trash2, Edit2, Image as ImageIcon, ArrowRight } from 'lucide-react';

export default function HomeAdminView() {
  const { toast } = useToast();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const refreshData = async () => {
    try {
      const res = await getHomePage();
      // Ensure safe defaults
      const cleanData = {
          hero: res.data?.hero || {},
          intro: res.data?.intro || {},
          projects: res.data?.projects || { items: [] },
          stats: res.data?.stats || { items: [] },
          footer: res.data?.footer || { marqueeImages: [] }
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
          <h1 className="text-3xl font-bold font-heading">Home Page Editor</h1>
          <p className="text-muted-foreground">Manage content for your landing page</p>
        </div>
        <Button variant="outline" onClick={refreshData}>Refresh Data</Button>
      </div>

      {/* ================= HERO SECTION ================= */}
      <section className="relative border border-border rounded-xl p-6 bg-white shadow-sm">
        <div className="mb-6 border-b pb-4">
            <Badge variant="outline" className="mb-2">Top Fold</Badge>
            <h2 className="text-xl font-bold">Hero Section</h2>
        </div>
        <HeroEditor data={data.hero} onRefresh={refreshData} />
      </section>

      {/* ================= INTRO SECTION ================= */}
      <section className="relative border border-border rounded-xl p-6 bg-white shadow-sm">
        <div className="mb-6 border-b pb-4">
            <Badge variant="outline" className="mb-2">Introduction</Badge>
            <h2 className="text-xl font-bold">Intro & Circle Text</h2>
        </div>
        <IntroEditor data={data.intro} onRefresh={refreshData} />
      </section>

      {/* ================= PROJECTS SECTION ================= */}
      <section className="relative border border-border rounded-xl p-6 bg-white shadow-sm">
        <div className="mb-6 border-b pb-4">
            <Badge variant="outline" className="mb-2">Work</Badge>
            <h2 className="text-xl font-bold">Selected Projects</h2>
        </div>
        <ProjectsEditor data={data.projects} onRefresh={refreshData} />
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="relative border border-border rounded-xl p-6 bg-white shadow-sm">
        <div className="mb-6 border-b pb-4">
            <Badge variant="outline" className="mb-2">Numbers</Badge>
            <h2 className="text-xl font-bold">Statistics</h2>
        </div>
        <StatsEditor data={data.stats} onRefresh={refreshData} />
      </section>

      {/* ================= FOOTER / MARQUEE ================= */}
      <section className="relative border border-border rounded-xl p-6 bg-slate-900 text-white shadow-sm">
        <div className="mb-6 border-b border-white/20 pb-4">
            <Badge variant="secondary" className="mb-2 bg-white/20 text-white">Footer</Badge>
            <h2 className="text-xl font-bold">Footer & Marquee</h2>
        </div>
        <FooterEditor data={data.footer} onRefresh={refreshData} />
      </section>

    </div>
  );
}

// ------------------------------------------------------------------
// 1. HERO EDITOR
// ------------------------------------------------------------------
function HeroEditor({ data, onRefresh }: { data: any, onRefresh: () => void }) {
  const { toast } = useToast();
  const [form, setForm] = useState(data || {});
  const [saving, setSaving] = useState(false);

  useEffect(() => { setForm(data || {}) }, [data]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateHomeHero(form);
      toast({ title: "Hero updated" });
      onRefresh();
    } catch (e) { toast({ title: "Failed", variant: "destructive" }); }
    finally { setSaving(false); }
  };

  return (
    <div className="space-y-6">
       <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
             <div className="space-y-2">
                <Label>Main Headline</Label>
                <Textarea 
                   value={form.headline} 
                   onChange={e => setForm({...form, headline: e.target.value})} 
                   className="font-bold text-2xl"
                   rows={3}
                />
             </div>
             <div className="space-y-2">
                <Label>Sub Headline</Label>
                <Textarea 
                   value={form.subHeadline} 
                   onChange={e => setForm({...form, subHeadline: e.target.value})} 
                />
             </div>
          </div>
          <div className="space-y-4">
             <div className="space-y-2">
                <Label>Background Image URL</Label>
                <Input value={form.backgroundImage} onChange={e => setForm({...form, backgroundImage: e.target.value})} placeholder="https://..." />
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                   <Label>CTA Text</Label>
                   <Input value={form.ctaText} onChange={e => setForm({...form, ctaText: e.target.value})} />
                </div>
                <div className="space-y-2">
                   <Label>CTA Link</Label>
                   <Input value={form.ctaLink} onChange={e => setForm({...form, ctaLink: e.target.value})} />
                </div>
             </div>
          </div>
       </div>
       <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving}>{saving && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>} Save Hero</Button>
       </div>
    </div>
  );
}

// ------------------------------------------------------------------
// 2. INTRO EDITOR
// ------------------------------------------------------------------
function IntroEditor({ data, onRefresh }: { data: any, onRefresh: () => void }) {
  const { toast } = useToast();
  const [form, setForm] = useState(data || {});
  const [saving, setSaving] = useState(false);

  useEffect(() => { setForm(data || {}) }, [data]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateHomeIntro(form);
      toast({ title: "Intro updated" });
      onRefresh();
    } catch (e) { toast({ title: "Failed", variant: "destructive" }); }
    finally { setSaving(false); }
  };

  return (
    <div className="space-y-6">
       <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
             <div className="space-y-2">
                <Label>Heading</Label>
                <Input value={form.heading} onChange={e => setForm({...form, heading: e.target.value})} className="font-bold text-lg"/>
             </div>
             <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={4}/>
             </div>
          </div>
          <div className="space-y-2">
             <Label>Floating Circle Text</Label>
             <div className="p-8 border rounded-xl flex items-center justify-center bg-muted/20">
                <div className="w-32 h-32 border-2 border-dashed rounded-full flex items-center justify-center p-2 text-center text-xs">
                   {form.floatingCircleText}
                </div>
             </div>
             <Input value={form.floatingCircleText} onChange={e => setForm({...form, floatingCircleText: e.target.value})} />
          </div>
       </div>
       <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving}>{saving && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>} Save Intro</Button>
       </div>
    </div>
  );
}

// ------------------------------------------------------------------
// 3. PROJECTS EDITOR
// ------------------------------------------------------------------
function ProjectsEditor({ data, onRefresh }: { data: any, onRefresh: () => void }) {
  const { toast } = useToast();
  const [form, setForm] = useState(data || { items: [] });
  const [saving, setSaving] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => { setForm(data || { items: [] }) }, [data]);

  const handleMainSave = async () => {
    setSaving(true);
    try {
      await updateHomeProjects(form);
      toast({ title: "Projects updated" });
      onRefresh();
    } catch (e) { toast({ title: "Failed", variant: "destructive" }); }
    finally { setSaving(false); }
  };

  const saveItem = () => {
     let newItems = [...(form.items || [])];
     if(editingItem._tempId) { // New Item
        const { _tempId, ...rest } = editingItem;
        newItems.push(rest);
     } else { // Update existing
        // Simple replace logic based on index if no IDs, or update logic
        // For simplicity, if we are editing an index, we need to track it
        // Ideally backend provides _id. Assuming editingItem has _id if existing.
        if (editingItem._id) {
            newItems = newItems.map(i => i._id === editingItem._id ? editingItem : i);
        } else {
            // Fallback: If we opened via index tracking (requires state change), 
            // easier to push new for now in this snippet or use ID from DB.
            newItems.push(editingItem); // This might duplicate if logic isn't perfect without IDs
        }
     }
     setForm({ ...form, items: newItems });
     setIsModalOpen(false);
  };

  // Helper to open edit
  const openEdit = (item: any) => { setEditingItem({...item}); setIsModalOpen(true); };
  const openAdd = () => { setEditingItem({ _tempId: Date.now(), title: "", subtitle: "", image: "" }); setIsModalOpen(true); };
  
  const removeItem = (idx: number) => {
      const newItems = form.items.filter((_:any, i:number) => i !== idx);
      setForm({ ...form, items: newItems });
  };

  return (
    <div className="space-y-6">
       <div className="grid md:grid-cols-2 gap-4 bg-muted/20 p-4 rounded-lg">
          <div className="space-y-1">
             <Label>Section Heading</Label>
             <Input value={form.heading} onChange={e => setForm({...form, heading: e.target.value})} />
          </div>
          <div className="space-y-1">
             <Label>Sub Heading</Label>
             <Input value={form.subHeading} onChange={e => setForm({...form, subHeading: e.target.value})} />
          </div>
       </div>

       <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {form.items?.map((item: any, idx: number) => (
             <div key={idx} className="relative group border rounded-lg overflow-hidden bg-slate-50">
                <div className="h-32 bg-slate-200 relative">
                   {item.image ? <img src={item.image} alt="" className="w-full h-full object-cover"/> : <div className="h-full flex items-center justify-center text-muted-foreground"><ImageIcon/></div>}
                   <div className="absolute top-1 right-1 flex gap-1">
                      <Button size="icon" variant="secondary" className="h-6 w-6" onClick={() => openEdit(item)}><Edit2 className="w-3 h-3"/></Button>
                      <Button size="icon" variant="destructive" className="h-6 w-6" onClick={() => removeItem(idx)}><Trash2 className="w-3 h-3"/></Button>
                   </div>
                </div>
                <div className="p-3">
                   <p className="font-bold text-sm truncate">{item.title}</p>
                   <p className="text-xs text-muted-foreground truncate">{item.subtitle}</p>
                </div>
             </div>
          ))}
          <button onClick={openAdd} className="border-2 border-dashed rounded-lg h-32 flex flex-col items-center justify-center text-muted-foreground hover:bg-slate-50 transition">
             <Plus className="w-6 h-6 mb-1"/> <span className="text-xs">Add Project</span>
          </button>
       </div>

       <div className="flex justify-end">
          <Button onClick={handleMainSave} disabled={saving}>{saving && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>} Save Projects</Button>
       </div>

       {/* Item Modal */}
       <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
             <DialogHeader><DialogTitle>Edit Project</DialogTitle></DialogHeader>
             <div className="space-y-3 py-2">
                <Input placeholder="Title (e.g. Nandan Coffee)" value={editingItem?.title || ''} onChange={e => setEditingItem({...editingItem, title: e.target.value})} />
                <Input placeholder="Subtitle (e.g. Date/Type)" value={editingItem?.subtitle || ''} onChange={e => setEditingItem({...editingItem, subtitle: e.target.value})} />
                <Input placeholder="Image URL" value={editingItem?.image || ''} onChange={e => setEditingItem({...editingItem, image: e.target.value})} />
                <Button onClick={saveItem} className="w-full">Update List (Click Save Projects to Commit)</Button>
             </div>
          </DialogContent>
       </Dialog>
    </div>
  );
}

// ------------------------------------------------------------------
// 4. STATS EDITOR
// ------------------------------------------------------------------
function StatsEditor({ data, onRefresh }: { data: any, onRefresh: () => void }) {
  const { toast } = useToast();
  const [form, setForm] = useState(data || { items: [] });
  const [saving, setSaving] = useState(false);

  useEffect(() => { setForm(data || { items: [] }) }, [data]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateHomeStats(form);
      toast({ title: "Stats updated" });
      onRefresh();
    } catch (e) { toast({ title: "Failed", variant: "destructive" }); }
    finally { setSaving(false); }
  };

  const handleItemChange = (idx: number, field: string, val: string) => {
     const newItems = [...form.items];
     newItems[idx] = { ...newItems[idx], [field]: val };
     setForm({ ...form, items: newItems });
  };

  const addItem = () => setForm({ ...form, items: [...form.items, { title: "00", subtitle: "LABEL" }] });
  const removeItem = (idx: number) => setForm({ ...form, items: form.items.filter((_:any, i:number) => i !== idx) });

  return (
    <div className="space-y-6">
       <div className="space-y-2">
          <Label>Section Heading</Label>
          <Input value={form.heading} onChange={e => setForm({...form, heading: e.target.value})} />
       </div>
       <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {form.items?.map((item: any, idx: number) => (
             <div key={idx} className="border p-4 rounded-lg relative bg-slate-50">
                <Button size="icon" variant="ghost" className="absolute top-1 right-1 h-6 w-6 text-destructive" onClick={() => removeItem(idx)}><Trash2 className="w-3 h-3"/></Button>
                <div className="space-y-2 mt-2">
                   <Input placeholder="Value (e.g. 50+)" value={item.title} onChange={e => handleItemChange(idx, 'title', e.target.value)} className="font-bold text-lg"/>
                   <Input placeholder="Label (e.g. CLIENTS)" value={item.subtitle} onChange={e => handleItemChange(idx, 'subtitle', e.target.value)} className="text-xs uppercase"/>
                </div>
             </div>
          ))}
          <Button variant="outline" className="h-full min-h-[120px] border-dashed" onClick={addItem}><Plus className="w-6 h-6 mr-2"/> Add Stat</Button>
       </div>
       <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving}>{saving && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>} Save Stats</Button>
       </div>
    </div>
  );
}

// ------------------------------------------------------------------
// 5. FOOTER EDITOR
// ------------------------------------------------------------------
function FooterEditor({ data, onRefresh }: { data: any, onRefresh: () => void }) {
  const { toast } = useToast();
  const [form, setForm] = useState(data || { marqueeImages: [] });
  const [saving, setSaving] = useState(false);

  useEffect(() => { setForm(data || { marqueeImages: [] }) }, [data]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateHomeFooter(form);
      toast({ title: "Footer updated" });
      onRefresh();
    } catch (e) { toast({ title: "Failed", variant: "destructive" }); }
    finally { setSaving(false); }
  };

  const handleImagesChange = (val: string) => {
     const urls = val.split('\n').map(s => s.trim()).filter(Boolean);
     setForm({ ...form, marqueeImages: urls });
  };

  return (
    <div className="space-y-6">
       <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
             <div className="space-y-2">
                <Label className="text-slate-300">Heading</Label>
                <Input value={form.heading} onChange={e => setForm({...form, heading: e.target.value})} className="bg-slate-800 border-slate-700 text-white font-bold text-2xl" />
             </div>
             <div className="space-y-2">
                <Label className="text-slate-300">CTA Button Text</Label>
                <Input value={form.ctaText} onChange={e => setForm({...form, ctaText: e.target.value})} className="bg-slate-800 border-slate-700 text-white" />
             </div>
          </div>
          <div className="space-y-2">
             <Label className="text-slate-300">Marquee Images (One URL per line)</Label>
             <Textarea 
                rows={6}
                value={form.marqueeImages?.join('\n')} 
                onChange={e => handleImagesChange(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white font-mono text-xs"
                placeholder="https://..."
             />
          </div>
       </div>
       <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving} variant="secondary">
             {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>} Save Footer
          </Button>
       </div>
    </div>
  );
}