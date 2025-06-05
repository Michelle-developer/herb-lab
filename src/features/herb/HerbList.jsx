import { useHerbContext } from "../../contexts/HerbContext";
import { Link } from "react-router-dom";

function HerbList() {
  const { herbs } = useHerbContext();

  return (
    <div>
      <h1 className="text-4xl">中藥圖書館</h1>

      <ul>
        {herbs.map((herb) => (
          <li key={herb.id}>
            <img src={`../../src/${herb.img}`} className="w-20" />
            <Link to={`/herbs/${herb.slug}`}>{herb.name_zh}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HerbList;
