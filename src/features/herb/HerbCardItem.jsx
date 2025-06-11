import { Link } from "react-router-dom";
import { useHerbContext } from "../../contexts/HerbContext";

function HerbCardItem({ herb }) {
  const { queryState } = useHerbContext();

  const tagIcon = {
    nature: {
      cold: "❄️",
      hot: "☀️",
      warm: "♨️",
      cool: "🌨️",
      neutral: "🥬",
    },

    taste: {
      sour: "🍋‍🟩",
      bitter: "☕",
      sweet: "🍬",
      pungent: "🌶️",
      salty: "🧀",
    },
  };

  //TODO:修改標籤顯示
  return (
    <li className="relative flex flex-col items-center rounded-lg bg-stone-200 p-4 shadow-md sm:shadow-lg">
      {/* 判斷是否渲染篩選標籤 */}
      {Object.entries(queryState.filter).map(([key, values]) =>
        values.length > 0 ? (
          <span className="absolute top-0 right-0 w-3/4 rounded-lg bg-stone-800 text-center text-stone-200 opacity-50 sm:w-2/3">
            {tagIcon[key][herb.nature_tag]}
            {herb.nature_raw}
            {tagIcon[key][herb.taste_tag]}
          </span>
        ) : null,
      )}
      <img
        src={`../../src/${herb.img}`}
        alt={herb.name_zh}
        className="my-2 w-28 rounded-lg border border-stone-200"
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
