import { useState } from 'react';
import CollectionSummary from './CollectionSummary';
import FolderListPanel from './FolderListPanel';
import FolderSection from './FolderSection';
import TempFolderSection from './TempFolderSection';
import TimeFilterTabs from './TimeFilterTabs';
import { useNavigate } from 'react-router-dom';
import { useUnifiedFolderContext } from '../../contexts/UnifiedFolderContext';
import FolderListDrawer from './FolderListDrawer';

function DemoLabLayout() {
  const { folders, folderIsLoading, isReadOnlyMode } = useUnifiedFolderContext();
  const [openFolder, setOpenFolder] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const allHerbs = folders?.flatMap((folder) =>
    folder.items.map((item) => ({
      ...item,
      folderId: folder._id,
      folderName: folder.name,
    }))
  );

  if (folderIsLoading) return <div className="py-8 text-center">加載資料中...</div>; //TODO: 改成加載動畫

  return (
    <div className="container-broad my-12">
      {/* 使用者資訊 */}
      <header className="my-8 text-xl md:flex md:justify-between md:gap-36">
        <div className="mb-8 flex min-w-[200px] justify-center gap-16 md:mb-0 md:ml-[350px]">
          <h1
            className="text-oliver text-2xl font-bold tracking-widest"
            style={{ fontFamily: 'GenRyuMin' }}
          >
            Demo實驗室
          </h1>
        </div>

        <div className="flex w-[280px] items-center justify-center gap-2 rounded-md border-2 border-amber-200 bg-amber-50 p-2 md:min-w-[320px]">
          <p className="text-sm text-stone-600">
            ⚠️ Demo 模式僅供瀏覽
            <br />
            請登入體驗帳號，取得完整操作權限。
          </p>

          <button
            onClick={() => navigate('/login')}
            className="hover:bg-oliver bg-grass h-2/3 w-1/3 cursor-pointer items-center rounded-full p-1 text-center text-sm text-stone-100 md:w-1/4"
          >
            我要登入
          </button>
        </div>
      </header>

      {/* 主畫面：三欄排版 */}
      <div className="flex flex-col gap-4 md:flex-row md:justify-center">
        {/* Sidebar：資料夾列表欄 */}
        <aside className="md:hidden">
          <FolderListDrawer
            onClick={() => setIsDrawerOpen(true)}
            folders={folders}
            folderIsLoading={folderIsLoading}
            openFolder={openFolder}
            setOpenFolder={setOpenFolder}
          />
        </aside>

        <aside className="bg-jade border-land order-1 hidden w-full overflow-y-scroll rounded-xl border-1 md:order-1 md:block md:w-1/4">
          <FolderListPanel
            folders={folders}
            folderIsLoading={folderIsLoading}
            openFolder={openFolder}
            setOpenFolder={setOpenFolder}
          />
        </aside>
        {/* 中藥卡片展示欄 */}
        <main className="order-2 flex w-full flex-col gap-4 md:w-2/4">
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
        <aside className="bg-jade border-land order-3 w-full rounded-xl border-1 md:order-3 md:w-1/4">
          <CollectionSummary allHerbs={allHerbs} folders={folders} />
        </aside>
      </div>
    </div>
  );
}

export default DemoLabLayout;
