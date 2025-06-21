import { useConstitutionContext } from "../../contexts/ConstitutionContext";
import ConstitutionListSymptoms from "./ConstitutionListSymptoms";

function ConstitutionList() {
  const { constitutions } = useConstitutionContext();
  return (
    <div className="pt-[88px]">
      <header className="hidden sm:relative">
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
            <img src="/images/Patterns.png" className="w-full" />
          </div>
        </div>
      </header>

      {/* 症狀標籤 */}
      <div className="container-broad">
        <ConstitutionListSymptoms constitutions={constitutions} />
      </div>
    </div>
  );
}

export default ConstitutionList;
