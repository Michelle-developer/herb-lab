import { Link } from "react-router-dom";

function HerbCardItem({ herb }) {
  const tagIcon = {
    cold: "❄️",
    hot: "☀️",
    warm: "♨️",
    cool: "🌨️",
    neutral: "🥬",
  };

  return (
    <li className="relative flex flex-col items-center rounded-lg bg-stone-200 p-4">
      <span className="absolute top-0 right-0 w-20 rounded-lg bg-stone-800 text-center text-stone-200 opacity-50">
        {tagIcon[herb.nature_tag]}
        {herb.nature_raw}
      </span>
      <img
        src={`../../src/${herb.img}`}
        alt={herb.name_zh}
        className="my-2 w-28 rounded-lg"
      />
      <Link to={`/herbs/${herb.slug}`}>
        <h4 className="text-sm font-semibold md:text-base lg:text-lg">
          {herb.name_zh}
        </h4>
      </Link>
      <p className="text-xs md:text-sm lg:text-base">{herb.function_group}</p>
    </li>
  );
}

export default HerbCardItem;
