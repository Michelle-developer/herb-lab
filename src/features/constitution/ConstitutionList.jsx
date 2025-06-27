import { LeafIconBold } from "../../components/LeafIconBold";
import { useConstitutionContext } from "../../contexts/ConstitutionContext";
import ConstitutionListSymptoms from "./ConstitutionListSymptoms";

function ConstitutionList() {
  const { constitutions } = useConstitutionContext();
  return (
    <div>
      {/* 症狀標籤  */}
      <header className="relative h-full w-full bg-[url(/images/img_cafe_mobile.png)] bg-[length:100%_auto] bg-center bg-no-repeat sm:bg-[url(/images/img_cafe_tablet.png)] sm:bg-cover md:bg-[url(/images/img_cafe_desktop.png)] md:bg-left">
        {/* 外層控制背景顯示範圍 */}
        <div className="sm-h-[50vh] md:h-[115vh]">
          <div className="container-broad">
            <ConstitutionListSymptoms constitutions={constitutions} />
          </div>
        </div>
      </header>

      <div className="sm:relative">
        {/* 體質介紹 */}
        <div className="prose prose-sm md:prose-base lg:prose-lg relative z-10 mx-auto mb-6 flex items-center justify-center gap-8 px-4 py-6">
          <div>
            <h3 className="leading-tight">
              <span className="inline-flex items-center space-x-2">
                <LeafIconBold className="text-oliver inline h-auto w-[2.5rem]" />
                <span>中醫體質是什麼？</span>
              </span>
            </h3>

            <p>
              中醫說的「體質」，指的是每個人生來就不同的身體特性。這些差異有些是天生的，有些是後天生活習慣、飲食、情緒慢慢養成的。這種特性不會輕易改變，具有一定的穩定性。也就是說，即使你現在很健康，身體還是保有特定的傾向。
            </p>

            <img
              src="/images/constitutions/img_women_article.jpg"
              alt="women in a greenhouse"
              className="mb-2rounded-lg float-none h-auto max-h-[40vh] w-auto rounded-sm shadow-sm md:float-end md:ml-4"
            />
            <p>
              每個人體質不同，對外界刺激的反應也不一樣。就像有些人一吹冷氣就拉肚子，有些人反而喜歡邊吹冷氣邊吃冰淇淋。有些人吃麻辣鍋完全沒事，有些人沾一點辣就得拼命喝水。有些人一換環境就感冒，而有些人卻很快適應，還能把外套借給別人穿。
            </p>
            <p>
              體質也會因時間或生活變化而有所變化。舉例來說，上班族長期熬夜、壓力大，可能會慢慢變成陽虛體質。女性生產後，則可能會出現陰虛，甚至陰陽兩虛的情況。
            </p>
            <p>
              體質會影響你比較容易出現哪些病症、容易被什麼影響、身心表現偏向哪個方向。簡單來說，就是每個人「比較容易怎樣，不太容易怎樣」的身體個性。多認識自己的體質，就能吃對食物，用對方法保養，讓身體回到陰陽平衡、氣血順暢的狀態！
            </p>
          </div>
          {/* <div className="w-1/3"></div> */}
        </div>
      </div>
    </div>
  );
}

export default ConstitutionList;
