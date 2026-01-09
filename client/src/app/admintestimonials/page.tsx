'use client'
import React, { useState } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Star, Trash2, Edit, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

  const statusColors: Record<string, string> = {
    pending: 'bg-warning/10 text-warning',
    approved: 'bg-success/10 text-success',
    rejected: 'bg-destructive/10 text-destructive',
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

  const handleStatusChange = (id: string, status: 'pending' | 'approved' | 'rejected') => {
    updateTestimonial(id, { status });
    toast({ 
      title: `Testimonial ${status}`,
      description: status === 'approved' ? 'This testimonial will now appear on your website.' : undefined,
    });
  };

  const handleDelete = (id: string) => {
    deleteTestimonial(id);
    toast({ title: 'Testimonial deleted', variant: 'destructive' });
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-semibold">Testimonials</h1>
          <p className="text-muted-foreground mt-1">Manage client testimonials</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
          if (!open) resetForm();
          setIsAddDialogOpen(open);
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-heading">
                {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Client Name</Label>
                  <Input
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="John Doe"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Role</Label>
                  <Input
                    value={formData.clientRole}
                    onChange={(e) => setFormData({ ...formData, clientRole: e.target.value })}
                    placeholder="CEO"
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label>Company</Label>
                <Input
                  value={formData.clientCompany}
                  onChange={(e) => setFormData({ ...formData, clientCompany: e.target.value })}
                  placeholder="Company Name"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Testimonial Content</Label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="What the client said..."
                  className="mt-1 min-h-[100px]"
                />
              </div>
              <div>
                <Label>Rating</Label>
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= formData.rating
                            ? 'fill-warning text-warning'
                            : 'text-muted-foreground'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 justify-end pt-4">
                <Button variant="outline" onClick={resetForm}>Cancel</Button>
                <Button onClick={handleSubmit}>
                  {editingTestimonial ? 'Update' : 'Add'} Testimonial
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
          <Button
            key={status}
            variant={filter === status ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(status)}
            className="capitalize"
          >
            {status}
            {status !== 'all' && (
              <span className="ml-2 px-1.5 py-0.5 text-xs bg-background/20 rounded">
                {testimonials.filter(t => t.status === status).length}
              </span>
            )}
          </Button>
        ))}
      </div>

      {/* Testimonials Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTestimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className="admin-card animate-fade-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-lg font-medium">
                    {testimonial.clientName.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{testimonial.clientName}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.clientRole}, {testimonial.clientCompany}
                  </p>
                </div>
              </div>
              <Badge className={statusColors[testimonial.status]}>
                {testimonial.status}
              </Badge>
            </div>

            {/* Rating */}
            <div className="flex gap-0.5 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= testimonial.rating
                      ? 'fill-warning text-warning'
                      : 'text-muted-foreground'
                  }`}
                />
              ))}
            </div>

            {/* Content */}
            <p className="text-sm text-muted-foreground mb-4 line-clamp-4">
              "{testimonial.content}"
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
                      className="text-success hover:text-success hover:bg-success/10"
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleStatusChange(testimonial.id, 'rejected')}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </>
                )}
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleEdit(testimonial)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleDelete(testimonial.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTestimonials.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No testimonials found.
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