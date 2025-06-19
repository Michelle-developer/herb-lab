import { Link } from "react-router-dom";
import { useConstitutionContext } from "../../contexts/ConstitutionContext";

function ConstitutionListSymptoms({ constitutions }) {
  const { symptoms, symptomState, symptomDispatch } = useConstitutionContext();
  return (
    <div className="mx-4 my-6 grid grid-cols-[1fr_1fr_1.5fr_1.5fr_1fr_1fr] place-items-center gap-2">
      {/* 症狀標籤區 */}
      <div className="col-span-2 row-span-2">請點選她的身體部位</div>
      <div className="col-start-1 col-end-3 row-span-6 rounded-lg bg-stone-200">
        <p>{symptoms[0].group}</p>
      </div>

      {/* 人物區 */}
      <div className="col-start-3 col-end-5 row-span-10 aspect-[1/2] w-[min(100%,360px)]">
        <img
          src="../src/assets/images/show_girl_5.png"
          className="h-full w-full object-cover"
        />
      </div>

      {/* 三大體質卡片 */}
      <div className="col-start-5 col-end-7 row-span-10">
        <ul className="flex flex-col gap-2 sm:grid sm:grid-cols-2 sm:gap-4">
          {constitutions.map((constitution) => (
            <li
              className="items-center justify-center rounded-lg border border-stone-200 bg-stone-50 px-1 py-2"
              key={constitution.id}
            >
              <Link to={`/constitutions/${constitution.slug}`}>
                <h5 className="mb-2 text-center text-sm font-semibold md:text-base lg:text-lg">
                  {constitution.name}
                </h5>

                <img
                  src={`../../src/${constitution.img}`}
                  alt={constitution.name}
                  className="aspect-square w-15 rounded-full border-4 border-gray-500 object-cover"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ConstitutionListSymptoms;
