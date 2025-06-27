import useEmblaCarousel from "embla-carousel-react";
import ClassNames from "embla-carousel-class-names";
import { useEffect, useState } from "react";
import { CircleChevronLeft } from "lucide-react";
import { CircleChevronRight } from "lucide-react";
import techHighlightsData from "../../data/techHighlightsData";
import TechHighlights from "./TechHighlights";

function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, speed: 10, startIndex: 0 },
    [ClassNames()],
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    //使用者滑動、切換投影片行為的事件處理器
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect(); //初始化，手動觸發index

    emblaApi.scrollTo(0);

    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  return (
    <div className="no-repeat bg-stretch h-[100vh] w-full bg-[url(/images/homepage/img_homepage_tech-highlight.png)] bg-center">
      <div
        className="embla mx-auto h-[70%] w-[90%] overflow-hidden"
        ref={emblaRef}
      >
        <ul className="embla__container mb-6 flex">
          {techHighlightsData.map((data) => (
            <li
              key={data.id}
              className="embla__slide min-w-0 flex-[0_0_100%] bg-white/30"
            >
              <TechHighlights data={data} />
            </li>
          ))}
        </ul>

        {/* 前一張按鈕 */}
        <div className="relative">
          <div className="absolute bottom-1/2 left-8 z-10 -translate-y-1/2 transform">
            <button
              aria-label="last slide"
              className="cursor-pointer"
              onClick={() => emblaApi && emblaApi.scrollPrev()}
            >
              <CircleChevronLeft className="text-oliver h-10 w-10" />
            </button>
          </div>

          {/* 後一張按鈕 */}
          <div className="absolute right-8 bottom-1/2 z-10 -translate-y-1/2 transform">
            <button
              aria-label="next slide"
              className="cursor-pointer"
              onClick={() => emblaApi && emblaApi.scrollNext()}
            >
              <CircleChevronRight className="text-oliver h-10 w-10" />
            </button>
          </div>

          {/* 小圓鈕 */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2">
            {emblaApi &&
              emblaApi
                .scrollSnapList()
                .map((_, index) => (
                  <button
                    key={index}
                    onClick={() => emblaApi.scrollTo(index)}
                    className={`mx-1 h-3 w-3 cursor-pointer rounded-full ${
                      selectedIndex === index ? "bg-oliver" : "bg-stone-400"
                    }`}
                  ></button>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmblaCarousel;
