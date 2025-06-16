function ConstitutionDetailHeader({ constitution }) {
  return (
    <>
      <div className="flex flex-col">
        <h1 className="flex-auto shrink-0 pt-8 text-center text-xl font-semibold md:text-2xl lg:text-3xl">
          {constitution.name}
        </h1>

        <em className="px-2 pb-8 text-center text-xs font-light text-stone-800 md:text-sm lg:text-base">
          {constitution.slug} constitution
        </em>

        <p className="mb-2 space-x-0.5 text-xs/5 text-stone-500 md:text-sm lg:text-base">
          <span className="font-semibold">好發族群：</span>
          {constitution.common_groups.map((person, index) => (
            <span
              className="rounded-sm bg-stone-100 px-2 font-light"
              key={index}
            >
              {person}
            </span>
          ))}
        </p>
      </div>

      <img
        src={`../../src/${constitution.img}`}
        alt={constitution.name}
        className="border-land mb-6 w-2/5 flex-1 rounded-xl border border-b-6"
      />
    </>
  );
}

export default ConstitutionDetailHeader;
