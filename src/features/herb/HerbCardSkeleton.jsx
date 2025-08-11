import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function HerbCardSkeleton() {
  return (
    <li className="relative list-none flex-col items-center rounded-lg bg-stone-200 p-4 shadow-md sm:shadow-lg">
      <Skeleton height="4.0625rem" width="6.25rem" className="mt-6 mb-2 rounded-lg" />
      <Skeleton className="h-4 md:h-5" />
      <Skeleton className="h-3 md:h-4" />
    </li>
  );
}

export default HerbCardSkeleton;
