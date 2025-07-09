import { useEffect, useState } from 'react';
import TalkBubble from '../../components/TalkBubble';
import * as motion from 'motion/react-client';
import { AnimatePresence } from 'motion/react';
import dialogSteps from '../../data/dialogSteps';

function HeroAnimation() {
  // 體質人物輪流出場時間控制
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < dialogSteps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentIndex((i) => i + 1);
      }, 5000);
      // 清除倒數計時器
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  return (
    <div className="mb-32">
      <div className="relative h-screen min-h-[150vh] w-screen bg-[url(/images/homepage/img_homepage_hero.png)] bg-cover bg-center bg-no-repeat p-8">
        {/* 依據 currentIndex 只顯示目前的角色 */}
        <AnimatePresence mode="wait">
          {dialogSteps.map(
            (dialogStep, index) =>
              currentIndex === index && (
                <div key={dialogStep.id}>
                  {/* 人物圖（PNG） */}
                  <motion.img
                    src={`/images/homepage/img_${dialogStep.image}.png`}
                    className={`absolute ${dialogStep.imagePosition} h-[120vh]`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ ease: 'easeInOut', duration: 0.6 }}
                  />

                  {/* 對話框圖（SVG） */}
                  <motion.div
                    className={`absolute ${dialogStep.bubblePosition}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <TalkBubble
                      text={dialogStep.text}
                      bubbleImage={dialogStep.bubbleImage}
                      textPosition={`${dialogStep.textPosition}`}
                    />
                  </motion.div>
                </div>
              )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default HeroAnimation;
