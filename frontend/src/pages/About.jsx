import React from 'react';
import { Shield, Users, Clock, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="bg-primary-50 py-20 mb-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            About <span className="text-primary-600">ApnaMedicare</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            We are dedicated to providing the best healthcare services to our community. Our platform connects you with top-rated doctors and provides easy access to medicines and health records.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Our mission is to make quality healthcare accessible to everyone, anywhere, at any time. We leverage technology to bridge the gap between patients and healthcare providers.
            </p>
            <p className="text-slate-600 leading-relaxed">
              We believe that health is the most important asset, and we are committed to helping you manage it efficiently through our innovative digital solutions.
            </p>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2070" 
              alt="Medical Team" 
              className="rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Core Values</h2>
            <div className="h-1.5 w-20 bg-primary-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Shield className="w-8 h-8" />, title: "Trust & Safety", desc: "We prioritize your data privacy and medical accuracy." },
              { icon: <Users className="w-8 h-8" />, title: "Patient-Centric", desc: "Everything we do is focused on improving patient outcomes." },
              { icon: <Clock className="w-8 h-8" />, title: "Accessibility", desc: "Healthcare services available 24/7 at your fingertips." },
              { icon: <Award className="w-8 h-8" />, title: "Excellence", desc: "We partner with only the most qualified medical professionals." }
            ].map((value, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center"
              >
                <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 mx-auto mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                <p className="text-slate-600">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
