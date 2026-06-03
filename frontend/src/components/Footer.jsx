import { Link } from 'react-router-dom';
import { HeartPulse, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-white border-t border-slate-100 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-slate-900 mb-6">
              <span className="bg-primary-600 p-2 rounded-xl text-white">
                <HeartPulse className="w-6 h-6" />
              </span>
              Apna<span className="text-primary-600">Medicare</span>
            </Link>
            <p className="text-slate-500 leading-relaxed mb-6">
              Your trusted partner in healthcare. Access top-quality medical services, consult with experts, and manage your health from anywhere.
            </p>
            <div className="flex items-center gap-3">
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/in/mahtab-alam-567b26318/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              {/* GitHub */}
              <a href="https://github.com/mahtabalam12" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 hover:bg-[#181717] hover:text-white hover:border-[#181717] transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              </a>
              {/* Instagram */}
              <a href="https://www.instagram.com/mahtab___alam____/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888] hover:text-white hover:border-transparent transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-slate-900 font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-slate-500 hover:text-primary-600 transition-colors font-medium">About Us</Link></li>
              <li><Link to="/doctors" className="text-slate-500 hover:text-primary-600 transition-colors font-medium">Our Doctors</Link></li>
              <li><Link to="/medicines" className="text-slate-500 hover:text-primary-600 transition-colors font-medium">Pharmacy</Link></li>
              <li><Link to="/dashboard" className="text-slate-500 hover:text-primary-600 transition-colors font-medium">Appointments</Link></li>
              <li><Link to="/contact" className="text-slate-500 hover:text-primary-600 transition-colors font-medium">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-slate-900 font-bold text-lg mb-6">Our Services</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-500 hover:text-primary-600 transition-colors font-medium">Online Consultation</a></li>
              <li><a href="#" className="text-slate-500 hover:text-primary-600 transition-colors font-medium">Medicine Delivery</a></li>
              <li><a href="#" className="text-slate-500 hover:text-primary-600 transition-colors font-medium">Lab Tests</a></li>
              <li><a href="#" className="text-slate-500 hover:text-primary-600 transition-colors font-medium">Find a Hospital</a></li>
              <li><a href="#" className="text-slate-500 hover:text-primary-600 transition-colors font-medium">Health Packages</a></li>
            </ul>
          </div>

          {/* Contact Info & Newsletter */}
          <div>
            <h3 className="text-slate-900 font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                <span className="text-slate-500 font-medium">Sitamarhi, Bihar, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-600 flex-shrink-0" />
                <a href="tel:7091990945" className="text-slate-500 font-medium hover:text-primary-600 transition-colors">+91 70919 90945</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-600 flex-shrink-0" />
                <a href="mailto:alammahtabph@gmail.com" className="text-slate-500 font-medium hover:text-primary-600 transition-colors">alammahtabph@gmail.com</a>
              </li>
            </ul>
            
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-slate-50 border border-slate-200 rounded-full py-3.5 pl-5 pr-14 text-sm text-slate-900 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
              />
              <button 
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 text-white rounded-full w-10 flex items-center justify-center transition-all transform hover:scale-105"
              >
                <Mail className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} ApnaMedicare Platform. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="text-slate-400 hover:text-primary-600 transition-colors font-medium">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-primary-600 transition-colors font-medium">Terms of Service</a>
            <a href="#" className="text-slate-400 hover:text-primary-600 transition-colors font-medium">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
