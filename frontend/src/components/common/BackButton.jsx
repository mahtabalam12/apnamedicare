import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const BackButton = ({ to, label = 'Back', variant = 'light' }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <motion.button
      whileHover={{ x: -4 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleBack}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
        variant === 'dark' 
          ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-200' 
          : 'bg-white text-slate-600 border-2 border-slate-100 hover:border-primary-100 hover:text-primary-600 shadow-sm'
      }`}
    >
      <ArrowLeft className="w-4 h-4" />
      {label}
    </motion.button>
  );
};

export default BackButton;
