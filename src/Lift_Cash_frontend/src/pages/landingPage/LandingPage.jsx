import Footer from "../../components/footer/Footer";
import Header from "../../components/Header/Header";
import AboutSection from "../../sections/aboutSection/AboutSection";
import BlogSection from "../../sections/blogSection/BlogSection";
import FaqSection from "../../sections/faqsection/FaqSection";
import HeroSection from "../../sections/heroSection/HeroSection";
import LiftCashDAOSection from "../../sections/liftCashDaoSection/LiftCashDAOSection";
import ParticipationSection from "../../sections/participationSection/ParticipationSection";
import PurposeSection from "../../sections/purposeSection/PurposeSection";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <AboutSection />
      <ParticipationSection />
      <LiftCashDAOSection />
      <PurposeSection />
      <FaqSection />
      <BlogSection/>
      <Footer/>
    </div>
  );
};

export default LandingPage;
