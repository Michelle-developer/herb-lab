import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import HerbCardMenu from './HerbCardMenu';
import { Save } from 'lucide-react';

function HerbCard({ folderId, item, saveDispatch }) {
  const formatDate = new Date(item.addedAt).toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <li className="relative flex flex-col items-center rounded-lg border border-stone-200 bg-stone-200 p-4 shadow-md hover:cursor-pointer sm:shadow-lg">
      <Link to={`/herbs/${item.herbId._id}`}>
        <img
          src={`/images/herbs/img_${item.herbId.slug}.jpg`}
          alt={item.herbId.name_zh}
          className="mt-4 mb-2 w-28 rounded-lg border border-stone-200"
        />
        <h4 className="text-sm font-semibold md:text-base lg:text-lg">{item.herbId.name_zh}</h4>
        <p className="text-xs md:text-sm lg:text-base">{item.herbId.function_group}</p>
        <div className="absolute right-0 bottom-0 flex gap-0.5 text-stone-500">
          <Save size={14} strokeWidth={1} /> <p className="text-[10px] font-light">{formatDate}</p>
        </div>
      </Link>
      <HerbCardMenu folderId={folderId} item={item} saveDispatch={saveDispatch} />
    </li>
  );
}

HerbCard.propTypes = {
  folderId: PropTypes.string,
  item: PropTypes.object.isRequired,
  saveDispatch: PropTypes.func,
};

export default HerbCard;
