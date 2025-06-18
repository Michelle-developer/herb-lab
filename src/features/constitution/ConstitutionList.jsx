import { Link } from "react-router-dom";
import { useConstitutionContext } from "../../contexts/ConstitutionContext";
import ConstitutionListSymptoms from "./ConstitutionListSymptoms";

function ConstitutionList() {
  const { constitutions } = useConstitutionContext();
  return (
    <div className="pt-[88px]">
      <header className="relative">
        {/* 遮罩層 */}
        <div className="absolute inset-0 bg-gray-200/70"></div>

        {/* 體質介紹 */}
        <div className="prose prose-sm md:prose-base lg:prose-lg relative z-10 mx-auto mb-6 flex items-center justify-center gap-8 px-4 py-6">
          <div className="w-2/3">
            <h3>中醫體質是什麼？</h3>
            <p>
              體質是由先天遺傳和後天獲得所形成，在形態結構、功能活動方面固有的，相對穩定的個體特性，並表現為與心理性格的相關性。
            </p>
            <p>
              體質表現為在生理狀態下對外界刺激的反應和適應上的某些差異性，以及發病過中對某些致病因子的易感性，和病態發展過程中的傾向性。
            </p>
          </div>

          <div className="w-1/3">
            <img src="../src/assets/images/Patterns.png" className="w-full" />
          </div>
        </div>
      </header>

      {/* 症狀標籤 */}
      <div className="container-broad">
        <ConstitutionListSymptoms constitutions={constitutions} />

        {/* 三大體質卡片 */}
        <div className="bg-gray-600 p-10">
          <ul className="flex justify-around gap-10">
            {constitutions.map((constitution) => (
              <li
                className="flex basis-1/3 flex-col items-center justify-center rounded-lg border border-stone-200 bg-stone-50 p-6"
                key={constitution.id}
              >
                <Link to={`/constitutions/${constitution.slug}`}>
                  <h3 className="mb-4 text-center text-lg font-semibold md:text-xl lg:text-2xl">
                    {constitution.name}
                  </h3>

                  <img
                    src={`../../src/${constitution.img}`}
                    alt={constitution.name}
                    className="row-start-1 row-end-3 mb-6 aspect-square w-32 rounded-full border-4 border-gray-500 object-cover"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ConstitutionList;
