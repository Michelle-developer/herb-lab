import FeatureCards from './FeatureCards';
import HomepageHero from './HomepageHero';
import TechHighlightsSection from './TechHighlightsSection';
import Reference from './Reference';

function Homepage() {
  return (
    <div>
      <HomepageHero />
      <FeatureCards />
      <TechHighlightsSection />
      <Reference />
    </div>
  );
}

export default Homepage;
