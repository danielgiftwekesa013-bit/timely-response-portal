import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, CalendarCheck, Users, BarChart3, Settings, LogOut, Car } from 'lucide-react';
import { useAuth } from '@/lib/authContext';
import { Button } from '@/components/ui/button';
import logo from '@/assets/trl-logo.png';

const AdminLayout = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/trl" replace />;
  }

  const isCEO = user?.role === 'ceo';

  const ceoNavItems = [
    { href: '/trl/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/trl/pickups', icon: CalendarCheck, label: 'Scheduled Pickups' },
    { href: '/trl/drivers', icon: Users, label: 'Drivers' },
    { href: '/trl/analytics', icon: BarChart3, label: 'Analytics' },
    { href: '/trl/settings', icon: Settings, label: 'Settings' },
  ];

  const driverNavItems = [
    { href: '/trl/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/trl/my-pickups', icon: CalendarCheck, label: 'My Pickups' },
    { href: '/trl/settings', icon: Settings, label: 'Settings' },
  ];

  const navItems = isCEO ? ceoNavItems : driverNavItems;

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar text-sidebar-foreground flex flex-col fixed h-full">
        <div className="p-6 border-b border-sidebar-border">
          <img src={logo} alt="TRL Logo" className="h-12 w-auto" />
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive(item.href)
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'hover:bg-sidebar-accent text-sidebar-foreground/80 hover:text-sidebar-foreground'
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center">
              {isCEO ? <Users className="h-5 w-5" /> : <Car className="h-5 w-5" />}
            </div>
            <div>
              <div className="font-medium text-sm">{user?.name}</div>
              <div className="text-xs text-sidebar-foreground/60 capitalize">{user?.role}</div>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={() => {
              logout();
              window.location.href = '/trl';
            }}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
