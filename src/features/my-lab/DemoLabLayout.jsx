import { useState } from 'react';
import CollectionSummary from './CollectionSummary';
import FolderListPanel from './FolderListPanel';
import FolderSection from './FolderSection';
import TempFolderSection from './TempFolderSection';
import TimeFilterTabs from './TimeFilterTabs';
import { useNavigate } from 'react-router-dom';
import { useUnifiedFolderContext } from '../../contexts/UnifiedFolderContext';

function DemoLabLayout() {
  const { folders, folderIsLoading, isReadOnlyMode } = useUnifiedFolderContext();
  const [openFolder, setOpenFolder] = useState(null);
  const navigate = useNavigate();

  const allHerbs = folders.flatMap((folder) =>
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
      <header className="my-8 flex justify-between gap-36 text-xl">
        <div className="ml-[350px] flex min-w-[200px] justify-center gap-16">
          <h1
            className="text-oliver text-2xl font-bold tracking-widest"
            style={{ fontFamily: 'GenRyuMin' }}
          >
            Demo實驗室
          </h1>
        </div>

        <div className="flex items-center justify-center gap-2 rounded-md border-2 border-amber-200 bg-amber-50 p-2">
          <p className="text-sm text-stone-600">
            ⚠️ Demo 模式僅供瀏覽
            <br />
            請登入體驗帳號，取得完整操作權限。
          </p>

          <button
            onClick={() => navigate('/login')}
            className="hover:bg-oliver bg-grass h-2/3 w-1/4 cursor-pointer items-center rounded-full p-1 text-center text-sm text-stone-100"
          >
            我要登入
          </button>
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

export default DemoLabLayout;
