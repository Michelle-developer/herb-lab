import PropTypes from 'prop-types';
import { FolderClosed, Save } from 'lucide-react';

function HerbList({ item }) {
  const formatDate = new Date(item.addedAt).toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <li className="bg-land/40 flex flex-col gap-2 rounded-2xl border border-stone-200 p-4 shadow-md sm:shadow-lg">
      <h4 className="text-sm font-semibold text-stone-700 md:text-base lg:text-lg">
        {item.herbId.name_zh}
      </h4>
      <div className="flex gap-0.5 text-left">
        <Save size={15} className="text-land" />
        <p className="text-xs text-stone-500 lg:text-sm">{formatDate}</p>
      </div>
      <div className="flex gap-0.5 text-left">
        <FolderClosed size={15} className="text-land" />
        <p className="text-xs text-stone-500 lg:text-sm">{item.folderName}</p>
      </div>
    </li>
  );
}

HerbList.propTypes = {
  item: PropTypes.object.isRequired,
};

export default HerbList;
