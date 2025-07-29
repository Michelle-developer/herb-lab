import { Sprout } from 'lucide-react';

function CollectionSummary({ allHerbs }) {
  // 1. 統計熱門中藥功能
  // 1-1. 統計每個 herbId 出現次數
  const herbIdCount = allHerbs.reduce((acc, herb) => {
    const id = herb.herbId._id;
    acc[id] = (acc[id] || 0) + 1;
    return acc;
  }, {});

  // 1-2. 找出最高出現次數
  const maxCount = Math.max(...Object.values(herbIdCount));

  // 1-3. 找出所有出現次數 === maxCount 的 herbId 陣列
  const mostPopularHerbIds = Object.entries(herbIdCount)
    .filter(([_, count]) => count === maxCount)
    .map(([id]) => id);

  // 1-4. 反查出完整的 herb 物件（去除重複，避免一個 herb 出現多次）
  const uniqueHerbs = allHerbs.filter(
    (herb, index, self) => index === self.findIndex((h) => h.herbId._id === herb.herbId._id)
  );

  // 1-5. 從 uniqueHerbs 中挑出熱門 herbId 的完整資料
  const mostPopularHerbs = uniqueHerbs.filter((herb) =>
    mostPopularHerbIds.includes(herb.herbId._id)
  );

  //   const natureCount = allHerbs;
  //   const tasteCount = allHerbs;
  return (
    <div>
      <h2 className="my-8 text-center text-lg font-semibold" style={{ fontFamily: 'GenRyuMin' }}>
        我的收藏摘要
      </h2>
      <ul className="pl-4">
        <li className="my-4 flex gap-1">
          <Sprout className="text-grass h-6 w-6 flex-shrink-0 items-start" strokeWidth={1} />
          收藏總數： <span className="text-oliver font-semibold">{allHerbs.length}</span>
        </li>
        <li className="my-4 flex gap-1">
          <Sprout className="text-grass h-6 w-6 flex-shrink-0 items-start" strokeWidth={1} />
          最熱門的中藥：
          <span className="text-oliver font-semibold">
            {mostPopularHerbs.map((herb) => herb.herbId.name_zh).join('、')}
          </span>
        </li>
        <li className="my-4 flex gap-1">
          <Sprout className="text-grass h-6 w-6 flex-shrink-0 items-start" strokeWidth={1} />
          最豐富的資料夾：
        </li>

        <li className="my-4 flex gap-1">
          <Sprout className="text-grass h-6 w-6 flex-shrink-0 items-start" strokeWidth={1} />
          最常出現的藥性：
        </li>
        <li className="my-4 flex gap-1">
          <Sprout className="text-grass h-6 w-6 flex-shrink-0 items-start" strokeWidth={1} />
          最常出現的藥味：
        </li>
      </ul>
    </div>
  );
}

export default CollectionSummary;
