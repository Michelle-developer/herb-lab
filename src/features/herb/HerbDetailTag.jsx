import PropTypes from 'prop-types';

function HerbDetailTag({ herb }) {
  return (
    <ul className="col-start-5 col-end-9 mb-4 grid grid-cols-8 py-1 text-sm text-stone-500 md:col-start-5 md:row-span-2 md:items-center md:gap-x-4 md:gap-y-0 md:text-base lg:text-lg">
      <li className="col-span-4 md:col-span-5 md:rounded-full md:bg-stone-100 md:px-2 md:py-4">
        <span className="text-stone-700">藥用部位：</span>
        {herb.part_used}
      </li>
      <li className="col-span-4 md:col-span-3 md:rounded-full md:bg-stone-100 md:px-2 md:py-4">
        <span className="text-stone-700">物種：</span>
        {herb.origin_class}
      </li>
      <li className="col-span-4 md:col-span-4 md:rounded-full md:bg-stone-100 md:px-2 md:py-4">
        <span className="text-stone-700">性味：</span>
        {herb.nature_raw}，{herb.taste_raw.join('、')}
      </li>
      <li className="col-span-4 md:col-span-4 md:rounded-full md:bg-stone-100 md:px-2 md:py-4">
        <span className="text-stone-700">歸經：</span>
        {herb.meridians.join('、')}
      </li>
    </ul>
  );
}

HerbDetailTag.propTypes = {
  herb: PropTypes.object.isRequired,
};

export default HerbDetailTag;
