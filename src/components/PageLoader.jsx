import Logo from './Logo';

function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md">
      <Logo
        className="h-30 w-30 animate-[pulse_2s_ease-in-out_infinite] md:h-40 md:w-40"
        aria-label="拾本草 Logo"
      />
      <span className="text-center text-stone-100">頁面載入中...</span>
    </div>
  );
}

export default PageLoader;
