import {
  Navbar,
  HeroSection,
  AboutSection,
  PortfolioSection,
  ContactSection,
  SnowEffect,
  ScrollAnimations,
} from "./components";

export default function Home() {
  return (
    <>
      <SnowEffect />
      <ScrollAnimations />
      <Navbar />
      <main className="main-content">
        <HeroSection />
        <AboutSection />
        <PortfolioSection />
        <ContactSection />
      </main>
    </>
  );
}
