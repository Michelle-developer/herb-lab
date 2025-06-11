import { useHerbContext } from "../../contexts/HerbContext";

function HerbFilterTaste() {
  const { herbs, queryState, queryDispatch } = useHerbContext();

  function handleFilter([value, checked]) {
    const selectedValue = value;
    const isChecked = checked;

    const prevSelected = queryState.filter.taste;
    // 若為點選項目則加進去，非點選項目則移除
    const newSelected = isChecked
      ? [...prevSelected, selectedValue]
      : prevSelected.filter((v) => v !== selectedValue);

    queryDispatch({
      type: "updateFilter",
      payload: { key: "taste", value: newSelected, herbs: herbs },
    });

    console.log("味:", selectedValue); //TODO:
  }

  return (
    <div className="flex flex-row">
      <legend className="mb-2 border-b-2 border-stone-200 text-stone-800">
        藥味分類
      </legend>
      <div className="divide mb-2 divide-y-1 divide-stone-200">
        {[
          { id: "herb-taste-sour", value: "sour", label: "酸" },
          { id: "herb-taste-bitter", value: "bitter", label: "苦" },
          { id: "herb-taste-sweet", value: "sweet", label: "甘" },
          { id: "herb-taste-pungent", value: "pungent", label: "辛" },
          { id: "herb-taste-salty", value: "salty", label: "鹹" },
        ].map((item) => (
          <div key={item.id}>
            <input
              type="checkbox"
              id={item.id}
              name="herb-taste"
              value={item.value}
              checked={queryState.filter.taste.includes(`${item.value}`)}
              onChange={(e) => handleFilter([e.target.value, e.target.checked])}
              className="my-3"
            />
            <label htmlFor={item.id} className="p-2">
              {item.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HerbFilterTaste;
