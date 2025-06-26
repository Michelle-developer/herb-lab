import FeatureCards from "./FeatureCards";
import HomepageHeader from "./HomepageHeader";

function Homepage() {
  return (
    <div>
      <HomepageHeader />
      <FeatureCards />
      <div>技術說明區</div>
      <div>參考資料區</div>
    </div>
  );
}

export default Homepage;
