import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'How do I book an appointment?',
    answer: 'Booking an appointment is easy! Simply search for a doctor by specialty or name, select an available time slot that works for you, and confirm your booking. You will receive a confirmation email with details.'
  },
  {
    question: 'Can I cancel or reschedule my appointment?',
    answer: 'Yes, you can cancel or reschedule your appointment up to 24 hours before the scheduled time through your patient dashboard without any penalty.'
  },
  {
    question: 'How do online video consultations work?',
    answer: 'At the time of your appointment, log in to your account and go to the Dashboard. Click on the "Join Call" button next to your appointment. Our video platform works directly in your browser, no downloads required.'
  },
  {
    question: 'Are my medical records safe?',
    answer: 'Absolutely. We use bank-level encryption and comply with all HIPAA regulations to ensure your personal and medical data is completely secure and private.'
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-600">
            Got questions? We've got answers. If you don't find what you're looking for, feel free to contact our support team.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between font-semibold text-slate-900 text-left bg-white hover:bg-slate-50 transition-colors"
              >
                <span>{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-primary-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-4 pt-2 text-slate-600 border-t border-slate-100">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
