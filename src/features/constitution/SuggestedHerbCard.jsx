import { Link } from "react-router-dom";

function SuggestedHerbCard({ sourceSlug, herb }) {
  if (!herb) return null;
  return (
    <li className="border-land bg-jade list-none rounded-sm border p-1 text-center shadow-sm">
      <Link to={`/herbs/${sourceSlug}`}>
        <h5 className="text-oliver">{sourceSlug}</h5>
      </Link>
    </li>
  );
}

export default SuggestedHerbCard;
