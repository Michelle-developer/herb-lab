'use client';
import PropTypes from 'prop-types';
import ReusableDrawer from '../../components/ReusableDrawer';
import { useHerbContext } from '../../contexts/HerbContext';
import HerbFilterNature from './HerbFilterNature';
import HerbFilterTaste from './HerbFilterTaste';
import HerbCategorySelector from './HerbCategorySelector';
import { FunnelPlus } from 'lucide-react';

function HerbSidebarDrawer({ className }) {
  const { queryState } = useHerbContext();

  return (
    <ReusableDrawer
      title="中藥篩選條件"
      openTrigger={
        <button
          className={`ring-land my-4 flex w-24 cursor-pointer justify-around rounded-full bg-gray-950/5 px-4 py-1.5 text-right text-lg font-semibold text-stone-600 hover:bg-gray-950/10 focus:ring-2 focus:outline-none ${className}`}
          aria-label="開啟中藥篩選條件抽屜"
        >
          <FunnelPlus />
          篩選
        </button>
      }
      className="bg-[url(/images/img_drawer.png)] bg-cover bg-center"
    >
      <HerbCategorySelector />
      {queryState.activeCategory === 'keyword' && <p>請返回主畫面操作</p>}
      {queryState.activeCategory === 'nature' && <HerbFilterNature />}
      {queryState.activeCategory === 'taste' && <HerbFilterTaste />}
    </ReusableDrawer>
  );
}

HerbSidebarDrawer.propTypes = {
  className: PropTypes.string,
};

export default HerbSidebarDrawer;
