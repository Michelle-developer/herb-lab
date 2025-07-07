function ConstitutionDetailHeader({ constitution }) {
  return (
    <>
      {/* 主標題：體質名稱 */}
      <div className="col-span-3 md:h-8">
        <h1 className="text-center text-xl font-semibold md:text-2xl lg:text-3xl">
          {constitution.name}
        </h1>

        <p className="text-center text-xs font-light text-stone-800 md:text-sm lg:text-base">
          <em>{constitution.slug} constitution</em>
        </p>
      </div>

      {/* 標籤：好發族群 */}
      <div className="col-start-1 col-end-4 md:mb-4 md:h-4">
        <p className="text-xs/5 text-stone-500 md:text-sm lg:text-base">
          <span className="font-semibold">好發族群：</span>
          {constitution.common_groups.map((person, index) => (
            <span className="rounded-sm bg-stone-100 px-2 font-light" key={index}>
              {person}
            </span>
          ))}
        </p>
      </div>

      <img
        src={`/images/constitutions/img_${constitution.slug}_avatar.png`}
        alt={constitution.name}
        className="border-land col-start-4 col-end-6 row-start-1 row-end-3 mt-0 mb-6 w-11/12 rounded-xl border border-b-6"
      />
    </>
  );
}

export default ConstitutionDetailHeader;
