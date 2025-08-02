import PropTypes from 'prop-types';
import { CalendarDays } from 'lucide-react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment } from 'react';
import TimeFilterItemsGrid from './TimeFilterItemsGrid';
import { Link } from 'react-router-dom';
import TabsFallback from './TabsFallback';

function TimeFilterTabs({ allHerbs }) {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // 今天的凌晨 0:00:00
  const coupleWeeksAgo = new Date(startOfToday.getTime() - 13 * 24 * 60 * 60 * 1000); // 含今天共14天：今天凌晨的毫秒數，扣除12天份毫秒數的時間差，得到13天前凌晨0:00:00的毫秒數，做為比較基準點
  const weekAgo = new Date(startOfToday.getTime() - 6 * 24 * 60 * 60 * 1000); // 含今天共7天
  const oneMonthAgo = new Date(startOfToday.getTime() - 59 * 24 * 60 * 60 * 1000); // 含今天共60天

  // 儲存自定義時間區段篩選出來的中藥陣列
  const today = [];
  const lastWeek = [];
  const recently = [];

  // 篩選、分類出各時間區段所包含的中藥
  allHerbs.forEach((herb) => {
    const addedAt = new Date(herb.addedAt);

    // 由最新開始到最舊時間進行篩選，比較基準由最大到最小毫秒數
    if (addedAt >= startOfToday) {
      today.push(herb);
    } else if (addedAt >= coupleWeeksAgo && addedAt <= weekAgo) {
      lastWeek.push(herb);
    } else if (addedAt >= oneMonthAgo && addedAt < coupleWeeksAgo) {
      recently.push(herb);
    }
  });

  // 去除重複
  const uniqueToday = today.filter(
    (herb, index, self) => index === self.findIndex((h) => h.herbId._id === herb.herbId._id)
  );
  const uniqueLastWeek = lastWeek.filter(
    (herb, index, self) => index === self.findIndex((h) => h.herbId._id === herb.herbId._id)
  );
  const uniqueRecently = recently.filter(
    (herb, index, self) => index === self.findIndex((h) => h.herbId._id === herb.herbId._id)
  );
  const uniqueAll = allHerbs.filter(
    (herb, index, self) => index === self.findIndex((h) => h.herbId._id === herb.herbId._id)
  );

  // 按時間排序：由新到舊
  const lastWeekSort = uniqueLastWeek.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
  const recentlySort = uniqueRecently.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
  const allSort = uniqueAll.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));

  return (
    <div className="border-land relative h-[220px] w-auto overflow-scroll rounded-xl border-1 border-solid">
      <TabGroup>
        <TabList className="sticky top-0 left-0 z-10 space-x-0.5 bg-white/90 py-2 text-sm text-stone-600 backdrop-blur md:space-x-4 md:p-4 md:text-base">
          <CalendarDays className="text-land absolute top-2 left-2" />
          <Tab as={Fragment}>
            {({ hover, selected }) => (
              <button
                className={clsx(
                  'ml-10 cursor-pointer rounded-full px-2 py-1 md:ml-12',
                  hover && 'bg-land/50',
                  selected && 'text-land bg-stone-600 font-semibold'
                )}
              >
                今日收藏
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ hover, selected }) => (
              <button
                className={clsx(
                  'cursor-pointer rounded-full px-2 py-1',
                  hover && 'bg-land/50',
                  selected && 'text-land bg-stone-600 font-semibold'
                )}
              >
                上週收藏
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ hover, selected }) => (
              <button
                className={clsx(
                  'cursor-pointer rounded-full px-2 py-1',
                  hover && 'bg-land/50',
                  selected && 'text-land bg-stone-600 font-semibold'
                )}
              >
                近期收藏
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ hover, selected }) => (
              <button
                className={clsx(
                  'cursor-pointer rounded-full px-2 py-1',
                  hover && 'bg-land/50',
                  selected && 'text-land bg-stone-600 font-semibold'
                )}
              >
                收藏總覽
              </button>
            )}
          </Tab>
        </TabList>

        <TabPanels className="px-4">
          <TabPanel>
            {today.length === 0 ? <TabsFallback /> : <TimeFilterItemsGrid items={uniqueToday} />}
          </TabPanel>
          <TabPanel>
            {lastWeek.length === 0 ? (
              <TabsFallback />
            ) : (
              <TimeFilterItemsGrid items={lastWeekSort} />
            )}
          </TabPanel>
          <TabPanel>
            {recently.length === 0 ? (
              <TabsFallback />
            ) : (
              <TimeFilterItemsGrid items={recentlySort} />
            )}
          </TabPanel>
          <TabPanel>
            <TimeFilterItemsGrid items={allSort} />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}

TimeFilterTabs.propTypes = {
  allHerbs: PropTypes.array.isRequired,
};

export default TimeFilterTabs;
