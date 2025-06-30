import Logo from "./Logo";

function AppLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#63A681] via-[#437057] to-[#1C6758]">
      <Logo
        className="h-30 w-30 animate-[pulse_2s_ease-in-out_infinite] md:h-40 md:w-40"
        aria-label="拾本草 Logo"
      />
    </div>
  );
}

export default AppLoader;
