import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Users, Star, Award, Shield, PhoneCall } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/doctors?search=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/doctors');
    }
  };
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-primary-50 to-transparent -z-10 rounded-bl-[100px]" />
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary-100/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-indigo-100/30 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-100 text-primary-600 font-bold text-sm mb-6 shadow-sm">
              <Award className="w-4 h-4" />
              <span>India's Most Trusted Health Tech</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-6">
              Modern Care <br className="hidden lg:block" />
              For Your <span className="text-primary-600 italic">Family</span>
            </h1>
            
            <p className="text-lg text-slate-500 mb-8 leading-relaxed max-w-lg font-medium">
              Experience healthcare like never before. Instant consultations, door-step medicine delivery, and digital records.
            </p>

            {/* Search Box */}
            <div className="bg-white p-2 rounded-3xl flex flex-col sm:flex-row gap-2 mb-10 shadow-2xl shadow-primary-200/20 border border-slate-100">
              <div className="flex-1 flex items-center gap-2 bg-slate-50 px-5 py-4 rounded-2xl border border-transparent focus-within:border-primary-300 transition-all">
                <Search className="w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Doctors, specialities..." 
                  value={query || ''}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
                  className="w-full border-none outline-none bg-transparent text-slate-700 font-medium placeholder-slate-400"
                />
              </div>
              <button 
                onClick={handleSearch}
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-2xl font-black transition-all shadow-lg shadow-primary-200 flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-95 btn-shine"
              >
                Search
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 border-t border-slate-200 pt-8">
              <div>
                <h4 className="text-3xl font-bold text-slate-900 mb-1">1000+</h4>
                <p className="text-slate-500 text-sm font-medium">Expert Doctors</p>
              </div>
              <div className="w-[1px] h-10 bg-slate-200" />
              <div>
                <h4 className="text-3xl font-bold text-slate-900 mb-1">50k+</h4>
                <p className="text-slate-500 text-sm font-medium">Happy Patients</p>
              </div>
              <div className="w-[1px] h-10 bg-slate-200" />
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <h4 className="text-3xl font-bold text-slate-900">4.9</h4>
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                </div>
                <p className="text-slate-500 text-sm font-medium">Platform Rating</p>
              </div>
            </div>
          </motion.div>

          {/* Right Image/Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:h-[600px] flex items-center justify-center"
          >
            {/* The main circular background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-200 to-emerald-100 rounded-full scale-75 blur-2xl opacity-60" />
            
            {/* Main Image placeholder since we don't have actual images, we'll use a styled container or an illustration placeholder */}
            <div className="relative z-10 w-full max-w-md aspect-[4/5] bg-white rounded-[40px] shadow-2xl overflow-hidden border-8 border-white">
              <div className="w-full h-full bg-slate-100 flex items-center justify-center relative">
                 <img src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Doctor" className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </div>

            {/* Floating Cards */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-10 -right-4 glass p-4 rounded-2xl shadow-xl flex items-center gap-4 z-20"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Verified</p>
                <p className="font-bold text-slate-900">Top Specialists</p>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [10, -10, 10] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute bottom-20 -left-8 glass p-4 rounded-2xl shadow-xl flex items-center gap-4 z-20"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Next Available</p>
                <p className="font-bold text-slate-900">Today, 10:00 AM</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
