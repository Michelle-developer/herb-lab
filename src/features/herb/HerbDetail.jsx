import { useHerbContext } from "../../contexts/HerbContext";
import { useParams } from "react-router-dom";

function HerbDetail() {
  const { herbs } = useHerbContext();
  const params = useParams();
  const herb = herbs.find((herb) => herb.slug === params.slug);

  return (
    <div>
      <img
        src={`../../src/${herb.img}`}
        className="w-5/6 justify-items-center"
      />
      <h1 className="text-xl capitalize">{herb.name_en}</h1>
    </div>
  );
}

export default HerbDetail;
