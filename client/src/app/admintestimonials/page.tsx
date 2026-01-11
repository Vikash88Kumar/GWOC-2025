'use client'
import React, { useMemo, useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Star, Trash2, Check, X, Sparkles, MessageSquareQuote, Loader2, RefreshCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Import your API services
import { 
    getAllTestimonials, 
    createTestimonial, 
    toggleTestimonialActive, 
    rejectTestimonial 
} from '@/services/testimonial.api';

// Define Interface
interface Testimonial {
    _id: string;
    clientName: string;
    role: string;
    company: string;
    message: string;
    star: number;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: string;
}

const TestimonialsPage: React.FC = () => {
  const { toast } = useToast();
  
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  
  // UI States
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  // Form State
  const [formData, setFormData] = useState({
    clientName: '',
    role: '',
    company: '',
    message: '',
    star: 5,
  });

  // --- 1. Fetch Data ---
  const fetchData = async () => {
    setLoading(true);
    try {
        const res = await getAllTestimonials();
        setTestimonials(res.data || []);
    } catch (error) {
        toast({ title: "Failed to load testimonials", variant: "destructive" });
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- 2. Create Handler ---
  const handleSubmit = async () => {
    try {
        await createTestimonial(formData);
        toast({ title: 'Testimonial added successfully' });
        await fetchData(); 
        resetForm();
    } catch (error) {
        toast({ title: "Operation failed", variant: "destructive" });
    }
  };

  // --- 3. Toggle Status (Approve) ---
  const handleApprove = async (id: string) => {
    // Optimistic Update
    const originalList = [...testimonials];
    setTestimonials(prev => prev.map(t => t._id === id ? { ...t, status: 'approved' } : t));

    try {
        await toggleTestimonialActive(id); 
        toast({ title: "Testimonial Approved", className: "bg-emerald-500 text-white" });
    } catch (error) {
        setTestimonials(originalList); // Revert
        toast({ title: "Failed to approve", variant: "destructive" });
    }
  };

  // --- 4. Reject Handler ---
  const handleReject = async (id: string) => {
    // Optimistic Update
    const originalList = [...testimonials];
    setTestimonials(prev => prev.map(t => t._id === id ? { ...t, status: 'rejected' } : t));

    try {
        await rejectTestimonial(id); 
        toast({ title: "Testimonial Rejected" });
    } catch (error) {
        setTestimonials(originalList);
        toast({ title: "Failed to reject", variant: "destructive" });
    }
  };

  const resetForm = () => {
    setFormData({ clientName: '', role: '', company: '', message: '', star: 5 });
    setIsAddDialogOpen(false);
  };

  // Filter Logic
  const filteredTestimonials = filter === 'all'
    ? testimonials
    : testimonials.filter(t => t.status === filter);

  // Status Styling
  const statusBadge: Record<string, string> = {
    pending: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
    approved: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20',
    rejected: 'bg-rose-500/10 text-rose-700 border-rose-500/20',
  };

  const counts = useMemo(() => {
    const c = { all: testimonials.length, pending: 0, approved: 0, rejected: 0 };
    for (const t of testimonials) {
        if (c[t.status] !== undefined) c[t.status] += 1;
    }
    return c;
  }, [testimonials]);

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin h-8 w-8 text-primary"/></div>;

  return (
    <div className="p-6 md:p-8 bg-gradient-to-b from-background via-background to-muted/40">
      
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading">Testimonials</h1>
          <p className="text-muted-foreground">Manage approvals and rejections.</p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-xl shadow-sm" onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" /> Add Manual Review
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Review</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
               {/* Simplified Form for brevity */}
               <Input value={formData.clientName} onChange={e => setFormData({...formData, clientName: e.target.value})} placeholder="Client Name" />
               <Input value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} placeholder="Company" />
               <Textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} placeholder="Message" />
               <div className="flex gap-1">
                 {[1,2,3,4,5].map(s => (
                    <Star key={s} className={`cursor-pointer ${s <= formData.star ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} onClick={() => setFormData({...formData, star: s})} />
                 ))}
               </div>
               <Button onClick={handleSubmit} className="w-full">Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
            <Button
              key={status}
              variant={filter === status ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(status)}
              className="capitalize rounded-full"
            >
              {status} <span className="ml-2 text-xs opacity-70">({counts[status]})</span>
            </Button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTestimonials.map((t) => (
          <div key={t._id} className="rounded-2xl border bg-card/60 backdrop-blur shadow-sm p-5 relative overflow-hidden flex flex-col justify-between">
            
            {/* Top Section */}
            <div>
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="font-bold text-sm">{t.clientName}</p>
                        <p className="text-xs text-muted-foreground">{t.company}</p>
                    </div>
                    <Badge className={`rounded-full px-2 ${statusBadge[t.status]}`}>
                        {t.status}
                    </Badge>
                </div>
                <div className="mb-3">
                    <div className="flex gap-0.5 mb-2">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3.5 h-3.5 ${i < t.star ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />
                        ))}
                    </div>
                    <p className="text-sm text-slate-600 line-clamp-3 italic">"{t.message}"</p>
                </div>
            </div>

            {/* ACTION BUTTONS - LOGIC TO TOGGLE STATUS */}
            <div className="flex justify-between items-center pt-4 border-t mt-4">
                <span className="text-[10px] text-muted-foreground">
                    {new Date(t.createdAt).toLocaleDateString()}
                </span>
                
                <div className="flex gap-2">
                    {/* 1. Show 'Approve' if it's Pending OR Rejected (allows switching back) */}
                    {t.status !== 'approved' && (
                        <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 text-emerald-600 border-emerald-200 hover:bg-emerald-50 gap-1" 
                            onClick={() => handleApprove(t._id)}
                        >
                            <Check className="w-3 h-3" /> Approve
                        </Button>
                    )}
                    
                    {/* 2. Show 'Reject' if it's Pending OR Approved (allows switching back) */}
                    {t.status !== 'rejected' && (
                        <Button 
                            size="sm" 
                            variant="outline"
                            className="h-8 text-rose-600 border-rose-200 hover:bg-rose-50 gap-1" 
                            onClick={() => handleReject(t._id)}
                        >
                            <X className="w-3 h-3" /> Reject
                        </Button>
                    )}
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <AdminLayout>
      <TestimonialsPage />
    </AdminLayout>
  );
}