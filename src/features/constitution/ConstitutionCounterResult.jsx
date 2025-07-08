import { useConstitutionContext } from '../../contexts/useConstitutionContext';

function ConstitutionCounterResult() {
  const { symptomState } = useConstitutionContext();
  const yangDeficiencyTimes = symptomState.totalConstitutionCount.yangDeficiency;
  const yingDeficiencyTimes = symptomState.totalConstitutionCount.yingDeficiency;
  const dampHeatTimes = symptomState.totalConstitutionCount.dampHeat;

  const constitutionScores = symptomState.totalConstitutionCount;
  const highestScore = Math.max(...Object.values(constitutionScores));
  const topConstitutions = Object.entries(constitutionScores)
    .filter(([, score]) => score === highestScore)
    .map(([key]) => key);
  const totalScore = Object.values(constitutionScores).reduce((sum, value) => sum + value, 0);
  const shouldShowAdvice = totalScore >= 5 && highestScore > 0;

  const keyMap = {
    yangDeficiency: '陽虛',
    yingDeficiency: '陰虛',
    dampHeat: '濕熱',
  };

  return (
    <>
      <h5 className="font-semibold">目前體質趨勢：</h5>
      <ul>
        <li>
          陽虛： <span className="font-bold text-gray-950">{yangDeficiencyTimes}</span> 次命中
        </li>
        <li>
          陰虛： <span className="font-bold text-gray-950">{yingDeficiencyTimes}</span> 次命中
        </li>
        <li>
          濕熱： <span className="font-bold text-gray-950">{dampHeatTimes}</span> 次命中
        </li>
      </ul>
      <div className="mb-6">
        {!shouldShowAdvice && (
          <p>勾選 5 個症狀以上，這邊就會顯示統計結果哦！現在先來看看計分方式吧 👇</p>
        )}

        {shouldShowAdvice && topConstitutions.length === 1 && (
          <p>
            🥇 你勾選的症狀中：{' '}
            <span className="font-bold text-cyan-500">
              {topConstitutions.map((topCon) => keyMap[topCon])}
              體質
            </span>{' '}
            出現最多，共 <span className="font-bold text-cyan-500">{highestScore}</span>{' '}
            次。建議多關注該體質的相關特徵與調養方法。
          </p>
        )}
        {shouldShowAdvice && topConstitutions.length > 1 && (
          <p>
            💡 你勾選的症狀中：{' '}
            <span className="font-bold text-cyan-500">
              {topConstitutions.map((topCon) => keyMap[topCon]).join('、')}
              體質
            </span>{' '}
            出現次數相同。平分的情況很常見，表示你可能同時具備幾種體質傾向。可以多瞭解相符的體質，看看哪些跟你最像。
          </p>
        )}
      </div>
    </>
  );
}

export default ConstitutionCounterResult;
