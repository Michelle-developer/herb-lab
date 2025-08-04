import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useHerbContext } from '../../contexts/HerbContext';

function HerbCardItem({ herb }) {
  const { queryState } = useHerbContext();

  // 將 slug 轉換為 emoji
  const tagIcon = {
    nature: {
      cold: '❄️',
      hot: '☀️',
      warm: '♨️',
      cool: '🌨️',
      neutral: '🥬',
    },

    taste: {
      sour: '🍋‍🟩',
      bitter: '☕',
      sweet: '🍬',
      pungent: '🌶️',
      salty: '🧀',
      bland: '🍚',
      astringent: '🫐',
    },
  };

  return (
    <li className="relative flex flex-col items-center rounded-lg border border-stone-200 bg-stone-200 p-4 shadow-md sm:shadow-lg">
      <Link to={`/herbs/${herb._id}`}>
        {/* 判斷是否渲染篩選條件標籤 */}
        {Object.entries(queryState.filter).map(([key, values]) =>
          values.length > 0 ? (
            <div
              key={key}
              className="p-x-4 absolute top-0 right-0 w-full rounded-t-lg bg-stone-800 text-left text-stone-200 opacity-50"
            >
              {key == 'nature' && (
                <span>
                  {/* 標籤：emoji + 描述原文 */}
                  {tagIcon.nature[herb.nature_tag]} {herb.nature_raw}
                </span>
              )}
              {/* 判斷是否為陣列：將陣列、單一值分開渲染 */}
              {key === 'taste' &&
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
          ) : null
        )}
        <img
          src={`/images/herbs/img_${herb.slug}.webp`}
          alt={herb.name_zh}
          className="mt-4 mb-2 w-28 rounded-lg border border-stone-200"
        />
        <h4 className="text-sm font-semibold md:text-base lg:text-lg">{herb.name_zh}</h4>
        <p className="text-xs md:text-sm lg:text-base">{herb.function_group}</p>
      </Link>
    </li>
  );
}

HerbCardItem.propTypes = {
  herb: PropTypes.object.isRequired,
};

export default HerbCardItem;
