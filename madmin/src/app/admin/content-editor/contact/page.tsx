// 'use client'

// import React, { useState, useEffect } from 'react';
// import { getContactPage, updateContactSettings } from '../../../../services/contact.api';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Label } from '@/components/ui/label';
// import { useToast } from '@/hooks/use-toast';
// import { Loader2 } from 'lucide-react';

// export default function ContactAdminView() {
//   const { toast } = useToast();
//   const [data, setData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   const refreshData = async () => {
//     try {
//       const res = await getContactPage();
//       setData(res.data || {});
//     } catch (e) {
//       toast({ title: 'Error loading contact settings', variant: 'destructive' });
//     } finally { setLoading(false); }
//   };

//   useEffect(() => { refreshData(); }, []);
//   if (loading || !data) return <div className="flex justify-center p-20"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>;

//   const handleSave = async () => {
//     setSaving(true);
//     try {
//       await updateContactSettings(data);
//       toast({ title: 'Saved' });
//     } catch (e) { toast({ title: 'Failed to save', variant: 'destructive' }); }
//     finally { setSaving(false); }
//   };

//   return (
//     <div className="max-w-4xl mx-auto bg-white rounded-lg p-6 shadow-sm">
//       <h2 className="text-2xl font-semibold mb-2">Contact</h2>
//       <p className="text-sm text-muted-foreground mb-4">Edit contact page contents and settings.</p>

//       <div className="space-y-4">
//         <div>
//           <Label>Contact Email</Label>
//           <Input value={data.email || ''} onChange={(e: any) => setData({...data, email: e.target.value})} />
//         </div>
//         <div>
//           <Label>Intro Text</Label>
//           <Textarea value={data.intro || ''} onChange={(e: any) => setData({...data, intro: e.target.value})} rows={4} />
//         </div>
//       </div>

//       <div className="mt-6 flex justify-end">
//         <Button onClick={handleSave} disabled={saving}>{saving && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>} Save</Button>
//       </div>
//     </div>
//   );
// }
