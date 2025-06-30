import { Sprout } from "lucide-react";
import { useEffect, useState } from "react";

function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY > 400);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="back to top"
      className={`bg-land/90 fixed right-6 bottom-6 z-40 h-18 w-18 rounded-full border border-gray-100 shadow-lg transition-opacity duration-500 ${isVisible ? "cursor-pointer opacity-100" : "pointer-events-none flex-col items-center justify-center opacity-0"}`}
    >
      <Sprout
        className="hover:text-grass mx-auto block h-1/2 w-1/2 animate-[bounce_4s_ease-in-out_infinite] text-gray-100 transition-colors"
        strokeWidth={1}
      />
      <p className="text-xs text-gray-800">回頂層</p>
    </button>
  );
}

export default BackToTopButton;
