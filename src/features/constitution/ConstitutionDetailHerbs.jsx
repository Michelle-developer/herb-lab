function ConstitutionDetailHerbs({ constitution }) {
  return (
    <ul className="grid grid-cols-3 gap-3 p-0">
      {constitution.suggested_herbs.map((herb, index) => (
        <li
          key={index}
          className="border-land bg-jade list-none rounded-sm border p-1 text-center shadow-sm"
        >
          <h5 className="text-oliver">{herb}</h5>
        </li>
      ))}
    </ul>
  );
}

export default ConstitutionDetailHerbs;
