import { Link } from 'react-router-dom';
import { PhoneCall } from 'lucide-react';

const Banner = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-slate-900 rounded-[40px] overflow-hidden relative">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-600/20 to-transparent" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-12 lg:p-20 gap-8">
            <div className="max-w-2xl text-center md:text-left">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Get online consultation from expert doctors
              </h2>
              <p className="text-slate-300 text-lg mb-8 max-w-xl">
                Skip the waiting room. Consult with top doctors online via video call or chat and get instant prescriptions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link to="/doctors" className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:shadow-primary-500/25 flex items-center justify-center gap-2">
                  <PhoneCall className="w-5 h-5" />
                  Consult Now
                </Link>
                <Link to="/about" className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold transition-all backdrop-blur-sm border border-white/10 flex items-center justify-center">
                  Learn More
                </Link>
              </div>
            </div>
            
            <div className="hidden lg:block w-1/3">
              <img 
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Online Consultation" 
                className="w-full h-auto rounded-3xl shadow-2xl transform rotate-3"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
