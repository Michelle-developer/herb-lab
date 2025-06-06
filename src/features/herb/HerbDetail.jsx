import { useHerbContext } from "../../contexts/HerbContext";
import { useParams } from "react-router-dom";

function HerbDetail() {
  const { herbs } = useHerbContext();
  const params = useParams();
  const herb = herbs.find((herb) => herb.slug === params.slug);

  return (
    <>
      <main>
        <div className="text-sm md:mb-4 md:grid md:grid-cols-8 md:gap-x-2 md:text-base lg:text-lg">
          <div className="justify-items-center md:col-span-4 md:row-span-4">
            <img src={`../../src/${herb.img}`} className="w-full rounded-xl" />
          </div>
          <div className="bg-jade my-4 flex items-center gap-4 rounded-xl p-2 md:col-start-5 md:col-end-9 md:row-span-2 md:my-2 md:py-4">
            <h1 className="flex-1 basis-1/3 text-xl font-semibold md:pl-8 md:text-2xl lg:text-3xl">
              {herb.name_zh}
            </h1>
            <p className="text-sm font-light md:pr-8 md:text-base lg:text-lg">
              英文｜{herb.name_en}
              <br />
              拉丁文｜{herb.name_lat}
            </p>
          </div>

          <ul className="col-start-5 col-end-9 grid grid-cols-2 py-1 text-sm text-stone-500 md:col-start-5 md:row-span-2 md:items-center md:gap-x-4 md:gap-y-0 md:text-base lg:text-lg">
            <li className="md:rounded-full md:bg-stone-100 md:px-2 md:py-4">
              <span className="text-stone-700">性味：</span>
              {herb.nature_tag}
            </li>
            <li className="md:rounded-full md:bg-stone-100 md:px-2 md:py-4">
              <span className="text-stone-700">歸經：</span>
              {herb.meridians}
            </li>
            <li className="md:rounded-full md:bg-stone-100 md:px-2 md:py-4">
              <span className="text-stone-700">用途：</span>
              {herb.function_group}
            </li>
            <li className="md:rounded-full md:bg-stone-100 md:px-2 md:py-4">
              <span className="text-stone-700">物種：</span>
              {herb.origin_class}
            </li>
          </ul>
        </div>

        <div className="gap-x-10 gap-y-2 divide-y divide-stone-200 md:grid md:grid-flow-row-dense md:grid-cols-8">
          <section className="md:col-span-4">
            <p
              dangerouslySetInnerHTML={{
                __html: `<span class="text-grass font-semibold">品種來源：</span>
              ${herb.source}`,
              }}
            />
          </section>

          <section className="md:col-start-1 md:col-end-5">
            <span className="text-grass font-semibold">藥用部位：</span>
            {herb.part_used}
          </section>

          <section className="md:col-start-5 md:col-end-9">
            <span className="text-grass font-semibold">功效：</span>
            {herb.functions}
          </section>

          <section className="md:col-start-5 md:col-end-9">
            <span className="text-grass font-semibold">主治：</span>
            {herb.indications}
          </section>

          <section className="mb-4 md:col-start-1 md:col-end-5">
            <span className="text-grass font-semibold">注意事項：</span>
            {herb.caution}
          </section>
        </div>
      </main>
      <div className="flex justify-center md:justify-end">
        <button className="bg-oliver w-full cursor-pointer rounded-full p-2 text-stone-200 md:h-14 md:w-60">
          儲存
        </button>
      </div>
    </>
  );
}

export default HerbDetail;
