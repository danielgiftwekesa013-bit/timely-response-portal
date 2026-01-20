import { Users, CalendarCheck, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '@/lib/authContext';
import { useBookings } from '@/lib/bookingContext';
import { mockDrivers, services, rideStatusLabels } from '@/lib/mockData';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const { bookings, getBookingsByDriver } = useBookings();
  const isCEO = user?.role === 'ceo';

  const activeDrivers = mockDrivers.filter((d) => d.status === 'active').length;
  const scheduledPickups = bookings.filter((b) => b.status !== 'completed').length;
  const completedRides = bookings.filter((b) => b.status === 'completed').length;

  const recentBookings = isCEO
    ? bookings.slice(-5).reverse()
    : getBookingsByDriver(user?.driverId || '').slice(-5).reverse();

  const driverCompletedTrips = isCEO
    ? completedRides
    : getBookingsByDriver(user?.driverId || '').filter((b) => b.status === 'completed').length;

  const stats = isCEO
    ? [
        { label: 'Active Drivers', value: activeDrivers, icon: Users, color: 'bg-blue-500' },
        { label: 'Scheduled Pickups', value: scheduledPickups, icon: CalendarCheck, color: 'bg-accent' },
        { label: 'Completed Rides', value: completedRides, icon: CheckCircle, color: 'bg-green-500' },
      ]
    : [
        { label: 'Assigned Pickups', value: getBookingsByDriver(user?.driverId || '').filter((b) => b.status !== 'completed').length, icon: CalendarCheck, color: 'bg-accent' },
        { label: 'Completed Journeys', value: driverCompletedTrips, icon: CheckCircle, color: 'bg-green-500' },
      ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground">
          Welcome, {user?.name?.split(' ')[0]}!
        </h1>
        <p className="text-muted-foreground mt-1">
          {isCEO ? 'Here\'s your company overview' : 'Here\'s your daily overview'}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="trl-card p-6">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="h-7 w-7 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Pickups */}
      <div className="trl-card">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="font-heading text-xl font-semibold">Recent Scheduled Pickups</h2>
          <Link to={isCEO ? '/trl/pickups' : '/trl/my-pickups'} className="text-primary text-sm hover:underline">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">Ticket</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">Passenger</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">Service</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">Date & Time</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking) => {
                const service = services.find((s) => s.id === booking.serviceType);
                return (
                  <tr key={booking.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="py-4 px-6 font-mono text-sm">{booking.ticketId}</td>
                    <td className="py-4 px-6">{booking.passengerName}</td>
                    <td className="py-4 px-6">{service?.name || booking.serviceType}</td>
                    <td className="py-4 px-6 text-sm">
                      {booking.pickupDate} at {booking.pickupTime}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'completed' ? 'bg-green-100 text-green-700' :
                        booking.status === 'en_route' ? 'bg-blue-100 text-blue-700' :
                        'bg-accent/20 text-accent-foreground'
                      }`}>
                        <Clock className="h-3 w-3" />
                        {rideStatusLabels[booking.status]}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {recentBookings.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-muted-foreground">
                    No pickups scheduled yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
