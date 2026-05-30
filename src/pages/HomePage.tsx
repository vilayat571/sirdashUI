import Hero from '../components/Home/Hero';
import StatsBar from '../components/Home/StatsBar';
import About from '../components/Home/About';
import Technology from '../components/Home/Technology';
import Integrations from '../components/Home/Integrations';
import Security from '../components/Home/Security';
import UseCases from '../components/Home/UseCases';
import Demo from '../components/Demos/Demo';
import Pricing from '../components/Home/Pricing';
import BookDemo from '../components/Demos/BookDemo';
import SubscribePopup from '../components/Home/SubscribePopup';
import ImagesDesc from '../components/Home/ImagesDesc';
import Companies from '../components/Home/Companies';

export default function HomePage() {
  return (
    <>
      {/* Subscribe popup — appears 2.5s after page load, once per session */}
      <SubscribePopup />
      <Hero />
      <StatsBar />
      <About />
      <Technology />
      <Companies />
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