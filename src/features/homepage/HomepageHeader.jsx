import TalkBubble from "../../components/TalkBubble";

function HomepageHeader() {
  return (
    <div>
      <header className="relative h-screen min-h-[150vh] w-screen bg-[url(/images/img_homepage_hero.png)] bg-cover bg-center bg-no-repeat p-8">
        <img
          src="/images/homepage/img_yang_hero.png"
          className="absolute top-[30%] right-[10%] h-[120vh]"
        />
        <div className="absolute top-[20%] left-[20%]">
          <TalkBubble
            children="楊哥，你怎麼又怕冷？我倒是整天口乾舌燥，最近常喝百合蓮子湯，不錯哦！"
            bubbleDirection="left"
            textPosition="top-[15%] left-[10%]"
          />
        </div>

        <div className="absolute top-[12%] right-[25%]">
          <TalkBubble
            children="嗚啊～今天也是冷颼颼的，這裡有沒有什麼暖身的中藥啊？"
            bubbleDirection="right"
            textPosition="top-[45%] right-[10%]"
          />
        </div>
      </header>
    </div>
  );
}

export default HomepageHeader;
