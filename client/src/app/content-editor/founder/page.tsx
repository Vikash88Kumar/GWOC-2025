'use client'

import React, { useState, useEffect } from 'react';
import { 
  getFounderPage, 
  updateFounderHero, 
  updateFounderStory, 
  updateFounderValues, 
  updateFounderMilestones, 
  updateFounderConnect,
  updateFounderAwards 
} from '../../../services/founder.api';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Loader2, Save, Plus, Trash2, Heart, Lightbulb, Users, Rocket, 
  Twitter, Linkedin, Instagram, Mail, Trophy, Sparkles,Upload
} from 'lucide-react';

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

      {/* ================= AWARDS SECTION ================= */}
      <section className="relative border-2 border-dashed border-primary/20 rounded-xl p-8 bg-white">
        <div className="absolute top-4 left-4 bg-primary/10 text-primary px-2 py-1 text-xs font-mono uppercase rounded flex items-center gap-2">
           <Trophy className="w-3 h-3" /> Awards & Recognition
        </div>
        <AwardsEditor data={data.awards} onRefresh={refreshData} />
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
// ------------------------------------------------------------------
// 1. HERO EDITOR (Updated for Image Upload)
// ------------------------------------------------------------------
function HeroEditor({ data, onRefresh }: { data: any, onRefresh: () => void }) {
  const { toast } = useToast();
  const [form, setForm] = useState(data);
  const [saving, setSaving] = useState(false);
  
  // New state for handling file upload
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(data.profileImage || "");

  // Update form and preview when data from DB loads
  useEffect(() => { 
    setForm(data);
    setImagePreview(data.profileImage || ""); // Ensure DB image is shown initially
  }, [data]);

  // Handle File Selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Create a local URL to preview the image immediately
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // 1. Create FormData object
      const formData = new FormData();

      // 2. Append all text fields
      formData.append("role", form.role);
      formData.append("firstName", form.firstName);
      formData.append("lastName", form.lastName);
      formData.append("tagline", form.tagline);
      formData.append("experienceYears", form.experienceYears.toString());

      // 3. Append the file ONLY if a new one was selected
      // IMPORTANT: The string 'image' here must match upload.single('image') in your backend route
      if (selectedFile) {
        formData.append("profileImage", selectedFile);
      }

      // 4. Send FormData
      await updateFounderHero(formData);
      
      toast({ title: "Hero section updated successfully" });
      onRefresh();
    } catch (e) {
      console.error(e);
      toast({ title: "Failed to update", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="pt-8">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left Side (Text Inputs) */}
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

        {/* Right Side (Image Upload & Stats) */}
        <div className="space-y-6">
           <div className="space-y-2">
             <Label>Profile Image</Label>
             
             <div className="flex gap-6 items-start">
                {/* Image Preview Box */}
                <div className="relative group w-32 h-40 bg-muted rounded-lg overflow-hidden shrink-0 border shadow-sm">
                   {imagePreview ? (
                     // eslint-disable-next-line @next/next/no-img-element
                     <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-slate-100">
                       <span className="text-xs">No Image</span>
                     </div>
                   )}
                   
                   {/* Overlay Hint */}
                   <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <span className="text-white text-xs font-medium">Change</span>
                   </div>
                </div>

                {/* Upload Controls */}
                <div className="space-y-3 w-full">
                    <div className="space-y-1">
                      <Label htmlFor="image-upload" className="cursor-pointer">
                        <div className="flex items-center justify-center w-full px-4 py-2 border-2 border-dashed border-primary/20 rounded-md hover:bg-primary/5 transition-colors text-sm text-primary font-medium">
                           <Upload className="w-4 h-4 mr-2" />
                           Choose New Image
                        </div>
                      </Label>
                      <Input 
                        id="image-upload" 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleImageChange}
                      />
                    </div>
                    
                    {selectedFile && (
                      <p className="text-xs text-green-600 font-medium flex items-center">
                        <Sparkles className="w-3 h-3 mr-1" /> 
                        New file selected: {selectedFile.name}
                      </p>
                    )}
                    
                    <p className="text-xs text-muted-foreground">
                      Supported formats: JPG, PNG, WEBP. <br/> Max size: 5MB.
                    </p>
                </div>
             </div>
           </div>

           <div className="space-y-2 w-1/2">
              <Label>Years Experience</Label>
              <div className="flex items-center gap-3 border p-3 rounded-lg bg-card">
                 <Input type="number" className="w-20 font-bold text-xl" value={form.experienceYears} onChange={e => setForm({...form, experienceYears: Number(e.target.value)})} />
                 <span className="text-sm text-muted-foreground">Years of Impact</span>
              </div>
           </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Button onClick={handleSave} disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} <Save className="mr-2 h-4 w-4" /> Save Hero Section
        </Button>
      </div>
    </div>
  );
}

// Ensure you import 'Upload' from lucide-react at the top of your file
// import { ..., Upload } from 'lucide-react';

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
      await updateFounderValues(items);
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
// 4. AWARDS EDITOR
// ------------------------------------------------------------------
function AwardsEditor({ data, onRefresh }: { data: any[], onRefresh: () => void }) {
  const { toast } = useToast();
  const [items, setItems] = useState(data || []);
  const [saving, setSaving] = useState(false);

  useEffect(() => { setItems(data || []) }, [data]);

  const handleChange = (index: number, field: string, value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const addItem = () => setItems([...items, { year: new Date().getFullYear().toString(), title: "New Award", description: "Award description..." }]);
  const removeItem = (index: number) => setItems(items.filter((_, i) => i !== index));

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateFounderAwards(items); 
      toast({ title: "Awards updated successfully" });
      onRefresh();
    } catch (e) { 
      toast({ title: "Failed to update awards", variant: "destructive" }); 
    } finally { 
      setSaving(false); 
    }
  };

  return (
    <div className="pt-8 space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {items.map((item, idx) => (
          <div key={idx} className="relative group p-6 border rounded-xl bg-slate-50/50 hover:bg-white hover:shadow-sm transition-all">
             <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={() => removeItem(idx)}>
                   <Trash2 className="w-4 h-4" />
                </Button>
             </div>

             <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-1/3 space-y-1.5">
                    <Label className="text-xs text-muted-foreground uppercase tracking-wider">Year</Label>
                    <Input 
                      className="font-mono font-bold text-amber-900 bg-white" 
                      value={item.year} 
                      onChange={e => handleChange(idx, 'year', e.target.value)} 
                    />
                  </div>
                  <div className="w-2/3 space-y-1.5">
                    <Label className="text-xs text-muted-foreground uppercase tracking-wider">Award Title</Label>
                    <Input 
                      className="font-bold bg-white" 
                      value={item.title} 
                      onChange={e => handleChange(idx, 'title', e.target.value)} 
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                   <Label className="text-xs text-muted-foreground uppercase tracking-wider">Description</Label>
                   <Textarea 
                      rows={2} 
                      className="resize-none bg-white text-sm" 
                      value={item.description} 
                      onChange={e => handleChange(idx, 'description', e.target.value)} 
                   />
                </div>
             </div>
          </div>
        ))}

        <Button 
          variant="outline" 
          className="h-full min-h-[200px] border-dashed flex flex-col gap-2 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5" 
          onClick={addItem}
        >
           <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-2">
             <Plus className="w-6 h-6" />
           </div>
           <span>Add New Award</span>
        </Button>
      </div>

      <div className="flex justify-end pt-4 border-t">
        <Button onClick={handleSave} disabled={saving} className="bg-amber-900 hover:bg-amber-800">
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} 
          <Save className="mr-2 h-4 w-4" /> Save Awards Section
        </Button>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// 5. MILESTONES EDITOR
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
// 6. CONNECT EDITOR
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