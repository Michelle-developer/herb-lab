import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import HerbCardMenu from './HerbCardMenu';

function HerbCard({ item }) {
  return (
    <li className="group/herb relative flex flex-col items-center rounded-lg border border-stone-200 bg-stone-200 p-4 shadow-md hover:cursor-pointer sm:shadow-lg">
      <Link to={`/herbs/${item.herbId._id}`}>
        <img
          src={`/images/herbs/img_${item.herbId.slug}.jpg`}
          alt={item.herbId.name_zh}
          className="mt-4 mb-2 w-28 rounded-lg border border-stone-200"
        />
        <h4 className="text-sm font-semibold md:text-base lg:text-lg">{item.herbId.name_zh}</h4>
        <p className="text-xs md:text-sm lg:text-base">{item.herbId.function_group}</p>
      </Link>
      <HerbCardMenu cardGroup="group/herb" item={item} />
    </li>
  );
}

HerbCard.propTypes = {
  item: PropTypes.object.isRequired,
};

export default HerbCard;
