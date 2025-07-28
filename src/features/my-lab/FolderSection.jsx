import PropTypes from 'prop-types';
import { CircleCheckBig } from 'lucide-react';
import { Link } from 'react-router-dom';
import HerbCard from './HerbCard';

function FolderSection({ folders, openFolder }) {
  const sidebarFolders = folders.filter((folder) => folder.name !== '暫存區');
  const openFolderObj = sidebarFolders.find((folder) => folder._id === openFolder);

  return (
    <div className="bg-grass/30 border-grass/50 relative h-[500px] w-auto overflow-scroll rounded-xl border-1">
      <div className="sticky top-0 left-0 z-10 bg-white/90 p-4 backdrop-blur">
        <CircleCheckBig className="absolute top-2 left-2 text-lime-400" />

        <h3 className="ml-12 text-lg font-semibold" style={{ fontFamily: 'GenRyuMin' }}>
          {openFolderObj?.name}{' '}
          <span className="text-base text-stone-500">({openFolderObj?.items.length})</span>
        </h3>

        {/* Modal瀏覽資料夾，延後實作 */}
        {/* <button className="absolute top-2 right-2 cursor-pointer">
                <Expand className="text-stone-400" />
              </button> */}
      </div>

      <div className="mt-4 px-4">
        {openFolderObj?.items.length === 0 ? (
          <div className="mx-auto mt-4 flex w-full flex-col items-center gap-2">
            <img
              src="/images/img_add-herbs.png"
              className="w-[40%]"
              alt="叼著一根骨頭，開心往前跑的小黑狗"
              title="叼骨頭的小黑狗"
            />
            <p>這個資料夾還沒有中藥，快去收集一些吧！</p>

            {
              <Link to="/herbs">
                <div
                  role="button"
                  className="hover:bg-oliver bg-grass mt-4 mb-2 w-full cursor-pointer items-center rounded-full p-2 text-center text-sm text-stone-100"
                >
                  開始收集
                </div>
              </Link>
            }
          </div>
        ) : (
          <ul className="my-4 mb-2 grid grid-cols-2 justify-items-center gap-4 text-center md:grid-cols-3">
            {openFolderObj?.items?.map((item) => (
              <HerbCard folderId={openFolderObj?._id} item={item} key={item._id} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

FolderSection.propTypes = {
  folders: PropTypes.array.isRequired,
  openFolder: PropTypes.string.isRequired,
};

export default FolderSection;
