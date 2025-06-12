import HerbCardItem from "./HerbCardItem";

//TODO:加到處看看button功能

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
