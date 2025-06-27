import FeatureCards from "./FeatureCards";
import HomepageHeader from "./HomepageHeader";
import TechHighlights from "./EmblaCarousel";

function Homepage() {
  return (
    <div>
      <HomepageHeader />
      <FeatureCards />
      來瞧瞧網站的設計亮點：
      <TechHighlights />
      <div>參考資料區</div>
      <div>Footer</div>
    </div>
  );
}

export default Homepage;
