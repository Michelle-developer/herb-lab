import { useEffect, useState } from 'react';
import * as motion from 'motion/react-client';
import { AnimatePresence } from 'motion/react';

function HeroStaticSequence({ ref }) {
  const [imageSet, setImageSet] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 設定圖片清單：偵測螢幕寬度，選擇顯示的圖片版本
  useEffect(() => {
    const width = window.innerWidth;
    if (width < 640)
      setImageSet([
        '/images/homepage/hero_mobile_1.webp',
        '/images/homepage/hero_mobile_2.webp',
        '/images/homepage/hero_mobile_3.webp',
      ]);
    else
      setImageSet([
        '/images/homepage/hero_tablet_1.webp',
        '/images/homepage/hero_tablet_2.webp',
        '/images/homepage/hero_tablet_3.webp',
      ]);
  }, []);

  // 控制靜態圖輪播
  useEffect(() => {
    if (currentIndex < imageSet.length - 1) {
      const timer = setTimeout(() => {
        setCurrentIndex((i) => i + 1);
      }, 5000);
      // 清除倒數計時器
      return () => clearTimeout(timer);
    }
  }, [currentIndex, imageSet.length]);

  useEffect(() => {
    if (currentIndex === imageSet.length - 1) {
      const timer = setTimeout(() => {
        window.scrollTo({
          top: ref.current.offsetTop - 200,
          behavior: 'smooth',
        });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, imageSet.length]);

  return (
    <div>
      {/* 依據 currentIndex 只顯示目前的靜態圖 */}
      <AnimatePresence mode="wait">
        {imageSet.map(
          (image, index) =>
            currentIndex === index && (
              <div key={index} className="relative aspect-[3/5] w-full overflow-hidden">
                {/* 控制圖片比例，防止 CLS 現象*/}
                <motion.img
                  src={image}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ ease: 'easeInOut', duration: 0.8 }}
                />
              </div>
            )
        )}
      </AnimatePresence>
    </div>
  );
}

export default HeroStaticSequence;
