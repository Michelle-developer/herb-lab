import PropTypes from 'prop-types';
import HerbList from './HerbList';

function TimeFilterItemsGrid({ items }) {
  return (
    <ul className="my-4 mb-2 grid grid-cols-2 justify-items-center gap-2 text-center md:grid-cols-4 md:gap-4">
      {items.map((item) => (
        <HerbList key={item._id} item={item} />
      ))}
    </ul>
  );
}

TimeFilterItemsGrid.propTypes = {
  items: PropTypes.array.isRequired,
};

export default TimeFilterItemsGrid;
