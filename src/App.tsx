import { useScrollReveal } from "./hooks/useScrollReveal";
import CursorGlow from "./components/CursorGlow";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProblemSolution from "./components/ProblemSolution";
import Features from "./components/Features";
import AiSection from "./components/AiSection";
import Security from "./components/Security";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import Faq from "./components/Faq";
import FinalCta from "./components/FinalCta";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import CookieBanner from "./components/CookieBanner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

export default function App() {
  useScrollReveal();

  return (
    <>
      <CursorGlow />
      <Navbar />

      <main id="top" className="relative">
        <Hero />
        <ProblemSolution />
        <Features />
        <AiSection />
        <Security />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>

      <Footer />
      <BackToTop />
      <CookieBanner />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
