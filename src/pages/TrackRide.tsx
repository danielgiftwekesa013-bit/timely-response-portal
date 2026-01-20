import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, CheckCircle2, Circle, User, Phone, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useBookings } from '@/lib/bookingContext';
import { rideStatusLabels, rideStatusOrder, mockDrivers, services } from '@/lib/mockData';

const TrackRide = () => {
  const [searchParams] = useSearchParams();
  const initialTicket = searchParams.get('ticket') || '';
  const [ticketInput, setTicketInput] = useState(initialTicket);
  const [searchedTicket, setSearchedTicket] = useState(initialTicket);
  const { getBookingByTicket } = useBookings();

  const booking = searchedTicket ? getBookingByTicket(searchedTicket) : null;
  const driver = booking?.driverId ? mockDrivers.find((d) => d.id === booking.driverId) : null;
  const service = booking ? services.find((s) => s.id === booking.serviceType) : null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchedTicket(ticketInput);
  };

  const getStatusIndex = (status: string) => {
    return rideStatusOrder.indexOf(status as typeof rideStatusOrder[number]);
  };

  return (
    <div className="trl-section min-h-[70vh]">
      <div className="trl-container">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">Track Your Ride</span>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">
              Check Ride Status
            </h1>
            <p className="text-muted-foreground mt-4">
              Enter your ticket ID to track the status of your ride.
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-3 mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                value={ticketInput}
                onChange={(e) => setTicketInput(e.target.value)}
                placeholder="Enter ticket ID (e.g., TRL-2024-0001)"
                className="pl-10"
              />
            </div>
            <Button type="submit">Track</Button>
          </form>

          {/* Results */}
          {searchedTicket && !booking && (
            <div className="trl-card p-8 text-center">
              <div className="text-muted-foreground">
                No booking found for ticket <span className="font-mono font-semibold">{searchedTicket}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Please check the ticket ID and try again.
              </p>
            </div>
          )}

          {booking && (
            <div className="space-y-6">
              {/* Booking Info Card */}
              <div className="trl-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-sm text-muted-foreground">Ticket ID</div>
                    <div className="text-lg font-bold text-primary font-mono">{booking.ticketId}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Service</div>
                    <div className="font-semibold">{service?.name || booking.serviceType}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Passenger:</span>
                    <span className="ml-2 font-medium">{booking.passengerName}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Passengers:</span>
                    <span className="ml-2 font-medium">{booking.passengers}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Pickup:</span>
                    <span className="ml-2 font-medium">{booking.pickupLocation}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Destination:</span>
                    <span className="ml-2 font-medium">{booking.destination}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Date:</span>
                    <span className="ml-2 font-medium">{booking.pickupDate}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Time:</span>
                    <span className="ml-2 font-medium">{booking.pickupTime}</span>
                  </div>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="trl-card p-6">
                <h3 className="font-heading font-semibold text-lg mb-6">Ride Status</h3>
                <div className="space-y-4">
                  {rideStatusOrder.map((status, index) => {
                    const currentIndex = getStatusIndex(booking.status);
                    const isCompleted = index <= currentIndex;
                    const isCurrent = index === currentIndex;

                    return (
                      <div key={status} className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          {isCompleted ? (
                            <CheckCircle2 className={`h-6 w-6 ${isCurrent ? 'text-accent' : 'text-green-500'}`} />
                          ) : (
                            <Circle className="h-6 w-6 text-muted-foreground/40" />
                          )}
                          {index < rideStatusOrder.length - 1 && (
                            <div className={`w-0.5 h-8 ${isCompleted ? 'bg-green-500' : 'bg-muted'}`} />
                          )}
                        </div>
                        <div className={`pb-4 ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                          <div className={`font-medium ${isCurrent ? 'text-accent' : ''}`}>
                            {rideStatusLabels[status]}
                          </div>
                          {isCurrent && (
                            <div className="text-sm text-muted-foreground mt-1">Current status</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Driver Info */}
              {driver && (
                <div className="trl-card p-6">
                  <h3 className="font-heading font-semibold text-lg mb-4">Driver Information</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-lg">{driver.name}</div>
                      <a href={`tel:${driver.phone}`} className="text-primary hover:underline flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {driver.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted rounded-lg p-3">
                    <Car className="h-5 w-5" />
                    <span>{driver.carModel}</span>
                    <span className="mx-2">•</span>
                    <span className="font-mono font-semibold">{driver.vehicleReg}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackRide;
