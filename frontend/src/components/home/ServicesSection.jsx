import { motion } from 'framer-motion';
import { Stethoscope, Activity, Heart, Brain, Bone, Eye } from 'lucide-react';

const specialties = [
  { icon: Heart, name: 'Cardiology', doctors: '120+ Doctors', color: 'bg-red-50 text-red-500' },
  { icon: Brain, name: 'Neurology', doctors: '85+ Doctors', color: 'bg-purple-50 text-purple-500' },
  { icon: Bone, name: 'Orthopedics', doctors: '150+ Doctors', color: 'bg-orange-50 text-orange-500' },
  { icon: Eye, name: 'Ophthalmology', doctors: '90+ Doctors', color: 'bg-blue-50 text-blue-500' },
  { icon: Activity, name: 'Endocrinology', doctors: '70+ Doctors', color: 'bg-emerald-50 text-emerald-500' },
  { icon: Stethoscope, name: 'General Medicine', doctors: '300+ Doctors', color: 'bg-primary-50 text-primary-500' },
];

const ServicesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Top Specialties</h2>
          <p className="text-slate-600">
            Find experienced doctors across all specialties. We have the best specialists to take care of your specific health needs.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {specialties.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-6 text-center cursor-pointer hover:shadow-xl transition-all border border-white shadow-sm"
              >
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${item.color}`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">{item.name}</h3>
                <p className="text-sm text-slate-500">{item.doctors}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
