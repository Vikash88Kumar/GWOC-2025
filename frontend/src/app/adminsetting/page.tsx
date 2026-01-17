import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const Settings: React.FC = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({ title: 'Settings saved successfully' });
  };

  return (
    <div className="p-8 max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-semibold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your admin panel preferences</p>
      </div>

      {/* General Settings */}
      <div className="admin-card mb-6">
        <h2 className="text-xl font-heading font-semibold mb-6">General</h2>
        <div className="space-y-6">
          <div>
            <Label>Site Name</Label>
            <Input defaultValue="Bloom Branding" className="mt-2 max-w-md" />
          </div>
          <div>
            <Label>Admin Email</Label>
            <Input defaultValue="admin@bloombranding.com" type="email" className="mt-2 max-w-md" />
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="admin-card mb-6">
        <h2 className="text-xl font-heading font-semibold mb-6">Notifications</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">New Client Notifications</p>
              <p className="text-sm text-muted-foreground">Get notified when a new client inquiry is received</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">New Testimonial Notifications</p>
              <p className="text-sm text-muted-foreground">Get notified when a new testimonial is submitted</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Digest</p>
              <p className="text-sm text-muted-foreground">Receive a weekly summary of activity</p>
            </div>
            <Switch />
          </div>
        </div>
      </div>

      {/* Display Settings */}
      <div className="admin-card mb-6">
        <h2 className="text-xl font-heading font-semibold mb-6">Display</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Compact View</p>
              <p className="text-sm text-muted-foreground">Use a more compact layout for lists</p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Show Timestamps</p>
              <p className="text-sm text-muted-foreground">Display creation and update times on all items</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <AdminLayout>
      <Settings />
    </AdminLayout>
  );
}