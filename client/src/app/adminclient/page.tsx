'use client'
import React, { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { Client } from '@/types/admin' // Ensure this type allows for optional fields if backend misses them
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Mail,
  Phone,
  Building,
  MessageSquare,
  Send,
  Trash2,
  Search,
  Loader2
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { Input } from '@/components/ui/input'
// Import your API functions
import { respondToMessage, getAllMessages } from "../../services/contact.api.js"

const Clients: React.FC = () => {
  const { toast } = useToast()

  // State for storing API data
  const [clients, setClients] = useState<Client[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [responseText, setResponseText] = useState('')
  const [filter, setFilter] = useState<
    'all' | 'new' | 'in-progress' | 'completed' | 'archived'
  >('all')
  const [searchQuery, setSearchQuery] = useState('')

  // 1. Fetch and Map Data from API
  const fetchMessages = async () => {
    setIsLoading(true)
    try {
      const res = await getAllMessages()
      if (res && res.data && res.data.data) {
        
        // Map Backend MongoDB data to Frontend Client Interface
        const mappedClients: Client[] = res.data.data.map((item: any) => ({
          id: item._id,
          name: `${item.firstName} ${item.lastName}`.trim(),
          company: "Private Client", // Backend doesn't have company field, using default
          email: item.email,
          phone: "Not Provided", // Backend doesn't have phone field, using default
          projectType: Array.isArray(item.services) ? item.services.join(", ") : "General",
          // Infer status based on available data (since backend only has isRead)
          status: item.adminResponse?.message ? 'completed' : (item.isRead ? 'in-progress' : 'new'),
          createdAt: new Date(item.createdAt).toLocaleDateString("en-US", {
             year: 'numeric', month: 'short', day: 'numeric' 
          }),
          message: item.message,
          adminResponse: item.adminResponse?.message || "",
          updatedAt: new Date(item.updatedAt).toLocaleTimeString(),
          budget: item.budget, // Extra field
          timeline: item.timeline // Extra field
        }))

        setClients(mappedClients)
      }
    } catch (error) {
      console.error("Failed to fetch messages", error)
      toast({ 
        title: "Error fetching messages", 
        description: "Could not load client data.",
        variant: "destructive" 
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Load data on component mount
  useEffect(() => {
    fetchMessages()
  }, [])

  // Sync response text when modal opens
  useEffect(() => {
    if (!selectedClient) return;
    setResponseText(selectedClient.adminResponse || "");
  }, [selectedClient]);

  const filteredClients = clients
    .filter((c) => filter === 'all' || c.status === filter)
    .filter(
      (c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase())
    )

  // Colors
  const statusColors: Record<string, string> = {
    new: 'bg-sky-500/10 text-sky-700 border-sky-200',
    'in-progress': 'bg-amber-500/10 text-amber-700 border-amber-200',
    completed: 'bg-emerald-500/10 text-emerald-700 border-emerald-200',
    archived: 'bg-slate-500/10 text-slate-700 border-slate-200',
  }

  const statusHeaderColors: Record<string, string> = {
    new: 'bg-sky-400/15 text-sky-100 border border-sky-300/25',
    'in-progress': 'bg-amber-400/15 text-amber-100 border border-amber-300/25',
    completed: 'bg-emerald-400/15 text-emerald-100 border border-emerald-300/25',
    archived: 'bg-slate-300/10 text-slate-100 border border-slate-200/20',
  }

  // 2. Handle Sending Response via API
  const handleSendResponse = async () => {
    if (!selectedClient || !responseText.trim()) return;

    try {
      // Call the API
      // Note: Ensure your api function accepts (id, messageString) or adjust logic below
      await respondToMessage(
        selectedClient.id, 
        responseText.trim() // Passing the message directly
      );

      toast({ title: 'Response sent successfully' });
      
      // Close modal
      setSelectedClient(null);
      setResponseText('');
      
      // Refresh list to show updated data
      fetchMessages(); 

    } catch (error) {
      console.error(error);
      toast({
        title: 'Failed to send response',
        variant: 'destructive',
      });
    }
  };

  // Note: Delete API wasn't provided in snippet, keeping UI only or add logic later
  const handleDelete = (id: string) => {
    // await deleteMessage(id); 
    setClients(clients.filter(c => c.id !== id))
    toast({ title: 'Client record removed', variant: 'destructive' })
  }

  const openClientDetail = (client: Client) => {
    setSelectedClient(client)
  }

  const getInitials = (name: string) =>
    name
      ? name.split(' ').map((n) => n[0]).join('').toUpperCase().substring(0, 2)
      : '??'

  // Handling Status Change (Local update for now, unless backend supports status patch)
  const handleStatusChange = (id: string, status: Client['status']) => {
    setClients(prev => prev.map(c => c.id === id ? { ...c, status } : c))
    // Add API call here if backend supports specific status updates
    toast({ title: `Client status updated to ${status.replace('-', ' ')}` })
  }

  return (
    <div className="p-6 lg:p-10 max-w-[1600px] mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Client Relations</h1>
          <p className="text-muted-foreground text-lg mt-2">
            Oversee incoming leads and manage communications.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-background border border-border rounded-xl px-4 py-2 shadow-sm text-center">
            <span className="text-xs text-muted-foreground block uppercase font-bold tracking-wider">
              Total
            </span>
            <span className="text-xl font-semibold">{clients.length}</span>
          </div>

          <div className="bg-background border border-sky-100 rounded-xl px-4 py-2 shadow-sm text-center">
            <span className="text-xs text-sky-600 block uppercase font-bold tracking-wider">
              New
            </span>
            <span className="text-xl font-semibold">
              {clients.filter((c) => c.status === 'new').length}
            </span>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm">
        {/* Toolbar */}
        <div className="p-4 border-b border-border flex flex-col sm:flex-row justify-between items-center gap-4 bg-muted/20">
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
            {(['all', 'new', 'in-progress', 'completed', 'archived'] as const).map(
              (status) => (
                <Button
                  key={status}
                  variant={filter === status ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setFilter(status)}
                  className={`capitalize whitespace-nowrap ${filter === status ? 'shadow-sm border border-border' : ''
                    }`}
                >
                  {status.replace('-', ' ')}
                </Button>
              )
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/30">
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground border-b border-border">
                  Client Info
                </th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground border-b border-border">
                  Project
                </th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground border-b border-border">
                  Status
                </th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground border-b border-border">
                  Created
                </th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground border-b border-border text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {filteredClients.map((client) => (
                <tr
                  key={client.id}
                  className="group hover:bg-sky-50/40 transition-all cursor-pointer"
                  onClick={() => openClientDetail(client)}
                >
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 border border-slate-200 group-hover:bg-white group-hover:border-sky-200 transition-colors">
                        {getInitials(client.name)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 leading-none">
                          {client.name}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                          <Mail className="w-3 h-3" /> {client.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-5 px-6">
                    <div className='flex flex-col gap-1'>
                        <Badge variant="secondary" className="font-medium bg-white border border-border w-fit">
                        {client.projectType}
                        </Badge>
                        {(client as any).budget && (
                             <span className='text-xs text-muted-foreground'>Budget: {(client as any).budget}</span>
                        )}
                    </div>
                  </td>

                  <td className="py-5 px-6">
                    <Badge
                      variant="outline"
                      className={`rounded-md px-2 py-0.5 border ${statusColors[client.status] || statusColors['new']}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current mr-2" />
                      {client.status.replace('-', ' ')}
                    </Badge>
                  </td>

                  <td className="py-5 px-6 text-sm text-muted-foreground font-medium">
                    {client.createdAt}
                  </td>

                  <td className="py-5 px-6 text-right">
                    <div
                      className="flex items-center justify-end gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 rounded-full"
                        onClick={() => openClientDetail(client)}
                      >
                        <MessageSquare className="w-4 h-4 text-slate-500" />
                      </Button>

                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 rounded-full text-destructive hover:bg-destructive/10"
                        onClick={() => handleDelete(client.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </div>

        {!isLoading && filteredClients.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="bg-muted/50 p-4 rounded-full mb-4">
              <Search className="w-8 h-8 text-muted-foreground/50" />
            </div>
            <h3 className="text-lg font-medium">No records found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search query.
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      <Dialog
        open={!!selectedClient}
        onOpenChange={(open) => {
          if (!open) setSelectedClient(null)
        }}
      >
        <DialogContent
          className="sm:max-w-2xl w-[calc(100vw-2rem)] max-h-[90vh] p-0 overflow-hidden rounded-2xl border border-slate-200 shadow-2xl bg-white text-slate-900">
          {selectedClient && (
            <div className="flex flex-col h-[90vh]">
              {/* Header (fixed) */}
              <div className="shrink-0 bg-slate-900 p-6 md:p-8 text-white">
                <div className="flex justify-between items-start gap-4">
                  <div className="min-w-0">
                    <Badge className="bg-white/10 text-white border border-white/15 mb-4">
                      {selectedClient.projectType}
                    </Badge>

                    <DialogTitle className="text-3xl font-bold truncate">
                      {selectedClient.name}
                    </DialogTitle>

                    <p className="text-slate-300 mt-2 flex items-center gap-2">
                       <span className='text-sm opacity-80'>Budget: {(selectedClient as any).budget}</span>
                       <span className='text-slate-500'>|</span>
                       <span className='text-sm opacity-80'>Timeline: {(selectedClient as any).timeline}</span>
                    </p>
                  </div>

                  <Badge
                    className={`px-4 py-1.5 text-sm capitalize ${statusHeaderColors[selectedClient.status] || statusHeaderColors['new']}`}
                  >
                    {selectedClient.status.replace('-', ' ')}
                  </Badge>
                </div>
              </div>

              {/* Body (scrollable) */}
              <div className="flex-1 overflow-y-auto">
                <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-white text-slate-900">

                  {/* Top Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-border pb-8">
                    {/* Contact Info */}
                    <div className="space-y-4">
                      <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">
                        Contact Info
                      </Label>

                      <div className="space-y-2">
                        <a
                          href={`mailto:${selectedClient.email}`}
                          className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground hover:bg-muted/40 transition-colors"
                        >
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span className="truncate">{selectedClient.email}</span>
                        </a>

                         {/* Only show phone if it exists and isn't the default */}
                        {selectedClient.phone !== "Not Provided" && (
                            <a
                            href={`tel:${selectedClient.phone}`}
                            className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground hover:bg-muted/40 transition-colors"
                            >
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span className="truncate">{selectedClient.phone}</span>
                            </a>
                        )}
                      </div>
                    </div>

                    {/* Status */}
                    <div className="space-y-4 md:text-right">
                      <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">
                        Update Lead Status
                      </Label>

                      <Select
                        value={selectedClient.status}
                        onValueChange={(value: Client['status']) => {
                          handleStatusChange(selectedClient.id, value)
                          setSelectedClient({ ...selectedClient, status: value })
                        }}
                      >
                        <SelectTrigger className="w-full md:ml-auto md:w-52 rounded-xl border-border bg-card text-foreground focus-visible:ring-2 focus-visible:ring-primary/30">
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

                  {/* Inquiry */}
                  <div className="space-y-3">
                    <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">
                      Inquiry Details
                    </Label>

                    <div className="p-5 bg-muted/40 rounded-xl border border-border text-foreground leading-relaxed">
                      <span className="opacity-90">“{selectedClient.message}”</span>
                    </div>
                  </div>

                  {/* Response */}
                  <div className="space-y-4 pb-6">
                    <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">
                      Internal Response
                    </Label>

                    <Textarea
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                      placeholder="Type your notes or response here..."
                      className="min-h-[200px] rounded-xl border-border bg-card text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/30"
                    />

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-[10px] text-muted-foreground">
                        Last updated: {selectedClient.updatedAt || "Just now"}
                      </span>

                      <Button
                        onClick={handleSendResponse}
                        disabled={!responseText.trim()}
                        className="px-6 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Save Response
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function Page() {
  return (
    <AdminLayout>
      <Clients />
    </AdminLayout>
  )
}