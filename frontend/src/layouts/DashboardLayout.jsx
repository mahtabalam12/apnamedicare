import { useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, HeartPulse, ClipboardList, User, Settings, LogOut, Pill, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: CalendarDays, label: 'Appointments', path: '/dashboard/appointments' },
    { icon: Pill, label: 'Prescriptions', path: '/dashboard/prescriptions' },
    { icon: ClipboardList, label: 'Orders', path: '/dashboard/orders' },
    { icon: User, label: 'Profile', path: '/dashboard/profile' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    const userObj = localStorage.getItem('user');
    if (!userObj) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-slate-100 hidden lg:flex flex-col h-screen sticky top-0 transition-colors duration-300">
        <div className="p-8">
          <Link to="/" className="flex items-center gap-2 text-2xl font-black text-slate-900 group">
            <span className="bg-primary-600 p-2.5 rounded-2xl text-white shadow-lg shadow-primary-200 group-hover:scale-110 transition-transform">
              <HeartPulse className="w-6 h-6" />
            </span>
            <span className="tracking-tight">Apna<span className="text-primary-600">Medicare</span></span>
          </Link>
        </div>
        
        <nav className="flex-1 px-6 space-y-2 mt-6">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-4">Menu</p>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center justify-between px-4 py-4 rounded-2xl transition-all group ${
                  isActive 
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-primary-600'}`} />
                  <span className="text-sm font-black tracking-wide">{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 opacity-50" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-slate-100">
           <div className="bg-slate-50 rounded-3xl p-4 mb-6 border border-slate-100">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white font-black">M</div>
                 <div>
                    <p className="text-slate-900 text-xs font-black">{user?.name || 'User'}</p>
                    <p className="text-[10px] text-slate-500 font-bold">Premium Member</p>
                 </div>
              </div>
           </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-6 py-4 text-red-500 hover:bg-red-500/10 rounded-2xl transition-all font-black text-sm w-full group"
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden">
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
