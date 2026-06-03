import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, HeartPulse, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { API_URL } from '../config';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Success
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-5xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row-reverse border border-slate-100">
      
      {/* Back Button */}
      <Link 
        to="/" 
        className="absolute top-6 right-6 z-20 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all font-bold text-xs group md:hidden"
      >
        Home
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>

      {/* Right Side - Illustration */}
      <div className="hidden md:flex w-1/2 bg-slate-900 p-12 flex-col justify-between relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-600/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col items-end text-right">
          <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all font-bold text-xs group mb-12">
            Back to Home
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link to="/" className="flex items-center gap-2 text-2xl font-black text-white mb-12">
            ApnaMedicare
            <span className="bg-primary-600 p-2.5 rounded-2xl">
              <HeartPulse className="w-6 h-6" />
            </span>
          </Link>
          <h2 className="text-4xl font-black text-white leading-tight mb-6">
            Join the future of <br /> healthcare.
          </h2>
          <p className="text-slate-400 text-lg max-w-sm font-medium">
            Create an account to book appointments, order medicines, and track your health history.
          </p>
        </div>
        
        <div className="relative z-10 text-right">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl inline-block text-left">
            <p className="text-white font-bold mb-2">"The easiest way to consult a doctor from home."</p>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-10 h-10 rounded-xl bg-slate-200 overflow-hidden">
                <img src="https://i.pravatar.cc/100?img=5" alt="user" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-white text-sm font-black tracking-tight">Alex Johnson</p>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Verified Patient</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="md:hidden mb-8">
            <Link to="/" className="flex items-center gap-2 text-2xl font-black text-slate-900">
              <span className="bg-primary-600 p-2.5 rounded-2xl text-white">
                <HeartPulse className="w-6 h-6" />
              </span>
              ApnaMedicare
            </Link>
          </div>
          
          <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Create an account</h3>
          <p className="text-slate-500 font-medium mb-8">Start your healthcare journey with us today.</p>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold mb-6 flex items-center gap-2 border border-red-100">
               <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-black text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name" 
                  required
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-primary-500 rounded-2xl py-4 pl-12 pr-4 outline-none font-bold text-slate-700 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-black text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email" 
                  required
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-primary-500 rounded-2xl py-4 pl-12 pr-4 outline-none font-bold text-slate-700 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-black text-slate-400 uppercase tracking-widest mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password" 
                  required
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-primary-500 rounded-2xl py-4 pl-12 pr-4 outline-none font-bold text-slate-700 transition-all"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary-600 text-white py-4 rounded-2xl font-black hover:bg-primary-700 transition-all shadow-lg shadow-primary-100 flex items-center justify-center gap-2 group mt-6 disabled:opacity-70 disabled:cursor-not-allowed btn-shine"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500 font-bold">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 hover:text-primary-700 transition-colors">
              Sign in
            </Link>
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default Register;
