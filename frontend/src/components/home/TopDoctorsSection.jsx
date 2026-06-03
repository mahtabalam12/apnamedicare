import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../config';

const TopDoctorsSection = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${API_URL}/api/doctors`);
        const data = await response.json();
        setDoctors(data.slice(0, 4));
      } catch (error) {
        console.error('Error fetching top doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Top Rated Doctors</h2>
            <p className="text-slate-600">
              Book appointments with our most highly rated and experienced medical professionals.
            </p>
          </div>
          <Link to="/doctors" className="mt-4 md:mt-0 text-primary-600 font-medium hover:text-primary-700 flex items-center gap-2">
            View All Doctors &rarr;
          </Link>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-10">
            <Loader2 className="w-10 h-10 text-primary-600 animate-spin mb-3" />
            <p className="text-slate-500 text-sm font-medium">Loading top doctors...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-100 flex flex-col card-hover"
              >
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center gap-1.5 text-sm font-black shadow-sm">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    {doctor.rating}
                  </div>
                  {doctor.id % 2 === 0 && (
                    <div className="absolute top-4 left-4 bg-primary-600 text-white text-[10px] uppercase tracking-widest font-black px-3 py-1.5 rounded-xl shadow-lg shadow-primary-200">
                      Available
                    </div>
                  )}
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-4">
                    <h3 className="font-black text-xl text-slate-900 mb-1">{doctor.name}</h3>
                    <p className="text-primary-600 font-bold text-sm mb-2 uppercase tracking-wide">{doctor.specialty}</p>
                    
                    {/* Rating Stars */}
                    <div className="flex items-center gap-0.5 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(doctor.rating) ? 'fill-yellow-400' : 'text-slate-100'}`} />
                      ))}
                      <span className="text-slate-400 text-xs ml-2 font-bold">{doctor.reviews} Reviews</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-6 font-bold uppercase tracking-wider">
                    <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg">
                      <Clock className="w-3.5 h-3.5 text-primary-500" />
                      {doctor.experience}
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg">
                      <MapPin className="w-3.5 h-3.5 text-primary-500" />
                      {doctor.location.split(',')[0]}
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    <Link to={`/doctors/${doctor.id}`} className="block w-full py-4 text-center text-white bg-slate-900 hover:bg-primary-600 rounded-2xl font-black transition-all shadow-lg shadow-slate-100 btn-shine">
                      Book Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TopDoctorsSection;
