function TechHighlights({ data }) {
  return (
    <div className="prose mx-auto flex w-full max-w-[800px] justify-between p-4">
      <div className="flex flex-col justify-center">
        <h1 className="text-oliver mb-2 text-2xl font-semibold">
          {data.title}
        </h1>
        <h3 className="text-lg">{data.description}</h3>
        {data.points.map((point, index) => (
          <ul key={index}>
            <li className="text-base text-stone-700">{point}</li>
          </ul>
        ))}
      </div>
      <div className="flex w-1/3 place-items-center">
        <img
          src="/images/Patterns.png"
          alt="description illustration"
          className="w-full max-w-[220px] rounded-md shadow-md"
        />
        {/* TODO:替換圖片為動態網址 */}
      </div>
    </div>
  );
}

export default TechHighlights;
