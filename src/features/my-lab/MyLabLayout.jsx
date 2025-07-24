import {
  CalendarDays,
  CircleCheckBig,
  EllipsisVertical,
  Expand,
  Flag,
  FolderClosed,
  FolderOpen,
  FolderPlus,
  Search,
  Sprout,
  SquareChevronDown,
  SquareChevronUp,
} from 'lucide-react';
import { useState } from 'react';
import { useFolderContext } from '../../contexts/FolderContext';
import { useAuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

function MyLabLayout() {
  const { saveState, saveDispatch } = useFolderContext();
  const { user, isAuthReady } = useAuthContext();
  const [openFolder, setOpenFolder] = useState(null);
  const [activeTab, setActiveTab] = useState('today');

  console.log('saveState', saveState);

  const folders = saveState.folders;
  const tempFolder = folders.find((folder) => folder.name === '暫存區');

  return (
    <div className="container-broad my-12">
      {/* 假搜尋框（按鈕） + 使用者資訊 */}
      <header className="my-12 flex justify-between gap-48 text-xl">
        <div className="ml-[350px] flex min-w-[150px] justify-center gap-16">
          <h1 className="text-oliver text-2xl font-bold" style={{ fontFamily: 'GenRyuMin' }}>
            我的實驗室
          </h1>

          {/* 未來再做：搜尋按鈕
          <button className="flex h-6 w-36 cursor-pointer gap-8 rounded-md border-1 border-solid border-stone-400 px-2 py-0.5">
            <span className="text-sm text-stone-400">輸入中藥名</span>
            <Search className="w-6 px-1 py-0.5 text-stone-400" />
          </button> */}
        </div>

        <div className="flex justify-end gap-2">
          <img src="/images/img_demo_user.png" className="h-12 w-12" alt="體驗帳號的使用者頭像" />
          <div className="flex-col">
            <p className="text-sm">
              <span className="font-bold">{user.name}</span>，歡迎回來！
            </p>
            <p className="text-xs text-stone-400">{user.email}</p>
          </div>
        </div>
      </header>

      <div className="flex flex-col gap-4 lg:flex-row lg:justify-center">
        {/* 資料夾列表 */}
        <aside className="bg-jade border-land order-2 w-full rounded-xl border-1 lg:order-1 lg:w-1/4">
          <h2
            className="my-8 text-center text-lg font-semibold"
            style={{ fontFamily: 'GenRyuMin' }}
          >
            我的資料夾
          </h2>
          <button className="bg-grass mb-8 ml-4 flex cursor-pointer gap-2 rounded-full px-2 py-1 text-stone-200">
            <FolderPlus strokeWidth={1} />
            <span className="py-0.5 text-center">新增資料夾</span>
          </button>

          <ul className="my-4 w-full text-stone-600">
            <li
              className={`my-8 flex h-18 w-full justify-between gap-2 bg-white ring-1 ring-white`}
            >
              {/* 標示當前開啟資料夾的裝飾線條 */}
              <div className="bg-oliver h-auto w-4 rounded-r-xl" />
              <div className="flex flex-grow justify-around py-6">
                <FolderOpen className="text-oliver cursor-pointer" size={32} />
                顧眼睛 (3)
                <EllipsisVertical className="cursor-pointer text-stone-400" />
              </div>
            </li>
            <li>
              <FolderClosed />
            </li>
          </ul>
        </aside>
        {/* 中藥卡片展示區 */}
        <main className="order-1 flex w-full flex-col gap-4 lg:order-2 lg:w-2/4">
          <div className="border-land relative h-[150px] w-auto rounded-xl border-1 border-solid">
            <CalendarDays className="text-land absolute mt-2 ml-2" />
            <div className="ml-12 space-x-4 py-2">
              <button>今日收藏</button>
              <button>最近 3 日收藏</button>
              <button>最近 7 日收藏</button>
              <button>最早收藏</button>
              <button className="cursor-pointer">
                <SquareChevronUp className="text-stone-400" />
              </button>
              <button>
                <SquareChevronDown />
              </button>
            </div>
            <div className="px-4">
              <div>today 中藥卡片</div>
              <div>recentThreeDays 中藥卡片</div>
              <div>recentSevenDays 中藥卡片</div>
              <div>earlist 中藥卡片</div>
            </div>
          </div>

          <div className="bg-land border-land relative h-[300px] w-auto overflow-scroll rounded-xl border-1">
            <div className="sticky top-0 left-0 z-10 bg-white/90 px-4 py-8 backdrop-blur">
              <Flag className="absolute top-2 left-2 text-amber-300" />
              <h3 className="ml-12 text-lg font-semibold" style={{ fontFamily: 'GenRyuMin' }}>
                暫存區 <span className="text-base text-stone-500">({tempFolder.items.length})</span>
              </h3>
              <button className="absolute top-2 right-2 cursor-pointer">
                <Expand className="text-stone-400" />
              </button>
            </div>

            <div className="mt-4 px-4">
              <ul className="my-4 mb-2 grid grid-cols-3 justify-items-center gap-2 text-center md:grid-cols-4">
                {tempFolder?.items?.map((item) => (
                  <li
                    key={item._id}
                    className="relative flex flex-col items-center rounded-lg border border-stone-200 bg-stone-200 p-4 shadow-md sm:shadow-lg"
                  >
                    <Link to={`/herbs/${item.herbId._id}`}>
                      <img
                        src={`/images/herbs/img_${item.herbId.slug}.jpg`}
                        alt={item.herbId.name_zh}
                        className="mt-4 mb-2 w-28 rounded-lg border border-stone-200"
                      />
                      <h4 className="text-sm font-semibold md:text-base lg:text-lg">
                        {item.herbId.name_zh}
                      </h4>
                      <p className="text-xs md:text-sm lg:text-base">
                        {item.herbId.function_group}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-grass/30 border-grass/50 relative h-[300px] w-auto rounded-xl border-1">
            <CircleCheckBig className="absolute mt-2 ml-2 text-lime-200" />
            <div className="mt-4 ml-12">
              <h3 className="text-lg font-semibold" style={{ fontFamily: 'GenRyuMin' }}>
                顧眼睛
              </h3>
              <ul className="my-4 flex">
                <li>中藥卡片</li>
              </ul>
            </div>
            <button className="cursor-pointer">
              <Expand className="absolute top-2 right-2 text-stone-400" />
            </button>
          </div>
        </main>
        {/* 統計與圖表區 */}
        <aside className="bg-jade border-land order-3 w-full rounded-xl border-1 lg:order-3 lg:w-1/4">
          <h2
            className="my-8 text-center text-lg font-semibold"
            style={{ fontFamily: 'GenRyuMin' }}
          >
            我的收藏摘要
          </h2>
          <ul className="pl-4">
            <li className="my-4 flex gap-1">
              <Sprout className="text-grass h-6 w-6 flex-shrink-0 items-start" strokeWidth={1} />
              總收藏數量：
            </li>
            <li className="my-4 flex gap-1">
              <Sprout className="text-grass h-6 w-6 flex-shrink-0 items-start" strokeWidth={1} />
              最常出現的藥性：
            </li>
            <li className="my-4 flex gap-1">
              <Sprout className="text-grass h-6 w-6 flex-shrink-0 items-start" strokeWidth={1} />
              最常出現的藥味：
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}

export default MyLabLayout;
