import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, Clock, MapPin, ChevronDown, Loader2 } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import BackButton from '../components/common/BackButton';
import { API_URL } from '../config';

const specialties = ['All', 'Cardiologist', 'Neurologist', 'Pediatrician', 'Orthopedist', 'Dermatologist', 'General Surgeon'];
const priceRanges = ['Any', 'Under ₹100', '₹100 - ₹200', 'Over ₹200'];

const Doctors = () => {
  const [searchParams] = useSearchParams();
  const [doctorsList, setDoctorsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSpecialty, setActiveSpecialty] = useState('All');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${API_URL}/api/doctors`);
        const data = await response.json();
        setDoctorsList(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = doctorsList.filter(doc => {
    const matchSpecialty = activeSpecialty === 'All' || doc.specialty === activeSpecialty;
    const matchSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSpecialty && matchSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-10 pt-32">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="mb-8">
          <BackButton to="/" label="Home" />
        </div>

        {/* Header & Search */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Find a <span className="text-primary-600">Specialist</span></h1>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search doctors, specialties..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-full py-3 pl-12 pr-4 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all shadow-sm"
              />
            </div>
            
            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-slate-500 text-sm font-medium">Sort by:</span>
              <button className="bg-white border border-slate-200 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                Recommended <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-24 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                  <Filter className="w-5 h-5 text-primary-600" />
                  Filters
                </h3>
                <button className="text-sm text-primary-600 font-medium hover:underline">Reset</button>
              </div>

              {/* Specialties Filter */}
              <div className="mb-8">
                <h4 className="font-semibold text-slate-900 mb-4 text-sm uppercase tracking-wider">Specialty</h4>
                <div className="space-y-2">
                  {specialties.map(specialty => (
                    <label key={specialty} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="specialty" 
                        checked={activeSpecialty === specialty}
                        onChange={() => setActiveSpecialty(specialty)}
                        className="w-4 h-4 text-primary-600 border-slate-300 focus:ring-primary-500"
                      />
                      <span className={`text-sm ${activeSpecialty === specialty ? 'text-primary-700 font-medium' : 'text-slate-600 group-hover:text-slate-900'}`}>
                        {specialty}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h4 className="font-semibold text-slate-900 mb-4 text-sm uppercase tracking-wider">Consultation Fee</h4>
                <div className="space-y-2">
                  {priceRanges.map(price => (
                    <label key={price} className="flex items-center gap-3 cursor-pointer group">
                      <input type="radio" name="price" className="w-4 h-4 text-primary-600 border-slate-300 focus:ring-primary-500" />
                      <span className="text-sm text-slate-600 group-hover:text-slate-900">{price}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-12 h-12 text-primary-600 animate-spin mb-4" />
                <p className="text-slate-500 font-medium">Fetching doctors...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredDoctors.map((doctor, index) => (
                  <motion.div
                    key={doctor.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all flex flex-col"
                  >
                    <div className="p-5 flex gap-4 border-b border-slate-100">
                      <img src={doctor.image} alt={doctor.name} className="w-20 h-20 rounded-xl object-cover bg-slate-100" />
                      <div>
                        <h3 className="font-bold text-lg text-slate-900 mb-1 leading-tight">{doctor.name}</h3>
                        <p className="text-primary-600 font-medium text-sm mb-2">{doctor.specialty}</p>
                        <div className="flex items-center gap-1 text-sm font-bold text-slate-700">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          {doctor.rating} <span className="text-slate-400 font-normal">({doctor.reviews})</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-5 flex-1 flex flex-col gap-3">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span>{doctor.experience} Experience</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span>{doctor.location}</span>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Consultation Fee</p>
                          <p className="text-lg font-bold text-slate-900">₹{doctor.fee}</p>
                        </div>
                        <Link to={`/doctors/${doctor.id}`} className="bg-primary-50 text-primary-600 hover:bg-primary-600 hover:text-white px-5 py-2.5 rounded-xl font-medium transition-colors text-sm">
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {filteredDoctors.length === 0 && (
                  <div className="col-span-full py-20 text-center">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                      <Search className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">No doctors found</h3>
                    <p className="text-slate-500">Try adjusting your filters or search query.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Doctors;
