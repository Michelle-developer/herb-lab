import { useHerbContext } from '../../contexts/HerbContext';

function HerbFilterNature() {
  const { herbs, queryState, queryDispatch } = useHerbContext();

  // 藥性標籤chekbox多選功能
  function handleFilter([value, checked]) {
    const selectedValue = value;
    const isChecked = checked;

    const prevSelected = queryState.filter.nature;
    // Toggle：若為點選項目則加進去，非點選項目則移除（多選功能）
    const newSelected = isChecked
      ? [...prevSelected, selectedValue]
      : prevSelected.filter((v) => v !== selectedValue);

    queryDispatch({
      type: 'updateFilter',
      payload: { key: 'nature', value: newSelected, herbs: herbs },
    });
  }

  return (
    <div>
      <legend className="mb-2 border-b-2 border-stone-200 text-stone-800">
        依照<span className="text-oliver">藥性</span>
        篩選：
      </legend>
      <div className="divide mb-2 divide-y-1 divide-stone-200">
        {[
          { id: 'herb-nature-cold', value: 'cold', label: '寒性' },
          { id: 'herb-nature-hot', value: 'hot', label: '熱性' },
          { id: 'herb-nature-warm', value: 'warm', label: '溫性' },
          { id: 'herb-nature-cool', value: 'cool', label: '涼性' },
          { id: 'herb-nature-neutral', value: 'neutral', label: '平性' },
        ].map((item) => (
          <div key={item.id}>
            <input
              type="checkbox"
              id={item.id}
              name="herb-nature"
              value={item.value}
              checked={queryState.filter.nature.includes(`${item.value}`)}
              onChange={(e) => handleFilter([e.target.value, e.target.checked])}
              className="my-3"
            />
            <label htmlFor={item.id} className="p-2">
              {item.label}
            </label>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="bg-grass border-grass hover:bg-oliver w-full cursor-pointer rounded-full border-solid p-2 text-stone-100"
        onClick={() => queryDispatch({ type: 'clearFilter' })}
      >
        清除分類條件
      </button>
    </div>
  );
}

export default HerbFilterNature;
