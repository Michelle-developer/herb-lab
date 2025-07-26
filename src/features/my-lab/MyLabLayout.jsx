import {
  CalendarDays,
  CircleCheckBig,
  CircleX,
  EllipsisVertical,
  Expand,
  Flag,
  FolderClosed,
  FolderOpen,
  FolderPlus,
  MoveLeft,
  Search,
  Sprout,
  SquareChevronDown,
  SquareChevronUp,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useFolderContext } from '../../contexts/FolderContext';
import { useAuthContext } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../utils/axiosInstance';
import PageNotFound from '../../pages/PageNotFound';
import TempFolderSection from './TempFolderSection';
import HerbCard from './HerbCard';
import clsx from 'clsx';

function MyLabLayout() {
  const { folderIsLoading, saveState, saveDispatch } = useFolderContext();
  const { user } = useAuthContext();
  const [hasInitialized, setHasInitialized] = useState(false);
  const [openFolder, setOpenFolder] = useState(null);
  const [folderName, setFolderName] = useState('新資料夾');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('today');

  if (folderIsLoading) return <div className="py-8 text-center">加載資料中...</div>; //TODO: 改成加載動畫
  // if (!folder) return <PageNotFound />;
  const navigate = useNavigate();
  const folders = saveState.folders;
  const sidebarFolders = folders.filter((folder) => folder.name !== '暫存區');

  // 預設開啟資料夾：「顧眼睛」
  useEffect(() => {
    if (!folderIsLoading && sidebarFolders.length > 0 && !hasInitialized) {
      setOpenFolder(sidebarFolders[0]._id);
      setHasInitialized(true); // 只初始化一次，避免狀態一變就自動導回「顧眼睛」
    }
  }, [folderIsLoading, sidebarFolders]);

  const openFolderObj = sidebarFolders.find((folder) => folder._id === openFolder);

  const handleCreateFolder = async () => {
    const defaultName = '新資料夾';
    try {
      const res = await axios.post(
        '/my-lab/folders',
        { name: defaultName },
        { withCredentials: true }
      );
      console.log('res.data.data', res.data.data);

      const newFolder = res.data.data.folder;

      saveDispatch({
        type: 'createFolder',
        payload: newFolder,
      });

      alert('創建成功');
    } catch (err) {
      const errorMsg = err.reponse?.data?.message || '創建失敗，請稍後再試';

      alert(errorMsg);
    }
  };

  // TODO: 待開發
  // const handleMoveBetweenFiles = async () => {
  //   const fromFolderId = ;
  //   const toFolderId = ;
  //   try {
  //     const res = await axios.patch('/:fromFolderId/move-item/:toFolderId');
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

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

      {/* 主畫面：三欄排版 */}
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-center">
        {/* Sidebar：資料夾列表欄 */}
        <aside className="bg-jade border-land order-2 w-full overflow-y-scroll rounded-xl border-1 lg:order-1 lg:w-1/4">
          {/* 欄標題 + 按鈕 */}
          <h2
            className="my-8 text-center text-lg font-semibold"
            style={{ fontFamily: 'GenRyuMin' }}
          >
            我的資料夾
          </h2>
          {/* 新增資料夾按鈕 */}
          <button
            onClick={handleCreateFolder}
            className="bg-grass hover:bg-oliver mb-8 ml-4 flex cursor-pointer gap-2 rounded-full px-2 py-1 text-stone-100"
          >
            <FolderPlus strokeWidth={1} />
            <span className="py-0.5 text-center">新增資料夾</span>
          </button>

          {/* 資料夾清單（不含暫存區） */}
          <ul className="w-full text-stone-600">
            {sidebarFolders.map((folder) => (
              <li
                key={folder._id}
                className={clsx(
                  'flex h-18 w-full justify-between gap-2',
                  folder._id === openFolder && 'border-land border-y-1 bg-white ring-1 ring-white'
                )}
                style={{ fontFamily: 'GenRyuMin' }}
              >
                {/* 標示當前開啟資料夾的裝飾線條 */}
                {folder._id === openFolder && <div className="bg-oliver h-auto w-4 rounded-r-xl" />}
                <div
                  className={clsx(
                    'flex flex-grow justify-around space-x-1 py-6 font-semibold',
                    folder._id === openFolder && 'text-oliver'
                  )}
                >
                  <button className="cursor-pointer" onClick={() => setOpenFolder(folder._id)}>
                    {folder._id === openFolder ? (
                      <FolderOpen className="text-oliver" size={32} />
                    ) : (
                      <FolderClosed className="text-stone-600" size={32} />
                    )}
                  </button>
                  {folder.name} ({folder.items.length})
                  <EllipsisVertical className="cursor-pointer text-stone-400" />
                </div>
              </li>
            ))}

            {/* <li>
              
            </li> */}
          </ul>
        </aside>
        {/* 中藥卡片展示欄 */}
        <main className="order-1 flex w-full flex-col gap-4 lg:order-2 lg:w-2/4">
          {/* 時間篩選標籤頁 */}
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

          {/* 暫存區 */}
          <div className="bg-land border-land relative h-[300px] w-auto overflow-scroll rounded-xl border-1">
            <TempFolderSection />
          </div>

          {/* 開啟資料夾區 */}
          <div className="bg-grass/30 border-grass/50 relative h-[500px] w-auto overflow-scroll rounded-xl border-1">
            <div className="sticky top-0 left-0 z-10 bg-white/90 p-4 backdrop-blur">
              <CircleCheckBig className="absolute top-2 left-2 text-lime-400" />

              <h3 className="ml-12 text-lg font-semibold" style={{ fontFamily: 'GenRyuMin' }}>
                {openFolderObj?.name}{' '}
                <span className="text-base text-stone-500">({openFolderObj?.items.length})</span>
              </h3>

              <button className="absolute top-2 right-2 cursor-pointer">
                <Expand className="text-stone-400" />
              </button>
            </div>

            <div className="mt-4 px-4">
              {openFolderObj?.items.length === 0 ? (
                <div className="mx-auto mt-4 flex w-full flex-col items-center gap-2">
                  <img
                    src="/images/img_add-herbs.png"
                    className="w-[40%]"
                    alt="叼著一根骨頭，開心往前跑的小黑狗"
                    title="叼骨頭的小黑狗"
                  />
                  <p>這個資料夾還沒有中藥，快去收集一些吧！</p>

                  {
                    <Link to="/herbs">
                      <div
                        role="button"
                        className="hover:bg-oliver bg-grass mt-4 mb-2 w-full cursor-pointer items-center rounded-full p-2 text-center text-sm text-stone-100"
                      >
                        開始收集
                      </div>
                    </Link>
                  }
                </div>
              ) : (
                <ul className="my-4 mb-2 grid grid-cols-2 justify-items-center gap-4 text-center md:grid-cols-3">
                  {openFolderObj?.items?.map((item) => (
                    <HerbCard key={item._id} item={item} />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </main>

        {/* 統計欄 */}
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
