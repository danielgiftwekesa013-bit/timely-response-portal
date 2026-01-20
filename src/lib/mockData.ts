// Mock Data for TRL Prototype

export interface Booking {
  id: string;
  ticketId: string;
  passengerName: string;
  phone: string;
  pickupLocation: string;
  destination: string;
  pickupDate: string;
  pickupTime: string;
  passengers: number;
  serviceType: string;
  notes?: string;
  status: RideStatus;
  driverId?: string;
  createdAt: string;
}

export type RideStatus = 
  | 'confirmed'
  | 'driver_on_way'
  | 'waiting'
  | 'picked'
  | 'en_route'
  | 'completed';

export const rideStatusLabels: Record<RideStatus, string> = {
  confirmed: 'Booking Confirmed',
  driver_on_way: 'Driver on the Way',
  waiting: 'Waiting for Passengers',
  picked: 'Passengers Picked',
  en_route: 'En Route',
  completed: 'Journey Completed',
};

export const rideStatusOrder: RideStatus[] = [
  'confirmed',
  'driver_on_way',
  'waiting',
  'picked',
  'en_route',
  'completed',
];

export interface Driver {
  id: string;
  name: string;
  phone: string;
  idNumber: string;
  carModel: string;
  vehicleReg: string;
  enrollmentDate: string;
  completedTrips: number;
  status: 'active' | 'off';
  username: string;
  password: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const services: Service[] = [
  {
    id: 'corporate',
    name: 'Corporate Rides',
    description: 'Professional chauffeur services for business executives and corporate events.',
    icon: 'Briefcase',
  },
  {
    id: 'airport',
    name: 'Airport Transfers',
    description: 'Reliable pickups and drop-offs at JKIA and Wilson airports.',
    icon: 'Plane',
  },
  {
    id: 'game-drive',
    name: 'Game Drive',
    description: 'Explore Kenya\'s breathtaking wildlife in comfort and style.',
    icon: 'TreePine',
  },
  {
    id: 'excursion',
    name: 'Excursion',
    description: 'Day trips and adventures to scenic destinations across Kenya.',
    icon: 'Mountain',
  },
  {
    id: 'team-building',
    name: 'Team Building',
    description: 'Group transport for corporate team building activities.',
    icon: 'Users',
  },
  {
    id: 'road-trips',
    name: 'Road Trips',
    description: 'Long-distance comfortable travel for all your road trip needs.',
    icon: 'Route',
  },
  {
    id: 'family-drive',
    name: 'Family Drive',
    description: 'Safe and comfortable rides for family outings and events.',
    icon: 'Heart',
  },
];

export const mockDrivers: Driver[] = [
  {
    id: 'drv-001',
    name: 'John Kamau',
    phone: '+254 712 345 678',
    idNumber: '28456789',
    carModel: 'Toyota Land Cruiser Prado',
    vehicleReg: 'KDA 123A',
    enrollmentDate: '2022-03-15',
    completedTrips: 248,
    status: 'active',
    username: 'driver1',
    password: 'trl',
  },
  {
    id: 'drv-002',
    name: 'Peter Ochieng',
    phone: '+254 723 456 789',
    idNumber: '30567891',
    carModel: 'Toyota Fortuner',
    vehicleReg: 'KDB 456B',
    enrollmentDate: '2023-01-10',
    completedTrips: 156,
    status: 'active',
    username: 'driver2',
    password: 'trl',
  },
  {
    id: 'drv-003',
    name: 'James Wanjiku',
    phone: '+254 734 567 890',
    idNumber: '25678912',
    carModel: 'Nissan Patrol',
    vehicleReg: 'KCG 789C',
    enrollmentDate: '2021-08-22',
    completedTrips: 312,
    status: 'off',
    username: 'driver3',
    password: 'trl',
  },
];

export const mockBookings: Booking[] = [
  {
    id: 'bk-001',
    ticketId: 'TRL-2024-0001',
    passengerName: 'Sarah Njeri',
    phone: '+254 711 111 111',
    pickupLocation: 'Westlands, Nairobi',
    destination: 'JKIA Terminal 1',
    pickupDate: '2024-01-22',
    pickupTime: '06:30',
    passengers: 2,
    serviceType: 'airport',
    status: 'en_route',
    driverId: 'drv-001',
    createdAt: '2024-01-20T10:30:00Z',
  },
  {
    id: 'bk-002',
    ticketId: 'TRL-2024-0002',
    passengerName: 'Michael Odhiambo',
    phone: '+254 722 222 222',
    pickupLocation: 'Karen, Nairobi',
    destination: 'Maasai Mara National Reserve',
    pickupDate: '2024-01-25',
    pickupTime: '05:00',
    passengers: 4,
    serviceType: 'game-drive',
    notes: 'Need baby seat for 2-year old',
    status: 'confirmed',
    driverId: 'drv-002',
    createdAt: '2024-01-19T14:15:00Z',
  },
  {
    id: 'bk-003',
    ticketId: 'TRL-2024-0003',
    passengerName: 'Grace Muthoni',
    phone: '+254 733 333 333',
    pickupLocation: 'Kilimani, Nairobi',
    destination: 'Lake Nakuru National Park',
    pickupDate: '2024-01-23',
    pickupTime: '07:00',
    passengers: 6,
    serviceType: 'excursion',
    status: 'driver_on_way',
    driverId: 'drv-001',
    createdAt: '2024-01-21T09:00:00Z',
  },
  {
    id: 'bk-004',
    ticketId: 'TRL-2024-0004',
    passengerName: 'David Kipchoge',
    phone: '+254 744 444 444',
    pickupLocation: 'CBD, Nairobi',
    destination: 'Safari Park Hotel',
    pickupDate: '2024-01-22',
    pickupTime: '14:00',
    passengers: 15,
    serviceType: 'team-building',
    status: 'completed',
    driverId: 'drv-002',
    createdAt: '2024-01-18T16:45:00Z',
  },
  {
    id: 'bk-005',
    ticketId: 'TRL-2024-0005',
    passengerName: 'Faith Wanjiku',
    phone: '+254 755 555 555',
    pickupLocation: 'Lavington, Nairobi',
    destination: 'Mombasa via Nairobi-Mombasa Highway',
    pickupDate: '2024-01-28',
    pickupTime: '04:30',
    passengers: 5,
    serviceType: 'family-drive',
    notes: 'Road trip with children, need comfortable vehicle',
    status: 'confirmed',
    createdAt: '2024-01-20T11:30:00Z',
  },
];

export const adminCredentials = {
  ceo: {
    username: 'ephy',
    password: 'trl',
    role: 'ceo' as const,
    name: 'Ephy - CEO',
  },
};

export const generateTicketId = (): string => {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `TRL-${year}-${random}`;
};

export const contactInfo = {
  calls: '0724210330',
  whatsapp: '0715133570',
  email: 'tirelogistics@gmail.com',
  whatsappLink: 'https://wa.me/254715133570',
};
