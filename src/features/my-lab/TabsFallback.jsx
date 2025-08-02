import { Link } from 'react-router-dom';

function TabsFallback() {
  return (
    <div className="mx-auto flex w-full justify-center bg-stone-200">
      <img
        src="/images/img_add-herbs.png"
        className="w-[140px]"
        alt="叼著一根骨頭，開心往前跑的小黑狗"
        title="叼骨頭的小黑狗"
      />
      <div className="flex flex-col items-center justify-center">
        <p className="mb-4 text-center text-sm text-stone-600">
          這裡還沒有中藥，
          <br />
          快來收集吧！
        </p>
        <Link to="/herbs">
          <div
            role="button"
            className="hover:bg-oliver bg-grass w-full cursor-pointer items-center rounded-full p-1 text-center text-sm text-stone-100"
          >
            <span className="text-xs">開始收集</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default TabsFallback;
