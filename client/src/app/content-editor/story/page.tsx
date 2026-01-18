'use client'

import React, { useState, useEffect } from 'react';
import { 
  getStoryPage, 
  updateHeroSection, 
  updateTimelineSection, 
  addMilestone, 
  updateMilestoneById, 
  deleteMilestoneById, 
  updateMarqueeSection, 
  updateTestimonialsSection 
} from '../../../services/story.api';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Loader2, Plus, Trash2, Edit2, Save, Rocket, Star, Users, Globe, Award, Quote, Upload, ImageIcon 
} from 'lucide-react';

// --- Icon Map for Visuals ---
const IconMap: Record<string, any> = { Rocket, Users, Globe, Award, Star };

export default function StoryAdminView() {
  const { toast } = useToast();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const refreshData = async () => {
    try {
      const res = await getStoryPage();
      setData(res.data);
    } catch (e) {
      toast({ title: "Error loading data", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refreshData(); }, []);

  if (loading || !data) return <div className="flex justify-center p-20"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>;

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20 p-6">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading">Story Page Editor</h1>
          <p className="text-muted-foreground">Edit content directly in the layout</p>
        </div>
        <Button variant="outline" onClick={refreshData}>Discard Changes / Refresh</Button>
      </div>

      {/* ================= HERO SECTION ================= */}
      <section className="relative border-2 border-dashed border-primary/20 rounded-xl p-8 bg-white/50">
        <div className="absolute top-4 left-4 bg-primary/10 text-primary px-2 py-1 text-xs font-mono uppercase rounded">
          Hero Section
        </div>
        <HeroEditor data={data.hero} onRefresh={refreshData} />
      </section>

      {/* ================= MARQUEE SECTION ================= */}
      <section className="relative border-2 border-dashed border-primary/20 rounded-xl p-8 bg-muted/20">
         <div className="absolute top-4 left-4 bg-primary/10 text-primary px-2 py-1 text-xs font-mono uppercase rounded">
          Marquee Section
        </div>
        <MarqueeEditor data={data.marquee} onRefresh={refreshData} />
      </section>

      {/* ================= TIMELINE SECTION ================= */}
      <section className="relative border-2 border-dashed border-primary/20 rounded-xl p-8 bg-white/50">
        <div className="absolute top-4 left-4 bg-primary/10 text-primary px-2 py-1 text-xs font-mono uppercase rounded">
          Timeline Section
        </div>
        <TimelineEditor data={data.timeline} onRefresh={refreshData} />
      </section>

      {/* ================= TESTIMONIALS SECTION ================= */}
      <section className="relative border-2 border-dashed border-primary/20 rounded-xl p-8 bg-muted/20">
        <div className="absolute top-4 left-4 bg-primary/10 text-primary px-2 py-1 text-xs font-mono uppercase rounded">
          Testimonials Section
        </div>
        <TestimonialsEditor data={data.testimonials} onRefresh={refreshData} />
      </section>

    </div>
  );
}


// ============================================================================
// 1. HERO EDITOR (Updated with Image Upload)
// ============================================================================
function HeroEditor({ data, onRefresh }: { data: any, onRefresh: () => void }) {
  const { toast } = useToast();
  const [form, setForm] = useState(data);
  const [saving, setSaving] = useState(false);

  // Image Upload State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(data.image || "");

  useEffect(() => { 
    setForm(data);
    setPreview(data.image || "");
  }, [data]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const formData = new FormData();

      // 1. Append Simple Text
      formData.append("miniTag", form.miniTag || "");
      formData.append("subtitle", form.subtitle || "");

      // 2. Append Complex Data (Arrays/Objects)
      formData.append("titleLines", JSON.stringify(form.titleLines)); 
      formData.append("ctas", JSON.stringify(form.ctas));

      // 3. Append File (Must match backend: upload.single('heroImage'))
      if (selectedFile) {
        formData.append("heroImage", selectedFile);
      }

      await updateHeroSection(formData);
      
      toast({ title: "Hero updated successfully" });
      onRefresh();
    } catch (e) { 
      console.error(e);
      toast({ title: "Failed to save", variant: "destructive" }); 
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="pt-8 grid lg:grid-cols-3 gap-10 items-start">
      
      {/* LEFT COLUMN: Text Content */}
      <div className="lg:col-span-2 space-y-6">
          {/* Mini Tag Input */}
          <div className="space-y-2">
            <Label className="text-xs uppercase text-muted-foreground">Mini Tag</Label>
            <Input 
              className="font-mono text-xs uppercase tracking-wider bg-secondary/30"
              value={form.miniTag}
              onChange={(e) => setForm({...form, miniTag: e.target.value})}
              placeholder="MINI TAG"
            />
          </div>

          {/* Title Inputs */}
          <div className="space-y-2">
            <Label className="text-xs uppercase text-muted-foreground">Title Lines (Split by Enter)</Label>
            <Textarea 
              className="text-2xl font-bold font-heading min-h-[100px]"
              value={form.titleLines.join('\n')}
              onChange={(e) => setForm({...form, titleLines: e.target.value.split('\n')})}
              placeholder="Line 1&#10;Line 2"
            />
          </div>

          {/* Subtitle Input */}
          <div className="space-y-2">
            <Label className="text-xs uppercase text-muted-foreground">Subtitle</Label>
            <Textarea 
              className="text-muted-foreground min-h-[80px]"
              value={form.subtitle}
              onChange={(e) => setForm({...form, subtitle: e.target.value})}
              placeholder="Enter hero subtitle..."
            />
          </div>

          {/* CTA Buttons */}
          <div className="grid sm:grid-cols-2 gap-4 pt-4">
            {/* Primary CTA */}
            <div className="p-4 border rounded-lg bg-slate-50 space-y-3">
               <div className="flex items-center justify-between">
                 <span className="text-sm font-bold text-primary">Primary Button</span>
                 <Switch checked={form.ctas.primary.isEnabled} onCheckedChange={(c) => setForm({...form, ctas: {...form.ctas, primary: {...form.ctas.primary, isEnabled: c}}})} />
               </div>
               {form.ctas.primary.isEnabled && (
                 <div className="space-y-2">
                   <Input className="h-8 text-sm" placeholder="Label" value={form.ctas.primary.label} onChange={(e) => setForm({...form, ctas: {...form.ctas, primary: {...form.ctas.primary, label: e.target.value}}})} />
                   <Input className="h-8 text-sm text-muted-foreground" placeholder="Link /path" value={form.ctas.primary.href} onChange={(e) => setForm({...form, ctas: {...form.ctas, primary: {...form.ctas.primary, href: e.target.value}}})} />
                 </div>
               )}
            </div>

            {/* Secondary CTA */}
            <div className="p-4 border rounded-lg bg-slate-50 space-y-3">
               <div className="flex items-center justify-between">
                 <span className="text-sm font-bold text-muted-foreground">Secondary Button</span>
                 <Switch checked={form.ctas.secondary.isEnabled} onCheckedChange={(c) => setForm({...form, ctas: {...form.ctas, secondary: {...form.ctas.secondary, isEnabled: c}}})} />
               </div>
               {form.ctas.secondary.isEnabled && (
                 <div className="space-y-2">
                   <Input className="h-8 text-sm" placeholder="Label" value={form.ctas.secondary.label} onChange={(e) => setForm({...form, ctas: {...form.ctas, secondary: {...form.ctas.secondary, label: e.target.value}}})} />
                   <Input className="h-8 text-sm text-muted-foreground" placeholder="Link /path" value={form.ctas.secondary.href} onChange={(e) => setForm({...form, ctas: {...form.ctas, secondary: {...form.ctas.secondary, href: e.target.value}}})} />
                 </div>
               )}
            </div>
          </div>
      </div>

      {/* RIGHT COLUMN: Image Upload */}
      <div className="lg:col-span-1 space-y-4">
          <Label className="text-xs uppercase text-muted-foreground">Hero Image</Label>
          
          <div className="border-2 border-dashed border-muted-foreground/20 rounded-xl p-1 bg-slate-50 overflow-hidden relative group">
              {/* Image Preview */}
              <div className="aspect-[4/5] relative bg-white rounded-lg overflow-hidden flex items-center justify-center">
                  {preview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={preview} alt="Hero Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center text-muted-foreground gap-2">
                       <ImageIcon className="w-8 h-8 opacity-20" />
                       <span className="text-xs">No Image Set</span>
                    </div>
                  )}
                  
                  {/* Overlay for hover */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="text-white text-xs font-medium">Click button below to change</span>
                  </div>
              </div>
          </div>

          {/* Upload Button */}
          <div className="grid gap-2">
             <Input 
                id="hero-image-upload" 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={handleImageChange}
             />
             <Button variant="outline" className="w-full" onClick={() => document.getElementById('hero-image-upload')?.click()}>
                <Upload className="w-4 h-4 mr-2" /> 
                {preview ? "Replace Image" : "Upload Image"}
             </Button>
             
             {selectedFile && (
                <p className="text-[10px] text-green-600 font-medium text-center truncate px-2">
                  Selected: {selectedFile.name}
                </p>
             )}
          </div>

          <div className="pt-8">
             <Button onClick={handleSave} disabled={saving} className="w-full h-12 text-base shadow-lg shadow-primary/20">
               {saving ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2 w-4 h-4" />}
               Save Hero Section
             </Button>
          </div>
      </div>

    </div>
  );
}

// ============================================================================
// 2. MARQUEE EDITOR
// ============================================================================
function MarqueeEditor({ data, onRefresh }: { data: any, onRefresh: () => void }) {
  const { toast } = useToast();
  const [form, setForm] = useState(data);

  const handleSave = async () => {
    try {
      await updateMarqueeSection(form);
      toast({ title: "Marquee updated" });
    } catch (e) { toast({ title: "Failed", variant: "destructive" }); }
  };

  return (
    <div className="space-y-6 pt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
            <Switch checked={form.isEnabled} onCheckedChange={(c) => setForm({...form, isEnabled: c})} />
            <Input 
                className="font-bold text-lg border-transparent focus:border-primary bg-transparent w-96"
                value={form.heading}
                onChange={(e) => setForm({...form, heading: e.target.value})}
            />
        </div>
        <Button size="sm" onClick={handleSave}><Save className="w-4 h-4 mr-2"/> Save</Button>
      </div>

      {form.isEnabled && (
        <div className="grid gap-2 p-4 bg-white rounded-lg border">
            <Label>Logo URLs (One per line)</Label>
            <Textarea 
                className="font-mono text-xs h-32"
                value={form.images.join('\n')}
                onChange={(e) => setForm({...form, images: e.target.value.split('\n')})}
                placeholder="https://..."
            />
             <div className="flex gap-4 overflow-x-auto pt-4 pb-2">
                {form.images.map((img: string, i: number) => (
                    img.trim() && (
                    <div key={i} className="h-12 w-24 relative border rounded bg-muted flex-shrink-0 flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img} alt="logo" className="max-h-8 max-w-[80%] object-contain" />
                    </div>
                    )
                ))}
             </div>
        </div>
      )}
    </div>
  );
}


// ============================================================================
// 3. TIMELINE EDITOR
// ============================================================================
function TimelineEditor({ data, onRefresh }: { data: any, onRefresh: () => void }) {
  const { toast } = useToast();
  const [meta, setMeta] = useState({ eyebrow: data.eyebrow, heading: data.heading });
  
  // Modal Logic
  const [editingMilestone, setEditingMilestone] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const saveMeta = async () => {
    try { await updateTimelineSection(meta); toast({title:"Meta updated"}); } catch(e){ toast({title:"Error", variant:"destructive"}); }
  };

  const openAdd = () => {
    setEditingMilestone({ isActive: true, iconKey: "Rocket", order: data.milestones.length + 1 });
    setIsModalOpen(true);
  };

  const openEdit = (m: any) => {
    setEditingMilestone(m);
    setIsModalOpen(true);
  };

  const saveMilestone = async () => {
    try {
        if(editingMilestone._id) await updateMilestoneById(editingMilestone._id, editingMilestone);
        else await addMilestone(editingMilestone);
        setIsModalOpen(false);
        onRefresh();
        toast({title:"Milestone saved"});
    } catch(e) { toast({title:"Error", variant:"destructive"}); }
  };

  const deleteMilestone = async (id: string) => {
      if(!confirm("Delete this milestone?")) return;
      try { await deleteMilestoneById(id); onRefresh(); toast({title:"Deleted"}); } catch(e) { toast({title:"Error", variant:"destructive"}); }
  };

  return (
    <div className="space-y-8 pt-4">
        {/* Meta Header */}
        <div className="text-center space-y-2 max-w-md mx-auto">
             <Input 
                className="text-center text-xs uppercase tracking-widest text-primary font-bold border-transparent focus:border-primary bg-transparent"
                value={meta.eyebrow}
                onChange={(e) => setMeta({...meta, eyebrow: e.target.value})}
             />
             <Input 
                className="text-center text-3xl font-bold font-heading border-transparent focus:border-primary bg-transparent"
                value={meta.heading}
                onChange={(e) => setMeta({...meta, heading: e.target.value})}
             />
             <Button variant="ghost" size="sm" onClick={saveMeta} className="text-xs">Update Header Text</Button>
        </div>

        {/* Vertical Timeline Visual */}
        <div className="relative border-l-2 border-border/60 ml-8 md:ml-12 space-y-12 pl-8 pb-4">
            {data.milestones
                .sort((a:any, b:any) => a.order - b.order)
                .map((m: any) => {
                const Icon = IconMap[m.iconKey] || Star;
                return (
                    <div key={m._id} className="relative group p-4 border rounded-xl bg-white hover:shadow-md transition-all">
                        {/* Dot */}
                        <div className="absolute -left-[49px] top-6 h-10 w-10 bg-background border border-border rounded-full flex items-center justify-center text-primary shadow-sm">
                             <Icon className="w-5 h-5" />
                        </div>

                        {/* Content */}
                        <div className="flex justify-between items-start gap-4">
                            <div className="space-y-1 w-full">
                                <div className="flex items-center gap-2">
                                    <Badge variant="secondary">{m.year}</Badge>
                                    <span className="font-bold text-lg">{m.title}</span>
                                    {!m.isActive && <Badge variant="destructive" className="text-[10px] h-5">Hidden</Badge>}
                                </div>
                                <p className="text-muted-foreground text-sm">{m.description}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <Button size="icon" variant="ghost" onClick={() => openEdit(m)}><Edit2 className="w-4 h-4"/></Button>
                                <Button size="icon" variant="ghost" className="text-destructive" onClick={() => deleteMilestone(m._id)}><Trash2 className="w-4 h-4"/></Button>
                            </div>
                        </div>
                    </div>
                );
            })}
            
            {/* Add Button */}
            <Button variant="outline" className="w-full border-dashed" onClick={openAdd}>
                <Plus className="w-4 h-4 mr-2"/> Add New Milestone
            </Button>
        </div>

        {/* Dialog for Editing */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent>
                <DialogHeader><DialogTitle>{editingMilestone?._id ? "Edit" : "Add"} Milestone</DialogTitle></DialogHeader>
                <div className="grid gap-4 py-2">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1"><Label>Year</Label><Input value={editingMilestone?.year || ''} onChange={(e) => setEditingMilestone({...editingMilestone, year: e.target.value})} /></div>
                        <div className="space-y-1"><Label>Icon (Rocket, Star, Users, Award)</Label><Input value={editingMilestone?.iconKey || ''} onChange={(e) => setEditingMilestone({...editingMilestone, iconKey: e.target.value})} /></div>
                    </div>
                    <div className="space-y-1"><Label>Title</Label><Input value={editingMilestone?.title || ''} onChange={(e) => setEditingMilestone({...editingMilestone, title: e.target.value})} /></div>
                    <div className="space-y-1"><Label>Description</Label><Textarea value={editingMilestone?.description || ''} onChange={(e) => setEditingMilestone({...editingMilestone, description: e.target.value})} /></div>
                    <div className="flex items-center justify-between border p-3 rounded-lg">
                        <Label>Is Visible?</Label>
                        <Switch checked={editingMilestone?.isActive} onCheckedChange={(c) => setEditingMilestone({...editingMilestone, isActive: c})} />
                    </div>
                </div>
                <DialogFooter><Button onClick={saveMilestone}>Save Milestone</Button></DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  );
}


// ============================================================================
// 4. TESTIMONIALS EDITOR
// ============================================================================
function TestimonialsEditor({ data, onRefresh }: { data: any, onRefresh: () => void }) {
  const { toast } = useToast();
  const [meta, setMeta] = useState({ isEnabled: data.isEnabled, heading: data.heading });
  
  const handleSave = async () => {
    try {
        await updateTestimonialsSection({ ...meta, items: data.items }); 
        toast({ title: "Updated" });
    } catch(e) { toast({ title: "Error", variant: "destructive" }); }
  };

  return (
    <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Switch checked={meta.isEnabled} onCheckedChange={(c) => setMeta({...meta, isEnabled: c})} />
                <Input 
                    className="font-bold text-2xl border-transparent focus:border-primary bg-transparent w-96"
                    value={meta.heading}
                    onChange={(e) => setMeta({...meta, heading: e.target.value})}
                />
            </div>
            <Button size="sm" onClick={handleSave}><Save className="w-4 h-4 mr-2"/> Save Settings</Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 opacity-70">
             {/* Read Only Preview of items to show layout */}
             {data.items.slice(0, 2).map((item: any, i: number) => (
                 <div key={i} className="p-6 border rounded-xl bg-white shadow-sm">
                     <Quote className="w-6 h-6 text-primary/20 mb-4"/>
                     <p className="text-sm italic mb-4">"{item.quote}"</p>
                     <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-muted overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={item.avatarUrl} alt="" className="w-full h-full object-cover"/>
                         </div>
                         <div>
                             <p className="font-bold text-xs">{item.name}</p>
                             <p className="text-[10px] text-muted-foreground">{item.role}</p>
                         </div>
                     </div>
                 </div>
             ))}
        </div>
        
        <p className="text-center text-sm text-muted-foreground pt-4">
            (To add/remove specific testimonial cards, please use the Global Testimonials Manager or expand this editor similarly to Timeline)
        </p>
    </div>
  );
}