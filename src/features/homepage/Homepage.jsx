import FeatureCards from "./FeatureCards";
import HomepageHero from "./HomepageHero";
import TechHighlights from "./EmblaCarousel";
import Reference from "./Reference";

function Homepage() {
  return (
    <div>
      <HomepageHero />
      <FeatureCards />
      <TechHighlights />
      <Reference />
    </div>
  );
}

export default Homepage;
