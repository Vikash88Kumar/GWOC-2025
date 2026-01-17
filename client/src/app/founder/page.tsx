'use client'

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, Plus, Trash2, Upload, ImageIcon } from 'lucide-react';
import axios from 'axios'; // Assuming you use axios, or replace with your api instance

// --- API CONFIGURATION ---
// Replace with your actual axios instance import
const api = axios.create({ baseURL: 'http://localhost:8000/api/v1/founderpage' });

export default function FounderAdminView() {
  const { toast } = useToast();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // --- FETCH DATA ---
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get('/');
      setData(res.data.data); // Adjust based on your ApiResponse structure
    } catch (error) {
      toast({ title: "Failed to load data", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>;
  if (!data) return <div>No data found.</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Founder Page Editor</h1>
        <Button variant="outline" onClick={fetchData}>Refresh Data</Button>
      </div>

      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="story">Story</TabsTrigger>
          <TabsTrigger value="values">Values</TabsTrigger>
          <TabsTrigger value="journey">Journey</TabsTrigger>
          <TabsTrigger value="connect">Connect</TabsTrigger>
        </TabsList>

        {/* --- HERO SECTION --- */}
        <TabsContent value="hero">
          <HeroEditor initialData={data.hero} onRefresh={fetchData} />
        </TabsContent>

        {/* --- STORY SECTION --- */}
        <TabsContent value="story">
          <StoryEditor initialData={data.story} onRefresh={fetchData} />
        </TabsContent>

        {/* --- VALUES SECTION --- */}
        <TabsContent value="values">
          <ValuesEditor initialData={data.values || []} onRefresh={fetchData} />
        </TabsContent>

        {/* --- JOURNEY (Milestones & Awards) --- */}
        <TabsContent value="journey">
          <div className="space-y-8">
            <MilestonesEditor initialData={data.milestones || []} onRefresh={fetchData} />
            <AwardsEditor initialData={data.awards || []} onRefresh={fetchData} />
          </div>
        </TabsContent>

        {/* --- CONNECT SECTION --- */}
        <TabsContent value="connect">
          <ConnectEditor initialData={data.connect} onRefresh={fetchData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ============================================================================
// 1. HERO EDITOR (Multipart/FormData for Image)
// ============================================================================
function HeroEditor({ initialData, onRefresh }: { initialData: any, onRefresh: () => void }) {
  const { toast } = useToast();
  const [form, setForm] = useState(initialData || {});
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(initialData?.profileImage || "");
  const [saving, setSaving] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      // Append text fields
      Object.keys(form).forEach(key => {
        if (key !== 'profileImage' && form[key]) formData.append(key, form[key]);
      });
      // Append file matches backend: upload.single("profileImage")
      if (file) formData.append("profileImage", file);

      await api.patch('/hero', formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      
      toast({ title: "Hero updated successfully" });
      onRefresh();
    } catch (error) {
      toast({ title: "Failed to save", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader><CardTitle>Hero Section</CardTitle></CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-6">
          {/* Image Upload */}
          <div className="w-1/3 space-y-4">
            <div className="aspect-[3/4] rounded-lg bg-slate-100 overflow-hidden relative border flex items-center justify-center">
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="w-12 h-12 text-slate-300" />
              )}
            </div>
            <div className="flex items-center gap-2">
                <Input type="file" id="heroImg" className="hidden" onChange={handleFileChange} accept="image/*" />
                <Button variant="outline" className="w-full" onClick={() => document.getElementById('heroImg')?.click()}>
                    <Upload className="w-4 h-4 mr-2" /> Upload Photo
                </Button>
            </div>
          </div>

          {/* Text Fields */}
          <div className="w-2/3 grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>First Name</Label><Input value={form.firstName || ''} onChange={e => setForm({...form, firstName: e.target.value})} /></div>
            <div className="space-y-2"><Label>Last Name</Label><Input value={form.lastName || ''} onChange={e => setForm({...form, lastName: e.target.value})} /></div>
            <div className="col-span-2 space-y-2"><Label>Role</Label><Input value={form.role || ''} onChange={e => setForm({...form, role: e.target.value})} /></div>
            <div className="col-span-2 space-y-2"><Label>Tagline</Label><Textarea value={form.tagline || ''} onChange={e => setForm({...form, tagline: e.target.value})} /></div>
            <div className="space-y-2"><Label>Experience (Years)</Label><Input type="number" value={form.experienceYears || 0} onChange={e => setForm({...form, experienceYears: e.target.value})} /></div>
          </div>
        </div>
        <Button onClick={handleSave} disabled={saving}><Save className="w-4 h-4 mr-2" /> Save Hero</Button>
      </CardContent>
    </Card>
  );
}

// ============================================================================
// 2. STORY EDITOR (JSON)
// ============================================================================
function StoryEditor({ initialData, onRefresh }: { initialData: any, onRefresh: () => void }) {
  const { toast } = useToast();
  const [form, setForm] = useState(initialData || { quote: "", paragraphs: [] });
  const [paragraphsText, setParagraphsText] = useState((initialData?.paragraphs || []).join('\n\n'));

  const handleSave = async () => {
    try {
      // Split paragraphs by double newline for easy editing
      const paragraphsArray = paragraphsText.split('\n\n').filter((p: string) => p.trim() !== "");
      
      await api.patch('/story', {
        quote: form.quote,
        paragraphs: paragraphsArray
      });
      toast({ title: "Story updated" });
      onRefresh();
    } catch (e) { toast({ title: "Error", variant: "destructive" }); }
  };

  return (
    <Card>
      <CardHeader><CardTitle>My Story</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Quote</Label>
          <Textarea className="font-serif italic text-lg" value={form.quote} onChange={e => setForm({...form, quote: e.target.value})} />
        </div>
        <div className="space-y-2">
          <Label>Paragraphs (Separate by double enter)</Label>
          <Textarea className="min-h-[300px]" value={paragraphsText} onChange={e => setParagraphsText(e.target.value)} />
        </div>
        <Button onClick={handleSave}><Save className="w-4 h-4 mr-2" /> Save Story</Button>
      </CardContent>
    </Card>
  );
}

// ============================================================================
// 3. VALUES EDITOR (Array of Objects)
// ============================================================================
function ValuesEditor({ initialData, onRefresh }: { initialData: any[], onRefresh: () => void }) {
  const { toast } = useToast();
  const [values, setValues] = useState(initialData);

  const addValue = () => setValues([...values, { title: "New Value", description: "Desc...", icon: "Lightbulb" }]);
  const removeValue = (idx: number) => setValues(values.filter((_, i) => i !== idx));
  const updateValue = (idx: number, field: string, val: string) => {
    const newVals = [...values];
    newVals[idx] = { ...newVals[idx], [field]: val };
    setValues(newVals);
  };

  const handleSave = async () => {
    try {
      // Backend expects the array directly as req.body
      await api.patch('/values', values);
      toast({ title: "Values updated" });
    } catch (e) { toast({ title: "Error", variant: "destructive" }); }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Core Values</CardTitle>
        <Button size="sm" variant="outline" onClick={addValue}><Plus className="w-4 h-4 mr-2"/> Add Value</Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {values.map((val, idx) => (
          <div key={idx} className="flex gap-4 items-start border p-4 rounded-lg">
            <div className="grid gap-2 flex-1">
              <Input placeholder="Title" value={val.title} onChange={e => updateValue(idx, 'title', e.target.value)} className="font-bold" />
              <Input placeholder="Icon Name (Heart, Brain, Users...)" value={val.icon} onChange={e => updateValue(idx, 'icon', e.target.value)} />
              <Textarea placeholder="Description" value={val.description} onChange={e => updateValue(idx, 'description', e.target.value)} />
            </div>
            <Button variant="ghost" size="icon" onClick={() => removeValue(idx)}><Trash2 className="w-4 h-4 text-red-500" /></Button>
          </div>
        ))}
        <Button onClick={handleSave} className="w-full"><Save className="w-4 h-4 mr-2" /> Save All Values</Button>
      </CardContent>
    </Card>
  );
}

// ============================================================================
// 4. MILESTONES EDITOR (Array)
// ============================================================================
function MilestonesEditor({ initialData, onRefresh }: { initialData: any[], onRefresh: () => void }) {
  const { toast } = useToast();
  const [milestones, setMilestones] = useState(initialData);

  const addM = () => setMilestones([...milestones, { year: "2024", title: "New", description: "..." }]);
  const removeM = (idx: number) => setMilestones(milestones.filter((_, i) => i !== idx));
  const updateM = (idx: number, field: string, val: string) => {
    const newMs = [...milestones];
    newMs[idx] = { ...newMs[idx], [field]: val };
    setMilestones(newMs);
  };

  const handleSave = async () => {
    try {
      await api.patch('/milestones', milestones);
      toast({ title: "Milestones saved" });
    } catch (e) { toast({ title: "Error", variant: "destructive" }); }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Milestones Timeline</CardTitle>
        <Button size="sm" variant="outline" onClick={addM}><Plus className="w-4 h-4 mr-2"/> Add Milestone</Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {milestones.map((m, idx) => (
          <div key={idx} className="flex gap-4 items-start border p-4 rounded-lg bg-slate-50">
             <div className="w-24">
                <Input placeholder="Year" value={m.year} onChange={e => updateM(idx, 'year', e.target.value)} />
             </div>
             <div className="flex-1 space-y-2">
                <Input placeholder="Title" value={m.title} onChange={e => updateM(idx, 'title', e.target.value)} className="font-bold"/>
                <Textarea placeholder="Desc" value={m.description} onChange={e => updateM(idx, 'description', e.target.value)} />
             </div>
             <Button variant="ghost" size="icon" onClick={() => removeM(idx)}><Trash2 className="w-4 h-4 text-red-500" /></Button>
          </div>
        ))}
        <Button onClick={handleSave} className="w-full"><Save className="w-4 h-4 mr-2" /> Save Milestones</Button>
      </CardContent>
    </Card>
  );
}

// ============================================================================
// 5. AWARDS EDITOR (Array)
// ============================================================================
function AwardsEditor({ initialData, onRefresh }: { initialData: any[], onRefresh: () => void }) {
  const { toast } = useToast();
  const [awards, setAwards] = useState(initialData);

  const addA = () => setAwards([...awards, { year: new Date().getFullYear(), title: "Award", description: "..." }]);
  const removeA = (idx: number) => setAwards(awards.filter((_, i) => i !== idx));
  const updateA = (idx: number, field: string, val: any) => {
    const newAs = [...awards];
    newAs[idx] = { ...newAs[idx], [field]: val };
    setAwards(newAs);
  };

  const handleSave = async () => {
    try {
      await api.patch('/awards', awards);
      toast({ title: "Awards saved" });
    } catch (e) { toast({ title: "Error", variant: "destructive" }); }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Awards</CardTitle>
        <Button size="sm" variant="outline" onClick={addA}><Plus className="w-4 h-4 mr-2"/> Add Award</Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {awards.map((a, idx) => (
          <div key={idx} className="flex gap-4 items-center border p-4 rounded-lg">
             <Input type="number" className="w-24" value={a.year} onChange={e => updateA(idx, 'year', Number(e.target.value))} />
             <Input className="flex-1 font-bold" value={a.title} onChange={e => updateA(idx, 'title', e.target.value)} />
             <Input className="flex-1" value={a.description} onChange={e => updateA(idx, 'description', e.target.value)} />
             <Button variant="ghost" size="icon" onClick={() => removeA(idx)}><Trash2 className="w-4 h-4 text-red-500" /></Button>
          </div>
        ))}
        <Button onClick={handleSave} className="w-full"><Save className="w-4 h-4 mr-2" /> Save Awards</Button>
      </CardContent>
    </Card>
  );
}

// ============================================================================
// 6. CONNECT EDITOR
// ============================================================================
function ConnectEditor({ initialData, onRefresh }: { initialData: any, onRefresh: () => void }) {
  const { toast } = useToast();
  const [form, setForm] = useState(initialData || { socials: [] });

  const updateSocial = (idx: number, field: string, val: string) => {
    const newSocials = [...(form.socials || [])];
    newSocials[idx] = { ...newSocials[idx], [field]: val };
    setForm({ ...form, socials: newSocials });
  };

  const handleSave = async () => {
    try {
      await api.patch('/connect', form);
      toast({ title: "Connect section saved" });
    } catch (e) { toast({ title: "Error", variant: "destructive" }); }
  };

  return (
    <Card>
      <CardHeader><CardTitle>Connect & Contact</CardTitle></CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <div className="space-y-2"><Label>Headline</Label><Input value={form.headline || ''} onChange={e => setForm({...form, headline: e.target.value})} /></div>
          <div className="space-y-2"><Label>Sub Headline</Label><Input value={form.subHeadline || ''} onChange={e => setForm({...form, subHeadline: e.target.value})} /></div>
          <div className="space-y-2"><Label>Email Address</Label><Input value={form.email || ''} onChange={e => setForm({...form, email: e.target.value})} /></div>
        </div>

        <div className="space-y-4 pt-4 border-t">
          <Label className="text-lg font-bold">Social Links</Label>
          {(form.socials || []).map((s: any, idx: number) => (
             <div key={idx} className="flex gap-4">
                <Input value={s.label} disabled className="w-32 bg-slate-50" />
                <Input value={s.url} onChange={e => updateSocial(idx, 'url', e.target.value)} placeholder="URL..." />
             </div>
          ))}
        </div>
        <Button onClick={handleSave}><Save className="w-4 h-4 mr-2" /> Save Settings</Button>
      </CardContent>
    </Card>
  );
}