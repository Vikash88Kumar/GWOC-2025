'use client'

import React, { useState, useEffect } from 'react';
import { 
  getFounderPage, 
  updateFounderHero, 
  updateFounderStory, 
  updateFounderValues, 
  updateFounderMilestones, 
  updateFounderConnect 
} from '../../../../services/founder.api.js';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, Plus, Trash2, Heart, Lightbulb, Users, Rocket, Twitter, Linkedin, Instagram, Mail } from 'lucide-react';

// Icon mapping for preview
const IconMap: Record<string, any> = { Heart, Lightbulb, Users, Rocket, Twitter, Linkedin, Instagram, Mail };

export default function FounderAdminView() {
  const { toast } = useToast();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const refreshData = async () => {
    try {
      const res = await getFounderPage();
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
    <div className="max-w-6xl mx-auto space-y-16 pb-20 p-6 bg-slate-50/50">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading">About Founder Page</h1>
          <p className="text-muted-foreground">Edit your personal brand page</p>
        </div>
        <Button variant="outline" onClick={refreshData}>Refresh Data</Button>
      </div>

      {/* ================= HERO SECTION ================= */}
      <section className="relative border-2 border-dashed border-primary/20 rounded-xl p-8 bg-white">
        <div className="absolute top-4 left-4 bg-primary/10 text-primary px-2 py-1 text-xs font-mono uppercase rounded">Hero Section</div>
        <HeroEditor data={data.hero} onRefresh={refreshData} />
      </section>

      {/* ================= STORY SECTION ================= */}
      <section className="relative border-2 border-dashed border-primary/20 rounded-xl p-8 bg-white">
        <div className="absolute top-4 left-4 bg-primary/10 text-primary px-2 py-1 text-xs font-mono uppercase rounded">Story Section</div>
        <StoryEditor data={data.story} onRefresh={refreshData} />
      </section>

      {/* ================= VALUES SECTION ================= */}
      <section className="relative border-2 border-dashed border-primary/20 rounded-xl p-8 bg-white">
        <div className="absolute top-4 left-4 bg-primary/10 text-primary px-2 py-1 text-xs font-mono uppercase rounded">Core Values</div>
        <ValuesEditor data={data.values} onRefresh={refreshData} />
      </section>

      {/* ================= MILESTONES SECTION ================= */}
      <section className="relative border-2 border-dashed border-primary/20 rounded-xl p-8 bg-white">
        <div className="absolute top-4 left-4 bg-primary/10 text-primary px-2 py-1 text-xs font-mono uppercase rounded">Milestones Journey</div>
        <MilestonesEditor data={data.milestones} onRefresh={refreshData} />
      </section>

      {/* ================= CONNECT SECTION ================= */}
      <section className="relative border-2 border-dashed border-primary/20 rounded-xl p-8 bg-white">
        <div className="absolute top-4 left-4 bg-primary/10 text-primary px-2 py-1 text-xs font-mono uppercase rounded">Connect Footer</div>
        <ConnectEditor data={data.connect} onRefresh={refreshData} />
      </section>

    </div>
  );
}

// ------------------------------------------------------------------
// 1. HERO EDITOR
// ------------------------------------------------------------------
function HeroEditor({ data, onRefresh }: { data: any, onRefresh: () => void }) {
  const { toast } = useToast();
  const [form, setForm] = useState(data);
  const [saving, setSaving] = useState(false);

  useEffect(() => { setForm(data) }, [data]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateFounderHero(form);
      toast({ title: "Hero updated" });
      onRefresh();
    } catch (e) { toast({ title: "Failed", variant: "destructive" }); }
    finally { setSaving(false); }
  };

  return (
    <div className="pt-8">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left Side (Text) */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Role / Subtitle</Label>
            <Input 
              className="text-amber-900 font-medium tracking-widest uppercase"
              value={form.role} 
              onChange={e => setForm({...form, role: e.target.value})} 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>First Name</Label>
              <Input className="text-2xl font-bold" value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input className="text-2xl font-bold text-amber-900 italic" value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tagline / Description</Label>
            <Textarea 
              rows={4}
              value={form.tagline} 
              onChange={e => setForm({...form, tagline: e.target.value})} 
            />
          </div>
        </div>

        {/* Right Side (Image & Stats) */}
        <div className="space-y-6">
           <div className="space-y-2">
             <Label>Profile Image URL</Label>
             <div className="flex gap-4">
                <div className="w-24 h-32 bg-muted rounded-lg overflow-hidden shrink-0 border">
                   {/* eslint-disable-next-line @next/next/no-img-element */}
                   <img src={form.profileImage} alt="Preview" className="w-full h-full object-cover" />
                </div>
                <div className="w-full space-y-2">
                    <Input value={form.profileImage} onChange={e => setForm({...form, profileImage: e.target.value})} placeholder="https://..." />
                    <p className="text-xs text-muted-foreground">Paste a direct image link.</p>
                </div>
             </div>
           </div>

           <div className="space-y-2 w-1/2">
              <Label>Years Experience</Label>
              <div className="flex items-center gap-3 border p-3 rounded-lg bg-card">
                 <Input type="number" className="w-20 font-bold text-xl" value={form.experienceYears} onChange={e => setForm({...form, experienceYears: Number(e.target.value)})} />
                 <span className="text-sm text-muted-foreground">Years of Impact Badge</span>
              </div>
           </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Button onClick={handleSave} disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} <Save className="mr-2 h-4 w-4" /> Save Hero
        </Button>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// 2. STORY EDITOR
// ------------------------------------------------------------------
function StoryEditor({ data, onRefresh }: { data: any, onRefresh: () => void }) {
  const { toast } = useToast();
  const [form, setForm] = useState(data);
  const [saving, setSaving] = useState(false);

  useEffect(() => { setForm(data) }, [data]);

  const handleParagraphChange = (index: number, val: string) => {
    const newParas = [...form.paragraphs];
    newParas[index] = val;
    setForm({ ...form, paragraphs: newParas });
  };

  const addParagraph = () => setForm({ ...form, paragraphs: [...form.paragraphs, "New paragraph..."] });
  const removeParagraph = (index: number) => setForm({ ...form, paragraphs: form.paragraphs.filter((_:any, i:number) => i !== index) });

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateFounderStory(form);
      toast({ title: "Story updated" });
      onRefresh();
    } catch (e) { toast({ title: "Failed", variant: "destructive" }); }
    finally { setSaving(false); }
  };

  return (
    <div className="pt-8 space-y-8">
      {/* Quote */}
      <div className="relative pl-8 border-l-4 border-amber-900/20">
        <Label className="mb-2 block font-bold text-amber-900">Main Quote</Label>
        <Textarea 
          className="text-xl italic font-serif bg-muted/20 min-h-[100px]" 
          value={form.quote} 
          onChange={e => setForm({...form, quote: e.target.value})} 
        />
      </div>

      {/* Paragraphs Grid */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
           <Label>Story Content (Paragraphs)</Label>
           <Button size="sm" variant="outline" onClick={addParagraph}><Plus className="w-4 h-4 mr-2"/> Add Paragraph</Button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
           {form.paragraphs.map((para: string, idx: number) => (
             <div key={idx} className="relative group">
                <Textarea 
                  rows={5}
                  value={para}
                  onChange={e => handleParagraphChange(idx, e.target.value)}
                  className="bg-card text-sm leading-relaxed"
                />
                <Button 
                  size="icon" variant="destructive" 
                  className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeParagraph(idx)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
             </div>
           ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} <Save className="mr-2 h-4 w-4" /> Save Story
        </Button>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// 3. VALUES EDITOR
// ------------------------------------------------------------------
function ValuesEditor({ data, onRefresh }: { data: any[], onRefresh: () => void }) {
  const { toast } = useToast();
  const [items, setItems] = useState(data || []);
  const [saving, setSaving] = useState(false);

  useEffect(() => { setItems(data || []) }, [data]);

  const handleChange = (index: number, field: string, value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const addItem = () => setItems([...items, { title: "New Value", description: "Description here", icon: "Heart" }]);
  const removeItem = (index: number) => setItems(items.filter((_, i) => i !== index));

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateFounderValues(items); // Sending array directly based on controller
      toast({ title: "Values updated" });
      onRefresh();
    } catch (e) { toast({ title: "Failed", variant: "destructive" }); }
    finally { setSaving(false); }
  };

  return (
    <div className="pt-8 space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item, idx) => (
          <div key={idx} className="p-4 border rounded-xl bg-card shadow-sm space-y-3 relative group">
             <div className="absolute top-2 right-2">
                <Button size="icon" variant="ghost" className="h-6 w-6 text-destructive" onClick={() => removeItem(idx)}>
                   <Trash2 className="w-3 h-3" />
                </Button>
             </div>
             
             <div>
                <Label className="text-xs text-muted-foreground">Icon Key (Heart, Lightbulb, Users, Rocket)</Label>
                <Input className="h-8" value={item.icon} onChange={e => handleChange(idx, 'icon', e.target.value)} />
             </div>
             <div>
                <Label className="text-xs text-muted-foreground">Title</Label>
                <Input className="font-bold" value={item.title} onChange={e => handleChange(idx, 'title', e.target.value)} />
             </div>
             <div>
                <Label className="text-xs text-muted-foreground">Description</Label>
                <Textarea className="text-xs" rows={3} value={item.description} onChange={e => handleChange(idx, 'description', e.target.value)} />
             </div>
          </div>
        ))}
        
        <Button variant="outline" className="h-full min-h-[200px] border-dashed" onClick={addItem}>
           <Plus className="w-6 h-6 mr-2" /> Add Value
        </Button>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} <Save className="mr-2 h-4 w-4" /> Save Values
        </Button>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// 4. MILESTONES EDITOR
// ------------------------------------------------------------------
function MilestonesEditor({ data, onRefresh }: { data: any[], onRefresh: () => void }) {
  const { toast } = useToast();
  const [items, setItems] = useState(data || []);
  const [saving, setSaving] = useState(false);

  useEffect(() => { setItems(data || []) }, [data]);

  const handleChange = (index: number, field: string, value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const addItem = () => setItems([...items, { year: "2024", title: "New Milestone", description: "Details..." }]);
  const removeItem = (index: number) => setItems(items.filter((_, i) => i !== index));

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateFounderMilestones(items);
      toast({ title: "Milestones updated" });
      onRefresh();
    } catch (e) { toast({ title: "Failed", variant: "destructive" }); }
    finally { setSaving(false); }
  };

  return (
    <div className="pt-8 space-y-4">
      {items.map((item, idx) => (
        <div key={idx} className="flex gap-4 items-start p-4 border rounded-lg bg-white group">
           <div className="w-24 shrink-0">
              <Label className="text-xs">Year</Label>
              <Input className="font-bold text-amber-900" value={item.year} onChange={e => handleChange(idx, 'year', e.target.value)} />
           </div>
           <div className="flex-1 space-y-2">
              <div>
                 <Label className="text-xs">Title</Label>
                 <Input className="font-medium" value={item.title} onChange={e => handleChange(idx, 'title', e.target.value)} />
              </div>
              <div>
                 <Label className="text-xs">Description</Label>
                 <Textarea rows={1} className="min-h-[40px]" value={item.description} onChange={e => handleChange(idx, 'description', e.target.value)} />
              </div>
           </div>
           <Button size="icon" variant="ghost" className="text-destructive mt-6 opacity-50 group-hover:opacity-100" onClick={() => removeItem(idx)}>
              <Trash2 className="w-4 h-4" />
           </Button>
        </div>
      ))}

      <div className="flex justify-between pt-4">
         <Button variant="outline" size="sm" onClick={addItem}><Plus className="w-4 h-4 mr-2"/> Add Milestone</Button>
         <Button onClick={handleSave} disabled={saving}>
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} <Save className="mr-2 h-4 w-4" /> Save Milestones
         </Button>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// 5. CONNECT EDITOR
// ------------------------------------------------------------------
function ConnectEditor({ data, onRefresh }: { data: any, onRefresh: () => void }) {
  const { toast } = useToast();
  const [form, setForm] = useState(data);
  const [saving, setSaving] = useState(false);

  useEffect(() => { setForm(data) }, [data]);

  const handleSocialChange = (index: number, field: string, value: string) => {
    const newSocials = [...form.socials];
    newSocials[index] = { ...newSocials[index], [field]: value };
    setForm({ ...form, socials: newSocials });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateFounderConnect(form);
      toast({ title: "Connect section updated" });
      onRefresh();
    } catch (e) { toast({ title: "Failed", variant: "destructive" }); }
    finally { setSaving(false); }
  };

  return (
    <div className="pt-8 space-y-8">
       <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
             <Label>Sub Headline (Small)</Label>
             <Input value={form.subHeadline} onChange={e => setForm({...form, subHeadline: e.target.value})} className="text-yellow-600" />
          </div>
          <div className="space-y-2 md:col-span-2">
             <Label>Main Headline</Label>
             <Input value={form.headline} onChange={e => setForm({...form, headline: e.target.value})} className="text-xl font-bold" />
          </div>
       </div>

       <div className="space-y-2">
          <Label>Contact Email</Label>
          <Input value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
       </div>

       <div className="space-y-4 pt-4 border-t">
          <Label>Social Links</Label>
          <div className="grid md:grid-cols-3 gap-4">
             {form.socials.map((social: any, idx: number) => (
                <div key={idx} className="p-3 border rounded-lg bg-slate-50 space-y-2">
                   <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase text-muted-foreground">{social.label}</span>
                   </div>
                   <Input value={social.url} onChange={e => handleSocialChange(idx, 'url', e.target.value)} placeholder="https://..." className="text-xs" />
                </div>
             ))}
          </div>
       </div>

       <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} <Save className="mr-2 h-4 w-4" /> Save Connect
        </Button>
      </div>
    </div>
  );
}
