import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, Clock, User, FileText, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';

const timeSlots = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM'];

const BookAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [doctor, setDoctor] = useState(null);
  const [error, setError] = useState('');

  // Fetch doctor details
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`${API_URL}/api/doctors`);
        const data = await response.json();
        const found = data.find(d => d.id === parseInt(id));
        setDoctor(found);
      } catch (err) {
        console.error('Error fetching doctor:', err);
      }
    };
    fetchDoctor();
  }, [id]);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleFinalSubmit = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          doctorId: doctor.id,
          doctorName: doctor.name,
          specialty: doctor.specialty,
          date: selectedDate,
          time: selectedTime
        })
      });

      if (!response.ok) throw new Error('Failed to book appointment');
      
      setStep(3);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!doctor) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
    </div>
  );

  return (
    <div className="bg-slate-50 min-h-screen py-10 pt-32">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        
        {/* Progress Bar */}
        <div className="mb-10">
          <h1 className="text-3xl font-black text-slate-900 mb-6 text-center">Book Appointment</h1>
          <div className="flex items-center justify-between relative max-w-2xl mx-auto">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 -z-10 rounded-full"></div>
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary-600 -z-10 rounded-full transition-all duration-500"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            ></div>
            
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  step >= s ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' : 'bg-white text-slate-400 border-2 border-slate-200'
                }`}
              >
                {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
              </div>
            ))}
          </div>
          <div className="flex justify-between max-w-2xl mx-auto mt-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <span>Date & Time</span>
            <span>Patient Info</span>
            <span>Status</span>
          </div>
        </div>

        <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          {error && (
            <div className="m-8 p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 text-sm font-bold">
              <AlertCircle className="w-5 h-5" /> {error}
            </div>
          )}
          
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8 md:p-12"
              >
                <div className="flex items-center gap-4 mb-10 p-6 bg-primary-50 rounded-3xl border border-primary-100">
                  <img src={doctor.image} alt={doctor.name} className="w-20 h-20 rounded-2xl object-cover shadow-lg" />
                  <div>
                    <h3 className="text-xl font-black text-slate-900">{doctor.name}</h3>
                    <p className="text-primary-600 font-bold text-sm uppercase tracking-wide">{doctor.specialty}</p>
                    <p className="text-slate-400 text-xs font-bold mt-1">Consultation Fee: ₹{doctor.fee}</p>
                  </div>
                </div>

                <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                  <CalendarIcon className="w-6 h-6 text-primary-600" /> Select Date & Time
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <label className="block text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Select Date</label>
                    <input 
                      type="date" 
                      min={new Date().toISOString().split('T')[0]}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full bg-slate-50 border-2 border-transparent focus:border-primary-500 rounded-2xl px-6 py-4 outline-none font-bold text-slate-700 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Available Time Slots</label>
                    <div className="grid grid-cols-2 gap-3">
                      {timeSlots.map(time => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-3 rounded-xl text-sm font-bold transition-all ${
                            selectedTime === time 
                              ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' 
                              : 'bg-slate-50 text-slate-600 border-2 border-transparent hover:border-primary-100 hover:bg-white'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex justify-end">
                  <button 
                    onClick={handleNext}
                    disabled={!selectedDate || !selectedTime}
                    className="bg-primary-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-primary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary-200 btn-shine"
                  >
                    Continue to Details
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8 md:p-12"
              >
                <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                  <User className="w-6 h-6 text-primary-600" /> Confirm Details
                </h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-slate-50 rounded-3xl">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Appointment With</p>
                      <p className="text-lg font-black text-slate-900">{doctor.name}</p>
                      <p className="text-primary-600 font-bold text-sm uppercase">{doctor.specialty}</p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-3xl">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Schedule</p>
                      <p className="text-lg font-black text-slate-900">{selectedDate}</p>
                      <p className="text-primary-600 font-bold text-sm uppercase">{selectedTime}</p>
                    </div>
                  </div>
                  
                  <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
                    <p className="text-indigo-900 font-black mb-2">Patient Confirmation</p>
                    <p className="text-indigo-600 font-medium">Please confirm that the information above is correct. Once booked, you can manage your appointment in the patient dashboard.</p>
                  </div>
                </div>

                <div className="mt-12 flex justify-between gap-4">
                  <button 
                    onClick={handleBack}
                    className="px-8 py-4 rounded-2xl font-black text-slate-600 hover:bg-slate-100 transition-all border-2 border-slate-100"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handleFinalSubmit}
                    disabled={loading}
                    className="bg-primary-600 text-white flex-1 py-4 rounded-2xl font-black hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 flex items-center justify-center gap-2 btn-shine"
                  >
                    {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Confirm & Book Appointment'}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 md:p-12 text-center"
              >
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-100">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h2 className="text-4xl font-black text-slate-900 mb-4">Confirmed!</h2>
                <p className="text-slate-500 max-w-md mx-auto mb-10 font-medium">
                  Your appointment with <span className="text-primary-600 font-bold">{doctor.name}</span> has been scheduled successfully.
                </p>

                <div className="bg-slate-50 rounded-[32px] p-8 max-w-md mx-auto border border-slate-100 mb-10 text-left space-y-5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Date</span>
                    <span className="font-black text-slate-900">{selectedDate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Time</span>
                    <span className="font-black text-slate-900">{selectedTime}</span>
                  </div>
                  <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Consultation Fee</span>
                    <span className="text-xl font-black text-primary-600">₹{doctor.fee}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Link to="/dashboard" className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-black hover:bg-slate-800 transition-all">
                    View My Dashboard
                  </Link>
                  <Link to="/" className="flex-1 bg-white text-slate-900 py-4 rounded-2xl font-black border-2 border-slate-100 hover:bg-slate-50 transition-all">
                    Home
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default BookAppointment;
