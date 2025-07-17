import { Search } from 'lucide-react';

function MyLabLayout() {
  return (
    <div className="container-broad">
      {/* Search Bar + User Information */}
      <header className="my-8 flex justify-between gap-48 text-xl">
        <div className="flex min-w-[150px] justify-center gap-8">
          <h1 style={{ fontFamily: 'GenRyuMin' }}>我的實驗室</h1>

          <button className="flex h-8 w-30 cursor-pointer gap-2 rounded-sm border-1 border-solid border-stone-400 px-2 py-1">
            <span className="text-sm text-stone-400">輸入中藥名</span>
            <Search className="w-4 text-stone-400" />
          </button>
        </div>

        <div className="flex justify-end gap-2">
          <img src="/images/img_demo_user.png" className="h-12 w-12" alt="體驗帳號的使用者頭像" />
          <div className="flex-col">
            <p className="text-sm">Helen Ross</p>
            <p className="text-xs text-stone-400">helenross@gmail.com</p>
          </div>
        </div>
      </header>

      <div className="flex flex-col gap-2 lg:flex-row lg:justify-center">
        {/* Collection Folder */}
        <aside className="order-2 w-full lg:order-1 lg:w-1/4">我的資料夾</aside>
        {/* Herb Cards */}
        <main className="order-1 w-full lg:order-2 lg:w-2/4">中藥卡片</main>
        {/* Collection Summary */}
        <aside className="order-3 w-full lg:order-3 lg:w-1/4">我的收藏摘要</aside>
      </div>
    </div>
  );
}

export default MyLabLayout;
