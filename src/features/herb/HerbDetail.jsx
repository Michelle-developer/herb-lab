import { useHerbContext } from "../../contexts/HerbContext";
import { useParams } from "react-router-dom";
import HerbDetailTag from "./HerbDetailTag";
import HerbDetailContent from "./HerbDetailContent";

function HerbDetail() {
  const { herbs } = useHerbContext();
  const params = useParams();
  const herb = herbs.find((herb) => herb.slug === params.slug);

  return (
    <div className="container-narrow py-6">
      <div className="text-sm md:mb-4 md:grid md:grid-cols-8 md:gap-x-2 md:text-base lg:text-lg">
        <div className="justify-items-center md:col-span-4 md:row-span-4">
          <img src={`../../src/${herb.img}`} className="w-full rounded-xl" />
        </div>
        <div className="bg-jade my-4 flex items-center gap-6 rounded-xl p-2 md:col-start-5 md:col-end-9 md:row-span-2 md:my-2 md:py-4">
          <h1 className="basis-auto text-xl font-semibold md:pl-8 md:text-2xl lg:text-3xl">
            {herb.name_zh}
          </h1>
          <p className="flex-3 text-sm font-light break-words md:pr-8 md:text-base lg:text-lg">
            英文｜{herb.name_en}
            <br />
            拉丁文｜{herb.name_lat}
          </p>
        </div>
        <HerbDetailTag herb={herb} />
      </div>

      <HerbDetailContent herb={herb} />

      <div className="flex justify-center md:justify-end">
        <button className="bg-oliver w-full cursor-pointer rounded-full p-2 text-stone-200 md:h-14 md:w-60">
          儲存
        </button>
      </div>
    </div>
  );
}

export default HerbDetail;
