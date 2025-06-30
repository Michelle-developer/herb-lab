import { Sprout } from "lucide-react";

function TechHighlights({ data }) {
  return (
    <div className="mx-auto flex w-full max-w-[800px] gap-2 px-8 py-4 md:items-center md:justify-center">
      <div className="flex flex-col justify-center">
        <h1 className="text-oliver my-4 text-center text-2xl font-semibold">
          {data.title}
        </h1>
        <h3 className="my-2 text-lg">{data.description}</h3>

        <ul className="my-2 sm:my-4">
          {data.points.map((point, index) => (
            <li
              key={index}
              className="mx-2 my-1 flex gap-1 text-base text-stone-700 sm:my-4"
            >
              <Sprout
                className="text-grass h-6 w-6 flex-shrink-0 items-start"
                strokeWidth={1}
              />
              {point}
            </li>
          ))}
        </ul>
      </div>

      <div className="md:bg-jade hidden md:flex md:h-full md:w-1/3 md:items-center md:justify-center">
        <img
          src={`/images/homepage/img_${data.image}_tech.png`}
          alt="description illustration"
          className="mx-auto h-50 w-auto max-w-[200px] rounded-md object-contain shadow-lg"
        />
      </div>
    </div>
  );
}

export default TechHighlights;
