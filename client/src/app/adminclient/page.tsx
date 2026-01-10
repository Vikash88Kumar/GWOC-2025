'use client'
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdmin } from '@/contexts/AdminContext';
import { Client } from '@/types/admin';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Mail, Phone, Building, MessageSquare, Send, 
  Trash2, Clock, CheckCircle, Archive, Filter, Search, MoreHorizontal
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

const Clients: React.FC = () => {
  const { clients, updateClient, deleteClient } = useAdmin();
  const { toast } = useToast();
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [responseText, setResponseText] = useState('');
  const [filter, setFilter] = useState<'all' | 'new' | 'in-progress' | 'completed' | 'archived'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClients = clients
    .filter(c => filter === 'all' || c.status === filter)
    .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.company.toLowerCase().includes(searchQuery.toLowerCase()));

  const statusColors: Record<string, string> = {
    new: 'bg-blue-500/10 text-blue-600 border-blue-200',
    'in-progress': 'bg-amber-500/10 text-amber-600 border-amber-200',
    completed: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
    archived: 'bg-slate-500/10 text-slate-600 border-slate-200',
  };

  const handleStatusChange = (id: string, status: Client['status']) => {
    updateClient(id, { status });
    toast({ title: `Client status updated to ${status}` });
  };

  const handleSendResponse = () => {
    if (selectedClient && responseText.trim()) {
      updateClient(selectedClient.id, { adminResponse: responseText });
      toast({ title: 'Response saved' });
      setResponseText('');
      setSelectedClient(null);
    }
  };

  const handleDelete = (id: string) => {
    deleteClient(id);
    toast({ title: 'Client record removed', variant: 'destructive' });
  };

  const openClientDetail = (client: Client) => {
    setSelectedClient(client);
    setResponseText(client.adminResponse || '');
  };

  // Helper for Client Initials
  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="p-6 lg:p-10 max-w-[1600px] mx-auto space-y-8">
      {/* Header & Stats Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Client Relations</h1>
          <p className="text-muted-foreground text-lg mt-2">Oversee incoming leads and manage communications.</p>
        </div>
        <div className="flex items-center gap-3">
            <div className="bg-background border rounded-xl px-4 py-2 shadow-sm text-center">
                <span className="text-xs text-muted-foreground block uppercase font-bold tracking-wider">Total</span>
                <span className="text-xl font-semibold">{clients.length}</span>
            </div>
            <div className="bg-background border rounded-xl px-4 py-2 shadow-sm text-center border-blue-100">
                <span className="text-xs text-blue-500 block uppercase font-bold tracking-wider">New</span>
                <span className="text-xl font-semibold">{clients.filter(c => c.status === 'new').length}</span>
            </div>
        </div>
      </div>

      <div className="bg-card border rounded-2xl shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm">
        {/* Toolbar */}
        <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-center gap-4 bg-muted/20">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search clients..." 
                className="pl-9 bg-background"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex gap-1 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
            {(['all', 'new', 'in-progress', 'completed', 'archived'] as const).map((status) => (
              <Button
                key={status}
                variant={filter === status ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setFilter(status)}
                className={`capitalize whitespace-nowrap ${filter === status ? 'shadow-sm border' : ''}`}
              >
                {status.replace('-', ' ')}
              </Button>
            ))}
          </div>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/30">
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground border-b">Client Info</th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground border-b">Project</th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground border-b">Status</th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground border-b">Created</th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground border-b text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredClients.map((client, index) => (
                <tr
                  key={client.id}
                  className="group hover:bg-blue-50/30 transition-all cursor-pointer"
                  onClick={() => openClientDetail(client)}
                >
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 border border-slate-200 group-hover:bg-white group-hover:border-blue-200 transition-colors">
                        {getInitials(client.name)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 leading-none">{client.name}</p>
                        <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                          <Building className="w-3 h-3" /> {client.company}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <Badge variant="secondary" className="font-medium bg-white border">{client.projectType}</Badge>
                  </td>
                  <td className="py-5 px-6">
                    <Badge variant="outline" className={`rounded-md px-2 py-0.5 border ${statusColors[client.status]}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current mr-2 animate-pulse" />
                      {client.status.replace('-', ' ')}
                    </Badge>
                  </td>
                  <td className="py-5 px-6 text-sm text-muted-foreground font-medium">
                    {client.createdAt}
                  </td>
                  <td className="py-5 px-6 text-right">
                    <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full" onClick={() => openClientDetail(client)}>
                        <MessageSquare className="w-4 h-4 text-slate-500" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full text-destructive hover:bg-destructive/10" onClick={() => handleDelete(client.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredClients.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="bg-muted/50 p-4 rounded-full mb-4">
                <Search className="w-8 h-8 text-muted-foreground/50" />
            </div>
            <h3 className="text-lg font-medium">No records found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
          </div>
        )}
      </div>

      {/* Modern Detailed Modal */}
      <Dialog open={!!selectedClient} onOpenChange={(open) => !open && setSelectedClient(null)}>
        <DialogContent className="sm:max-w-2xl p-0 overflow-hidden rounded-2xl border-none shadow-2xl">
          {selectedClient && (
            <div className="flex flex-col">
              <div className="bg-slate-900 p-8 text-white">
                <div className="flex justify-between items-start">
                    <div>
                        <Badge className="bg-white/20 text-white border-white/30 mb-4">{selectedClient.projectType}</Badge>
                        <DialogTitle className="text-3xl font-bold">{selectedClient.name}</DialogTitle>
                        <p className="text-slate-300 mt-1 flex items-center gap-2">
                           <Building className="w-4 h-4" /> {selectedClient.company}
                        </p>
                    </div>
                    <Badge className={`${statusColors[selectedClient.status]} border-none px-4 py-1.5 text-sm`}>
                        {selectedClient.status}
                    </Badge>
                </div>
              </div>

              <div className="p-8 space-y-8 bg-background">
                <div className="grid grid-cols-2 gap-8 border-b pb-8">
                    <div className="space-y-4">
                        <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Contact Info</Label>
                        <div className="space-y-2">
                             <a href={`mailto:${selectedClient.email}`} className="flex items-center gap-3 text-sm font-medium hover:text-blue-500 transition-colors">
                                <Mail className="w-4 h-4 text-muted-foreground" /> {selectedClient.email}
                             </a>
                             <a href={`tel:${selectedClient.phone}`} className="flex items-center gap-3 text-sm font-medium hover:text-blue-500 transition-colors">
                                <Phone className="w-4 h-4 text-muted-foreground" /> {selectedClient.phone}
                             </a>
                        </div>
                    </div>
                    <div className="space-y-4 text-right">
                        <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Update Lead Status</Label>
                        <Select
                            value={selectedClient.status}
                            onValueChange={(value: Client['status']) => {
                            handleStatusChange(selectedClient.id, value);
                            setSelectedClient({ ...selectedClient, status: value });
                            }}
                        >
                            <SelectTrigger className="w-full ml-auto md:w-40 border-slate-200">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="new">New</SelectItem>
                                <SelectItem value="in-progress">In Progress</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="archived">Archived</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Inquiry Details</Label>
                  <div className="p-5 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 leading-relaxed italic">
                    "{selectedClient.message}"
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Internal Response</Label>
                  <Textarea
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    placeholder="Type your notes or response here..."
                    className="min-h-[140px] focus-visible:ring-slate-900 rounded-xl bg-white"
                  />
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[10px] text-muted-foreground">Last updated: {selectedClient.updatedAt}</span>
                    <Button onClick={handleSendResponse} disabled={!responseText.trim()} className="bg-slate-900 hover:bg-slate-800 px-6 rounded-full">
                      <Send className="w-4 h-4 mr-2" />
                      Save Response
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default function Page() {
  return (
    <AdminLayout>
      <Clients />
    </AdminLayout>
  );
}