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

  const constitutionScores = symptomState.totalConstitutionCount;
  const highestScore = Math.max(...Object.values(constitutionScores));
  const topConstitutions = Object.entries(constitutionScores)
    .filter(([, score]) => score === highestScore)
    .map(([key]) => key);
  const totalScore = Object.values(constitutionScores).reduce(
    (sum, value) => sum + value,
    0,
  );
  const shouldShowAdvice = totalScore >= 5 && highestScore > 0;
  console.log("topConstitutions", topConstitutions); //TODO:

  // const sorted = Object.entries(constitutionScores).sort((a, b) => b[1] - a[1]);
  // const [topConstitution, topTimes] = sorted[0]; // ex: "yangDeficiency", 5

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
          className="ring-land flex h-12 w-12 cursor-pointer place-items-center rounded-full bg-gray-200/50 px-3 py-2 font-semibold hover:bg-gray-950/10 focus:ring-2 focus:outline-none sm:h-24 sm:w-24 sm:px-6 sm:py-2"
          onClick={onClick}
        >
          <UserRoundSearch className="text-grass h-6 w-6 sm:h-12 sm:w-12" />
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
          {!shouldShowAdvice && (
            <p>
              🎉
              歡迎！勾選5個症狀以上，這邊就會顯示結果哦！現在先來看看計分方式吧
              👇
            </p>
          )}

          {shouldShowAdvice && topConstitutions.length === 1 && (
            <p>
              🥇 你勾選的症狀中：{" "}
              <span className="font-bold text-cyan-500">
                {topConstitutions.map((topCon) => keyMap[topCon])}
                體質
              </span>{" "}
              出現最多，共{" "}
              <span className="font-bold text-cyan-500">
                {highestScore}
              </span>{" "}
              次。建議多關注該體質的相關特徵與調養方法。
            </p>
          )}
          {shouldShowAdvice && topConstitutions.length > 1 && (
            <p>
              💡 你勾選的症狀中：{" "}
              <span className="font-bold text-cyan-500">
                {topConstitutions.map((topCon) => keyMap[topCon]).join("、")}
                體質
              </span>{" "}
              出現次數相同。平分很常見，表示你可能同時具備幾種體質傾向。可以多瞭解相符的體質，看看哪些跟你最像。
            </p>
          )}
        </div>

        <h5 className="font-semibold">計分方式說明：</h5>
        <ul>
          <li>每次勾選的症狀，將統計命中體質的分數。</li>
          <li>
            按下「清空此部位按鈕」，只會將該部位的分數清除，其餘部位仍保留。
          </li>
          <li>按下「清潔刷按鈕」會將所有分數全部清空，回到初始狀態。</li>
        </ul>
      </div>
    </ReusableDrawer>
  );
}

export default ConstitutionCounterDrawer;
