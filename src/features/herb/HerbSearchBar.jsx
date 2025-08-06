import PropTypes from 'prop-types';
import { useState, forwardRef } from 'react';
import { useHerbContext } from '../../contexts/HerbContext';
import { Search } from 'lucide-react';

// 子層 HerbFilterSidebar 選「關鍵字查詢」 => 聚焦搜尋區
const HerbSearchBar = forwardRef(function HerbSearchBar({ className, mainRef }, ref) {
  const { queryDispatch } = useHerbContext();
  const [searchQuery, setSearchQuery] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    queryDispatch({
      type: 'searchHerbs',
      payload: { keyword: searchQuery },
    });

    mainRef.current?.scrollIntoView({ behavior: 'instant', block: 'nearest' });

    setSearchQuery('');
  }

  return (
    <form
      className={`${className} bg-jade mx-auto flex w-full max-w-[90%] items-center gap-2 rounded-full px-2 text-lg md:max-w-[50%] md:text-xl`}
      onSubmit={handleSubmit}
    >
      <input
        className="focus:placeholder-grass min-w-0 flex-1 flex-grow bg-transparent px-4 py-2 focus:outline-none sm:px-6 sm:py-3"
        type="text"
        placeholder="輸入中藥名"
        value={searchQuery}
        ref={ref}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <button
        type="submit"
        className="hover:bg-oliver bg-grass border-grass relative flex w-[100px] cursor-pointer items-center justify-around rounded-full border-solid px-4 py-2 text-right text-stone-100 sm:w-[110px] sm:py-3"
      >
        <Search />
        <p>搜尋</p>
      </button>
    </form>
  );
});

HerbSearchBar.propTypes = {
  className: PropTypes.string,
  mainRef: PropTypes.HTMLDivElement,
  ref: PropTypes.HTMLInputElement,
};

export default HerbSearchBar;
