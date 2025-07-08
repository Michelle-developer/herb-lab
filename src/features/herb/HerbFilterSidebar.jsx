import { useHerbContext } from '../../contexts/HerbContext';
import HerbCategorySelector from './HerbCategorySelector';
import HerbFilterNature from './HerbFilterNature';
import HerbFilterTaste from './HerbFilterTaste';

function HerbFilterSidebar({ inputRef }) {
  const { queryState } = useHerbContext();

  function handleFocus() {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
    return <p>跳轉至搜尋框</p>;
  }

  return (
    <aside className="bg-jade hidden rounded-xl p-4 sm:block sm:w-1/3 sm:flex-shrink-0 sm:flex-grow md:max-w-[280px] md:min-w-[200px]">
      <div>
        <HerbCategorySelector />
        {queryState.activeCategory === 'keyword' && handleFocus()}
        {queryState.activeCategory === 'nature' && <HerbFilterNature />}
        {queryState.activeCategory === 'taste' && <HerbFilterTaste />}
      </div>
    </aside>
  );
}

export default HerbFilterSidebar;
