import { useState } from 'react';
import { User, Phone, Car, Calendar, CheckCircle, XCircle, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockDrivers, type Driver } from '@/lib/mockData';

const DriversManagement = () => {
  const [drivers, setDrivers] = useState<Driver[]>(mockDrivers);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newDriver, setNewDriver] = useState({
    name: '',
    phone: '',
    idNumber: '',
    carModel: '',
    vehicleReg: '',
  });

  const handleToggleStatus = (driverId: string) => {
    setDrivers((prev) =>
      prev.map((d) =>
        d.id === driverId ? { ...d, status: d.status === 'active' ? 'off' : 'active' } : d
      )
    );
  };

  const handleAddDriver = () => {
    const driver: Driver = {
      id: `drv-${Date.now()}`,
      ...newDriver,
      enrollmentDate: new Date().toISOString().split('T')[0],
      completedTrips: 0,
      status: 'active',
      username: `driver${drivers.length + 1}`,
      password: 'trl',
    };
    setDrivers((prev) => [...prev, driver]);
    setNewDriver({ name: '', phone: '', idNumber: '', carModel: '', vehicleReg: '' });
    setShowAddDialog(false);
  };

  const handleDeleteDriver = (driverId: string) => {
    setDrivers((prev) => prev.filter((d) => d.id !== driverId));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Drivers Management</h1>
          <p className="text-muted-foreground mt-1">Manage your driver fleet</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Driver
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-heading">Add New Driver</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input
                  value={newDriver.name}
                  onChange={(e) => setNewDriver((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Enter driver's name"
                />
              </div>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input
                  value={newDriver.phone}
                  onChange={(e) => setNewDriver((p) => ({ ...p, phone: e.target.value }))}
                  placeholder="+254 7XX XXX XXX"
                />
              </div>
              <div className="space-y-2">
                <Label>ID Number</Label>
                <Input
                  value={newDriver.idNumber}
                  onChange={(e) => setNewDriver((p) => ({ ...p, idNumber: e.target.value }))}
                  placeholder="National ID"
                />
              </div>
              <div className="space-y-2">
                <Label>Car Model</Label>
                <Input
                  value={newDriver.carModel}
                  onChange={(e) => setNewDriver((p) => ({ ...p, carModel: e.target.value }))}
                  placeholder="e.g., Toyota Land Cruiser"
                />
              </div>
              <div className="space-y-2">
                <Label>Vehicle Registration</Label>
                <Input
                  value={newDriver.vehicleReg}
                  onChange={(e) => setNewDriver((p) => ({ ...p, vehicleReg: e.target.value }))}
                  placeholder="e.g., KDA 123A"
                />
              </div>
              <Button onClick={handleAddDriver} className="w-full">
                Add Driver
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drivers.map((driver) => (
          <div key={driver.id} className="trl-card p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">{driver.name}</div>
                  <div className={`text-xs px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${
                    driver.status === 'active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {driver.status === 'active' ? (
                      <CheckCircle className="h-3 w-3" />
                    ) : (
                      <XCircle className="h-3 w-3" />
                    )}
                    {driver.status === 'active' ? 'Active' : 'Off'}
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => handleDeleteDriver(driver.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{driver.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Car className="h-4 w-4" />
                <span>{driver.carModel} ({driver.vehicleReg})</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Enrolled: {driver.enrollmentDate}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-primary">{driver.completedTrips}</div>
                <div className="text-xs text-muted-foreground">Completed Trips</div>
              </div>
              <Button
                variant={driver.status === 'active' ? 'outline' : 'default'}
                size="sm"
                onClick={() => handleToggleStatus(driver.id)}
              >
                {driver.status === 'active' ? 'Set Off' : 'Set Active'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriversManagement;
