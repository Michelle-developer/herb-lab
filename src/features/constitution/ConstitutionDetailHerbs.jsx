import { useHerbContext } from '../../contexts/HerbContext';
import SuggestedHerbCard from './SuggestedHerbCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function ConstitutionDetailHerbs({ constitution }) {
  const { herbs } = useHerbContext();

  return (
    <ul className="grid grid-cols-3 gap-3 p-0">
      {constitution.suggested_herbs_slug.map((slug) => {
        const herb = herbs.find((herb) => herb.slug === slug);
        if (!herb) {
          console.warn(`找不到這個中藥: ${slug} 🥲`);
          return (
            <li
              className="border-land bg-jade list-none rounded-sm border p-1 text-center shadow-sm"
              key={slug}
            >
              <Skeleton height={20} width={80} />
            </li>
          );
        }

        return <SuggestedHerbCard key={slug} herb={herb} constitution={constitution} />;
      })}
    </ul>
  );
}

export default ConstitutionDetailHerbs;
