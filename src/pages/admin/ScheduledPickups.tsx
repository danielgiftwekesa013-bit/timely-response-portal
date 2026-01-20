import { useState } from 'react';
import { Eye, Clock, MapPin, User, Phone, Users as UsersIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useBookings } from '@/lib/bookingContext';
import { useAuth } from '@/lib/authContext';
import { mockDrivers, services, rideStatusLabels, rideStatusOrder, type RideStatus, type Booking } from '@/lib/mockData';

const ScheduledPickups = () => {
  const { user } = useAuth();
  const { bookings, updateBookingStatus, getBookingsByDriver } = useBookings();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const isCEO = user?.role === 'ceo';

  const displayBookings = isCEO 
    ? bookings 
    : getBookingsByDriver(user?.driverId || '');

  const handleStatusChange = (bookingId: string, newStatus: RideStatus) => {
    updateBookingStatus(bookingId, newStatus);
  };

  const getDriver = (driverId?: string) => {
    return driverId ? mockDrivers.find((d) => d.id === driverId) : null;
  };

  const getService = (serviceId: string) => {
    return services.find((s) => s.id === serviceId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground">
          {isCEO ? 'Scheduled Pickups' : 'My Assigned Pickups'}
        </h1>
        <p className="text-muted-foreground mt-1">
          {isCEO ? 'Manage all bookings and update statuses' : 'View and manage your assigned rides'}
        </p>
      </div>

      <div className="trl-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Ticket</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Passenger</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Service</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date & Time</th>
                {isCEO && <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Driver</th>}
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayBookings.map((booking) => {
                const driver = getDriver(booking.driverId);
                const service = getService(booking.serviceType);
                return (
                  <tr key={booking.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="py-4 px-4 font-mono text-sm">{booking.ticketId}</td>
                    <td className="py-4 px-4">
                      <div className="font-medium">{booking.passengerName}</div>
                      <div className="text-sm text-muted-foreground">{booking.phone}</div>
                    </td>
                    <td className="py-4 px-4">{service?.name || booking.serviceType}</td>
                    <td className="py-4 px-4 text-sm">
                      <div>{booking.pickupDate}</div>
                      <div className="text-muted-foreground">{booking.pickupTime}</div>
                    </td>
                    {isCEO && (
                      <td className="py-4 px-4 text-sm">
                        {driver?.name || <span className="text-muted-foreground italic">Unassigned</span>}
                      </td>
                    )}
                    <td className="py-4 px-4">
                      <Select
                        value={booking.status}
                        onValueChange={(value: RideStatus) => handleStatusChange(booking.id, value)}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {rideStatusOrder.map((status) => (
                            <SelectItem key={status} value={status}>
                              {rideStatusLabels[status]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="py-4 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedBooking(booking)}
                        className="gap-1"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </Button>
                    </td>
                  </tr>
                );
              })}
              {displayBookings.length === 0 && (
                <tr>
                  <td colSpan={isCEO ? 7 : 6} className="py-8 text-center text-muted-foreground">
                    No pickups found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details Modal */}
      <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-heading">Booking Details</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <div className="text-sm text-muted-foreground">Ticket ID</div>
                  <div className="font-mono font-bold text-primary">{selectedBooking.ticketId}</div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  selectedBooking.status === 'completed' ? 'bg-green-100 text-green-700' :
                  'bg-accent/20 text-accent-foreground'
                }`}>
                  {rideStatusLabels[selectedBooking.status]}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">Passenger</div>
                    <div className="font-medium">{selectedBooking.passengerName}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">Contact</div>
                    <div className="font-medium">{selectedBooking.phone}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <UsersIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">Passengers</div>
                    <div className="font-medium">{selectedBooking.passengers}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">Pickup Time</div>
                    <div className="font-medium">{selectedBooking.pickupDate} at {selectedBooking.pickupTime}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
              <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">Pickup Location</div>
                    <div className="font-medium">{selectedBooking.pickupLocation}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-destructive mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">Destination</div>
                    <div className="font-medium">{selectedBooking.destination}</div>
                  </div>
                </div>
              </div>

              {selectedBooking.notes && (
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Notes</div>
                  <div className="text-sm">{selectedBooking.notes}</div>
                </div>
              )}

              {isCEO && selectedBooking.driverId && (
                <div className="p-4 bg-primary/5 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Assigned Driver</div>
                  <div className="font-medium">{getDriver(selectedBooking.driverId)?.name}</div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScheduledPickups;
