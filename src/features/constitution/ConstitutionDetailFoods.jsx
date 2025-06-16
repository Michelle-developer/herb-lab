function ConstitutionDetailFoods({ constitution }) {
  const {
    grains_beans_nuts,
    fruits,
    vegetables,
    meat_seafood,
    seasonings_processed,
  } = constitution.suggested_foods;

  const content = [
    { label: "穀類、豆類、堅果類", value: grains_beans_nuts },
    { label: "蔬菜類", value: vegetables },
    { label: "水果類", value: fruits },
    { label: "肉類、海鮮類", value: meat_seafood },
    { label: "調味、加工品", value: seasonings_processed },
  ];

  return (
    <div className="flex flex-wrap space-y-2">
      {content.map((data, index) => (
        <div key={index} className="border-land w-full border-b">
          <div className="flex-1 bg-stone-50 font-semibold">{data.label}</div>
          <div className="grid grid-cols-3 text-xs/5">
            {data.value.map((food, index) => (
              <div key={index} className="px-0.5">
                {food}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ConstitutionDetailFoods;
