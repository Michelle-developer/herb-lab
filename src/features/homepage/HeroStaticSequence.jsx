import { useEffect, useState } from "react";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";

function HeroStaticSequence() {
  const [imageSet, setImageSet] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  //偵測螢幕寬度，決定顯示圖的版本
  useEffect(() => {
    const width = window.innerWidth;
    if (width < 640)
      setImageSet([
        "/images/homepage/hero_mobile_1.png",
        "/images/homepage/hero_mobile_2.png",
        "/images/homepage/hero_mobile_3.png",
      ]);
    else
      setImageSet([
        "/images/homepage/hero_tablet_1.png",
        "/images/homepage/hero_tablet_2.png",
        "/images/homepage/hero_tablet_3.png",
      ]);
  }, []);

  //控制靜態圖輪流切換
  useEffect(() => {
    if (currentIndex < imageSet.length - 1) {
      const timer = setTimeout(() => {
        setCurrentIndex((i) => i + 1);
      }, 5000);
      //清除倒數計時器
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
              <div key={index}>
                <motion.img
                  src={image}
                  className="h-full w-full object-cover object-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ ease: "easeInOut", duration: 0.6 }}
                />
              </div>
            ),
        )}
      </AnimatePresence>
    </div>
  );
}

export default HeroStaticSequence;
