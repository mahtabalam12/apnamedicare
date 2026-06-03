import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, Award, CheckCircle2, Calendar as CalendarIcon, FileText, Loader2 } from 'lucide-react';
import BackButton from '../components/common/BackButton';
import { API_URL } from '../config';

const DoctorProfile = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`${API_URL}/api/doctors`);
        const data = await response.json();
        const found = data.find(d => d.id === parseInt(id));
        setDoctor(found);
      } catch (err) {
        console.error('Error fetching doctor:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
    </div>
  );

  if (!doctor) return <div className="p-20 text-center font-black">Doctor not found</div>;

  return (
    <div className="bg-slate-50 min-h-screen py-10 pt-32">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
           <BackButton to="/doctors" label="All Doctors" />
           <div className="hidden md:flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <Link to="/" className="hover:text-primary-600">Home</Link>
              <span>/</span>
              <Link to="/doctors" className="hover:text-primary-600">Doctors</Link>
              <span>/</span>
              <span className="text-slate-900">{doctor.name}</span>
            </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 space-y-8">
            
            {/* Header Card */}
            <div className="bg-white rounded-[40px] p-8 md:p-12 border border-slate-100 shadow-xl shadow-slate-200/30 flex flex-col md:flex-row gap-10 items-start relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/5 blur-3xl rounded-full" />
              
              <div className="w-40 h-40 md:w-56 md:h-56 flex-shrink-0 rounded-[32px] overflow-hidden shadow-2xl border-4 border-white relative z-10">
                <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 relative z-10">
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-emerald-100">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Specialist
                </div>
                
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-2 tracking-tight">{doctor.name}</h1>
                <p className="text-xl text-primary-600 font-black mb-6 uppercase tracking-wide">{doctor.specialty}</p>
                
                <div className="flex flex-wrap gap-6 text-sm font-bold text-slate-500">
                  <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-2xl">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-black text-slate-900">{doctor.rating}</span>
                    <span className="text-xs">({doctor.reviews} Reviews)</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-2xl">
                    <Clock className="w-5 h-5 text-primary-500" />
                    <span>{doctor.experience} Experience</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-2xl">
                    <MapPin className="w-5 h-5 text-rose-500" />
                    <span>{doctor.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white rounded-[40px] p-8 md:p-12 border border-slate-100 shadow-xl shadow-slate-200/20">
              <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600">
                  <FileText className="w-5 h-5" />
                </div>
                Professional Summary
              </h3>
              <p className="text-slate-500 font-medium leading-relaxed text-lg">
                Dr. {doctor.name.split(' ').slice(-1)} is a distinguished {doctor.specialty.toLowerCase()} with an extensive background in medical excellence. With {doctor.experience} of dedicated practice, they have transformed thousands of lives through compassionate care and cutting-edge medical techniques.
              </p>
            </div>

            {/* Education Section */}
            <div className="bg-white rounded-[40px] p-8 md:p-12 border border-slate-100 shadow-xl shadow-slate-200/20">
              <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <Award className="w-5 h-5" />
                </div>
                Education & Credentials
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { degree: 'MD, Medical Science', school: 'Harvard Medical School' },
                  { degree: 'Fellowship in Surgery', school: 'Johns Hopkins University' }
                ].map((edu, index) => (
                  <div key={index} className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <h4 className="font-black text-slate-900 mb-1">{edu.degree}</h4>
                    <p className="text-sm font-bold text-slate-400">{edu.school}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="w-full lg:w-96 flex-shrink-0">
            <div className="bg-slate-900 rounded-[40px] p-10 sticky top-32 shadow-2xl shadow-primary-900/20 text-white overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/20 blur-3xl rounded-full" />
              
              <h3 className="text-xl font-black mb-8 relative z-10">Quick Booking</h3>
              
              <div className="p-6 bg-white/5 rounded-3xl mb-8 border border-white/5 relative z-10">
                <p className="text-[10px] font-black text-primary-400 uppercase tracking-widest mb-1">Consultation Fee</p>
                <div className="flex items-baseline gap-1">
                   <span className="text-3xl font-black">₹{doctor.fee}</span>
                   <span className="text-xs font-bold text-slate-500">/ session</span>
                </div>
              </div>

              <div className="space-y-4 mb-10 relative z-10">
                <div className="flex items-center gap-3 text-slate-400 text-sm font-bold">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-primary-400">
                    <CalendarIcon className="w-4 h-4" />
                  </div>
                  <span>Instant confirmation</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400 text-sm font-bold">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-primary-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span>24/7 Priority Support</span>
                </div>
              </div>

              <Link to={`/book/${doctor.id}`} className="block w-full py-5 text-center text-white bg-primary-600 hover:bg-primary-500 rounded-2xl font-black transition-all shadow-lg shadow-primary-900/50 btn-shine relative z-10 uppercase tracking-widest text-xs">
                Book Appointment
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DoctorProfile;
