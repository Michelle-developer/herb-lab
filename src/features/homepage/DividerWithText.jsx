import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

function DividerWithText({ zh, en }) {
  const ref = useRef();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // 建立觀察器
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.5 }
    );
    // 設定要觀察的元素
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="hiddern relative mx-auto my-20 max-w-[90%] sm:block sm:max-w-[70%]">
      <div className="relative mt-16 flex items-center justify-center">
        {/* 左邊線條 */}
        <div
          className={`h-px bg-stone-400 transition-all duration-1000 ${inView ? 'w-1/2' : 'w-0'}`}
        />

        <div className="absolute z-10 flex flex-col items-center bg-white px-4">
          <h2
            className="px-1 py-4 text-center text-base font-semibold tracking-wide text-stone-950 sm:px-4 sm:py-6"
            style={{ fontFamily: 'GenRyuMin' }}
          >
            {zh}
          </h2>
          <h4
            className="text-sm/2 tracking-wide text-stone-400"
            style={{ fontFamily: 'Playfair Display' }}
          >
            {en}
          </h4>
        </div>

        {/* 右邊線條 */}
        <div
          className={`h-px bg-stone-400 transition-all duration-1000 ${inView ? 'w-1/2' : 'w-0'}`}
        />
      </div>
    </div>
  );
}

DividerWithText.propTypes = {
  zh: PropTypes.string.isRequired,
  en: PropTypes.string,
};

export default DividerWithText;
