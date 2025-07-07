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

export default HerbCard;
