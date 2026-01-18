'use client'

import React, { useState, useEffect } from 'react';
import { 
  getServicePage, 
  updateServiceHero, 
  updateServiceCTA, 
  updateServiceItem, 
  addServiceItem 
} from '../../../services/service.api';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Edit2, Plus, Trash2, ImageIcon, Upload, Save, Sparkles, Megaphone, LayoutTemplate, List } from 'lucide-react';

export default function ServiceAdminView() {
  const { toast } = useToast();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const refreshData = async () => {
    try {
      const res = await getServicePage();
      setData(res.data);
    } catch (e) {
      toast({ title: "Error loading data", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refreshData(); }, []);

  if (loading || !data) return <div className="p-20 flex justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="max-w-5xl mx-auto p-6 pb-40 space-y-12 bg-slate-50/50 min-h-screen">
      
      {/* --- PAGE HEADER --- */}
      <div className="flex justify-between items-center border-b pb-6">
        <div>
           <h1 className="text-3xl font-bold font-heading">Service Page Editor</h1>
           <p className="text-muted-foreground">Manage all sections of your services page below.</p>
        </div>
        <Button variant="outline" onClick={refreshData}>Discard / Refresh</Button>
      </div>

      {/* --- SECTION 1: HERO EDITOR --- */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-primary">
            <LayoutTemplate className="w-5 h-5" />
            <h2 className="text-xl font-bold text-gray-900">1. Hero Section</h2>
        </div>
        <HeroEditor data={data.hero} onRefresh={refreshData} />
      </section>

      {/* --- SECTION 2: LIST MANAGER --- */}
      <section className="space-y-4 pt-4 border-t border-dashed">
        <div className="flex items-center gap-2 text-primary">
            <List className="w-5 h-5" />
            <h2 className="text-xl font-bold text-gray-900">2. Services List (Horizontal Scroll)</h2>
        </div>
        <ServiceListManager list={data.servicesList} onRefresh={refreshData} />
      </section>

      {/* --- SECTION 3: CTA EDITOR --- */}
      <section className="space-y-4 pt-4 border-t border-dashed">
         <div className="flex items-center gap-2 text-primary">
            <Megaphone className="w-5 h-5" />
            <h2 className="text-xl font-bold text-gray-900">3. Bottom Call-to-Action</h2>
         </div>
        <CTAEditor data={data.cta} onRefresh={refreshData} />
      </section>

    </div>
  );
}

// =========================================================
// 1. HERO EDITOR
// =========================================================
function HeroEditor({ data, onRefresh }: any) {
  const { toast } = useToast();
  const [form, setForm] = useState(data || {});
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateServiceHero(form);
      toast({ title: "Hero Updated!" });
      onRefresh();
    } catch (e) { toast({ title: "Failed", variant: "destructive" }); }
    finally { setSaving(false); }
  };

  return (
    <div className="border rounded-xl p-8 bg-white shadow-sm space-y-6">
       <div className="grid md:grid-cols-2 gap-6">
           <div className="space-y-2">
             <Label>Small Tag (Top)</Label>
             <div className="flex items-center gap-2">
               <Sparkles className="w-4 h-4 text-blue-500" />
               <Input value={form.tag || ''} onChange={e => setForm({...form, tag: e.target.value})} />
             </div>
           </div>
           
           <div className="space-y-2">
             <Label>Main Headline</Label>
             <Input className="font-bold" value={form.headline || ''} onChange={e => setForm({...form, headline: e.target.value})} />
           </div>
       </div>

       <div className="space-y-2">
         <Label>Sub Headline</Label>
         <Textarea rows={2} value={form.subHeadline || ''} onChange={e => setForm({...form, subHeadline: e.target.value})} />
       </div>

       <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
         <div className="space-y-2">
            <Label>Button Text</Label>
            <Input value={form.primaryCta?.text || ''} onChange={e => setForm({...form, primaryCta: {...form.primaryCta, text: e.target.value}})} />
         </div>
         <div className="space-y-2">
            <Label>Button Link</Label>
            <Input value={form.primaryCta?.link || ''} onChange={e => setForm({...form, primaryCta: {...form.primaryCta, link: e.target.value}})} />
         </div>
       </div>

       <div className="flex justify-end pt-2">
           <Button onClick={handleSave} disabled={saving} className="min-w-[150px]">
             {saving && <Loader2 className="mr-2 animate-spin" />} <Save className="w-4 h-4 mr-2" /> Save Hero
           </Button>
       </div>
    </div>
  );
}

// =========================================================
// 2. SERVICE LIST MANAGER (With Image Upload)
// =========================================================
function ServiceListManager({ list, onRefresh }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const openAdd = () => { setEditingItem({}); setIsModalOpen(true); };
  const openEdit = (item: any) => { setEditingItem(item); setIsModalOpen(true); };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(list || []).map((service: any, idx: number) => (
          <div key={service._id || idx} className="border rounded-xl p-4 bg-white shadow-sm flex flex-col gap-4 group hover:shadow-md transition-all">
             {/* Image Preview */}
             <div className="aspect-square relative bg-slate-100 rounded-lg overflow-hidden border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={service.image} alt="preview" className="w-full h-full object-cover" />
             </div>
             
             {/* Content */}
             <div className="flex-1 space-y-1">
                <div className="flex justify-between items-start gap-2">
                   <h3 className="font-bold text-sm">{service.title}</h3>
                   <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded font-mono text-muted-foreground shrink-0">#{idx+1}</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{service.description}</p>
             </div>
             
             <Button variant="outline" size="sm" onClick={() => openEdit(service)} className="w-full">
                <Edit2 className="w-3 h-3 mr-2" /> Edit Item
             </Button>
          </div>
        ))}
        
        {/* Add Button */}
        <button onClick={openAdd} className="border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center gap-4 text-muted-foreground hover:bg-white hover:border-primary/50 hover:text-primary transition-all min-h-[300px]">
           <div className="h-14 w-14 bg-white rounded-full flex items-center justify-center shadow-sm border"><Plus className="w-6 h-6" /></div>
           <span className="font-medium">Add New Service</span>
        </button>
      </div>

      <ServiceEditorModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        service={editingItem} 
        onSuccess={onRefresh} 
      />
    </div>
  );
}

// =========================================================
// 3. CTA EDITOR
// =========================================================
function CTAEditor({ data, onRefresh }: any) {
  const { toast } = useToast();
  const [form, setForm] = useState(data || {});
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateServiceCTA(form);
      toast({ title: "CTA Updated!" });
      onRefresh();
    } catch (e) { toast({ title: "Failed", variant: "destructive" }); }
    finally { setSaving(false); }
  };

  return (
    <div className="border rounded-xl p-8 bg-white shadow-sm space-y-6">
       <div className="space-y-2">
         <Label>Heading</Label>
         <Input className="font-bold text-lg" value={form.heading || ''} onChange={e => setForm({...form, heading: e.target.value})} />
       </div>

       <div className="space-y-2">
         <Label>Description</Label>
         <Textarea value={form.description || ''} onChange={e => setForm({...form, description: e.target.value})} />
       </div>

       <div className="grid md:grid-cols-2 gap-4">
         <div className="space-y-2">
            <Label>Button Text</Label>
            <Input value={form.buttonText || ''} onChange={e => setForm({...form, buttonText: e.target.value})} />
         </div>
         <div className="space-y-2">
            <Label>Button Link</Label>
            <Input value={form.buttonLink || ''} onChange={e => setForm({...form, buttonLink: e.target.value})} />
         </div>
       </div>

       <div className="flex justify-end pt-2">
         <Button onClick={handleSave} disabled={saving} className="min-w-[150px]">
            {saving && <Loader2 className="mr-2 animate-spin" />} <Save className="w-4 h-4 mr-2" /> Save CTA
         </Button>
       </div>
    </div>
  );
}

// =========================================================
// MODAL: FOR EDITING SERVICE ITEM + IMAGE UPLOAD
// =========================================================
function ServiceEditorModal({ isOpen, onClose, service, onSuccess }: any) {
  const { toast } = useToast();
  const [form, setForm] = useState<any>({ items: [] });
  const [saving, setSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (service) {
      setForm({
        title: service.title || "",
        description: service.description || "",
        items: service.items || [],
      });
      setPreview(service.image || "");
      setSelectedFile(null);
    }
  }, [service]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const addItem = () => setForm({ ...form, items: [...form.items, "New Feature"] });
  const removeItem = (idx: number) => setForm({ ...form, items: form.items.filter((_:any, i:number) => i !== idx) });
  const updateItem = (idx: number, val: string) => {
    const next = [...form.items]; next[idx] = val; setForm({...form, items: next});
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("items", JSON.stringify(form.items)); 
      if (selectedFile) formData.append("serviceImage", selectedFile);

      if (service._id) await updateServiceItem(service._id, formData);
      else await addServiceItem(formData);

      toast({ title: "Saved successfully!" });
      onSuccess();
      onClose();
    } catch (e) {
      console.error(e);
      toast({ title: "Failed to save", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>{service?._id ? "Edit Service Item" : "Add New Service Item"}</DialogTitle></DialogHeader>
        <div className="grid gap-6 py-4">
           {/* Image Upload */}
           <div className="flex gap-6 items-start p-4 border rounded-lg bg-slate-50">
              <div className="w-24 h-24 bg-white rounded border overflow-hidden shrink-0 flex items-center justify-center">
                 {preview ? <img src={preview} className="w-full h-full object-cover" /> : <ImageIcon className="w-8 h-8 opacity-20"/>}
              </div>
              <div className="space-y-2 w-full">
                 <Label>Service Image</Label>
                 <div className="flex gap-2">
                     <Input id="img-up" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                     <Button variant="secondary" onClick={() => document.getElementById('img-up')?.click()}>
                        <Upload className="w-4 h-4 mr-2"/> Choose File
                     </Button>
                 </div>
                 {selectedFile && <p className="text-xs text-green-600 font-medium">Selected: {selectedFile.name}</p>}
                 <p className="text-[10px] text-muted-foreground">This image will update when you click "Save Changes".</p>
              </div>
           </div>

           <div className="space-y-2"><Label>Title</Label><Input value={form.title} onChange={e => setForm({...form, title: e.target.value})} /></div>
           <div className="space-y-2"><Label>Description</Label><Textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></div>
           
           <div className="space-y-2">
             <div className="flex justify-between items-center mb-2">
                 <Label>Features List</Label>
                 <Button size="sm" variant="outline" onClick={addItem}><Plus className="w-3 h-3 mr-1"/> Add Feature</Button>
             </div>
             <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto pr-2">
               {form.items.map((it: string, i: number) => (
                 <div key={i} className="flex gap-1 group">
                   <Input value={it} onChange={e => updateItem(i, e.target.value)} className="h-9 text-sm" />
                   <Button size="icon" variant="ghost" className="h-9 w-9 text-muted-foreground hover:text-destructive" onClick={() => removeItem(i)}><Trash2 className="w-4 h-4"/></Button>
                 </div>
               ))}
             </div>
           </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving}>{saving && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>} Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}