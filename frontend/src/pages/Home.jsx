import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import TopDoctorsSection from '../components/home/TopDoctorsSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Banner from '../components/home/Banner';
import Testimonials from '../components/home/Testimonials';
import FAQ from '../components/home/FAQ';

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <WhyChooseUs />
      <TopDoctorsSection />
      <Testimonials />
      <Banner />
      <FAQ />
    </div>
  );
};

export default Home;
