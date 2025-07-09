import PropTypes from 'prop-types';
import HerbCardItem from './HerbCardItem';

function HerbCard({ displayHerbs }) {
  return (
    <>
      {displayHerbs.map((herb) => (
        <HerbCardItem herb={herb} key={herb.id} />
      ))}
    </>
  );
}

HerbCard.propTypes = {
  displayHerbs: PropTypes.array.isRequired,
};

export default HerbCard;
