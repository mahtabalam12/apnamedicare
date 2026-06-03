import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Video, MoreVertical, X, Loader2, AlertCircle, Trash } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';

const getDoctorImage = (doctorName) => {
  if (doctorName?.includes('Sarah')) return 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80';
  if (doctorName?.includes('Emily')) return 'https://images.unsplash.com/photo-1594824436951-7f12bc417531?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80';
  if (doctorName?.includes('Michael')) return 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80';
  return 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80';
};

const Appointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(null);

  const fetchAppointments = async () => {
    if (!user) return;
    try {
      const response = await fetch(`${API_URL}/api/appointments/${user.id}`);
      const data = await response.json();
      setAppointments(data);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError('Could not retrieve appointments. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [user]);

  const handleCancel = async (aptId) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
    
    setActionLoading(aptId);
    try {
      const response = await fetch(`${API_URL}/api/appointments/${aptId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setAppointments(appointments.filter(apt => apt._id !== aptId));
      } else {
        throw new Error('Failed to cancel appointment');
      }
    } catch (err) {
      console.error(err);
      alert('Error cancelling appointment. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-24">
      <Loader2 className="w-12 h-12 text-primary-600 animate-spin mb-4" />
      <p className="text-slate-400 font-black tracking-widest text-xs">Retrieving Consultations...</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-slate-900 mb-2">My Appointments</h1>
        <p className="text-slate-500 font-medium">Manage your upcoming and past medical consultations.</p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 text-sm font-bold border border-red-100">
          <AlertCircle className="w-5 h-5" /> {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence mode="popLayout">
          {appointments.map((apt, index) => (
            <motion.div
              key={apt._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/20 overflow-hidden card-hover"
            >
              <div className="p-6 flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-shrink-0">
                  <img src={getDoctorImage(apt.doctorName)} alt={apt.doctorName} className="w-20 h-20 rounded-2xl object-cover shadow-md" />
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="font-black text-xl text-slate-900 leading-tight">{apt.doctorName}</h3>
                    <span className="text-[10px] font-black px-3 py-1 bg-slate-100 text-slate-600 rounded-full flex items-center gap-1 uppercase tracking-wider">
                      <Video className="w-3.5 h-3.5" /> Video Call
                    </span>
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider ${
                      apt.status === 'Upcoming' || apt.status === 'Confirmed' ? 'bg-green-50 text-green-600 border border-green-100' :
                      apt.status === 'Pending' ? 'bg-yellow-50 text-yellow-600 border border-yellow-100' :
                      'bg-slate-50 text-slate-600 border border-slate-100'
                    }`}>
                      {apt.status}
                    </span>
                  </div>
                  <p className="text-primary-600 font-bold text-xs uppercase tracking-wider mb-4">{apt.specialty}</p>
                  <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-slate-500">
                    <div className="flex items-center gap-2 bg-slate-50 px-3.5 py-2 rounded-2xl border border-slate-100">
                      <Calendar className="w-4 h-4 text-primary-500" />
                      {apt.date}
                    </div>
                    <div className="flex items-center gap-2 bg-slate-50 px-3.5 py-2 rounded-2xl border border-slate-100">
                      <Clock className="w-4 h-4 text-primary-500" />
                      {apt.time}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-row md:flex-col gap-3 min-w-[140px]">
                  {apt.status === 'Upcoming' && (
                    <button 
                      onClick={() => handleCancel(apt._id)}
                      disabled={actionLoading === apt._id}
                      className="bg-white text-red-600 border-2 border-red-100 px-5 py-3.5 rounded-2xl text-xs font-black hover:bg-red-50 hover:border-red-200 transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {actionLoading === apt._id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <X className="w-4 h-4" /> Cancel Appointment
                        </>
                      )}
                    </button>
                  )}
                  {apt.status === 'Confirmed' && (
                    <button className="bg-primary-600 text-white px-5 py-3.5 rounded-2xl text-xs font-black hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 btn-shine text-center">
                      Join Call
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {appointments.length === 0 && (
          <div className="py-20 text-center bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/10">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
              <Calendar className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">No Appointments scheduled</h3>
            <p className="text-slate-400 font-medium mb-6">You don't have any consultation slots scheduled.</p>
            <a href="/doctors" className="bg-primary-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary-700 transition-all shadow-lg shadow-primary-100 btn-shine">
              Consult a Specialist
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
