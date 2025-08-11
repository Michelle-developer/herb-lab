import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function SuggestedHerbCard({ herb }) {
  return (
    <li className="border-land bg-jade hover:bg-land/30 transform list-none rounded-sm border p-1 text-center shadow-sm transition-transform hover:scale-105 hover:shadow-md">
      <Link to={`/herbs/${herb._id}`} className="no-underline">
        <h5 className="text-oliver hover:text-grass font-medium transition-colors duration-150">
          {herb?.name_zh}
        </h5>
      </Link>
    </li>
  );
}

export default SuggestedHerbCard;
