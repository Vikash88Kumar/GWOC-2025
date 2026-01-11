'use client'
import React, { useMemo, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdmin } from '@/contexts/AdminContext';
import { Testimonial } from '@/types/admin';
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
import { Plus, Star, Trash2, Edit, Check, X, Sparkles, MessageSquareQuote } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {toggleTestimonialActive} from "../../services/testimonial.api.js"
const Testimonials: React.FC = () => {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useAdmin();
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const [formData, setFormData] = useState({
    clientName: '',
    clientRole: '',
    clientCompany: '',
    content: '',
    rating: 5,
  });

  const filteredTestimonials = filter === 'all'
    ? testimonials
    : testimonials.filter(t => t.status === filter);

  // Professional status palette
  const statusBadge: Record<string, string> = {
    pending: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20',
    approved: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20',
    rejected: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20',
  };

  const statusDot: Record<string, string> = {
    pending: 'bg-amber-500/70',
    approved: 'bg-emerald-500/70',
    rejected: 'bg-rose-500/70',
  };

  const handleSubmit = () => {
    if (editingTestimonial) {
      updateTestimonial(editingTestimonial.id, formData);
      toast({ title: 'Testimonial updated successfully' });
    } else {
      addTestimonial({
        ...formData,
        clientImage: '/placeholder.svg',
        status: 'pending',
        createdAt: new Date().toISOString().split('T')[0],
      });
      toast({ title: 'Testimonial added successfully' });
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      clientName: '',
      clientRole: '',
      clientCompany: '',
      content: '',
      rating: 5,
    });
    setIsAddDialogOpen(false);
    setEditingTestimonial(null);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      clientName: testimonial.clientName,
      clientRole: testimonial.clientRole,
      clientCompany: testimonial.clientCompany,
      content: testimonial.content,
      rating: testimonial.rating,
    });
    setIsAddDialogOpen(true);
  };

  const handleStatusChange = async(id: string, status: 'pending' | 'approved' | 'rejected') => {
    return await toggleTestimonialActive(id,status)
  };

  const handleDelete = (id: string) => {
    deleteTestimonial(id);
    toast({ title: 'Testimonial deleted', variant: 'destructive' });
  };

  // UI-only: counts for filter pills (no behavior change)
  const counts = useMemo(() => {
    const c = { all: testimonials.length, pending: 0, approved: 0, rejected: 0 };
    for (const t of testimonials) c[t.status] += 1;
    return c;
  }, [testimonials]);

  return (
    <div className="p-6 md:p-8 bg-gradient-to-b from-background via-background to-muted/40">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap mb-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Reputation & Social Proof
          </div>

          <h1 className="mt-3 text-3xl md:text-4xl font-heading font-semibold tracking-tight">
            Testimonials
          </h1>
          <p className="text-muted-foreground mt-1">Manage client testimonials</p>

          <div className="mt-3 h-[2px] w-44 rounded-full bg-gradient-to-r from-sky-500/70 via-emerald-500/50 to-transparent" />
        </div>

        <Dialog
          open={isAddDialogOpen}
          onOpenChange={(open) => {
            if (!open) resetForm();
            setIsAddDialogOpen(open);
          }}
        >
          <DialogTrigger asChild>
            <Button className="rounded-xl shadow-sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Testimonial
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-lg rounded-2xl border border-border bg-gradient-to-b from-background to-muted/30">
            <DialogHeader>
              <DialogTitle className="font-heading">
                {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Client Name</Label>
                  <Input
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="John Doe"
                    className="mt-1 rounded-xl bg-background"
                  />
                </div>
                <div>
                  <Label>Role</Label>
                  <Input
                    value={formData.clientRole}
                    onChange={(e) => setFormData({ ...formData, clientRole: e.target.value })}
                    placeholder="CEO"
                    className="mt-1 rounded-xl bg-background"
                  />
                </div>
              </div>

              <div>
                <Label>Company</Label>
                <Input
                  value={formData.clientCompany}
                  onChange={(e) => setFormData({ ...formData, clientCompany: e.target.value })}
                  placeholder="Company Name"
                  className="mt-1 rounded-xl bg-background"
                />
              </div>

              <div>
                <Label>Testimonial Content</Label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="What the client said..."
                  className="mt-1 min-h-[110px] rounded-xl bg-background"
                />
              </div>

              <div>
                <Label>Rating</Label>
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="focus:outline-none rounded-md"
                      aria-label={`Set rating to ${star}`}
                    >
                      <Star
                        className={[
                          "w-6 h-6 transition-colors",
                          star <= formData.rating
                            ? "fill-amber-500 text-amber-500"
                            : "text-muted-foreground",
                        ].join(" ")}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Click stars to update rating.
                </p>
              </div>

              <div className="flex gap-2 justify-end pt-4">
                <Button variant="outline" onClick={resetForm} className="rounded-xl">
                  Cancel
                </Button>
                <Button onClick={handleSubmit} className="rounded-xl">
                  {editingTestimonial ? 'Update' : 'Add'} Testimonial
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => {
          const active = filter === status;
          const count = status === 'all' ? counts.all : counts[status];

          // UI-only: subtle tint per filter pill
          const pillTint =
            status === 'pending'
              ? "hover:border-amber-500/30 hover:bg-amber-500/5"
              : status === 'approved'
                ? "hover:border-emerald-500/30 hover:bg-emerald-500/5"
                : status === 'rejected'
                  ? "hover:border-rose-500/30 hover:bg-rose-500/5"
                  : "hover:bg-muted/60";

          return (
            <Button
              key={status}
              variant={active ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(status)}
              className={[
                "capitalize rounded-full transition-all",
                !active ? pillTint : "shadow-sm ring-1 ring-primary/15",
              ].join(" ")}
            >
              {status}
              <span
                className={[
                  "ml-2 px-2 py-0.5 text-xs rounded-full border",
                  active ? "bg-background/20 border-background/20" : "bg-muted/40 border-border",
                ].join(" ")}
              >
                {count}
              </span>
            </Button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTestimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className="rounded-2xl border border-border bg-card/60 backdrop-blur shadow-sm hover:shadow-md transition-shadow animate-fade-in overflow-hidden"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {/* Top strip */}
            <div className="h-1 w-full bg-gradient-to-r from-sky-500/60 via-emerald-500/40 to-transparent" />

            <div className="p-5">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-full border border-border bg-gradient-to-br from-slate-900/5 via-sky-500/10 to-emerald-500/10 dark:from-white/5 dark:via-sky-500/15 dark:to-emerald-500/10 flex items-center justify-center font-semibold">
                    {testimonial.clientName.charAt(0)}
                  </div>

                  <div className="min-w-0">
                    <p className="font-medium truncate">{testimonial.clientName}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {testimonial.clientRole}, {testimonial.clientCompany}
                    </p>
                  </div>
                </div>

                <Badge className={["rounded-full px-3 py-1 border flex items-center gap-2", statusBadge[testimonial.status]].join(" ")}>
                  <span className={`h-2 w-2 rounded-full ${statusDot[testimonial.status]}`} />
                  {testimonial.status}
                </Badge>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={[
                        "w-4 h-4",
                        star <= testimonial.rating
                          ? "fill-amber-500 text-amber-500"
                          : "text-muted-foreground",
                      ].join(" ")}
                    />
                  ))}
                </div>

                <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                  <MessageSquareQuote className="w-4 h-4" />
                  Review
                </div>
              </div>

              {/* Content */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-4">
                “{testimonial.content}”
              </p>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">{testimonial.createdAt}</p>

                <div className="flex gap-1">
                  {testimonial.status === 'pending' && (
                    <>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleStatusChange(testimonial.id, 'approved')}
                        className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-500/10 rounded-xl"
                        aria-label="Approve"
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleStatusChange(testimonial.id, 'rejected')}
                        className="text-rose-600 hover:text-rose-700 hover:bg-rose-500/10 rounded-xl"
                        aria-label="Reject"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </>
                  )}

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleEdit(testimonial)}
                    className="rounded-xl hover:bg-sky-500/10"
                    aria-label="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleDelete(testimonial.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl"
                    aria-label="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTestimonials.length === 0 && (
        <div className="text-center py-14 text-muted-foreground">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mb-3">
            <MessageSquareQuote className="w-6 h-6" />
          </div>
          <p className="font-medium">No testimonials found</p>
          <p className="text-sm mt-1">Try a different filter or add a new testimonial.</p>
        </div>
      )}
    </div>
  );
};

export default function Page() {
  return (
    <AdminLayout>
      <Testimonials />
    </AdminLayout>
  );
}
