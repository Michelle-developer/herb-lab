import { useHerbContext } from '../../contexts/HerbContext';
import SuggestedHerbCard from './SuggestedHerbCard';

function ConstitutionDetailHerbs({ constitution }) {
  const { herbs } = useHerbContext();

  return (
    <ul className="grid grid-cols-3 gap-3 p-0">
      {constitution.suggested_herbs_slug.map((slug) => {
        const herb = herbs.find((herb) => herb.slug === slug);
        if (!herb) {
          console.warn(`找不到這個中藥: ${slug} 🥲`);
          return null;
        }

        return (
          <SuggestedHerbCard key={slug} herb={herb} sourceSlug={slug} constitution={constitution} />
        );
      })}
    </ul>
  );
}

export default ConstitutionDetailHerbs;
