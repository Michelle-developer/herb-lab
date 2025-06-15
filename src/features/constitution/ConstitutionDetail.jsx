import { useParams } from "react-router-dom";
import { useConstitutionContext } from "../../contexts/ConstitutionContext";

function ConstitutionDetail() {
  const { constitutions } = useConstitutionContext();
  const params = useParams();
  const constitution = constitutions.find(
    (constitution) => constitution.slug === params.slug,
  );

  return (
    <section className="container-broad prose pt-[88px]">
      {/* 主圖與標題區 */}
      <header className="border-land flex items-center border-b">
        <h2 className="flex-auto text-center">{constitution.name}</h2>

        <img
          src={`../../src/${constitution.img}`}
          alt={constitution.name}
          className="border-land w-1/2 flex-1 rounded-xl border border-b-6"
        />
      </header>

      {/* 測試區 */}
      <table className="rounded-lg bg-stone-50">
        <tr>
          <td>好發族群：</td>
          <td>常見症狀：</td>
        </tr>
        <tr>
          <td className="px-4">{constitution.common_groups.join("，")}</td>
          <td className="px-4">{constitution.symptoms_tag.join("，")}</td>
        </tr>
      </table>

      <article>{constitution.character}</article>
    </section>
  );
}

export default ConstitutionDetail;
