import { useState } from 'react';
import { useFolderContext } from '../../contexts/FolderContext';
import { useAuthContext } from '../../contexts/AuthContext';
import TempFolderSection from './TempFolderSection';
import FolderSection from './FolderSection';
import FolderListPanel from './FolderListPanel';
import TimeFilterTabs from './TimeFilterTabs';
import CollectionSummary from './CollectionSummary';
import { useNavigate } from 'react-router-dom';

function MyLabLayout() {
  const { folderIsLoading, saveState } = useFolderContext();
  const { user, logout } = useAuthContext();
  const [openFolder, setOpenFolder] = useState(null);
  const navigate = useNavigate();

  const folders = saveState.folders;
  const allHerbs = saveState.herbCollection;

  if (folderIsLoading) return <div className="py-8 text-center">加載資料中...</div>; //TODO: 改成加載動畫

  return (
    <div className="container-broad my-12">
      {/* 使用者資訊 */}
      <header className="my-8 flex justify-between gap-48 text-xl">
        <div className="ml-[350px] flex min-w-[150px] justify-center gap-16">
          <h1
            className="text-oliver text-2xl font-bold tracking-widest"
            style={{ fontFamily: 'GenRyuMin' }}
          >
            我的實驗室
          </h1>
        </div>

        <div className="flex justify-end gap-2">
          <img src="/images/img_demo_user.png" className="h-14 w-14" alt="體驗帳號的使用者頭像" />
          <div className="flex-col">
            <p className="text-sm">
              <span className="font-bold">{user.name}</span>，歡迎！
            </p>
            <p className="text-xs text-stone-400">{user.email}</p>
            <button
              onClick={async () => {
                await logout();
                navigate('/');
              }}
              className="hover:bg-oliver bg-grass w-1/2 cursor-pointer items-center rounded-full p-1 text-center text-sm text-stone-100"
            >
              登出
            </button>
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
          <TimeFilterTabs allHerbs={allHerbs} />
          {/* 暫存區 */}
          <div className="bg-land border-land relative h-[300px] w-auto overflow-scroll rounded-xl border-1">
            <TempFolderSection folders={folders} />
          </div>
          {/* 開啟資料夾區 */}
          <FolderSection folders={folders} openFolder={openFolder} />
        </main>

        {/* 統計欄 */}
        <aside className="bg-jade border-land order-3 w-full rounded-xl border-1 lg:order-3 lg:w-1/4">
          <CollectionSummary allHerbs={allHerbs} folders={folders} />
        </aside>
      </div>
    </div>
  );
}

export default MyLabLayout;
