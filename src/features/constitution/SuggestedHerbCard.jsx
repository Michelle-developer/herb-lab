import { Link } from 'react-router-dom';

function SuggestedHerbCard({ sourceSlug, herb }) {
  if (!herb) return <li className="my-4 list-none text-xs">找不到這個中藥：{sourceSlug} 🥲</li>;

  return (
    <li className="border-land bg-jade hover:bg-land/30 transform list-none rounded-sm border p-1 text-center shadow-sm transition-transform hover:scale-105 hover:shadow-md">
      <Link to={`/herbs/${sourceSlug}`} className="no-underline">
        <h5 className="text-oliver hover:text-grass font-medium transition-colors duration-150">
          {herb?.name_zh || sourceSlug}
        </h5>
      </Link>
    </li>
  );
}

export default SuggestedHerbCard;
