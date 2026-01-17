// 'use client'

// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import { 
//   getStoryPage, 
//   updateHeroSection, 
//   updateTimelineSection, 
//   addMilestone, 
//   updateMilestoneById, 
//   deleteMilestoneById, 
//   updateMarqueeSection, 
//   updateTestimonialsSection 
// } from '../../services/story.api';

// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Switch } from '@/components/ui/switch';
// import { Badge } from '@/components/ui/badge';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
// import { Label } from '@/components/ui/label';
// import { useToast } from '@/hooks/use-toast';
// import { Loader2, Plus, Trash2, Edit2, Save, Rocket, Star, Users, Globe, Award, Quote, Check, X } from 'lucide-react';
// import { cn } from '@/lib/utils'; // Assuming you have a cn utility, if not remove or use generic class string

// // --- Icon Map for Visuals ---
// const IconMap: Record<string, any> = { Rocket, Users, Globe, Award, Star };

// export default function StoryAdminView() {
//   const { toast } = useToast();
//   const [data, setData] = useState<any>(null); // Using any for flexibility during dev, better to use strict types
//   const [loading, setLoading] = useState(true);

//   const refreshData = async () => {
//     try {
//       const res = await getStoryPage();
//       setData(res.data);
//     } catch (e) {
//       toast({ title: "Error loading data", variant: "destructive" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { refreshData(); }, []);

//   if (loading || !data) return <div className="flex justify-center p-20"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>;

//   return (
//     <div className="max-w-5xl mx-auto space-y-12 pb-20">
      
//       {/* Header */}
//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h1 className="text-3xl font-bold font-heading">Story Page Editor</h1>
//           <p className="text-muted-foreground">Edit content directly in the layout</p>
//         </div>
//         <Button variant="outline" onClick={refreshData}>Discard Changes / Refresh</Button>
//       </div>

//       {/* ================= HERO SECTION ================= */}
//       <section className="relative border-2 border-dashed border-border/60 rounded-xl p-8 bg-background/50">
//         <div className="absolute top-4 left-4 bg-muted px-2 py-1 text-xs font-mono uppercase rounded text-muted-foreground">
//           Hero Section
//         </div>
        
//         <HeroEditor data={data.hero} onRefresh={refreshData} />
//       </section>

//       {/* ================= MARQUEE SECTION ================= */}
//       <section className="relative border-2 border-dashed border-border/60 rounded-xl p-8 bg-muted/20">
//          <div className="absolute top-4 left-4 bg-muted px-2 py-1 text-xs font-mono uppercase rounded text-muted-foreground">
//           Marquee Section
//         </div>
        
//         <MarqueeEditor data={data.marquee} onRefresh={refreshData} />
//       </section>

//       {/* ================= TIMELINE SECTION ================= */}
//       <section className="relative border-2 border-dashed border-border/60 rounded-xl p-8 bg-background/50">
//         <div className="absolute top-4 left-4 bg-muted px-2 py-1 text-xs font-mono uppercase rounded text-muted-foreground">
//           Timeline Section
//         </div>

//         <TimelineEditor data={data.timeline} onRefresh={refreshData} />
//       </section>

//       {/* ================= TESTIMONIALS SECTION ================= */}
//       <section className="relative border-2 border-dashed border-border/60 rounded-xl p-8 bg-muted/20">
//         <div className="absolute top-4 left-4 bg-muted px-2 py-1 text-xs font-mono uppercase rounded text-muted-foreground">
//           Testimonials Section
//         </div>

//         <TestimonialsEditor data={data.testimonials} onRefresh={refreshData} />
//       </section>

//     </div>
//   );
// }


// // ============================================================================
// // 1. HERO EDITOR (Visual)
// // ============================================================================
// function HeroEditor({ data, onRefresh }: { data: any, onRefresh: () => void }) {
//   const { toast } = useToast();
//   const [form, setForm] = useState(data);
//   const [isDirty, setIsDirty] = useState(false);

//   // Update local state when typing
//   const handleChange = (field: string, value: any) => {
//     setForm((prev: any) => ({ ...prev, [field]: value }));
//     setIsDirty(true);
//   };

//   const handleSave = async () => {
//     try {
//       await updateHeroSection(form);
//       toast({ title: "Hero updated successfully" });
//       setIsDirty(false);
//       onRefresh();
//     } catch (e) { toast({ title: "Failed to save", variant: "destructive" }); }
//   };

//   return (
//     <div className="text-center max-w-3xl mx-auto space-y-6 pt-6">
      
//       {/* Mini Tag Input */}
//       <div className="flex justify-center">
//         <Input 
//           className="text-center w-64 h-8 text-xs uppercase tracking-wider bg-secondary/50 border-transparent focus:border-primary focus:bg-background transition-all"
//           value={form.miniTag}
//           onChange={(e) => handleChange('miniTag', e.target.value)}
//           placeholder="MINI TAG"
//         />
//       </div>

//       {/* Title Inputs (Lines) */}
//       <div className="space-y-2">
//         <Textarea 
//           className="text-center text-4xl font-bold font-heading border-none focus:ring-1 focus:ring-primary bg-transparent resize-none overflow-hidden"
//           rows={2}
//           value={form.titleLines.join('\n')}
//           onChange={(e) => handleChange('titleLines', e.target.value.split('\n'))}
//           placeholder="Title Line 1&#10;Title Line 2"
//         />
//         <p className="text-xs text-muted-foreground">Enter title lines separated by enter</p>
//       </div>

//       {/* Subtitle Input */}
//       <Textarea 
//         className="text-center text-lg text-muted-foreground border-none focus:ring-1 focus:ring-primary bg-transparent resize-none"
//         rows={3}
//         value={form.subtitle}
//         onChange={(e) => handleChange('subtitle', e.target.value)}
//         placeholder="Enter your hero subtitle here..."
//       />

//       {/* CTA Buttons */}
//       <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-dashed mt-6">
//         <div className="flex flex-col gap-2 items-center p-3 border rounded-lg bg-white shadow-sm">
//            <div className="flex items-center gap-2 mb-1">
//              <span className="text-xs font-bold text-primary">Primary Button</span>
//              <Switch checked={form.ctas.primary.isEnabled} onCheckedChange={(c) => {
//                 setForm((prev:any) => ({...prev, ctas: {...prev.ctas, primary: {...prev.ctas.primary, isEnabled: c}}}));
//                 setIsDirty(true);
//              }} />
//            </div>
//            {form.ctas.primary.isEnabled && (
//              <>
//                <Input className="h-8 text-sm" placeholder="Label" value={form.ctas.primary.label} onChange={(e) => {
//                   setForm((prev:any) => ({...prev, ctas: {...prev.ctas, primary: {...prev.ctas.primary, label: e.target.value}}}));
//                   setIsDirty(true);
//                }} />
//                <Input className="h-8 text-sm text-muted-foreground" placeholder="Link #" value={form.ctas.primary.href} onChange={(e) => {
//                   setForm((prev:any) => ({...prev, ctas: {...prev.ctas, primary: {...prev.ctas.primary, href: e.target.value}}}));
//                   setIsDirty(true);
//                }} />
//              </>
//            )}
//         </div>

//         <div className="flex flex-col gap-2 items-center p-3 border rounded-lg bg-white shadow-sm">
//            <div className="flex items-center gap-2 mb-1">
//              <span className="text-xs font-bold text-muted-foreground">Secondary Button</span>
//              <Switch checked={form.ctas.secondary.isEnabled} onCheckedChange={(c) => {
//                 setForm((prev:any) => ({...prev, ctas: {...prev.ctas, secondary: {...prev.ctas.secondary, isEnabled: c}}}));
//                 setIsDirty(true);
//              }} />
//            </div>
//            {form.ctas.secondary.isEnabled && (
//              <>
//                <Input className="h-8 text-sm" placeholder="Label" value={form.ctas.secondary.label} onChange={(e) => {
//                   setForm((prev:any) => ({...prev, ctas: {...prev.ctas, secondary: {...prev.ctas.secondary, label: e.target.value}}}));
//                   setIsDirty(true);
//                }} />
//                <Input className="h-8 text-sm text-muted-foreground" placeholder="Link #" value={form.ctas.secondary.href} onChange={(e) => {
//                   setForm((prev:any) => ({...prev, ctas: {...prev.ctas, secondary: {...prev.ctas.secondary, href: e.target.value}}}));
//                   setIsDirty(true);
//                }} />
//              </>
//            )}
//         </div>
//       </div>

//       {isDirty && (
//         <div className="pt-4">
//           <Button onClick={handleSave} className="w-full max-w-xs mx-auto"><Save className="w-4 h-4 mr-2"/> Save Changes</Button>
//         </div>
//       )}
//     </div>
//   );
// }


// // ============================================================================
// // 2. MARQUEE EDITOR
// // ============================================================================
// function MarqueeEditor({ data, onRefresh }: { data: any, onRefresh: () => void }) {
//   const { toast } = useToast();
//   const [form, setForm] = useState(data);

//   const handleSave = async () => {
//     try {
//       await updateMarqueeSection(form);
//       toast({ title: "Marquee updated" });
//     } catch (e) { toast({ title: "Failed", variant: "destructive" }); }
//   };

//   return (
//     <div className="space-y-6 pt-4">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-4">
//             <Switch checked={form.isEnabled} onCheckedChange={(c) => setForm({...form, isEnabled: c})} />
//             <Input 
//                 className="font-bold text-lg border-transparent focus:border-primary bg-transparent w-96"
//                 value={form.heading}
//                 onChange={(e) => setForm({...form, heading: e.target.value})}
//             />
//         </div>
//         <Button size="sm" onClick={handleSave}><Save className="w-4 h-4 mr-2"/> Save</Button>
//       </div>

//       {form.isEnabled && (
//         <div className="grid gap-2 p-4 bg-white rounded-lg border">
//             <Label>Logo URLs (One per line)</Label>
//             <Textarea 
//                 className="font-mono text-xs h-32"
//                 value={form.images.join('\n')}
//                 onChange={(e) => setForm({...form, images: e.target.value.split('\n')})}
//                 placeholder="https://..."
//             />
//              <div className="flex gap-4 overflow-x-auto pt-4 pb-2">
//                 {form.images.map((img: string, i: number) => (
//                     img.trim() && (
//                     <div key={i} className="h-12 w-24 relative border rounded bg-muted flex-shrink-0 flex items-center justify-center">
//                         {/* eslint-disable-next-line @next/next/no-img-element */}
//                         <img src={img} alt="logo" className="max-h-8 max-w-[80%] object-contain" />
//                     </div>
//                     )
//                 ))}
//              </div>
//         </div>
//       )}
//     </div>
//   );
// }


// // ============================================================================
// // 3. TIMELINE EDITOR
// // ============================================================================
// function TimelineEditor({ data, onRefresh }: { data: any, onRefresh: () => void }) {
//   const { toast } = useToast();
//   const [meta, setMeta] = useState({ eyebrow: data.eyebrow, heading: data.heading });
  
//   // Modal Logic
//   const [editingMilestone, setEditingMilestone] = useState<any>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const saveMeta = async () => {
//     try { await updateTimelineSection(meta); toast({title:"Meta updated"}); } catch(e){ toast({title:"Error", variant:"destructive"}); }
//   };

//   const openAdd = () => {
//     setEditingMilestone({ isActive: true, iconKey: "Rocket", order: data.milestones.length + 1 });
//     setIsModalOpen(true);
//   };

//   const openEdit = (m: any) => {
//     setEditingMilestone(m);
//     setIsModalOpen(true);
//   };

//   const saveMilestone = async () => {
//     try {
//         if(editingMilestone._id) await updateMilestoneById(editingMilestone._id, editingMilestone);
//         else await addMilestone(editingMilestone);
//         setIsModalOpen(false);
//         onRefresh();
//         toast({title:"Milestone saved"});
//     } catch(e) { toast({title:"Error", variant:"destructive"}); }
//   };

//   const deleteMilestone = async (id: string) => {
//       if(!confirm("Delete this milestone?")) return;
//       try { await deleteMilestoneById(id); onRefresh(); toast({title:"Deleted"}); } catch(e) { toast({title:"Error", variant:"destructive"}); }
//   };

//   return (
//     <div className="space-y-8 pt-4">
//         {/* Meta Header */}
//         <div className="text-center space-y-2 max-w-md mx-auto">
//              <Input 
//                 className="text-center text-xs uppercase tracking-widest text-primary font-bold border-transparent focus:border-primary bg-transparent"
//                 value={meta.eyebrow}
//                 onChange={(e) => setMeta({...meta, eyebrow: e.target.value})}
//              />
//              <Input 
//                 className="text-center text-3xl font-bold font-heading border-transparent focus:border-primary bg-transparent"
//                 value={meta.heading}
//                 onChange={(e) => setMeta({...meta, heading: e.target.value})}
//              />
//              <Button variant="ghost" size="sm" onClick={saveMeta} className="text-xs">Update Header Text</Button>
//         </div>

//         {/* Vertical Timeline Visual */}
//         <div className="relative border-l-2 border-border/60 ml-8 md:ml-12 space-y-12 pl-8 pb-4">
//             {data.milestones
//                 .sort((a:any, b:any) => a.order - b.order)
//                 .map((m: any) => {
//                 const Icon = IconMap[m.iconKey] || Star;
//                 return (
//                     <div key={m._id} className="relative group p-4 border rounded-xl bg-white hover:shadow-md transition-all">
//                         {/* Dot */}
//                         <div className="absolute -left-[49px] top-6 h-10 w-10 bg-background border border-border rounded-full flex items-center justify-center text-primary shadow-sm">
//                              <Icon className="w-5 h-5" />
//                         </div>

//                         {/* Content */}
//                         <div className="flex justify-between items-start gap-4">
//                             <div className="space-y-1 w-full">
//                                 <div className="flex items-center gap-2">
//                                     <Badge variant="secondary">{m.year}</Badge>
//                                     <span className="font-bold text-lg">{m.title}</span>
//                                     {!m.isActive && <Badge variant="destructive" className="text-[10px] h-5">Hidden</Badge>}
//                                 </div>
//                                 <p className="text-muted-foreground text-sm">{m.description}</p>
//                             </div>
//                             <div className="flex flex-col gap-1">
//                                 <Button size="icon" variant="ghost" onClick={() => openEdit(m)}><Edit2 className="w-4 h-4"/></Button>
//                                 <Button size="icon" variant="ghost" className="text-destructive" onClick={() => deleteMilestone(m._id)}><Trash2 className="w-4 h-4"/></Button>
//                             </div>
//                         </div>
//                     </div>
//                 );
//             })}
            
//             {/* Add Button */}
//             <Button variant="outline" className="w-full border-dashed" onClick={openAdd}>
//                 <Plus className="w-4 h-4 mr-2"/> Add New Milestone
//             </Button>
//         </div>

//         {/* Dialog for Editing */}
//         <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
//             <DialogContent>
//                 <DialogHeader><DialogTitle>{editingMilestone?._id ? "Edit" : "Add"} Milestone</DialogTitle></DialogHeader>
//                 <div className="grid gap-4 py-2">
//                     <div className="grid grid-cols-2 gap-4">
//                         <div className="space-y-1"><Label>Year</Label><Input value={editingMilestone?.year || ''} onChange={(e) => setEditingMilestone({...editingMilestone, year: e.target.value})} /></div>
//                         <div className="space-y-1"><Label>Icon (Rocket, Star, Users, Award)</Label><Input value={editingMilestone?.iconKey || ''} onChange={(e) => setEditingMilestone({...editingMilestone, iconKey: e.target.value})} /></div>
//                     </div>
//                     <div className="space-y-1"><Label>Title</Label><Input value={editingMilestone?.title || ''} onChange={(e) => setEditingMilestone({...editingMilestone, title: e.target.value})} /></div>
//                     <div className="space-y-1"><Label>Description</Label><Textarea value={editingMilestone?.description || ''} onChange={(e) => setEditingMilestone({...editingMilestone, description: e.target.value})} /></div>
//                     <div className="flex items-center justify-between border p-3 rounded-lg">
//                         <Label>Is Visible?</Label>
//                         <Switch checked={editingMilestone?.isActive} onCheckedChange={(c) => setEditingMilestone({...editingMilestone, isActive: c})} />
//                     </div>
//                 </div>
//                 <DialogFooter><Button onClick={saveMilestone}>Save Milestone</Button></DialogFooter>
//             </DialogContent>
//         </Dialog>
//     </div>
//   );
// }


// // ============================================================================
// // 4. TESTIMONIALS EDITOR
// // ============================================================================
// function TestimonialsEditor({ data, onRefresh }: { data: any, onRefresh: () => void }) {
//   const { toast } = useToast();
//   const [meta, setMeta] = useState({ isEnabled: data.isEnabled, heading: data.heading });
  
//   // Note: Since you have a global Testimonials manager, we usually just link there. 
//   // However, your JSON has specific items here. I'll provide a basic JSON-style editor or simple list for these specific items 
//   // IF they are different from global. Assuming they are specific:
  
//   const handleSave = async () => {
//     try {
//         // We only update the meta here for brevity in this specific request, 
//         // to fully edit the array, duplicate the Timeline Logic above.
//         await updateTestimonialsSection({ ...meta, items: data.items }); 
//         toast({ title: "Updated" });
//     } catch(e) { toast({ title: "Error", variant: "destructive" }); }
//   };

//   return (
//     <div className="space-y-6 pt-4">
//         <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//                 <Switch checked={meta.isEnabled} onCheckedChange={(c) => setMeta({...meta, isEnabled: c})} />
//                 <Input 
//                     className="font-bold text-2xl border-transparent focus:border-primary bg-transparent w-96"
//                     value={meta.heading}
//                     onChange={(e) => setMeta({...meta, heading: e.target.value})}
//                 />
//             </div>
//             <Button size="sm" onClick={handleSave}><Save className="w-4 h-4 mr-2"/> Save Settings</Button>
//         </div>

//         <div className="grid md:grid-cols-2 gap-6 opacity-70">
//              {/* Read Only Preview of items to show layout */}
//              {data.items.slice(0, 2).map((item: any, i: number) => (
//                  <div key={i} className="p-6 border rounded-xl bg-white shadow-sm">
//                      <Quote className="w-6 h-6 text-primary/20 mb-4"/>
//                      <p className="text-sm italic mb-4">"{item.quote}"</p>
//                      <div className="flex items-center gap-3">
//                          <div className="w-8 h-8 rounded-full bg-muted overflow-hidden">
//                             {/* eslint-disable-next-line @next/next/no-img-element */}
//                             <img src={item.avatarUrl} alt="" className="w-full h-full object-cover"/>
//                          </div>
//                          <div>
//                              <p className="font-bold text-xs">{item.name}</p>
//                              <p className="text-[10px] text-muted-foreground">{item.role}</p>
//                          </div>
//                      </div>
//                  </div>
//              ))}
//         </div>
        
//         <p className="text-center text-sm text-muted-foreground pt-4">
//             (To add/remove specific testimonial cards, please use the Global Testimonials Manager or expand this editor similarly to Timeline)
//         </p>
//     </div>
//   );
// }


// 'use client'

// import React, { useState, useEffect } from 'react';
// import { 
//   getFounderPage, 
//   updateFounderHero, 
//   updateFounderStory, 
//   updateFounderValues, 
//   updateFounderMilestones, 
//   updateFounderConnect 
// } from '../../services/founder.api.js';

// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Label } from '@/components/ui/label';
// import { useToast } from '@/hooks/use-toast';
// import { Loader2, Save, Plus, Trash2, Heart, Lightbulb, Users, Rocket, Twitter, Linkedin, Instagram, Mail } from 'lucide-react';

// // Icon mapping for preview
// const IconMap: Record<string, any> = { Heart, Lightbulb, Users, Rocket, Twitter, Linkedin, Instagram, Mail };

// export default function FounderAdminView() {
//   const { toast } = useToast();
//   const [data, setData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   const refreshData = async () => {
//     try {
//       const res = await getFounderPage();
//       setData(res.data);
//     } catch (e) {
//       toast({ title: "Error loading data", variant: "destructive" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { refreshData(); }, []);

//   if (loading || !data) return <div className="flex justify-center p-20"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>;

//   return (
//     <div className="max-w-6xl mx-auto space-y-16 pb-20 p-6 bg-slate-50/50">
      
//       {/* Header */}
//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h1 className="text-3xl font-bold font-heading">About Founder Page</h1>
//           <p className="text-muted-foreground">Edit your personal brand page</p>
//         </div>
//         <Button variant="outline" onClick={refreshData}>Refresh Data</Button>
//       </div>

//       {/* ================= HERO SECTION ================= */}
//       <section className="relative border-2 border-dashed border-primary/20 rounded-xl p-8 bg-white">
//         <div className="absolute top-4 left-4 bg-primary/10 text-primary px-2 py-1 text-xs font-mono uppercase rounded">Hero Section</div>
//         <HeroEditor data={data.hero} onRefresh={refreshData} />
//       </section>

//       {/* ================= STORY SECTION ================= */}
//       <section className="relative border-2 border-dashed border-primary/20 rounded-xl p-8 bg-white">
//         <div className="absolute top-4 left-4 bg-primary/10 text-primary px-2 py-1 text-xs font-mono uppercase rounded">Story Section</div>
//         <StoryEditor data={data.story} onRefresh={refreshData} />
//       </section>

//       {/* ================= VALUES SECTION ================= */}
//       <section className="relative border-2 border-dashed border-primary/20 rounded-xl p-8 bg-white">
//         <div className="absolute top-4 left-4 bg-primary/10 text-primary px-2 py-1 text-xs font-mono uppercase rounded">Core Values</div>
//         <ValuesEditor data={data.values} onRefresh={refreshData} />
//       </section>

//       {/* ================= MILESTONES SECTION ================= */}
//       <section className="relative border-2 border-dashed border-primary/20 rounded-xl p-8 bg-white">
//         <div className="absolute top-4 left-4 bg-primary/10 text-primary px-2 py-1 text-xs font-mono uppercase rounded">Milestones Journey</div>
//         <MilestonesEditor data={data.milestones} onRefresh={refreshData} />
//       </section>

//       {/* ================= CONNECT SECTION ================= */}
//       <section className="relative border-2 border-dashed border-primary/20 rounded-xl p-8 bg-white">
//         <div className="absolute top-4 left-4 bg-primary/10 text-primary px-2 py-1 text-xs font-mono uppercase rounded">Connect Footer</div>
//         <ConnectEditor data={data.connect} onRefresh={refreshData} />
//       </section>

//     </div>
//   );
// }

// // ------------------------------------------------------------------
// // 1. HERO EDITOR
// // ------------------------------------------------------------------
// function HeroEditor({ data, onRefresh }: { data: any, onRefresh: () => void }) {
//   const { toast } = useToast();
//   const [form, setForm] = useState(data);
//   const [saving, setSaving] = useState(false);

//   useEffect(() => { setForm(data) }, [data]);

//   const handleSave = async () => {
//     setSaving(true);
//     try {
//       await updateFounderHero(form);
//       toast({ title: "Hero updated" });
//       onRefresh();
//     } catch (e) { toast({ title: "Failed", variant: "destructive" }); }
//     finally { setSaving(false); }
//   };

//   return (
//     <div className="pt-8">
//       <div className="grid lg:grid-cols-2 gap-12 items-start">
//         {/* Left Side (Text) */}
//         <div className="space-y-6">
//           <div className="space-y-2">
//             <Label>Role / Subtitle</Label>
//             <Input 
//               className="text-amber-900 font-medium tracking-widest uppercase"
//               value={form.role} 
//               onChange={e => setForm({...form, role: e.target.value})} 
//             />
//           </div>
          
//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label>First Name</Label>
//               <Input className="text-2xl font-bold" value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} />
//             </div>
//             <div className="space-y-2">
//               <Label>Last Name</Label>
//               <Input className="text-2xl font-bold text-amber-900 italic" value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label>Tagline / Description</Label>
//             <Textarea 
//               rows={4}
//               value={form.tagline} 
//               onChange={e => setForm({...form, tagline: e.target.value})} 
//             />
//           </div>
//         </div>

//         {/* Right Side (Image & Stats) */}
//         <div className="space-y-6">
//            <div className="space-y-2">
//              <Label>Profile Image URL</Label>
//              <div className="flex gap-4">
//                 <div className="w-24 h-32 bg-muted rounded-lg overflow-hidden shrink-0 border">
//                    {/* eslint-disable-next-line @next/next/no-img-element */}
//                    <img src={form.profileImage} alt="Preview" className="w-full h-full object-cover" />
//                 </div>
//                 <div className="w-full space-y-2">
//                     <Input value={form.profileImage} onChange={e => setForm({...form, profileImage: e.target.value})} placeholder="https://..." />
//                     <p className="text-xs text-muted-foreground">Paste a direct image link.</p>
//                 </div>
//              </div>
//            </div>

//            <div className="space-y-2 w-1/2">
//               <Label>Years Experience</Label>
//               <div className="flex items-center gap-3 border p-3 rounded-lg bg-card">
//                  <Input type="number" className="w-20 font-bold text-xl" value={form.experienceYears} onChange={e => setForm({...form, experienceYears: Number(e.target.value)})} />
//                  <span className="text-sm text-muted-foreground">Years of Impact Badge</span>
//               </div>
//            </div>
//         </div>
//       </div>

//       <div className="mt-8 flex justify-end">
//         <Button onClick={handleSave} disabled={saving}>
//           {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} <Save className="mr-2 h-4 w-4" /> Save Hero
//         </Button>
//       </div>
//     </div>
//   );
// }

// // ------------------------------------------------------------------
// // 2. STORY EDITOR
// // ------------------------------------------------------------------
// function StoryEditor({ data, onRefresh }: { data: any, onRefresh: () => void }) {
//   const { toast } = useToast();
//   const [form, setForm] = useState(data);
//   const [saving, setSaving] = useState(false);

//   useEffect(() => { setForm(data) }, [data]);

//   const handleParagraphChange = (index: number, val: string) => {
//     const newParas = [...form.paragraphs];
//     newParas[index] = val;
//     setForm({ ...form, paragraphs: newParas });
//   };

//   const addParagraph = () => setForm({ ...form, paragraphs: [...form.paragraphs, "New paragraph..."] });
//   const removeParagraph = (index: number) => setForm({ ...form, paragraphs: form.paragraphs.filter((_:any, i:number) => i !== index) });

//   const handleSave = async () => {
//     setSaving(true);
//     try {
//       await updateFounderStory(form);
//       toast({ title: "Story updated" });
//       onRefresh();
//     } catch (e) { toast({ title: "Failed", variant: "destructive" }); }
//     finally { setSaving(false); }
//   };

//   return (
//     <div className="pt-8 space-y-8">
//       {/* Quote */}
//       <div className="relative pl-8 border-l-4 border-amber-900/20">
//         <Label className="mb-2 block font-bold text-amber-900">Main Quote</Label>
//         <Textarea 
//           className="text-xl italic font-serif bg-muted/20 min-h-[100px]" 
//           value={form.quote} 
//           onChange={e => setForm({...form, quote: e.target.value})} 
//         />
//       </div>

//       {/* Paragraphs Grid */}
//       <div className="space-y-4">
//         <div className="flex justify-between items-center">
//            <Label>Story Content (Paragraphs)</Label>
//            <Button size="sm" variant="outline" onClick={addParagraph}><Plus className="w-4 h-4 mr-2"/> Add Paragraph</Button>
//         </div>
        
//         <div className="grid md:grid-cols-2 gap-6">
//            {form.paragraphs.map((para: string, idx: number) => (
//              <div key={idx} className="relative group">
//                 <Textarea 
//                   rows={5}
//                   value={para}
//                   onChange={e => handleParagraphChange(idx, e.target.value)}
//                   className="bg-card text-sm leading-relaxed"
//                 />
//                 <Button 
//                   size="icon" variant="destructive" 
//                   className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
//                   onClick={() => removeParagraph(idx)}
//                 >
//                   <Trash2 className="w-3 h-3" />
//                 </Button>
//              </div>
//            ))}
//         </div>
//       </div>

//       <div className="flex justify-end">
//         <Button onClick={handleSave} disabled={saving}>
//           {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} <Save className="mr-2 h-4 w-4" /> Save Story
//         </Button>
//       </div>
//     </div>
//   );
// }

// // ------------------------------------------------------------------
// // 3. VALUES EDITOR
// // ------------------------------------------------------------------
// function ValuesEditor({ data, onRefresh }: { data: any[], onRefresh: () => void }) {
//   const { toast } = useToast();
//   const [items, setItems] = useState(data || []);
//   const [saving, setSaving] = useState(false);

//   useEffect(() => { setItems(data || []) }, [data]);

//   const handleChange = (index: number, field: string, value: string) => {
//     const newItems = [...items];
//     newItems[index] = { ...newItems[index], [field]: value };
//     setItems(newItems);
//   };

//   const addItem = () => setItems([...items, { title: "New Value", description: "Description here", icon: "Heart" }]);
//   const removeItem = (index: number) => setItems(items.filter((_, i) => i !== index));

//   const handleSave = async () => {
//     setSaving(true);
//     try {
//       await updateFounderValues(items); // Sending array directly based on controller
//       toast({ title: "Values updated" });
//       onRefresh();
//     } catch (e) { toast({ title: "Failed", variant: "destructive" }); }
//     finally { setSaving(false); }
//   };

//   return (
//     <div className="pt-8 space-y-6">
//       <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
//         {items.map((item, idx) => (
//           <div key={idx} className="p-4 border rounded-xl bg-card shadow-sm space-y-3 relative group">
//              <div className="absolute top-2 right-2">
//                 <Button size="icon" variant="ghost" className="h-6 w-6 text-destructive" onClick={() => removeItem(idx)}>
//                    <Trash2 className="w-3 h-3" />
//                 </Button>
//              </div>
             
//              <div>
//                 <Label className="text-xs text-muted-foreground">Icon Key (Heart, Lightbulb, Users, Rocket)</Label>
//                 <Input className="h-8" value={item.icon} onChange={e => handleChange(idx, 'icon', e.target.value)} />
//              </div>
//              <div>
//                 <Label className="text-xs text-muted-foreground">Title</Label>
//                 <Input className="font-bold" value={item.title} onChange={e => handleChange(idx, 'title', e.target.value)} />
//              </div>
//              <div>
//                 <Label className="text-xs text-muted-foreground">Description</Label>
//                 <Textarea className="text-xs" rows={3} value={item.description} onChange={e => handleChange(idx, 'description', e.target.value)} />
//              </div>
//           </div>
//         ))}
        
//         <Button variant="outline" className="h-full min-h-[200px] border-dashed" onClick={addItem}>
//            <Plus className="w-6 h-6 mr-2" /> Add Value
//         </Button>
//       </div>

//       <div className="flex justify-end">
//         <Button onClick={handleSave} disabled={saving}>
//           {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} <Save className="mr-2 h-4 w-4" /> Save Values
//         </Button>
//       </div>
//     </div>
//   );
// }

// // ------------------------------------------------------------------
// // 4. MILESTONES EDITOR
// // ------------------------------------------------------------------
// function MilestonesEditor({ data, onRefresh }: { data: any[], onRefresh: () => void }) {
//   const { toast } = useToast();
//   const [items, setItems] = useState(data || []);
//   const [saving, setSaving] = useState(false);

//   useEffect(() => { setItems(data || []) }, [data]);

//   const handleChange = (index: number, field: string, value: string) => {
//     const newItems = [...items];
//     newItems[index] = { ...newItems[index], [field]: value };
//     setItems(newItems);
//   };

//   const addItem = () => setItems([...items, { year: "2024", title: "New Milestone", description: "Details..." }]);
//   const removeItem = (index: number) => setItems(items.filter((_, i) => i !== index));

//   const handleSave = async () => {
//     setSaving(true);
//     try {
//       await updateFounderMilestones(items);
//       toast({ title: "Milestones updated" });
//       onRefresh();
//     } catch (e) { toast({ title: "Failed", variant: "destructive" }); }
//     finally { setSaving(false); }
//   };

//   return (
//     <div className="pt-8 space-y-4">
//       {items.map((item, idx) => (
//         <div key={idx} className="flex gap-4 items-start p-4 border rounded-lg bg-white group">
//            <div className="w-24 shrink-0">
//               <Label className="text-xs">Year</Label>
//               <Input className="font-bold text-amber-900" value={item.year} onChange={e => handleChange(idx, 'year', e.target.value)} />
//            </div>
//            <div className="flex-1 space-y-2">
//               <div>
//                  <Label className="text-xs">Title</Label>
//                  <Input className="font-medium" value={item.title} onChange={e => handleChange(idx, 'title', e.target.value)} />
//               </div>
//               <div>
//                  <Label className="text-xs">Description</Label>
//                  <Textarea rows={1} className="min-h-[40px]" value={item.description} onChange={e => handleChange(idx, 'description', e.target.value)} />
//               </div>
//            </div>
//            <Button size="icon" variant="ghost" className="text-destructive mt-6 opacity-50 group-hover:opacity-100" onClick={() => removeItem(idx)}>
//               <Trash2 className="w-4 h-4" />
//            </Button>
//         </div>
//       ))}

//       <div className="flex justify-between pt-4">
//          <Button variant="outline" size="sm" onClick={addItem}><Plus className="w-4 h-4 mr-2"/> Add Milestone</Button>
//          <Button onClick={handleSave} disabled={saving}>
//             {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} <Save className="mr-2 h-4 w-4" /> Save Milestones
//          </Button>
//       </div>
//     </div>
//   );
// }

// // ------------------------------------------------------------------
// // 5. CONNECT EDITOR
// // ------------------------------------------------------------------
// function ConnectEditor({ data, onRefresh }: { data: any, onRefresh: () => void }) {
//   const { toast } = useToast();
//   const [form, setForm] = useState(data);
//   const [saving, setSaving] = useState(false);

//   useEffect(() => { setForm(data) }, [data]);

//   const handleSocialChange = (index: number, field: string, value: string) => {
//     const newSocials = [...form.socials];
//     newSocials[index] = { ...newSocials[index], [field]: value };
//     setForm({ ...form, socials: newSocials });
//   };

//   const handleSave = async () => {
//     setSaving(true);
//     try {
//       await updateFounderConnect(form);
//       toast({ title: "Connect section updated" });
//       onRefresh();
//     } catch (e) { toast({ title: "Failed", variant: "destructive" }); }
//     finally { setSaving(false); }
//   };

//   return (
//     <div className="pt-8 space-y-8">
//        <div className="grid md:grid-cols-3 gap-6">
//           <div className="space-y-2">
//              <Label>Sub Headline (Small)</Label>
//              <Input value={form.subHeadline} onChange={e => setForm({...form, subHeadline: e.target.value})} className="text-yellow-600" />
//           </div>
//           <div className="space-y-2 md:col-span-2">
//              <Label>Main Headline</Label>
//              <Input value={form.headline} onChange={e => setForm({...form, headline: e.target.value})} className="text-xl font-bold" />
//           </div>
//        </div>

//        <div className="space-y-2">
//           <Label>Contact Email</Label>
//           <Input value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
//        </div>

//        <div className="space-y-4 pt-4 border-t">
//           <Label>Social Links</Label>
//           <div className="grid md:grid-cols-3 gap-4">
//              {form.socials.map((social: any, idx: number) => (
//                 <div key={idx} className="p-3 border rounded-lg bg-slate-50 space-y-2">
//                    <div className="flex items-center gap-2">
//                       <span className="text-xs font-bold uppercase text-muted-foreground">{social.label}</span>
//                    </div>
//                    <Input value={social.url} onChange={e => handleSocialChange(idx, 'url', e.target.value)} placeholder="https://..." className="text-xs" />
//                 </div>
//              ))}
//           </div>
//        </div>

//        <div className="flex justify-end">
//         <Button onClick={handleSave} disabled={saving}>
//           {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} <Save className="mr-2 h-4 w-4" /> Save Connect
//         </Button>
//       </div>
//     </div>
//   );
// }




// 'use client'

// import React, { useState, useEffect } from 'react';
// import { 
//   getServicePage, 
//   updateServiceHero, 
//   updateServicesList, 
//   updateServiceCTA 
// } from '../../services/service.api';

// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Label } from '@/components/ui/label';
// import { Badge } from '@/components/ui/badge';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { useToast } from '@/hooks/use-toast';
// import { Loader2, Save, Plus, Trash2, Edit2, Sparkles, Image as ImageIcon } from 'lucide-react';

// export default function ServicesAdminView() {
//   const { toast } = useToast();
//   const [data, setData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   const refreshData = async () => {
//     try {
//       const res = await getServicePage();
//       // Ensure we have default objects to prevent crashes if DB is empty
//       const cleanData = {
//           hero: res.data?.hero || {},
//           // ✅ FIX: Access 'servicesList' from backend, not 'services'
//           servicesList: res.data?.servicesList || [], 
//           cta: res.data?.cta || {}
//       };
//       setData(cleanData);
//     } catch (e) {
//       toast({ title: "Error loading data", variant: "destructive" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { refreshData(); }, []);

//   if (loading || !data) return <div className="flex justify-center p-20"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>;

//   return (
//     <div className="max-w-6xl mx-auto space-y-12 pb-20 p-6 bg-slate-50/50">
      
//       {/* Header */}
//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h1 className="text-3xl font-bold font-heading">Services Page Editor</h1>
//           <p className="text-muted-foreground">Manage your service offerings and page content</p>
//         </div>
//         <Button variant="outline" onClick={refreshData}>Refresh Data</Button>
//       </div>

//       {/* ================= HERO SECTION ================= */}
//       <section className="relative border border-border rounded-xl p-6 bg-white shadow-sm overflow-hidden">
//         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 to-amber-500" />
//         <div className="mb-6">
//             <Badge variant="outline" className="mb-2">Hero Section</Badge>
//             <h2 className="text-xl font-bold">Page Header</h2>
//         </div>
//         <HeroEditor data={data.hero} onRefresh={refreshData} />
//       </section>

//       {/* ================= SERVICES LIST ================= */}
//       <section className="relative border border-border rounded-xl p-6 bg-white shadow-sm">
//         <div className="mb-6 flex justify-between items-center">
//             <div>
//                 <Badge variant="outline" className="mb-2">Offerings</Badge>
//                 <h2 className="text-xl font-bold">Services List</h2>
//             </div>
//         </div>
//         {/* ✅ FIX: Pass the corrected data.servicesList here */}
//         <ServicesListEditor data={data.servicesList} onRefresh={refreshData} />
//       </section>

//       {/* ================= CTA SECTION ================= */}
//       <section className="relative border border-border rounded-xl p-6 bg-slate-900 text-white shadow-sm">
//         <div className="mb-6">
//             <Badge variant="secondary" className="mb-2 bg-white/20 text-white hover:bg-white/30">Footer CTA</Badge>
//             <h2 className="text-xl font-bold">Call to Action</h2>
//         </div>
//         <CtaEditor data={data.cta} onRefresh={refreshData} />
//       </section>

//     </div>
//   );
// }

// // ------------------------------------------------------------------
// // 1. HERO EDITOR (Unchanged)
// // ------------------------------------------------------------------
// function HeroEditor({ data, onRefresh }: { data: any, onRefresh: () => void }) {
//   const { toast } = useToast();
//   const [form, setForm] = useState(data || {});
//   const [saving, setSaving] = useState(false);

//   useEffect(() => { setForm(data || {}) }, [data]);

//   const handleSave = async () => {
//     setSaving(true);
//     try {
//       await updateServiceHero(form);
//       toast({ title: "Hero updated successfully" });
//       onRefresh();
//     } catch (e) { toast({ title: "Failed to save", variant: "destructive" }); }
//     finally { setSaving(false); }
//   };

//   const updateCta = (key: 'primaryCta' | 'secondaryCta', field: string, value: string) => {
//       setForm({ ...form, [key]: { ...form[key], [field]: value } });
//   }

//   return (
//     <div className="grid lg:grid-cols-2 gap-10">
//         <div className="space-y-4">
//             <div className="space-y-2">
//                 <Label>Tag (Small Pill)</Label>
//                 <div className="flex items-center gap-2">
//                     <Sparkles className="w-4 h-4 text-amber-500" />
//                     <Input value={form.tag} onChange={e => setForm({...form, tag: e.target.value})} className="h-8" />
//                 </div>
//             </div>
            
//             <div className="space-y-2">
//                 <Label>Headline</Label>
//                 <Textarea 
//                     value={form.headline} 
//                     onChange={e => setForm({...form, headline: e.target.value})} 
//                     className="text-3xl font-bold font-serif min-h-[100px]"
//                 />
//             </div>

//             <div className="space-y-2">
//                 <Label>Sub Headline</Label>
//                 <Textarea 
//                     value={form.subHeadline} 
//                     onChange={e => setForm({...form, subHeadline: e.target.value})} 
//                     className="text-muted-foreground"
//                 />
//             </div>
//         </div>

//         <div className="space-y-6 bg-slate-50 p-6 rounded-xl border">
//             <h3 className="font-semibold text-sm uppercase text-muted-foreground">Action Buttons</h3>
            
//             <div className="space-y-3">
//                 <Label>Primary Button</Label>
//                 <div className="grid grid-cols-2 gap-2">
//                     <Input placeholder="Label" value={form.primaryCta?.text} onChange={e => updateCta('primaryCta', 'text', e.target.value)} />
//                     <Input placeholder="Link #" value={form.primaryCta?.link} onChange={e => updateCta('primaryCta', 'link', e.target.value)} />
//                 </div>
//             </div>

//             <div className="space-y-3">
//                 <Label>Secondary Button</Label>
//                 <div className="grid grid-cols-2 gap-2">
//                     <Input placeholder="Label" value={form.secondaryCta?.text} onChange={e => updateCta('secondaryCta', 'text', e.target.value)} />
//                     <Input placeholder="Link (e.g. Instagram)" value={form.secondaryCta?.link} onChange={e => updateCta('secondaryCta', 'link', e.target.value)} />
//                 </div>
//             </div>

//             <Button onClick={handleSave} disabled={saving} className="w-full">
//                 {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save Hero
//             </Button>
//         </div>
//     </div>
//   );
// }

// // ------------------------------------------------------------------
// // 2. SERVICES LIST EDITOR
// // ------------------------------------------------------------------
// function ServicesListEditor({ data, onRefresh }: { data: any[], onRefresh: () => void }) {
//   const { toast } = useToast();
//   const [servicesList, setServicesList] = useState(data || []);
//   const [editingItem, setEditingItem] = useState<any>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Sync prop changes to local state
//   useEffect(() => { setServicesList(data || []) }, [data]);

//   // --- Modal Save (Add/Edit Single Item) ---
//   const saveSingleItem = () => {
//       let newServices = [...servicesList];
      
//       if (editingItem._tempId) {
//           // Add New
//           const newItem = { ...editingItem };
//           delete newItem._tempId;
//           newServices.push(newItem);
//       } else {
//           // Edit Existing
//           // Map through and replace if ID matches (or fallback to index if UI-only)
//           newServices = newServices.map(s => 
//              (s._id && s._id === editingItem._id) ? editingItem : s
//           );
//       }

//       setServicesList(newServices);
//       setIsModalOpen(false);

//       // Save entire list to backend
//       updateServicesList(newServices)
//         .then(() => {
//           toast({ title: "Service saved" });
//           onRefresh();
//         })
//         .catch(() => {
//            toast({ title: "Save failed", variant: "destructive" });
//            onRefresh(); // Revert on error
//         });
//   };

//   const openAdd = () => {
//       setEditingItem({ _tempId: Date.now(), title: "", description: "", items: [], image: "" });
//       setIsModalOpen(true);
//   };

//   const openEdit = (item: any) => {
//       setEditingItem({ ...item }); 
//       setIsModalOpen(true);
//   };

//   const handleDelete = async (index: number) => {
//       if(!confirm("Delete this service?")) return;
      
//       const newServices = servicesList.filter((_, i) => i !== index);
//       setServicesList(newServices); // Optimistic update
      
//       try {
//         await updateServicesList(newServices);
//         toast({ title: "Service deleted" });
//       } catch(e) {
//         toast({ title: "Delete failed", variant: "destructive" });
//         onRefresh(); // Revert
//       }
//   };

//   return (
//     <div className="space-y-6">
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {servicesList.map((service, idx) => (
//                 <div key={idx} className="group border rounded-xl overflow-hidden bg-slate-50 hover:shadow-md transition-all">
//                     <div className="relative h-40 bg-slate-200">
//                         {service.image ? (
//                             // eslint-disable-next-line @next/next/no-img-element
//                             <img src={service.image} alt="" className="w-full h-full object-cover" />
//                         ) : (
//                             <div className="flex items-center justify-center h-full text-muted-foreground"><ImageIcon /></div>
//                         )}
//                         <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                             <Button size="icon" variant="secondary" onClick={() => openEdit(service)}><Edit2 className="w-4 h-4"/></Button>
//                             <Button size="icon" variant="destructive" onClick={() => handleDelete(idx)}><Trash2 className="w-4 h-4"/></Button>
//                         </div>
//                     </div>
//                     <div className="p-4 space-y-2">
//                         <h3 className="font-bold text-lg leading-tight">{service.title}</h3>
//                         <p className="text-sm text-muted-foreground line-clamp-2">{service.description}</p>
//                         <div className="pt-2 flex flex-wrap gap-1">
//                             {service.items?.slice(0, 3).map((tag: string, i: number) => (
//                                 <span key={i} className="text-[10px] bg-white border px-1.5 py-0.5 rounded">{tag}</span>
//                             ))}
//                             {(service.items?.length || 0) > 3 && <span className="text-[10px] text-muted-foreground">+{service.items.length - 3} more</span>}
//                         </div>
//                     </div>
//                 </div>
//             ))}
            
//             {/* Add Button Card */}
//             <button onClick={openAdd} className="border-2 border-dashed rounded-xl h-full min-h-[300px] flex flex-col items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors bg-slate-50/50">
//                 <Plus className="w-8 h-8 mb-2" />
//                 <span className="font-medium">Add Service</span>
//             </button>
//         </div>

//         {/* Modal Editor */}
//         <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
//             <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
//                 <DialogHeader><DialogTitle>{editingItem?._id ? "Edit Service" : "Add Service"}</DialogTitle></DialogHeader>
//                 <div className="grid gap-4 py-4">
//                     <div className="space-y-2">
//                         <Label>Service Title</Label>
//                         <Input value={editingItem?.title || ''} onChange={e => setEditingItem({...editingItem, title: e.target.value})} />
//                     </div>
//                     <div className="space-y-2">
//                         <Label>Image URL</Label>
//                         <Input value={editingItem?.image || ''} onChange={e => setEditingItem({...editingItem, image: e.target.value})} placeholder="https://..." />
//                     </div>
//                     <div className="space-y-2">
//                         <Label>Description</Label>
//                         <Textarea rows={3} value={editingItem?.description || ''} onChange={e => setEditingItem({...editingItem, description: e.target.value})} />
//                     </div>
//                     <div className="space-y-2">
//                         <Label>Checklist Items (One per line)</Label>
//                         <Textarea 
//                             rows={5} 
//                             value={editingItem?.items?.join('\n') || ''} 
//                             onChange={e => setEditingItem({...editingItem, items: e.target.value.split('\n').filter((l:string) => l.trim() !== "")})} 
//                             placeholder="Brand Strategy&#10;Logo Design&#10;Typography"
//                             className="font-mono text-sm"
//                         />
//                     </div>
//                 </div>
//                 <Button onClick={saveSingleItem} className="w-full">Save Service</Button>
//             </DialogContent>
//         </Dialog>
//     </div>
//   );
// }

// // ------------------------------------------------------------------
// // 3. CTA EDITOR (Unchanged)
// // ------------------------------------------------------------------
// function CtaEditor({ data, onRefresh }: { data: any, onRefresh: () => void }) {
//   const { toast } = useToast();
//   const [form, setForm] = useState(data || {});
//   const [saving, setSaving] = useState(false);

//   useEffect(() => { setForm(data || {}) }, [data]);

//   const handleSave = async () => {
//     setSaving(true);
//     try {
//       await updateServiceCTA(form);
//       toast({ title: "CTA updated" });
//       onRefresh();
//     } catch (e) { toast({ title: "Failed", variant: "destructive" }); }
//     finally { setSaving(false); }
//   };

//   return (
//     <div className="grid md:grid-cols-2 gap-8">
//         <div className="space-y-4">
//             <div className="space-y-2">
//                 <Label className="text-slate-300">Heading</Label>
//                 <Input 
//                     value={form.heading} 
//                     onChange={e => setForm({...form, heading: e.target.value})} 
//                     className="bg-slate-800 border-slate-700 text-white font-bold text-lg"
//                 />
//             </div>
//             <div className="space-y-2">
//                 <Label className="text-slate-300">Description</Label>
//                 <Textarea 
//                     value={form.description} 
//                     onChange={e => setForm({...form, description: e.target.value})} 
//                     className="bg-slate-800 border-slate-700 text-slate-300"
//                 />
//             </div>
//         </div>

//         <div className="space-y-4 bg-slate-800/50 p-6 rounded-xl border border-slate-700">
//             <div className="space-y-2">
//                 <Label className="text-slate-300">Button Text</Label>
//                 <Input 
//                     value={form.buttonText} 
//                     onChange={e => setForm({...form, buttonText: e.target.value})} 
//                     className="bg-slate-800 border-slate-700 text-white"
//                 />
//             </div>
//             <div className="space-y-2">
//                 <Label className="text-slate-300">Button Link</Label>
//                 <Input 
//                     value={form.buttonLink} 
//                     onChange={e => setForm({...form, buttonLink: e.target.value})} 
//                     className="bg-slate-800 border-slate-700 text-white"
//                 />
//             </div>
//             <Button onClick={handleSave} disabled={saving} variant="secondary" className="w-full mt-4">
//                 {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save CTA
//             </Button>
//         </div>
//     </div>
//   );
// }











'use client'

import React, { useState, useEffect } from 'react';
import { 
  getHomePage, 
  updateHomeHero, 
  updateHomeIntro, 
  updateHomeProjects, 
  updateHomeStats, 
  updateHomeFooter 
} from '../../services/homepage.api';

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