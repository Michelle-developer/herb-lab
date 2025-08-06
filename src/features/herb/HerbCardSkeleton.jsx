import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function HerbCardSkeleton() {
  return (
    <li className="relative list-none flex-col items-center rounded-lg bg-stone-200 p-4 shadow-md sm:shadow-lg">
      <Skeleton height={65} width={100} className="mt-4 mb-2 rounded-lg" />
      <Skeleton width={32} height={16} />
      <Skeleton width={48} height={12} className="absolue bottom-1.5" />
    </li>
  );
}

export default HerbCardSkeleton;
