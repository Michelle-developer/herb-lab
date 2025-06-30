import useIsMobileOrTablet from "../../hooks/useIsMobileOrTablet";
import HeroAnimation from "./HeroAnimation";
import HeroStaticSequence from "./HeroStaticSequence";

function HomepageHero() {
  const isMobileOrTablet = useIsMobileOrTablet();

  return (
    <header className="relative mb-40 w-full">
      {isMobileOrTablet ? <HeroStaticSequence /> : <HeroAnimation />}
    </header>
  );
}

export default HomepageHero;
