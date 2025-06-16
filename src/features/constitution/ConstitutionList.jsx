import { Link } from "react-router-dom";
import { useConstitutionContext } from "../../contexts/ConstitutionContext";

function ConstitutionList() {
  const { constitutions } = useConstitutionContext();
  return (
    <div className="container-broad pt-[88px]">
      {/* 體質介紹 */}
      <div className="mb-6">
        <h1 className="my-8 text-xl font-semibold md:pl-8 md:text-2xl lg:text-3xl">
          中醫體質是什麼？
        </h1>
        長期穩定的狀態
      </div>

      {/* 體質卡片 */}
      <div>
        <ul className="flex justify-around gap-4">
          {constitutions.map((constitution) => (
            <li
              className="bg-jade basis-1/3 rounded-lg p-6"
              key={constitution.id}
            >
              <Link to={`/constitutions/${constitution.slug}`}>
                <h4 className="mb-4 text-center text-sm font-semibold md:text-base lg:text-lg">
                  {constitution.name}
                </h4>
                <article>
                  好發族群：
                  <ul>
                    {constitution.common_groups.map((person, index) => (
                      <li className="list-inside list-disc" key={index}>
                        {person}
                      </li>
                    ))}
                  </ul>
                </article>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ConstitutionList;
