import useEmblaCarousel from 'embla-carousel-react';
import ClassNames from 'embla-carousel-class-names';
import { useEffect, useState } from 'react';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import techHighlightsData from '../../data/techHighlightsData';
import TechHighlights from './TechHighlights';
import DividerWithText from './DividerWithText';

function TechHighlightsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, speed: 10, startIndex: 0 }, [
    ClassNames(),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    // 使用者滑動、切換投影片行為的事件處理器
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    onSelect(); // 初始化，手動觸發index

    emblaApi.scrollTo(0);

    return () => emblaApi.off('select', onSelect);
  }, [emblaApi]);

  return (
    <div>
      <DividerWithText
        zh="精選技術亮點 ── 運用 React 核心特性與動畫技術，打造互動導向的前端架構"
        en="Technical Highlights"
      />

      <div className="no-repeat bg-stretch relative h-full w-full bg-[url(/images/homepage/img_homepage_tech-highlight.webp)] bg-center">
        <div className="embla mx-auto h-auto w-full overflow-hidden" ref={emblaRef}>
          <ul className="embla__container flex h-full leading-relaxed">
            {techHighlightsData.map((data) => (
              <li
                key={data.id}
                className="embla__slide flex min-w-0 flex-[0_0_100%] items-stretch font-light"
              >
                <TechHighlights data={data} />
              </li>
            ))}
          </ul>

          {/* 前一張按鈕 */}
          <div className="absolute bottom-1/2 left-2 z-10 -translate-y-1/2 transform">
            <button
              aria-label="last slide"
              className="cursor-pointer"
              onClick={() => emblaApi && emblaApi.scrollPrev()}
            >
              <ChevronsLeft className="text-land h-10 w-10 shadow-2xl" />
            </button>
          </div>

          {/* 後一張按鈕 */}
          <div className="absolute right-2 bottom-1/2 z-10 -translate-y-1/2 transform">
            <button
              aria-label="next slide"
              className="cursor-pointer"
              onClick={() => emblaApi && emblaApi.scrollNext()}
            >
              <ChevronsRight className="text-land h-10 w-10" />
            </button>
          </div>

          {/* 小圓鈕 */}
          <div className="absolute bottom-1 left-1/2 flex -translate-x-1/2">
            {emblaApi &&
              emblaApi
                .scrollSnapList()
                .map((_, index) => (
                  <button
                    key={index}
                    onClick={() => emblaApi.scrollTo(index)}
                    className={`mx-1 h-3 w-3 cursor-pointer rounded-full ${
                      selectedIndex === index ? 'bg-oliver' : 'bg-stone-300'
                    }`}
                  ></button>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechHighlightsSection;
