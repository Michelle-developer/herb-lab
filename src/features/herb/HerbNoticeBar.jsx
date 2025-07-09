import PropTypes from 'prop-types';
import { Sprout } from 'lucide-react';

function HerbNoticeBar({ className }) {
  return (
    <ul className={`${className} pl-3 text-stone-800`}>
      <li className="my-1 flex gap-1 text-base text-stone-700">
        <Sprout className="text-grass h-6 w-6 flex-shrink-0 items-start" />
        支援中文、英文、拉丁文搜尋。
      </li>

      <li className="my-1 flex gap-1 text-base text-stone-700">
        <Sprout className="text-grass h-6 w-6 flex-shrink-0 items-start" />
        請以中藥的「正名」做搜尋，避免使用別名。
      </li>

      <li className="my-1 flex gap-1 text-base text-stone-700">
        <Sprout className="text-grass h-6 w-6 flex-shrink-0 items-start" />
        目前收錄 45 種中藥。
      </li>
    </ul>
  );
}

HerbNoticeBar.propTypes = {
  className: PropTypes.string,
};

export default HerbNoticeBar;
