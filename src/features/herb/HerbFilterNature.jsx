import { useHerbContext } from "../../contexts/HerbContext";

function HerbFilterNature() {
  const { herbs, queryState, queryDispatch } = useHerbContext();

  function handleFilter([value, checked]) {
    const selectedValue = value;
    const isChecked = checked;

    const prevSelected = queryState.filter.nature;
    // 若為點選項目則加進去，非點選項目則移除
    const newSelected = isChecked
      ? [...prevSelected, selectedValue]
      : prevSelected.filter((v) => v !== selectedValue);

    queryDispatch({
      type: "updateFilter",
      payload: { key: "nature", value: newSelected, herbs: herbs },
    });
  }

  return (
    <>
      <legend className="text-stone-600">-- 藥性分類 --</legend>
      <div className="mb-2">
        {[
          { id: "herb-nature-cold", value: "cold", label: "寒性" },
          { id: "herb-nature-hot", value: "hot", label: "熱性" },
          { id: "herb-nature-warm", value: "warm", label: "溫性" },
          { id: "herb-nature-cool", value: "cool", label: "涼性" },
          { id: "herb-nature-neutral", value: "neutral", label: "平性" },
        ].map((item) => (
          <div key={item.id}>
            <input
              type="checkbox"
              id={item.id}
              name="herb-nature"
              value={item.value}
              checked={queryState.filter.nature.includes(`${item.value}`)}
              onChange={(e) => handleFilter([e.target.value, e.target.checked])}
            />
            <label htmlFor={item.id}>{item.label}</label>
          </div>
        ))}
      </div>
    </>
  );
}

export default HerbFilterNature;
