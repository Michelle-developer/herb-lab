import { useConstitutionContext } from "../../contexts/ConstitutionContext";
import ConstitutionListSymptoms from "./ConstitutionListSymptoms";

function ConstitutionList() {
  const { constitutions } = useConstitutionContext();
  return (
    <div className="pt-[88px]">
      {/* 症狀標籤*/}
      <header className="min-h-[50vh] bg-gradient-to-b bg-[url(/images/img_cafe_mobile.png)] from-teal-600 from-10% via-teal-700 via-30% to-teal-950 to-90% bg-cover bg-left md:bg-[url(/images/img_cafe_desktop.png)] md:bg-center">
        <div className="container-broad">
          <ConstitutionListSymptoms constitutions={constitutions} />
        </div>
      </header>

      <div className="sm:relative">
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
      </div>
    </div>
  );
}

export default ConstitutionList;
