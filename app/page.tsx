import {
  Navbar,
  HeroSection,
  AboutSection,
  PortfolioSection,
  ContactSection,
  BackgroundCanvas,
} from "./components";

export default function Home() {
  return (
    <>
      <BackgroundCanvas />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <PortfolioSection />
        <ContactSection />
      </main>
    </>
  );
}
