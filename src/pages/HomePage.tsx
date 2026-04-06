import Hero from '../components/Hero';
import StatsBar from '../components/StatsBar';
import About from '../components/About';
import Technology from '../components/Technology';
import Integrations from '../components/Integrations';
import Security from '../components/Security';
import UseCases from '../components/UseCases';
import Demo from '../components/Demo';
import Pricing from '../components/Pricing';
import BookDemo from '../components/BookDemo';

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <About />
      <Technology />
      <Integrations />
      <Security />
      <UseCases />
      <Demo />
      <Pricing />
      <BookDemo />
    </>
  );
}
