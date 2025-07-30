import PropTypes from 'prop-types';

function CollectionSummary({ allHerbs, folders }) {
  const UniqueAll = allHerbs.filter(
    (herb, index, self) => index === self.findIndex((h) => h.herbId._id === herb.herbId._id)
  );

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

  // 1-4. 反查出完整的 herb 物件；若有多筆 herbId 符合，僅保留第一筆（去除重複，避免一個 herb 出現多次）
  const uniqueHerbs = allHerbs.filter(
    (herb, index, self) => index === self.findIndex((h) => h.herbId._id === herb.herbId._id)
  );

  // 1-5. 從 uniqueHerbs 中挑出熱門 herbId 的完整資料
  const mostPopularHerbs = uniqueHerbs.filter((herb) =>
    mostPopularHerbIds.includes(herb.herbId._id)
  );

  // 2. 統計最豐富資料夾功能
  // 2-1. 提取所有資料夾各自收納的中藥陣列長度
  const allFolderItems = folders.map((folder) => folder.items.length);

  // 2-2. 找出最大收藏數
  const maxItems = Math.max(...allFolderItems);

  // 2-3. 找出符合最大收藏數的資料夾
  const maxFolders = folders
    .filter((folder) => folder.items.length === maxItems)
    .map((f) => f.name);

  return (
    <div>
      <h2 className="my-8 text-center text-lg font-semibold" style={{ fontFamily: 'GenRyuMin' }}>
        我的收藏摘要
      </h2>

      <ul className="space-y-2 divide-y-2 divide-dashed divide-stone-300">
        <li className="mx-4 grid h-16 grid-cols-8 gap-4">
          <p className="col-span-3">中藥總數量</p>
          <span className="text-oliver col-span-5 font-semibold">{UniqueAll.length}</span>
        </li>
        <li className="mx-4 grid h-16 grid-cols-8">
          <p className="col-span-3">最熱門的中藥收藏</p>
          <span className="text-oliver col-span-5 font-semibold">
            {mostPopularHerbs.map((herb) => herb.herbId.name_zh).join('、')}
          </span>
        </li>
        <li className="mx-4 grid h-16 grid-cols-8">
          <p className="col-span-3">收藏量最多的資料夾</p>
          <span className="text-oliver col-span-5 font-semibold">
            {maxFolders.map((name) => name).join('、')}
          </span>
        </li>
      </ul>
    </div>
  );
}

CollectionSummary.propTypes = {
  allHerbs: PropTypes.array.isRequired,
  folders: PropTypes.array.isRequired,
};

export default CollectionSummary;
