import FeatureCards from './FeatureCards';
import HomepageHero from './HomepageHero';
import TechHighlightsSection from './TechHighlightsSection';
import Reference from './Reference';
import { useRef } from 'react';

function Homepage() {
  const scrollTargetRef = useRef(null);
  return (
    <div>
      <HomepageHero ref={scrollTargetRef} />
      {/* 定位錨點：Hero動畫 => 小標題的線條動畫 */}
      <section ref={scrollTargetRef} className="mt-20">
        <FeatureCards />
      </section>
      <TechHighlightsSection />
      <Reference />
    </div>
  );
}

export default Homepage;
