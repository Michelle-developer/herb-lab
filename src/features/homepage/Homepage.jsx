import FeatureCards from "./FeatureCards";
import HomepageHeader from "./HomepageHeader";
import TechHighlights from "./EmblaCarousel";
import Reference from "./Reference";

function Homepage() {
  return (
    <div>
      <HomepageHeader />
      <FeatureCards />
      <TechHighlights />
      <Reference />
    </div>
  );
}

export default Homepage;
