import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, HeartPulse, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
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
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Success - Store token and user info using Context
      login(data.user, data.token);
      
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-5xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
      
      {/* Back Button */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all font-bold text-xs group md:hidden"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Home
      </Link>

      {/* Left Side - Illustration */}
      <div className="hidden md:flex w-1/2 bg-slate-900 p-12 flex-col justify-between relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-600/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all font-bold text-xs group mb-12">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <Link to="/" className="flex items-center gap-2 text-2xl font-black text-white mb-12">
            <span className="bg-primary-600 p-2.5 rounded-2xl">
              <HeartPulse className="w-6 h-6" />
            </span>
            ApnaMedicare
          </Link>
          <h2 className="text-4xl font-black text-white leading-tight mb-6">
            Welcome back to <br /> better healthcare.
          </h2>
          <p className="text-slate-400 text-lg max-w-sm font-medium">
            Access your medical records, consult with doctors, and manage your health seamlessly.
          </p>
        </div>
        
        <div className="relative z-10">
          <div className="flex -space-x-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`w-12 h-12 rounded-full border-2 border-slate-900 bg-slate-200 overflow-hidden`}>
                <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" className="w-full h-full object-cover" />
              </div>
            ))}
            <div className="w-12 h-12 rounded-full border-2 border-slate-900 bg-primary-600 flex items-center justify-center text-white text-xs font-bold z-10">
              50k+
            </div>
          </div>
          <p className="text-slate-500 text-xs font-black uppercase tracking-widest mt-4">Join 50k+ healthy patients</p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center relative">
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
          
          <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Sign in</h3>
          <p className="text-slate-500 font-medium mb-8">Please enter your details to sign in.</p>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold mb-6 flex items-center gap-2 border border-red-100">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
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
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-black text-slate-400 uppercase tracking-widest">Password</label>
                <Link to="/forgot-password" core="forgot-password" className="text-sm font-bold text-primary-600 hover:text-primary-700">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password" 
                  required
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-primary-500 rounded-2xl py-4 pl-12 pr-4 outline-none font-bold text-slate-700 transition-all"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary-600 text-white py-4 rounded-2xl font-black hover:bg-primary-700 transition-all shadow-lg shadow-primary-100 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed btn-shine"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  Sign In <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500 font-bold">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-600 hover:text-primary-700">
              Sign up for free
            </Link>
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default Login;
