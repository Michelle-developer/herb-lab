import { Sprout } from 'lucide-react';
import { useState } from 'react';
import { useFolderContext } from '../../contexts/FolderContext';
import { useAuthContext } from '../../contexts/AuthContext';
import TempFolderSection from './TempFolderSection';
import FolderSection from './FolderSection';
import FolderListPanel from './FolderListPanel';
import TimeFilterTabs from './TimeFilterTabs';

function MyLabLayout() {
  const { folderIsLoading, saveState, saveDispatch } = useFolderContext();
  const { user } = useAuthContext();
  const [openFolder, setOpenFolder] = useState(null);
  const [activeTab, setActiveTab] = useState('today');

  const folders = saveState.folders;

  if (folderIsLoading) return <div className="py-8 text-center">加載資料中...</div>; //TODO: 改成加載動畫

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
        <FolderListPanel
          folders={folders}
          folderIsLoading={folderIsLoading}
          openFolder={openFolder}
          setOpenFolder={setOpenFolder}
        />

        {/* 中藥卡片展示欄 */}
        <main className="order-1 flex w-full flex-col gap-4 lg:order-2 lg:w-2/4">
          {/* 時間篩選標籤頁 */}
          <TimeFilterTabs />
          {/* 暫存區 */}
          <div className="bg-land border-land relative h-[300px] w-auto overflow-scroll rounded-xl border-1">
            <TempFolderSection folders={folders} />
          </div>
          {/* 開啟資料夾區 */}
          <FolderSection folders={folders} openFolder={openFolder} />
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
