'use client'
import React from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import StatCard from '@/components/admin/StatCard';
import { FileEdit, MessageSquareQuote, Users, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Dashboard: React.FC = () => {
  const { contentSections, testimonials, clients } = useAdmin();

  const pendingTestimonials = testimonials.filter(t => t.status === 'pending').length;
  const newClients = clients.filter(c => c.status === 'new').length;
  const inProgressClients = clients.filter(c => c.status === 'in-progress').length;

  const recentClients = [...clients].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 5);

  const recentTestimonials = [...testimonials].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 3);

  const statusColors: Record<string, string> = {
    new: 'bg-primary/10 text-primary',
    'in-progress': 'bg-warning/10 text-warning',
    completed: 'bg-success/10 text-success',
    archived: 'bg-muted text-muted-foreground',
    pending: 'bg-warning/10 text-warning',
    approved: 'bg-success/10 text-success',
    rejected: 'bg-destructive/10 text-destructive',
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-semibold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back to Bloom Branding Admin</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Content Sections"
          value={contentSections.length}
          icon={FileEdit}
          iconColor="text-primary"
        />
        <StatCard
          title="Testimonials"
          value={testimonials.length}
          icon={MessageSquareQuote}
          trend={{ value: 12, isPositive: true }}
          iconColor="text-accent"
        />
        <StatCard
          title="Total Clients"
          value={clients.length}
          icon={Users}
          trend={{ value: 8, isPositive: true }}
          iconColor="text-success"
        />
        <StatCard
          title="Pending Actions"
          value={pendingTestimonials + newClients}
          icon={Clock}
          iconColor="text-warning"
        />
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Clients */}
        <div className="admin-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-heading font-semibold">Recent Clients</h2>
            <Badge variant="outline" className="gap-1">
              <AlertCircle className="w-3 h-3" />
              {newClients} new
            </Badge>
          </div>
          <div className="space-y-4">
            {recentClients.map((client, index) => (
              <div 
                key={client.id}
                className="flex items-center justify-between py-3 border-b border-border last:border-0 animate-slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div>
                  <p className="font-medium">{client.name}</p>
                  <p className="text-sm text-muted-foreground">{client.company}</p>
                </div>
                <div className="text-right">
                  <Badge className={statusColors[client.status]}>
                    {client.status.replace('-', ' ')}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{client.createdAt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Testimonials */}
        <div className="admin-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-heading font-semibold">Recent Testimonials</h2>
            <Badge variant="outline" className="gap-1">
              <Clock className="w-3 h-3" />
              {pendingTestimonials} pending
            </Badge>
          </div>
          <div className="space-y-4">
            {recentTestimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className="py-3 border-b border-border last:border-0 animate-slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-sm font-medium">
                        {testimonial.clientName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.clientName}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.clientCompany}</p>
                    </div>
                  </div>
                  <Badge className={statusColors[testimonial.status]}>
                    {testimonial.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 admin-card">
        <h2 className="text-xl font-heading font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <a href="/content" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
            Edit Content
          </a>
          <a href="/testimonials" className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors">
            Review Testimonials
          </a>
          <a href="/clients" className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors">
            Manage Clients
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;