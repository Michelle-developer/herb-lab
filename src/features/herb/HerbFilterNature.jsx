import { useHerbContext } from "../../contexts/HerbContext";

function HerbFilterNature({ category, setCategory }) {
  const { herbs, queryDispatch } = useHerbContext();

  function handleFilter(e) {
    const selectedCategory = e;
    setCategory(selectedCategory);

    queryDispatch({
      type: "categorizeHerbs",
      payload: { category: selectedCategory, herbs: herbs },
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
              type="radio"
              id={item.id}
              name="herb-nature"
              value={item.value}
              checked={item.value === category}
              onChange={(e) => handleFilter(e.target.value)}
            />
            <label htmlFor={item.id}>{item.label}</label>
          </div>
        ))}
      </div>
    </>
  );
}

export default HerbFilterNature;
