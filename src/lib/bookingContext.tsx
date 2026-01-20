import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockBookings, type Booking, type RideStatus, generateTicketId } from './mockData';

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'ticketId' | 'createdAt' | 'status'>) => Booking;
  updateBookingStatus: (bookingId: string, status: RideStatus) => void;
  assignDriver: (bookingId: string, driverId: string) => void;
  getBookingByTicket: (ticketId: string) => Booking | undefined;
  getBookingsByDriver: (driverId: string) => Booking[];
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('trl_bookings');
    if (stored) {
      setBookings(JSON.parse(stored));
    } else {
      setBookings(mockBookings);
      localStorage.setItem('trl_bookings', JSON.stringify(mockBookings));
    }
  }, []);

  const saveBookings = (newBookings: Booking[]) => {
    setBookings(newBookings);
    localStorage.setItem('trl_bookings', JSON.stringify(newBookings));
  };

  const addBooking = (bookingData: Omit<Booking, 'id' | 'ticketId' | 'createdAt' | 'status'>): Booking => {
    const newBooking: Booking = {
      ...bookingData,
      id: `bk-${Date.now()}`,
      ticketId: generateTicketId(),
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };
    const updated = [...bookings, newBooking];
    saveBookings(updated);
    return newBooking;
  };

  const updateBookingStatus = (bookingId: string, status: RideStatus) => {
    const updated = bookings.map((b) =>
      b.id === bookingId ? { ...b, status } : b
    );
    saveBookings(updated);
  };

  const assignDriver = (bookingId: string, driverId: string) => {
    const updated = bookings.map((b) =>
      b.id === bookingId ? { ...b, driverId } : b
    );
    saveBookings(updated);
  };

  const getBookingByTicket = (ticketId: string): Booking | undefined => {
    return bookings.find((b) => b.ticketId.toLowerCase() === ticketId.toLowerCase());
  };

  const getBookingsByDriver = (driverId: string): Booking[] => {
    return bookings.filter((b) => b.driverId === driverId);
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        addBooking,
        updateBookingStatus,
        assignDriver,
        getBookingByTicket,
        getBookingsByDriver,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookings must be used within a BookingProvider');
  }
  return context;
};
