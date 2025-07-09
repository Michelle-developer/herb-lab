import PropTypes from 'prop-types';
import HerbCardItem from './HerbCardItem';

function HerbCard({ displayHerbs }) {
  return (
    <ul>
      {displayHerbs.map((herb) => (
        <HerbCardItem herb={herb} key={herb.id} />
      ))}
    </ul>
  );
}

HerbCard.propTypes = {
  displayHerbs: PropTypes.array.isRequired,
};

export default HerbCard;
