"use client";

import ReusableDrawer from "../../components/ReusableDrawer";
import { useConstitutionContext } from "../../contexts/ConstitutionContext";
import { UserRoundSearch } from "lucide-react";

function ConstitutionCounterDrawer({ onClick }) {
  const { symptomState } = useConstitutionContext();
  const yangDeficiencyTimes =
    symptomState.totalConstitutionCount.yangDeficiency;
  const yingDeficiencyTimes =
    symptomState.totalConstitutionCount.yingDeficiency;
  const dampHeatTimes = symptomState.totalConstitutionCount.dampHeat;

  const totalCount = symptomState.totalConstitutionCount;

  const sorted = Object.entries(totalCount).sort((a, b) => b[1] - a[1]);
  const [topConstitution, topTimes] = sorted[0]; // ex: "yangDeficiency", 5
  const keyMap = {
    yangDeficiency: "陽虛",
    yingDeficiency: "陰虛",
    dampHeat: "濕熱",
  };

  return (
    <ReusableDrawer
      title="體質總分統計"
      trigger={
        <button
          className="ring-land h-12 w-12 cursor-pointer rounded-full bg-gray-950/5 px-3 py-2 text-lg font-semibold text-stone-600 hover:bg-gray-950/10 focus:ring-2 focus:outline-none"
          onClick={onClick}
        >
          <UserRoundSearch className="text-grass" />
        </button>
      }
      className="bg-[url(/images/img_drawer2.png)] bg-cover bg-center"
    >
      {/* 互動說明區 */}
      <div className="prose">
        <h5 className="font-semibold">目前體質趨勢：</h5>
        <ul>
          <li>
            陽虛：{" "}
            <span className="font-bold text-gray-950">
              {yangDeficiencyTimes}
            </span>{" "}
            次命中
          </li>
          <li>
            陰虛：{" "}
            <span className="font-bold text-gray-950">
              {yingDeficiencyTimes}
            </span>{" "}
            次命中
          </li>
          <li>
            濕熱：{" "}
            <span className="font-bold text-gray-950">{dampHeatTimes}</span>{" "}
            次命中
          </li>
        </ul>
        <div className="mb-6">
          <p>
            🥇 你勾選的症狀中：{" "}
            <span className="font-bold text-cyan-500">
              {keyMap[topConstitution]}體質
            </span>{" "}
            出現最多，共{" "}
            <span className="font-bold text-cyan-500">{topTimes}</span> 次。
          </p>
          <p>
            💡 建議關注{" "}
            <span className="font-bold text-cyan-500">
              {keyMap[topConstitution]}
              體質
            </span>{" "}
            的相關特徵與調養方法。
          </p>
        </div>

        <h5 className="font-semibold">計分方式說明：</h5>
        <ul>
          <li>每次點擊部位後勾選的症狀，將統計命中體質的分數。</li>
          <li>換部位會清空當下選項，但總分仍會保留。</li>
          <li>
            按下<span className="font-semibold text-gray-950">刷子按鈕</span>
            才會全部清除。
          </li>
        </ul>
      </div>
    </ReusableDrawer>
  );
}

export default ConstitutionCounterDrawer;
