import { Link } from 'react-router-dom';
import ConstitutionCardItem from './ConstitutionCardItem';

function ConstitutionCard({ constitutions, symptomState }) {
  return (
    <div className="col-start-5 col-end-7 row-start-1 row-end-7 place-items-center self-center md:self-start">
      <ul className="flex flex-col gap-2 sm:grid sm:gap-4 md:grid-cols-2">
        {constitutions.map((constitution) => (
          <ConstitutionCardItem
            key={constitution.id}
            constitution={constitution}
            symptomState={symptomState}
          />
        ))}
      </ul>
    </div>
  );
}

export default ConstitutionCard;
