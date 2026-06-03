import { Link, NavLink, useNavigate } from 'react-router-dom';
import { HeartPulse, Search, User, Menu, X, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ doctors: [], medicines: [] });
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }, []);



  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Search Logic
  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults({ doctors: [], medicines: [] });
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const [docsRes, medsRes] = await Promise.all([
          fetch(`${API_URL}/api/doctors`),
          fetch(`${API_URL}/api/medicines`)
        ]);
        const [docs, meds] = await Promise.all([docsRes.json(), medsRes.json()]);

        const filteredDocs = docs.filter(d => 
          d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          d.specialty.toLowerCase().includes(searchQuery.toLowerCase())
        );
        const filteredMeds = meds.filter(m => 
          m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          m.category.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setSearchResults({ doctors: filteredDocs, medicines: filteredMeds });
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleResultClick = (path) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    navigate(path);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-black text-slate-900 group">
            <span className="bg-primary-600 p-2.5 rounded-2xl text-white shadow-lg shadow-primary-200 group-hover:scale-110 transition-transform">
              <HeartPulse className="w-6 h-6" />
            </span>
            <span className="tracking-tight">Apna<span className="text-primary-600">Medicare</span></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200/50">
            <NavLink to="/" className={({ isActive }) => `px-4 py-2 rounded-xl text-sm font-bold transition-all ${isActive ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>Home</NavLink>
            <NavLink to="/doctors" className={({ isActive }) => `px-4 py-2 rounded-xl text-sm font-bold transition-all ${isActive ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>Doctors</NavLink>
            <NavLink to="/medicines" className={({ isActive }) => `px-4 py-2 rounded-xl text-sm font-bold transition-all ${isActive ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>Medicines</NavLink>
            <NavLink to="/about" className={({ isActive }) => `px-4 py-2 rounded-xl text-sm font-bold transition-all ${isActive ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>About</NavLink>
            <NavLink to="/contact" className={({ isActive }) => `px-4 py-2 rounded-xl text-sm font-bold transition-all ${isActive ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>Contact</NavLink>
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 text-slate-600 hover:text-primary-600 hover:bg-white rounded-xl transition-all hover:shadow-sm"
            >
              <Search className="w-5 h-5" />
            </button>
            <div className="w-[1px] h-6 bg-slate-200 mx-1" />
            
            {user ? (
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => { logout(); navigate('/'); }}
                  className="text-slate-600 font-bold text-sm hover:text-red-600 transition-colors px-4 py-2"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-slate-600 font-bold text-sm hover:text-primary-600 transition-colors px-4 py-2">
                  Sign In
                </Link>
                <Link to="/register" className="bg-primary-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-primary-700 transition-all shadow-md shadow-primary-200 flex items-center gap-2 btn-shine">
                  Join Now
                </Link>
              </div>
            )}

            <Link to="/dashboard" className="p-2.5 bg-slate-900 text-white hover:bg-slate-800 rounded-xl transition-all shadow-lg shadow-slate-200 group relative">
              <User className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-slate-600"
            >
              <Search className="w-5 h-5" />
            </button>
            <button 
              className="p-2 text-slate-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[60] bg-slate-900/90 backdrop-blur-sm flex items-start justify-center p-4 md:pt-20">
          <div className="w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl relative">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-black text-slate-900">Search Platform</h2>
              <button 
                onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  autoFocus
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search doctors, medicines..." 
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary-500 focus:outline-none text-lg transition-all"
                />
                {isSearching && (
                  <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-600 animate-spin" />
                )}
              </div>

              <div className="mt-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                {searchQuery.length < 2 ? (
                  <div className="py-10 text-center">
                    <p className="text-slate-400 font-medium italic">Type at least 2 characters to search...</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Doctors Results */}
                    {searchResults.doctors.length > 0 && (
                      <div>
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Doctors</h3>
                        <div className="space-y-2">
                          {searchResults.doctors.map(doc => (
                            <button 
                              key={doc.id}
                              onClick={() => handleResultClick(`/doctors/${doc.id}`)}
                              className="w-full flex items-center gap-4 p-3 hover:bg-primary-50 rounded-2xl transition-all text-left group"
                            >
                              <img src={doc.image} alt={doc.name} className="w-12 h-12 rounded-xl object-cover" />
                              <div>
                                <p className="font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{doc.name}</p>
                                <p className="text-xs text-slate-500">{doc.specialty}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Medicines Results */}
                    {searchResults.medicines.length > 0 && (
                      <div>
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Pharmacy</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {searchResults.medicines.map(med => (
                            <button 
                              key={med.id}
                              onClick={() => handleResultClick('/medicines')}
                              className="flex items-center gap-4 p-3 hover:bg-indigo-50 rounded-2xl transition-all text-left group border border-transparent hover:border-indigo-100"
                            >
                              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden">
                                <img src={med.image} alt={med.name} className="w-full h-full object-contain" />
                              </div>
                              <div>
                                <p className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">{med.name}</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase">{med.category}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {searchResults.doctors.length === 0 && searchResults.medicines.length === 0 && !isSearching && (
                      <div className="py-10 text-center">
                        <p className="text-slate-500 font-bold">No results found for "{searchQuery}"</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-xl py-4 px-4 flex flex-col gap-2 glass">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 font-bold py-3 px-4 hover:bg-primary-50 rounded-xl transition-colors">Home</Link>
          <Link to="/doctors" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 font-bold py-3 px-4 hover:bg-primary-50 rounded-xl transition-colors">Doctors</Link>
          <Link to="/medicines" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 font-bold py-3 px-4 hover:bg-primary-50 rounded-xl transition-colors">Medicines</Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 font-bold py-3 px-4 hover:bg-primary-50 rounded-xl transition-colors">About</Link>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 font-bold py-3 px-4 hover:bg-primary-50 rounded-xl transition-colors">Contact</Link>
          <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-900 font-bold py-3 px-4 bg-slate-50 rounded-xl transition-colors flex items-center gap-2">
            <User className="w-5 h-5" /> Dashboard
          </Link>
          <hr className="my-2 border-slate-100" />
          <div className="flex flex-col gap-3">
            {user ? (
              <button 
                onClick={() => { logout(); setIsMobileMenuOpen(false); navigate('/'); }} 
                className="text-red-600 font-black py-3 text-center border-2 border-red-100 rounded-xl"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-900 font-black py-3 text-center border-2 border-slate-200 rounded-xl">
                  Sign In
                </Link>
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="bg-primary-600 text-white font-black py-3 text-center rounded-xl shadow-lg shadow-primary-200">
                  Join Now
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
