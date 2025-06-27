import { Link } from "react-router-dom";

function FeatureCards() {
  const cards = [
    {
      id: 1,
      img: "constitution-list_card",
      text: "從互動遊戲中瞭解體質",
      url: "/constitutions",
    },
    {
      id: 2,
      img: "constitution-detail_card",
      text: "找到你的體質調養建議",
      url: "/constitutions/yang-deficiency",
    },
    {
      id: 3,
      img: "herb-list_card",
      text: "友善引導的中藥篩選系統",
      url: "/herbs",
    },
    {
      id: 4,
      img: "herb-detail_card",
      text: "好讀又實用的中藥卡片",
      url: "/herbs/ginseng",
    },
  ];

  return (
    <div className="h-[100vh] w-full bg-[url(/images/homepage/img_homepage_feature.png)] bg-cover bg-center">
      <ul className="grid list-none grid-cols-2 place-items-center gap-2 sm:grid-cols-4">
        {cards.map((card) => (
          <li
            key={card.id}
            className="mt-15 w-[14rem] cursor-pointer rounded-xl bg-white/60 shadow-[0_0_20px_rgba(0,0,0,0.08)] transition-shadow duration-300 hover:shadow-[0_0_35px_rgba(250,218,122,1.12)] sm:my-30"
          >
            <Link to={card.url}>
              <div className="h-[15rem]">
                <div className="h-3/4">
                  <img
                    src={`/images/homepage/img_${card.img}.svg`}
                    alt="illustration description"
                    className="mt-2 mb-8 w-full hover:scale-105"
                  />
                </div>
                <p
                  className="mt-4 text-center text-base font-medium text-stone-800"
                  style={{ fontFamily: "GenRyuMin" }}
                >
                  {card.text}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FeatureCards;
