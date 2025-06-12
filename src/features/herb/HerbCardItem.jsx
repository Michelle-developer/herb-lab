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

  return (
    <li className="relative flex flex-col items-center rounded-lg border border-stone-200 bg-stone-200 p-4 shadow-md sm:shadow-lg">
      {/* 判斷是否渲染篩選標籤 */}
      {Object.entries(queryState.filter).map(
        ([key, values]) =>
          values.length > 0 ? (
            <div
              key={key}
              className="p-x-4 absolute top-0 right-0 w-full rounded-t-lg bg-stone-800 text-left text-stone-200 opacity-50"
            >
              {key == "nature" && (
                <span>
                  {tagIcon.nature[herb.nature_tag]} {herb.nature_raw}
                </span>
              )}

              {key === "taste" &&
                (Array.isArray(herb.taste_tag) ? (
                  herb.taste_tag.map((tag, i) => (
                    <span key={i} className="mr-2 inline-block">
                      {tagIcon.taste[tag]} {herb.taste_raw[i]}
                    </span>
                  ))
                ) : (
                  <span>
                    {tagIcon.taste[herb.taste_tag]} {herb.taste_raw}
                  </span>
                ))}
            </div>
          ) : null,

        // (
        //   <span className="p-x-4 absolute top-0 right-0 w-full rounded-t-lg bg-stone-800 text-left text-stone-200 opacity-50">
        //     {queryState.activeCategory === "nature" &&
        //       `${tagIcon[key][herb.nature_tag]} ${herb.nature_raw}`}

        //     {queryState.activeCategory === "taste" &&
        //       `${tagIcon[key][herb.taste_tag]} ${herb.taste_raw}`}
        //   </span>
        // ) : null,
      )}
      <img
        src={`../../src/${herb.img}`}
        alt={herb.name_zh}
        className="mt-4 mb-2 w-28 rounded-lg border border-stone-200"
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
