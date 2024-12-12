import { useSelector } from "react-redux";
import Footer from "../../components/footer/Footer";
import Header from "../../components/Header/Header";
import AboutSection from "../../sections/aboutSection/AboutSection";
import BlogSection from "../../sections/blogSection/BlogSection";
import FaqSection from "../../sections/faqsection/FaqSection";
import HeroSection from "../../sections/heroSection/HeroSection";
import LiftCashDAOSection from "../../sections/liftCashDaoSection/LiftCashDAOSection";
import ParticipationSection from "../../sections/participationSection/ParticipationSection";
import PurposeSection from "../../sections/purposeSection/PurposeSection";
import { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";

const LandingPage = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);


  if (loading) {
    return <Loading />;
  } else {
    return (
      <div>
        <Header />
        <HeroSection />
        <AboutSection />
        <ParticipationSection />
        <LiftCashDAOSection />
        <PurposeSection />
        <FaqSection />
        <BlogSection />
        <Footer />
      </div>
    );
  }
};

export default LandingPage;
