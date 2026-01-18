   'use client'

   import React, { useState, useEffect } from 'react';
   import { 
   getHomePage, 
   updateHomeHero, 
   updateHomeIntro, 
   updateHomeProjectsMeta, // Updated import
   updateHomeProjectItem,  // Updated import
   addHomeProjectItem,     // Updated import
   updateHomeStats, 
   updateHomeClients,      // New import
   updateHomeFooter 
   } from '../../../services/homepage.api';

   import { Button } from '@/components/ui/button';
   import { Input } from '@/components/ui/input';
   import { Textarea } from '@/components/ui/textarea';
   import { Label } from '@/components/ui/label';
   import { Badge } from '@/components/ui/badge';
   import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
   import { useToast } from '@/hooks/use-toast';
   import { Loader2, Plus, Trash2, Edit2, Image as ImageIcon, Upload, Save, Briefcase, Users } from 'lucide-react';

   export default function HomeAdminView() {
   const { toast } = useToast();
   const [data, setData] = useState<any>(null);
   const [loading, setLoading] = useState(true);

   const refreshData = async () => {
      try {
         const res = await getHomePage();
         const backendData = res.data || {};

         const cleanData = {
            hero: backendData.hero || {},
            intro: backendData.intro || {},
            projects: backendData.projects || { items: [] },
            stats: backendData.stats || { items: [] },
            clients: backendData.clients || { logos: [] }, // New
            footer: backendData.footer || { marqueeImages: [] }
         };
         
         setData(cleanData);
      } catch (e) {
         console.error(e);
         toast({ title: "Error loading data", variant: "destructive" });
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => { refreshData(); }, []);

   if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>;
   if (!data) return <div className="p-20 text-center">No data found. Check API connection.</div>;

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

         {/* ================= CLIENTS SECTION ================= */}
         <section className="relative border border-border rounded-xl p-6 bg-white shadow-sm">
            <div className="mb-6 border-b pb-4">
               <Badge variant="outline" className="mb-2">Trust</Badge>
               <h2 className="text-xl font-bold">Client Logos</h2>
         </div>
         <ClientsEditor data={data.clients} onRefresh={refreshData} />
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
   // 1. HERO EDITOR (With Image Upload)
   // ------------------------------------------------------------------
   // ------------------------------------------------------------------
   // 1. HERO EDITOR (Fixed Image Rendering)
   // ------------------------------------------------------------------
function HeroEditor({ data, onRefresh }: { data: any, onRefresh: () => void }) {
  const { toast } = useToast();
  const [form, setForm] = useState(data || {});
  const [saving, setSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => { setForm(data || {}) }, [data]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("headline", form.headline || "");
      formData.append("subHeadline", form.subHeadline || "");
      formData.append("ctaText", form.ctaText || "");
      formData.append("ctaLink", form.ctaLink || "");
      
      // Send the current list of images (excluding any deleted ones)
      if(Array.isArray(form.backgroundImage)) {
         formData.append("backgroundImage", form.backgroundImage.join(','));
      }

      // Send new file if selected
      if (selectedFile) {
        formData.append("heroImage", selectedFile);
      }

      await updateHomeHero(formData);
      toast({ title: "Hero updated" });
      setSelectedFile(null); 
      onRefresh();
    } catch (e) { toast({ title: "Failed to update Hero", variant: "destructive" }); }
    finally { setSaving(false); }
  };

  const removeImage = (urlToRemove: string) => {
      const newImages = (form.backgroundImage || []).filter((img: string) => img !== urlToRemove);
      setForm({...form, backgroundImage: newImages});
  };

  return (
    <div className="space-y-6">
       <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
             <div className="space-y-2">
                <Label>Main Headline</Label>
                <Textarea value={form.headline || ''} onChange={e => setForm({...form, headline: e.target.value})} className="font-bold text-2xl" rows={3}/>
             </div>
             <div className="space-y-2">
                <Label>Sub Headline</Label>
                <Textarea value={form.subHeadline || ''} onChange={e => setForm({...form, subHeadline: e.target.value})} />
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>CTA Text</Label><Input value={form.ctaText || ''} onChange={e => setForm({...form, ctaText: e.target.value})} /></div>
                <div className="space-y-2"><Label>CTA Link</Label><Input value={form.ctaLink || ''} onChange={e => setForm({...form, ctaLink: e.target.value})} /></div>
             </div>
          </div>

          <div className="space-y-4 bg-muted/20 p-4 rounded-xl">
             <Label>Background Images (Carousel)</Label>
             
             {/* Image List */}
             <div className="grid grid-cols-3 gap-2 mb-4">
                {(form.backgroundImage || [])
                    .filter((url: string) => url && url.trim().length > 0)
                    .map((img: string, idx: number) => (
                    <div key={idx} className="relative aspect-video bg-slate-200 rounded overflow-hidden group border border-slate-300">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img} className="w-full h-full object-cover" alt="bg"/>
                        <button onClick={() => removeImage(img)} className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                            <Trash2 className="w-3 h-3"/>
                        </button>
                    </div>
                ))}
             </div>

             <div className="space-y-2">
                <Label>Add New Image</Label>
                <div className="flex gap-2 items-center">
                   <Input type="file" onChange={e => setSelectedFile(e.target.files?.[0] || null)} />
                </div>
                {selectedFile && <p className="text-xs text-green-600 font-medium mt-1">Selected: {selectedFile.name} (Click Save to Upload)</p>}
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
   // 2. INTRO EDITOR (Same as before)
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
               <div className="space-y-2"><Label>Heading</Label><Input value={form.heading || ''} onChange={e => setForm({...form, heading: e.target.value})} className="font-bold text-lg"/></div>
               <div className="space-y-2"><Label>Description</Label><Textarea value={form.description || ''} onChange={e => setForm({...form, description: e.target.value})} rows={4}/></div>
            </div>
            <div className="space-y-2">
               <Label>Floating Circle Text</Label>
               <div className="p-8 border rounded-xl flex items-center justify-center bg-muted/20">
                  <div className="w-32 h-32 border-2 border-dashed rounded-full flex items-center justify-center p-4 text-center text-xs font-mono">{form.floatingCircleText || 'Preview'}</div>
               </div>
               <Input value={form.floatingCircleText || ''} onChange={e => setForm({...form, floatingCircleText: e.target.value})} />
            </div>
         </div>
         <div className="flex justify-end"><Button onClick={handleSave} disabled={saving}>{saving && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>} Save Intro</Button></div>
      </div>
   );
   }

   // ------------------------------------------------------------------
   // 3. PROJECTS EDITOR (Updated for Image Upload)
   // ------------------------------------------------------------------
   function ProjectsEditor({ data, onRefresh }: { data: any, onRefresh: () => void }) {
   const { toast } = useToast();
   const [meta, setMeta] = useState({ heading: data.heading, subHeading: data.subHeading });
   const [items, setItems] = useState(data.items || []);
   const [saving, setSaving] = useState(false);
   
   // Modal State
   const [editingItem, setEditingItem] = useState<any>(null);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedFile, setSelectedFile] = useState<File | null>(null);
   const [preview, setPreview] = useState("");

   useEffect(() => { 
         setMeta({ heading: data.heading, subHeading: data.subHeading });
         setItems(data.items || []);
   }, [data]);

   const handleMetaSave = async () => {
      setSaving(true);
      try {
         await updateHomeProjectsMeta(meta);
         toast({ title: "Projects Meta updated" });
         onRefresh();
      } catch (e) { toast({ title: "Failed", variant: "destructive" }); }
      finally { setSaving(false); }
   };

   const openAdd = () => { setEditingItem({}); setPreview(""); setSelectedFile(null); setIsModalOpen(true); };
   const openEdit = (item: any) => { setEditingItem({...item}); setPreview(item.image); setSelectedFile(null); setIsModalOpen(true); };

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
         const file = e.target.files?.[0];
         if (file) { setSelectedFile(file); setPreview(URL.createObjectURL(file)); }
   };

   const saveItem = async () => {
         try {
            const formData = new FormData();
            formData.append("title", editingItem.title || "");
            formData.append("subtitle", editingItem.subtitle || "");
            formData.append("order", editingItem.order || "0");
            if(selectedFile) formData.append("projectImage", selectedFile);

            if (editingItem._id) {
               await updateHomeProjectItem(editingItem._id, formData);
            } else {
               await addHomeProjectItem(formData);
            }
            toast({ title: "Project Saved" });
            setIsModalOpen(false);
            onRefresh();
         } catch (e) {
            toast({ title: "Error saving item", variant: "destructive" });
         }
   };

   return (
      <div className="space-y-6">
         <div className="grid md:grid-cols-2 gap-4 bg-muted/20 p-4 rounded-lg">
            <div className="space-y-1"><Label>Section Heading</Label><Input value={meta.heading || ''} onChange={e => setMeta({...meta, heading: e.target.value})} /></div>
            <div className="space-y-1"><Label>Sub Heading</Label><Input value={meta.subHeading || ''} onChange={e => setMeta({...meta, subHeading: e.target.value})} /></div>
            <div className="col-span-2 flex justify-end"><Button size="sm" onClick={handleMetaSave} disabled={saving}>Save Meta</Button></div>
         </div>

         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {items.map((item: any, idx: number) => (
               <div key={item._id || idx} className="relative group border rounded-lg overflow-hidden bg-slate-50">
                  <div className="h-32 bg-slate-200 relative">
                     {item.image ? <img src={item.image} alt="" className="w-full h-full object-cover"/> : <div className="h-full flex items-center justify-center text-muted-foreground"><ImageIcon/></div>}
                     <Button size="icon" variant="secondary" className="absolute top-1 right-1 h-6 w-6" onClick={() => openEdit(item)}><Edit2 className="w-3 h-3"/></Button>
                  </div>
                  <div className="p-3">
                     <p className="font-bold text-sm truncate">{item.title}</p>
                     <p className="text-xs text-muted-foreground truncate">{item.subtitle}</p>
                  </div>
               </div>
            ))}
            <button onClick={openAdd} className="border-2 border-dashed rounded-lg h-32 flex flex-col items-center justify-center text-muted-foreground hover:bg-slate-50 transition"><Plus className="w-6 h-6 mb-1"/> <span className="text-xs">Add Project</span></button>
         </div>

         {/* Item Modal */}
         <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent>
               <DialogHeader><DialogTitle>{editingItem?._id ? "Edit" : "Add"} Project</DialogTitle></DialogHeader>
               <div className="space-y-4 py-2">
                  <div className="flex gap-4 items-start">
                     <div className="w-20 h-20 bg-slate-100 rounded overflow-hidden shrink-0">{preview && <img src={preview} className="w-full h-full object-cover"/>}</div>
                     <div className="w-full"><Label>Image</Label><Input type="file" onChange={handleFileChange} /></div>
                  </div>
                  <div><Label>Title</Label><Input value={editingItem?.title || ''} onChange={e => setEditingItem({...editingItem, title: e.target.value})} /></div>
                  <div><Label>Subtitle</Label><Input value={editingItem?.subtitle || ''} onChange={e => setEditingItem({...editingItem, subtitle: e.target.value})} /></div>
                  <div><Label>Order</Label><Input type="number" value={editingItem?.order || 0} onChange={e => setEditingItem({...editingItem, order: parseInt(e.target.value)})} /></div>
                  <Button onClick={saveItem} className="w-full mt-4">Save Project</Button>
               </div>
            </DialogContent>
         </Dialog>
      </div>
   );
   }

   // ------------------------------------------------------------------
   // 4. CLIENTS EDITOR (New Section)
   // ------------------------------------------------------------------
   function ClientsEditor({ data, onRefresh }: { data: any, onRefresh: () => void }) {
   const { toast } = useToast();
   const [heading, setHeading] = useState(data?.heading || "");
   const [logos, setLogos] = useState(data?.logos || []);
   const [saving, setSaving] = useState(false);
   const [selectedFile, setSelectedFile] = useState<File | null>(null);

   useEffect(() => { setHeading(data?.heading || ""); setLogos(data?.logos || []); }, [data]);

   const handleSave = async () => {
         setSaving(true);
         try {
            const formData = new FormData();
            formData.append("heading", heading);
            if (selectedFile) formData.append("clientLogo", selectedFile);
            
            await updateHomeClients(formData);
            toast({ title: "Clients updated" });
            setSelectedFile(null);
            onRefresh();
         } catch (e) { toast({ title: "Error", variant: "destructive" }); }
         finally { setSaving(false); }
   };

   return (
         <div className="space-y-6">
            <div className="space-y-2"><Label>Section Heading</Label><Input value={heading} onChange={e => setHeading(e.target.value)} /></div>
            
            <div className="bg-slate-50 p-4 rounded-xl">
               <Label className="mb-2 block">Client Logos</Label>
               <div className="flex flex-wrap gap-4 mb-4">
                     {logos.map((logo: string, i: number) => (
                        <div key={i} className="w-20 h-12 bg-white border rounded flex items-center justify-center p-2 relative group">
                           {/* eslint-disable-next-line @next/next/no-img-element */}
                           <img src={logo} alt="client" className="max-w-full max-h-full object-contain" />
                        </div>
                     ))}
               </div>
               <div className="flex gap-2 items-end">
                     <div className="w-full space-y-1">
                        <Label className="text-xs">Upload New Logo</Label>
                        <Input type="file" onChange={e => setSelectedFile(e.target.files?.[0] || null)} />
                     </div>
                     <Button onClick={handleSave} disabled={saving}>{saving ? <Loader2 className="animate-spin"/> : <Upload className="w-4 h-4 mr-2"/>} Upload</Button>
               </div>
            </div>
         </div>
   );
   }

   // ------------------------------------------------------------------
   // 5. STATS EDITOR (Unchanged)
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

   const addItem = () => setForm({ ...form, items: [...form.items, { title: "00", subtitle: "LABEL", order: form.items.length + 1 }] });
   const removeItem = (idx: number) => setForm({ ...form, items: form.items.filter((_:any, i:number) => i !== idx) });

   return (
      <div className="space-y-6">
         <div className="space-y-2"><Label>Section Heading</Label><Input value={form.heading || ''} onChange={e => setForm({...form, heading: e.target.value})} /></div>
         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {form.items?.map((item: any, idx: number) => (
               <div key={item._id || idx} className="border p-4 rounded-lg relative bg-slate-50">
                  <Button size="icon" variant="ghost" className="absolute top-1 right-1 h-6 w-6 text-destructive" onClick={() => removeItem(idx)}><Trash2 className="w-3 h-3"/></Button>
                  <div className="space-y-2 mt-2">
                     <div className="space-y-1"><Label className="text-xs text-muted-foreground">Value</Label><Input placeholder="e.g. 50+" value={item.title} onChange={e => handleItemChange(idx, 'title', e.target.value)} className="font-bold text-lg"/></div>
                     <div className="space-y-1"><Label className="text-xs text-muted-foreground">Label</Label><Input placeholder="e.g. CLIENTS" value={item.subtitle} onChange={e => handleItemChange(idx, 'subtitle', e.target.value)} className="text-xs uppercase"/></div>
                  </div>
               </div>
            ))}
            <Button variant="outline" className="h-full min-h-[140px] border-dashed" onClick={addItem}><Plus className="w-6 h-6 mr-2"/> Add Stat</Button>
         </div>
         <div className="flex justify-end"><Button onClick={handleSave} disabled={saving}>{saving && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>} Save Stats</Button></div>
      </div>
   );
   }

   // ------------------------------------------------------------------
   // 6. FOOTER EDITOR (Unchanged)
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
               <div className="space-y-2"><Label className="text-slate-300">Heading</Label><Input value={form.heading || ''} onChange={e => setForm({...form, heading: e.target.value})} className="bg-slate-800 border-slate-700 text-white font-bold text-2xl" /></div>
               <div className="space-y-2"><Label className="text-slate-300">CTA Button Text</Label><Input value={form.ctaText || ''} onChange={e => setForm({...form, ctaText: e.target.value})} className="bg-slate-800 border-slate-700 text-white" /></div>
            </div>
            <div className="space-y-2">
               <Label className="text-slate-300">Marquee Images (One URL per line)</Label>
               <Textarea rows={6} value={form.marqueeImages?.join('\n') || ''} onChange={e => handleImagesChange(e.target.value)} className="bg-slate-800 border-slate-700 text-white font-mono text-xs" placeholder="https://..."/>
            </div>
         </div>
         <div className="flex justify-end"><Button onClick={handleSave} disabled={saving} variant="secondary">{saving && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>} Save Footer</Button></div>
      </div>
   );
   }