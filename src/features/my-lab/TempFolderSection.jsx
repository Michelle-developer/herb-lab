import PropTypes from 'prop-types';
import { Expand, Flag } from 'lucide-react';
import HerbCard from './HerbCard';

function TempFolderSection({ folders }) {
  const tempFolder = folders.find((folder) => folder.name === '暫存區');

  return (
    <div>
      <div className="sticky top-0 left-0 z-10 bg-white/90 p-4 backdrop-blur">
        <Flag className="absolute top-2 left-2 text-amber-300" />
        <h3 className="ml-12 text-lg font-semibold" style={{ fontFamily: 'GenRyuMin' }}>
          {tempFolder.name}{' '}
          <span className="text-base text-stone-500">({tempFolder.items.length})</span>
        </h3>
        {/* Modal瀏覽資料夾，延後實作 */}
        {/* <button className="absolute top-2 right-2 cursor-pointer">
          <Expand className="text-stone-400" />
        </button> */}
      </div>

      <div className="mt-4 px-4">
        <ul className="my-4 mb-2 grid grid-cols-2 justify-items-center gap-4 text-center md:grid-cols-3">
          {tempFolder.items.map((item) => (
            <HerbCard folderId={tempFolder._id} key={item._id} item={item} />
          ))}
        </ul>
      </div>
    </div>
  );
}

TempFolderSection.PropTypes = {
  folders: PropTypes.array.isRequired,
};

export default TempFolderSection;
