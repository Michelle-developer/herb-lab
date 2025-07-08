import { Link } from 'react-router-dom';

function ConstitutionCardItem({ constitution, symptomState }) {
  return (
    <li
      className={`hover-wiggle min-h-[60px] rounded-lg border border-stone-200 bg-stone-50 px-1 py-2 sm:m-1 sm:px-2 sm:py-4 md:min-h-[180px] md:px-4 ${
        symptomState.highlightedConstitutionSlugs.includes(constitution.slug)
          ? 'shadow-[0_0_40px_rgba(250,218,122,1.12)]'
          : ''
      }`}
    >
      <Link to={`/constitutions/${constitution.slug}`}>
        <h5 className="mb-2 text-center text-base font-semibold md:my-3 md:text-lg lg:text-xl">
          {constitution.name}
        </h5>

        <div className="h-18 w-18 overflow-hidden rounded-full border-4 border-gray-500 sm:h-22 sm:w-22">
          <img
            src={`/images/constitutions/img_${constitution.slug}_avatar.png`}
            title={`${constitution.name}人物`}
            alt={`${constitution.name}人物`}
            className="h-full w-full object-cover object-top"
          />
        </div>
      </Link>
    </li>
  );
}

export default ConstitutionCardItem;
