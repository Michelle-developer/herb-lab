import { useHerbContext } from "../../contexts/HerbContext";
import { useParams } from "react-router-dom";

function HerbDetail() {
  const { herbs } = useHerbContext();
  const params = useParams();
  const herb = herbs.find((herb) => herb.slug === params.slug);

  return (
    <>
      <main>
        <div className="mx-4 my-6 justify-items-center">
          <img src={`../../src/${herb.img}`} className="w-auto" />
        </div>
        <div className="m-4">
          <h1 className="mb-2 bg-[#EEF2E6] p-2 text-xl font-semibold">
            {herb.name_zh}
          </h1>
          <ul className="grid grid-cols-2 text-sm text-stone-500">
            <li>性味：{herb.nature_tag}</li>
            <li>歸經：{herb.meridians}</li>
            <li>功效分類：{herb.function_group}</li>
            <li>植物學分類：{herb.origin_class}</li>
          </ul>
        </div>
        <div className="m-4 divide-y divide-stone-200 border-b">
          <section>
            <span className="font-semibold text-green-800">🌿 品種來源：</span>
            {herb.source}
          </section>
          <section>
            <span className="font-semibold text-[#1C6758]">🌿 藥用部位：</span>
            {herb.part_used}
          </section>
          <section>
            <span className="font-semibold text-[#1C6758]">🌿 功效：</span>
            {herb.functions}
          </section>
          <section>
            <span className="font-semibold text-[#1C6758]">🌿 主治：</span>
            {herb.indications}
          </section>
          <section>
            <span className="font-semibold text-[#1C6758]">⚠️ 注意事項：</span>
            {herb.caution}
          </section>
        </div>
      </main>
      <div className="m-4 flex justify-center">
        <button className="w-full cursor-pointer rounded-full bg-[#1C6758] p-2 text-stone-200">
          儲存
        </button>
      </div>
    </>
  );
}

export default HerbDetail;
