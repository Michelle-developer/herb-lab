import useIsMobileOrTablet from '../../hooks/useIsMobileOrTablet';
import HeroAnimation from './HeroAnimation';
import HeroStaticSequence from './HeroStaticSequence';

function HomepageHero({ ref }) {
  const isMobileOrTablet = useIsMobileOrTablet();

  return (
    <header className="relative mb-40 w-full">
      {isMobileOrTablet ? <HeroStaticSequence ref={ref} /> : <HeroAnimation ref={ref} />}
    </header>
  );
}

export default HomepageHero;
