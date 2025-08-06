import { Link } from 'react-router-dom';
import DividerWithText from './DividerWithText';

function FeatureCards() {
  const cards = [
    {
      id: 1,
      img: 'constitution-list_card',
      text: '互動玩法瞭解體質',
      url: '/constitutions',
    },
    {
      id: 2,
      img: 'constitution-detail_card',
      text: '個人體質調養建議',
      url: '/constitutions/yang-deficiency',
    },
    {
      id: 3,
      img: 'herb-list_card',
      text: '精巧中藥篩選系統',
      url: '/herbs',
    },
    {
      id: 4,
      img: 'herb-detail_card',
      text: '好讀實用中藥卡片',
      url: '/herbs/687727728b262a31dc6ebe14',
    },
    {
      id: 5,
      img: 'my-lab_card',
      text: '自由挑選與分類知識',
      url: '/my-lab/demo',
    },
    {
      id: 6,
      img: 'concept_card',
      text: '全站有機串聯，具完整閉環體驗',
      url: '/login',
    },
  ];

  return (
    <>
      <DividerWithText
        zh="用現代眼光重新認識中醫藥 ── Herb Lab 是一座互動式知識實驗室"
        en="Key Features"
      />
      <div
        className="min-h-[80vh] w-auto bg-[url(/images/homepage/img_homepage_feature.webp)] bg-center"
        loading="lazy"
      >
        <ul className="grid list-none grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] place-items-center gap-4 px-4 sm:px-8 md:grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] md:px-8">
          {cards.map((card) => (
            <li
              key={card.id}
              className="my-4 aspect-[4/5] h-auto w-[10rem] cursor-pointer flex-wrap rounded-xl bg-white/60 shadow-[0_0_20px_rgba(0,0,0,0.08)] transition-shadow duration-300 sm:my-10 sm:w-[10rem] md:w-[14rem] lg:w-[15rem]"
            >
              <Link to={card.url}>
                <div className="flex-col items-center justify-center">
                  {/* 保留圖片不同高度，同時對齊文字高度的排版容器 */}
                  <div className="min-h-[9rem] w-auto md:h-[14rem]">
                    <img
                      src={`/images/homepage/img_${card.img}.svg`}
                      alt="illustration description"
                      loading="lazy"
                      className="p-2 hover:scale-105 sm:mt-2 sm:mb-8"
                    />
                  </div>

                  <p
                    className="text-center text-sm font-medium text-stone-700 sm:my-4 sm:text-base"
                    style={{ fontFamily: 'GenRyuMin' }}
                  >
                    {card.text}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default FeatureCards;
