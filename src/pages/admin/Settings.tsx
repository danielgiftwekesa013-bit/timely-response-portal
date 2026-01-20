import { useState } from 'react';
import { User, Lock, Bell, Shield, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/lib/authContext';
import { toast } from '@/hooks/use-toast';

const Settings = () => {
  const { user } = useAuth();
  const isCEO = user?.role === 'ceo';
  const [isAvailable, setIsAvailable] = useState(true);

  const handleSave = () => {
    toast({
      title: 'Settings saved',
      description: 'Your settings have been updated successfully.',
    });
  };

  const handlePasswordReset = () => {
    toast({
      title: 'Password reset',
      description: 'Password reset functionality would be implemented here.',
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account settings</p>
      </div>

      <div className="grid gap-6 max-w-2xl">
        {/* Profile Settings */}
        <div className="trl-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-lg">Profile</h2>
              <p className="text-sm text-muted-foreground">Your account information</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input defaultValue={user?.name} readOnly className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label>Username</Label>
              <Input defaultValue={user?.username} readOnly className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Input defaultValue={user?.role === 'ceo' ? 'CEO / Admin' : 'Driver'} readOnly className="bg-muted" />
            </div>
          </div>
        </div>

        {/* Driver Availability (Driver Only) */}
        {!isCEO && (
          <div className="trl-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <Bell className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h2 className="font-heading font-semibold text-lg">Availability</h2>
                <p className="text-sm text-muted-foreground">Set your availability status</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <div className="font-medium">Available for pickups</div>
                <div className="text-sm text-muted-foreground">
                  Toggle off when you're not available
                </div>
              </div>
              <Switch checked={isAvailable} onCheckedChange={setIsAvailable} />
            </div>
          </div>
        )}

        {/* Security */}
        <div className="trl-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-lg">Security</h2>
              <p className="text-sm text-muted-foreground">Manage your password</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Current Password</Label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-2">
              <Label>New Password</Label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-2">
              <Label>Confirm New Password</Label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <Button variant="outline" onClick={handlePasswordReset} className="gap-2">
              <Lock className="h-4 w-4" />
              Reset Password
            </Button>
          </div>
        </div>

        <Button onClick={handleSave} className="gap-2 w-fit">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default Settings;
