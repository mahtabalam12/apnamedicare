import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pill, Download, Calendar, User, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';

const Prescriptions = () => {
  const { user } = useAuth();
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPrescriptions = async () => {
    if (!user) return;
    try {
      const response = await fetch(`${API_URL}/api/prescriptions/${user.id}`);
      const data = await response.json();
      setPrescriptions(data);
    } catch (err) {
      console.error('Error fetching prescriptions:', err);
      setError('Could not retrieve prescriptions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, [user]);

  const handleDownloadPDF = (pres) => {
    alert(`Downloading digital prescription for ${pres.diagnosis} issued by ${pres.doctor}...`);
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-24">
      <Loader2 className="w-12 h-12 text-primary-600 animate-spin mb-4" />
      <p className="text-slate-400 font-black tracking-widest text-xs">Retrieving Digital Prescriptions...</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-slate-900 mb-2">My Prescriptions</h1>
        <p className="text-slate-500 font-medium">View and download your official digital medical prescriptions.</p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 text-sm font-bold border border-red-100">
          <AlertCircle className="w-5 h-5" /> {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence mode="popLayout">
          {prescriptions.map((pres, index) => (
            <motion.div
              key={pres._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/20 overflow-hidden card-hover"
            >
              <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-black text-xl text-slate-900 leading-tight">{pres.diagnosis}</h3>
                    <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-100">
                      Active
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-slate-500 mb-4">
                    <div className="flex items-center gap-2 bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-100">
                      <User className="w-4 h-4 text-primary-500" />
                      <span>{pres.doctor}</span>
                      <span className="text-slate-400 text-xs font-medium">({pres.specialty})</span>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-100">
                      <Calendar className="w-4 h-4 text-primary-500" />
                      <span>{pres.date}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {pres.medicines.map((med, idx) => (
                      <span key={idx} className="bg-indigo-50 text-indigo-700 text-xs font-black px-3.5 py-2 rounded-xl border border-indigo-100 flex items-center gap-2">
                        <Pill className="w-4 h-4 text-primary-500" /> {med}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button 
                  onClick={() => handleDownloadPDF(pres)}
                  className="bg-white text-primary-600 border-2 border-primary-100 px-6 py-3.5 rounded-2xl text-xs font-black hover:bg-primary-50 hover:border-primary-200 transition-all flex items-center gap-2 justify-center shadow-sm"
                >
                  <Download className="w-4 h-4" /> Download PDF
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {prescriptions.length === 0 && (
          <div className="py-20 text-center bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/10">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
              <Pill className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">No prescriptions found</h3>
            <p className="text-slate-400 font-medium">Your medical vault is empty. Consult with a doctor to get an official digital prescription.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Prescriptions;
