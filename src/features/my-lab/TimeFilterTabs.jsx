import { CalendarDays, SquareChevronDown, SquareChevronUp } from 'lucide-react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment } from 'react';

function TimeFilterTabs() {
  return (
    <div className="border-land relative h-[250px] w-auto overflow-scroll rounded-xl border-1 border-solid">
      <CalendarDays className="text-land absolute mt-2 ml-2" />
      <TabGroup>
        <TabList className="ml-12 space-x-4 py-2 text-stone-600">
          <Tab as={Fragment}>
            {({ hover, selected }) => (
              <button
                className={clsx(
                  'cursor-pointer rounded-full px-2 py-1',
                  hover && 'bg-land/50',
                  selected && 'bg-land font-semibold text-zinc-600'
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
                  selected && 'bg-land font-semibold text-zinc-600'
                )}
              >
                最近 3 日收藏
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ hover, selected }) => (
              <button
                className={clsx(
                  'cursor-pointer rounded-full px-2 py-1',
                  hover && 'bg-land/50',
                  selected && 'bg-land font-semibold text-zinc-600'
                )}
              >
                最近 7 日收藏
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ hover, selected }) => (
              <button
                className={clsx(
                  'cursor-pointer rounded-full px-2 py-1',
                  hover && 'bg-land/50',
                  selected && 'bg-land font-semibold text-zinc-600'
                )}
              >
                最早收藏
              </button>
            )}
          </Tab>
        </TabList>
        <TabPanels className="px-4">
          <TabPanel>today</TabPanel>
          <TabPanel>recentThreeDays</TabPanel>
          <TabPanel>recentSevenDays</TabPanel>
          <TabPanel>earlist</TabPanel>
        </TabPanels>
      </TabGroup>
      {/* <button className="cursor-pointer">
          <SquareChevronUp className="text-stone-400" />
        </button>
        <button>
          <SquareChevronDown />
        </button> */}
    </div>
  );
}

export default TimeFilterTabs;
