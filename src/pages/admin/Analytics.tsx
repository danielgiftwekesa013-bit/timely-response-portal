import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { services } from '@/lib/mockData';

// Mock analytics data
const serviceBreakdown = services.map((s, i) => ({
  name: s.name.split(' ')[0],
  orders: Math.floor(Math.random() * 100) + 20,
}));

const peakBookingTimes = [
  { time: '6AM', bookings: 12 },
  { time: '8AM', bookings: 45 },
  { time: '10AM', bookings: 28 },
  { time: '12PM', bookings: 35 },
  { time: '2PM', bookings: 42 },
  { time: '4PM', bookings: 55 },
  { time: '6PM', bookings: 48 },
  { time: '8PM', bookings: 22 },
];

const driverPerformance = [
  { name: 'John K.', trips: 248, rating: 4.8 },
  { name: 'Peter O.', trips: 156, rating: 4.6 },
  { name: 'James W.', trips: 312, rating: 4.9 },
];

const topLocations = [
  { location: 'Westlands', orders: 145 },
  { location: 'Karen', orders: 98 },
  { location: 'CBD', orders: 87 },
  { location: 'Kilimani', orders: 76 },
  { location: 'Lavington', orders: 65 },
];

const COLORS = ['#1e3a5f', '#2a4a6f', '#3a5a7f', '#4a6a8f', '#5a7a9f', '#6a8aaf', '#7a9abf'];

const Analytics = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground mt-1">Insights and performance metrics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Breakdown */}
        <div className="trl-card p-6">
          <h3 className="font-heading font-semibold text-lg mb-6">Orders by Service Type</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={serviceBreakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="orders" fill="hsl(217 70% 25%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Peak Booking Times */}
        <div className="trl-card p-6">
          <h3 className="font-heading font-semibold text-lg mb-6">Peak Booking Times</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={peakBookingTimes}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="bookings" 
                  stroke="hsl(42 95% 55%)" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(42 95% 55%)', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Locations */}
        <div className="trl-card p-6">
          <h3 className="font-heading font-semibold text-lg mb-6">Top Pickup Locations</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topLocations}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ location, percent }) => `${location} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="orders"
                >
                  {topLocations.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Driver Performance */}
        <div className="trl-card p-6">
          <h3 className="font-heading font-semibold text-lg mb-6">Driver Performance</h3>
          <div className="space-y-4">
            {driverPerformance.map((driver, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{driver.name}</div>
                    <div className="text-sm text-muted-foreground">{driver.trips} trips completed</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <span className="text-accent">★</span>
                    <span className="font-semibold">{driver.rating}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Rating</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
