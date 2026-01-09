'use client'
import React, { useState } from 'react';
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
import { Mail, Phone, Building, MessageSquare, Send, Trash2, Clock, CheckCircle, Archive } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Clients: React.FC = () => {
  const { clients, updateClient, deleteClient } = useAdmin();
  const { toast } = useToast();
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [responseText, setResponseText] = useState('');
  const [filter, setFilter] = useState<'all' | 'new' | 'in-progress' | 'completed' | 'archived'>('all');

  const filteredClients = filter === 'all'
    ? clients
    : clients.filter(c => c.status === filter);

  const statusColors: Record<string, string> = {
    new: 'bg-primary/10 text-primary',
    'in-progress': 'bg-warning/10 text-warning',
    completed: 'bg-success/10 text-success',
    archived: 'bg-muted text-muted-foreground',
  };

  const statusIcons: Record<string, React.ReactNode> = {
    new: <Clock className="w-3 h-3" />,
    'in-progress': <Clock className="w-3 h-3" />,
    completed: <CheckCircle className="w-3 h-3" />,
    archived: <Archive className="w-3 h-3" />,
  };

  const handleStatusChange = (id: string, status: Client['status']) => {
    updateClient(id, { status });
    toast({ title: `Client status updated to ${status.replace('-', ' ')}` });
  };

  const handleSendResponse = () => {
    if (selectedClient && responseText.trim()) {
      updateClient(selectedClient.id, { adminResponse: responseText });
      toast({ title: 'Response saved successfully' });
      setResponseText('');
      setSelectedClient(null);
    }
  };

  const handleDelete = (id: string) => {
    deleteClient(id);
    toast({ title: 'Client deleted', variant: 'destructive' });
  };

  const openClientDetail = (client: Client) => {
    setSelectedClient(client);
    setResponseText(client.adminResponse || '');
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-semibold">Clients</h1>
        <p className="text-muted-foreground mt-1">Manage client inquiries and responses</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {(['all', 'new', 'in-progress', 'completed', 'archived'] as const).map((status) => (
          <Button
            key={status}
            variant={filter === status ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(status)}
            className="capitalize"
          >
            {status.replace('-', ' ')}
            {status !== 'all' && (
              <span className="ml-2 px-1.5 py-0.5 text-xs bg-background/20 rounded">
                {clients.filter(c => c.status === status).length}
              </span>
            )}
          </Button>
        ))}
      </div>

      {/* Clients Table */}
      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">Client</th>
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">Contact</th>
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">Project</th>
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left py-4 px-4 font-medium text-muted-foreground">Date</th>
                <th className="text-right py-4 px-4 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client, index) => (
                <tr
                  key={client.id}
                  className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors animate-fade-in cursor-pointer"
                  style={{ animationDelay: `${index * 0.05}s` }}
                  onClick={() => openClientDetail(client)}
                >
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium">{client.name}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Building className="w-3 h-3" />
                        {client.company}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <p className="text-sm flex items-center gap-1">
                        <Mail className="w-3 h-3 text-muted-foreground" />
                        {client.email}
                      </p>
                      <p className="text-sm flex items-center gap-1">
                        <Phone className="w-3 h-3 text-muted-foreground" />
                        {client.phone}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant="outline">{client.projectType}</Badge>
                  </td>
                  <td className="py-4 px-4">
                    <Badge className={`gap-1 ${statusColors[client.status]}`}>
                      {statusIcons[client.status]}
                      {client.status.replace('-', ' ')}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">
                    {client.createdAt}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => openClientDetail(client)}
                      >
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(client.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
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
          <div className="text-center py-12 text-muted-foreground">
            No clients found.
          </div>
        )}
      </div>

      {/* Client Detail Dialog */}
      <Dialog open={!!selectedClient} onOpenChange={(open) => !open && setSelectedClient(null)}>
        <DialogContent className="sm:max-w-2xl">
          {selectedClient && (
            <>
              <DialogHeader>
                <DialogTitle className="font-heading flex items-center justify-between">
                  <span>{selectedClient.name}</span>
                  <Badge className={statusColors[selectedClient.status]}>
                    {selectedClient.status.replace('-', ' ')}
                  </Badge>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6 mt-4">
                {/* Client Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Building className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedClient.company}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <a href={`mailto:${selectedClient.email}`} className="text-primary hover:underline">
                        {selectedClient.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <a href={`tel:${selectedClient.phone}`} className="text-primary hover:underline">
                        {selectedClient.phone}
                      </a>
                    </div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Project Type</Label>
                    <p className="font-medium">{selectedClient.projectType}</p>
                  </div>
                </div>

                {/* Client Message */}
                <div>
                  <Label className="text-muted-foreground">Client Message</Label>
                  <div className="mt-2 p-4 bg-muted rounded-lg">
                    <p className="text-sm">{selectedClient.message}</p>
                  </div>
                </div>

                {/* Status Update */}
                <div>
                  <Label className="text-muted-foreground">Update Status</Label>
                  <Select
                    value={selectedClient.status}
                    onValueChange={(value: Client['status']) => {
                      handleStatusChange(selectedClient.id, value);
                      setSelectedClient({ ...selectedClient, status: value });
                    }}
                  >
                    <SelectTrigger className="mt-2 w-full md:w-48">
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

                {/* Response */}
                <div>
                  <Label className="text-muted-foreground">Your Response</Label>
                  <Textarea
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    placeholder="Write your response to the client..."
                    className="mt-2 min-h-[120px]"
                  />
                  <div className="flex justify-end mt-3">
                    <Button onClick={handleSendResponse} disabled={!responseText.trim()}>
                      <Send className="w-4 h-4 mr-2" />
                      Save Response
                    </Button>
                  </div>
                </div>

                {/* Existing Response */}
                {selectedClient.adminResponse && (
                  <div>
                    <Label className="text-muted-foreground">Previous Response</Label>
                    <div className="mt-2 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                      <p className="text-sm">{selectedClient.adminResponse}</p>
                    </div>
                  </div>
                )}

                {/* Timestamps */}
                <div className="flex justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                  <span>Created: {selectedClient.createdAt}</span>
                  <span>Updated: {selectedClient.updatedAt}</span>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Clients;