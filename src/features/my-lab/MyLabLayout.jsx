import { useEffect, useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import TempFolderSection from './TempFolderSection';
import FolderSection from './FolderSection';
import FolderListPanel from './FolderListPanel';
import TimeFilterTabs from './TimeFilterTabs';
import CollectionSummary from './CollectionSummary';
import { useNavigate } from 'react-router-dom';
import { useUnifiedFolderContext } from '../../contexts/UnifiedFolderContext';
import FolderListDrawer from './FolderListDrawer';
import { useToastContext } from '../../contexts/ToastContext';

function MyLabLayout() {
  const { folders, herbCollection, folderIsLoading, saveDispatch } = useUnifiedFolderContext();
  const { user, isAuthReady, logout } = useAuthContext();
  const { showToast } = useToastContext();
  const [openFolder, setOpenFolder] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const allHerbs = herbCollection;

  // 導回靜態畫面
  useEffect(() => {
    if (isAuthReady && user === null) {
      showToast('登入時效已過， 5 秒後導回首頁', 'info');
      const timer = setTimeout(() => {
        navigate('/');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isAuthReady, user, navigate]);

  if (folderIsLoading) return <div className="py-8 text-center">加載資料中...</div>; //TODO: 改成加載動畫

  return (
    <div className="container-broad my-12">
      {/* 使用者資訊 */}
      <header className="my-8 flex justify-between gap-20 text-xl md:gap-48">
        <div className="mx-auto flex min-w-[150px] justify-center gap-16 md:ml-[350px]">
          <h1
            className="text-oliver text-2xl font-bold tracking-widest"
            style={{ fontFamily: 'GenRyuMin' }}
          >
            我的實驗室
          </h1>
        </div>

        <div className="hidden justify-end gap-2 md:flex">
          <img src="/images/img_guest_user.webp" className="h-14 w-14" alt="體驗帳號的使用者頭像" />
          <div className="flex-col">
            {user && (
              <>
                <p className="text-sm">
                  <span className="font-bold">{user.name}</span>，歡迎！
                </p>
                <p className="text-xs text-stone-400">{user.email}</p>
              </>
            )}

            <button
              onClick={async () => {
                await logout();
                showToast('登出成功！', 'success');
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
      <div className="flex flex-col gap-4 md:flex-row md:justify-center">
        {/* Sidebar：資料夾列表欄 */}
        <aside className="md:hidden">
          <FolderListDrawer
            onClick={() => setIsDrawerOpen(true)}
            folders={folders}
            folderIsLoading={folderIsLoading}
            openFolder={openFolder}
            setOpenFolder={setOpenFolder}
            saveDispatch={saveDispatch}
          />
        </aside>

        <aside className="bg-jade border-land order-1 hidden w-full overflow-y-scroll rounded-xl border-1 md:order-1 md:block md:w-1/4">
          <FolderListPanel
            folders={folders}
            folderIsLoading={folderIsLoading}
            openFolder={openFolder}
            setOpenFolder={setOpenFolder}
            saveDispatch={saveDispatch}
          />
        </aside>
        {/* 中藥卡片展示欄 */}
        <main className="order-2 flex w-full flex-col gap-4 md:w-2/4">
          {/* 時間篩選標籤頁 */}
          <TimeFilterTabs allHerbs={allHerbs} />

          {/* 暫存區 */}
          <div className="bg-land border-land relative h-[300px] w-auto overflow-scroll rounded-xl border-1">
            <TempFolderSection folders={folders} saveDispatch={saveDispatch} />
          </div>
          {/* 開啟資料夾區 */}
          <FolderSection folders={folders} openFolder={openFolder} saveDispatch={saveDispatch} />
        </main>
        {/* 統計欄 */}
        <aside className="bg-jade border-land order-3 w-full rounded-xl border-1 md:order-3 md:w-1/4">
          <CollectionSummary allHerbs={allHerbs} folders={folders} />
        </aside>
      </div>
    </div>
  );
}

export default MyLabLayout;
