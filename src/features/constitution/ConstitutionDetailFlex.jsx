import ConstitutionDetailFoods from "./ConstitutionDetailFoods";
import ConstitutionDetailHerbs from "./ConstitutionDetailHerbs";
import ConstitutionDetailRecipe from "./ConstitutionDetailRecipe";

function ConstitutionDetailFlex({ constitution }) {
  const content = [
    { label: "調養重點", value: constitution.recuperate_points },

    {
      label: "推薦藥膳",
      value: <ConstitutionDetailRecipe constitution={constitution} />,
    },
    {
      label: "推薦中藥",
      value: <ConstitutionDetailHerbs constitution={constitution} />,
    },
    {
      label: "推薦食物",
      value: <ConstitutionDetailFoods constitution={constitution} />,
    },
  ];
  return (
    <div>
      {content.map((data, index) => (
        <ul
          className="bg-opacity-50 m-2 flex list-none items-center gap-2 bg-stone-50 p-0"
          key={index}
        >
          <li className="bg-grass mx-2 inline-block w-1/11 min-w-[3.5em] justify-self-end rounded-xs p-1 text-center text-sm leading-tight break-words text-stone-100 md:p-2 md:text-base lg:text-lg">
            {data.label}
          </li>
          <li className="border-grass flex-1 border-l px-2 text-gray-500">
            {data.value}
          </li>
        </ul>
      ))}
    </div>
  );
}

export default ConstitutionDetailFlex;
