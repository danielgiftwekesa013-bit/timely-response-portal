import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapPin, Calendar, Clock, Users, MessageSquare, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useBookings } from '@/lib/bookingContext';
import { services } from '@/lib/mockData';

const BookRide = () => {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || '';
  const { addBooking } = useBookings();
  
  const [formData, setFormData] = useState({
    passengerName: '',
    phone: '',
    pickupLocation: '',
    destination: '',
    pickupDate: '',
    pickupTime: '',
    passengers: '1',
    serviceType: preselectedService,
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const booking = addBooking({
      passengerName: formData.passengerName,
      phone: formData.phone,
      pickupLocation: formData.pickupLocation,
      destination: formData.destination,
      pickupDate: formData.pickupDate,
      pickupTime: formData.pickupTime,
      passengers: parseInt(formData.passengers),
      serviceType: formData.serviceType,
      notes: formData.notes || undefined,
    });

    setTicketId(booking.ticketId);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="trl-section min-h-[70vh] flex items-center">
        <div className="trl-container">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6 animate-scale-in">
              <CheckCircle className="h-10 w-10 text-accent" />
            </div>
            <h1 className="font-heading text-3xl font-bold text-foreground mb-4">
              Booking Confirmed!
            </h1>
            <p className="text-muted-foreground mb-6">
              Your ride has been successfully booked. Save your ticket ID to track your ride status.
            </p>
            
            <div className="trl-card p-6 mb-8">
              <div className="text-sm text-muted-foreground mb-2">Your Ticket ID</div>
              <div className="text-2xl font-bold text-primary font-mono">{ticketId}</div>
            </div>

            <div className="space-y-3">
              <Button asChild className="w-full" size="lg">
                <a href={`/track?ticket=${ticketId}`}>Track Your Ride</a>
              </Button>
              <Button
                variant="outline"
                className="w-full"
                size="lg"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    passengerName: '',
                    phone: '',
                    pickupLocation: '',
                    destination: '',
                    pickupDate: '',
                    pickupTime: '',
                    passengers: '1',
                    serviceType: '',
                    notes: '',
                  });
                }}
              >
                Book Another Ride
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="trl-section">
      <div className="trl-container">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">Book a Ride</span>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">
              Schedule Your Trip
            </h1>
            <p className="text-muted-foreground mt-4">
              Fill in the details below to book your ride. We'll confirm your booking shortly.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="trl-card p-8 space-y-6">
            {/* Passenger Name */}
            <div className="space-y-2">
              <Label htmlFor="passengerName">Passenger Full Name *</Label>
              <Input
                id="passengerName"
                value={formData.passengerName}
                onChange={(e) => handleChange('passengerName', e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Contact Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+254 7XX XXX XXX"
                required
              />
            </div>

            {/* Pickup Location */}
            <div className="space-y-2">
              <Label htmlFor="pickupLocation">Pickup Location *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={(e) => handleChange('pickupLocation', e.target.value)}
                  placeholder="Enter pickup location"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Destination */}
            <div className="space-y-2">
              <Label htmlFor="destination">Destination *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-accent" />
                <Input
                  id="destination"
                  value={formData.destination}
                  onChange={(e) => handleChange('destination', e.target.value)}
                  placeholder="Enter destination"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pickupDate">Pickup Date *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="pickupDate"
                    type="date"
                    value={formData.pickupDate}
                    onChange={(e) => handleChange('pickupDate', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="pickupTime">Pickup Time *</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="pickupTime"
                    type="time"
                    value={formData.pickupTime}
                    onChange={(e) => handleChange('pickupTime', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Passengers & Service */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="passengers">Number of Passengers *</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-5 w-5 text-muted-foreground z-10" />
                  <Select value={formData.passengers} onValueChange={(v) => handleChange('passengers', v)}>
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 15, 20].map((n) => (
                        <SelectItem key={n} value={n.toString()}>
                          {n} passenger{n > 1 ? 's' : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="serviceType">Type of Service *</Label>
                <Select value={formData.serviceType} onValueChange={(v) => handleChange('serviceType', v)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Optional Notes</Label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  placeholder="Any special requests or requirements?"
                  className="pl-10 min-h-[100px]"
                />
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full">
              Confirm Booking
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookRide;
