import { Sprout } from "lucide-react";

function TechHighlights({ data }) {
  return (
    <div className="mx-auto flex h-auto w-full max-w-[800px] px-8 py-4 sm:justify-between">
      <div className="flex flex-col justify-center">
        <h1 className="text-oliver my-4 text-center text-2xl font-semibold">
          {data.title}
        </h1>
        <h3 className="my-2 text-lg">{data.description}</h3>
        {data.points.map((point, index) => (
          <ul key={index}>
            <li className="mx-2 my-1 flex gap-1 text-base text-stone-700">
              <Sprout className="text-grass h-6 w-6 flex-shrink-0 items-start" />
              {point}
            </li>
          </ul>
        ))}
      </div>
      <div className="flex flex-col justify-center pl-4 sm:h-[500px] sm:w-full">
        <img
          src={`/images/homepage/img_${data.image}_tech.png`}
          alt="description illustration"
          className="mx-auto h-50 w-auto max-w-[200px] rounded-md object-contain shadow-md"
        />
      </div>
    </div>
  );
}

export default TechHighlights;
