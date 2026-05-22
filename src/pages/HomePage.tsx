import Hero from '../components/Hero';
import StatsBar from '../components/StatsBar';
import About from '../components/About';
import Technology from '../components/Technology';
import Integrations from '../components/Integrations';
import Security from '../components/Security';
import UseCases from '../components/UseCases';
import Demo from '../components/Demos/Demo';
import Pricing from '../components/Pricing';
import BookDemo from '../components/Demos/BookDemo';
import SubscribePopup from '../components/SubscribePopup';
import ImagesDesc from '../components/ImagesDesc';

export default function HomePage() {
  return (
    <>
      {/* Subscribe popup — appears 2.5s after page load, once per session */}
      <SubscribePopup />
      <Hero />
      <StatsBar />
      <About />
      <Technology />
      <Integrations />
      <Security />
      <UseCases />
      <Demo />
      <ImagesDesc />
      <Pricing />
      <BookDemo />
    </>
  );
}