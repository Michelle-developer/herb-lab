import { useHerbContext } from "../../contexts/HerbContext";
import SuggestedHerbCard from "./SuggestedHerbCard";

function ConstitutionDetailHerbs({ constitution }) {
  const { herbs } = useHerbContext();

  return (
    <ul className="grid grid-cols-3 gap-3 p-0">
      {constitution.suggested_herbs_slugs.map((slug) => {
        const herb = herbs.find((herb) => herb.slug === slug);
        return (
          <SuggestedHerbCard
            key={slug}
            herb={herb}
            sourceSlug={slug}
            constitution={constitution}
          />
        );
      })}
    </ul>
  );
}

export default ConstitutionDetailHerbs;
