import { useHerbContext } from '../../contexts/HerbContext';
import HerbCategorySelector from './HerbCategorySelector';
import HerbFilterNature from './HerbFilterNature';
import HerbFilterTaste from './HerbFilterTaste';

function HerbFilterSidebar() {
  const { queryState } = useHerbContext();

  return (
    <aside className="bg-jade hidden rounded-xl p-4 sm:block sm:w-1/3 sm:flex-shrink-0 sm:flex-grow md:max-w-[280px] md:min-w-[200px]">
      <div className="mb-4 rounded-xl bg-stone-200 p-4 text-stone-800">
        ⚠️ 使用分類功能，搜尋結果將被取代。
      </div>

      <div>
        <HerbCategorySelector />
        {queryState.activeCategory === 'nature' && <HerbFilterNature />}
        {queryState.activeCategory === 'taste' && <HerbFilterTaste />}
      </div>
    </aside>
  );
}

export default HerbFilterSidebar;
