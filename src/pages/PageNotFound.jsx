import { NavLink, useNavigate } from 'react-router-dom';

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto mt-8 flex h-auto w-[50%] flex-col items-center justify-center">
      <img
        src="/images/img_error.webp"
        className="w-[40%]"
        alt="前掌握著SOS白旗，露出無辜表情的小黑狗"
        title="握白旗的小黑狗"
      />
      <p>我們找不到這個頁面 🥲</p>
      <div className="my-4 flex w-full justify-center gap-2">
        <button
          className="hover:bg-oliver bg-grass my-2 mb-2 w-1/4 cursor-pointer items-center rounded-full p-2 text-center text-sm text-stone-100"
          onClick={() => navigate(-1)}
        >
          回上一頁
        </button>

        <NavLink
          to="/"
          className="hover:bg-jade text-grass border-grass hover:text-oliver my-2 mb-2 w-1/4 cursor-pointer items-center rounded-full border bg-stone-100 p-2 text-center text-sm"
        >
          返回首頁
        </NavLink>
      </div>
    </div>
  );
}

export default PageNotFound;
