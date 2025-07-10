'use client';
import ReusableDrawer from '../../components/ReusableDrawer';
import PropTypes from 'prop-types';
import { UserRoundSearch } from 'lucide-react';
import ConstitutionCounterResult from './ConstitutionCounterResult';

function ConstitutionCounterDrawer({ onClick }) {
  return (
    <ReusableDrawer
      title="體質總分統計"
      openTrigger={
        <button
          className="ring-land flex h-12 w-12 cursor-pointer place-items-center rounded-full bg-gray-200/50 px-3 py-2 font-semibold hover:bg-gray-950/10 focus:ring-2 focus:outline-none sm:h-16 sm:w-16 sm:px-4 sm:py-2"
          aria-label="開啟體質總分統計抽屜"
          onClick={onClick}
        >
          <UserRoundSearch className="text-grass h-6 w-6 sm:h-12 sm:w-12" />
        </button>
      }
      className="bg-[url(/images/img_drawer2.png)] bg-cover bg-center"
    >
      {/* 互動說明區 */}
      <div className="prose">
        <ConstitutionCounterResult />

        <h5 className="font-semibold">計分方式說明：</h5>
        <ul>
          <li>每次勾選的症狀，將統計命中體質的分數。</li>
          <li>按下「清空此部位按鈕」，只會將該部位的分數清除，其餘部位仍保留。</li>
          <li>按下「清潔刷按鈕」會將所有分數全部清空，回到初始狀態。</li>
        </ul>
      </div>
    </ReusableDrawer>
  );
}

ConstitutionCounterDrawer.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ConstitutionCounterDrawer;
