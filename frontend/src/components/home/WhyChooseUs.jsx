import { Shield, Clock, Award, Users } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: '100% Confidential',
    description: 'All your medical records and consultations are heavily encrypted and kept private.',
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Get access to medical professionals round the clock, every day of the year.',
  },
  {
    icon: Award,
    title: 'Certified Doctors',
    description: 'Every doctor on our platform is highly qualified and rigorously verified.',
  },
  {
    icon: Users,
    title: 'Family Accounts',
    description: 'Manage healthcare for your entire family from a single, convenient dashboard.',
  },
];

const WhyChooseUs = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="flex-1 space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Choose ApnaMedicare?</h2>
              <p className="text-slate-600 text-lg">
                We are committed to providing you with the best healthcare experience through technology, expertise, and compassion.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-2">{feature.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="flex-1 w-full lg:w-auto relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-primary-50 rounded-3xl transform rotate-3 scale-105 -z-10" />
            <img 
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Medical Team" 
              className="w-full h-[500px] object-cover rounded-3xl shadow-lg"
            />
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
