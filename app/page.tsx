import {
  Navbar,
  HeroSection,
  AboutSection,
  PortfolioSection,
  ContactSection,
  SnowEffect,
} from "./components";

export default function Home() {
  return (
    <>
      <SnowEffect />
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
