import { useEffect, useState } from "react";
import TalkBubble from "../../components/TalkBubble";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";

function HeroAnimation() {
  const dialogSteps = [
    {
      id: "yang-deficiency",
      name: "楊哥",
      image: "yang_hero",
      imagePosition: "top-[30%] right-[10%]",
      bubbleImage: "right",
      bubblePosition: "top-[12%] right-[25%]",
      text: "楊哥（苦惱狀）：嗚啊～今天風超大，冷吱吱，手冰到一個不行，這裡有沒有什麼喝了會暖洋洋的中藥茶飲啊？",
      textPosition: "top-[35%] right-[10%]",
    },

    {
      id: "yin-deficiency",
      name: "殷姊",
      image: "ying_hero",
      imagePosition: "top-[30%] left-[10%]",
      bubbleImage: "left",
      bubblePosition: "top-[15%] left-[30%]",
      text: "殷姊（關心狀）：楊哥，你常喊冷，去看醫生調養啦！我倒是整天口乾舌燥，最近自己煮百合蓮子湯來喝，感覺有好一點耶！",
      textPosition: "top-[15%]",
    },

    {
      id: "damp-heat",
      name: "施君",
      image: "damp_hero",
      imagePosition: "top-[30%] left-[20%]",
      bubbleImage: "left",
      bubblePosition: "top-[16%] right-[20%]",
      text: "施君（插嘴）：我整天臉油到發亮，狂冒痘痘，害我顏值都降低了。欸，你們看！後面這一家不知是啥，感覺會挖到寶哦，先進去再說！GO～",
      textPosition: "top-[15%]",
    },
  ];

  //人物輪流出場時間控制
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    console.log("currentIndex is", currentIndex); //TODO:
    if (currentIndex < dialogSteps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentIndex((i) => i + 1);
      }, 5000);
      //清除倒數計時器
      return () => clearTimeout(timer);
    }
  }, [currentIndex, dialogSteps.length]);

  return (
    <div className="mb-32">
      <div className="relative h-screen min-h-[150vh] w-screen bg-[url(/images/homepage/img_homepage_hero.png)] bg-cover bg-center bg-no-repeat p-8">
        {/* 依據 currentIndex 只顯示目前的角色 */}
        <AnimatePresence mode="wait">
          {dialogSteps.map(
            (dialogStep, index) =>
              currentIndex === index && (
                <div key={dialogStep.id}>
                  {/* 人物 */}
                  <motion.img
                    src={`/images/homepage/img_${dialogStep.image}.png`}
                    className={`absolute ${dialogStep.imagePosition} h-[120vh]`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                  />

                  {/* 對話框 */}
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
              ),
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default HeroAnimation;
