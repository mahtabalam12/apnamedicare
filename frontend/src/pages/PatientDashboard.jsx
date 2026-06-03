import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Pill, Activity, ChevronRight, Video, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData(user.id);
    } else {
      setLoading(false);
      navigate('/login');
    }
  }, [user, navigate]);

  const fetchDashboardData = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/api/appointments/${userId}`);
      const data = await response.json();
      setAppointments(data);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { label: 'Upcoming Appointments', value: appointments.length.toString(), icon: Calendar, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Active Prescriptions', value: '2', icon: Pill, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Health Score', value: '98%', icon: Activity, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="w-10 h-10 text-primary-600 animate-spin mb-4" />
      <p className="text-slate-400 font-black tracking-widest text-xs">Syncing Your Health Data...</p>
    </div>
  );

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Welcome back, <span className="text-primary-600">{user?.name || 'User'}</span>!</h1>
        <p className="text-slate-500 font-medium">Your health is our priority. Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/20 flex items-center gap-6"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color} shadow-inner`}>
                <Icon className="w-8 h-8" />
              </div>
              <div>
                <p className="text-3xl font-black text-slate-900 leading-none mb-1">{stat.value}</p>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Appointments */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/30 overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <h2 className="text-xl font-black text-slate-900">Live Schedule</h2>
              <Link to="appointments" className="text-primary-600 font-black text-xs uppercase tracking-widest hover:underline">View History</Link>
            </div>
            
            <div className="p-8 space-y-6">
              {appointments.length > 0 ? (
                appointments.map((apt, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-100 rounded-3xl p-6 flex flex-col md:flex-row md:items-center gap-6 group hover:bg-white hover:border-primary-100 transition-all card-hover">
                    <div className="flex-shrink-0 text-center bg-white border border-slate-100 rounded-2xl px-5 py-3 shadow-sm">
                      <p className="text-xs font-black text-rose-500 uppercase">{apt.date.split('-')[1] || 'Today'}</p>
                      <p className="text-3xl font-black text-slate-900">{apt.date.split('-')[2] || apt.date}</p>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-black text-lg text-slate-900">{apt.doctorName}</h3>
                        <span className="bg-indigo-100 text-indigo-700 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                          {apt.status}
                        </span>
                      </div>
                      <p className="text-slate-400 text-xs font-black uppercase tracking-wider mb-3">{apt.specialty}</p>
                      <div className="flex items-center gap-4 text-sm font-bold text-slate-500">
                        <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-100"><Clock className="w-4 h-4 text-primary-500" /> {apt.time}</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="bg-primary-600 text-white px-6 py-3 rounded-2xl text-xs font-black hover:bg-primary-700 shadow-lg shadow-primary-200 btn-shine">
                        Details
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                    <Calendar className="w-8 h-8" />
                  </div>
                  <p className="text-slate-400 font-bold">No upcoming appointments.</p>
                  <Link to="/doctors" className="text-primary-600 font-black text-sm mt-2 inline-block hover:underline">Book a Consultation Now</Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <div className="bg-white rounded-[40px] p-8 text-slate-900 border border-slate-100 relative overflow-hidden shadow-xl shadow-slate-200/20 transition-colors duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/20 blur-3xl rounded-full" />
            <h2 className="text-xl font-black mb-6 relative z-10 text-slate-900">Active Care Plan</h2>
            <div className="space-y-4 relative z-10">
              {[
                { name: 'Multi-Vitamin', time: 'Every Morning' },
                { name: 'Physiotherapy', time: 'Weekly Tuesday' }
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="font-black text-sm text-slate-900">{item.name}</p>
                  <p className="text-[10px] font-bold text-primary-600 uppercase tracking-widest">{item.time}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-4 bg-primary-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary-500 transition-all shadow-lg shadow-primary-600/20 btn-shine">
              Order Refills
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
