import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const reviews = [
  {
    name: 'Emma Thompson',
    text: 'The best medical platform I have ever used. Booking an appointment was seamless and the doctor was very professional.',
    rating: 5,
    role: 'Patient',
    image: 'https://i.pravatar.cc/100?img=32'
  },
  {
    name: 'James Wilson',
    text: 'I got my consultation done within 15 minutes. The video quality was great and the prescription was sent immediately.',
    rating: 5,
    role: 'Patient',
    image: 'https://i.pravatar.cc/100?img=33'
  },
  {
    name: 'Olivia Martinez',
    text: 'Highly recommend ApnaMedicare! Found an amazing pediatrician for my daughter. The whole process was incredibly easy.',
    rating: 4,
    role: 'Patient',
    image: 'https://i.pravatar.cc/100?img=47'
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What Our Patients Say</h2>
          <p className="text-slate-600">
            Don't just take our word for it. Here's what thousands of happy patients have to say about their experience with ApnaMedicare.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-slate-50 p-8 rounded-2xl border border-slate-100 relative hover:shadow-xl transition-all"
            >
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < review.rating ? 'fill-yellow-400' : 'fill-slate-200 text-slate-200'}`} />
                ))}
              </div>
              <p className="text-slate-700 italic mb-6">"{review.text}"</p>
              <div className="flex items-center gap-4">
                <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-slate-900">{review.name}</h4>
                  <p className="text-sm text-slate-500">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
