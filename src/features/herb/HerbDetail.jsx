import { NavLink, useNavigate, useParams } from 'react-router-dom';
import axios from '../../utils/axiosInstance';
import HerbDetailTag from './HerbDetailTag';
import HerbDetailContent from './HerbDetailContent';
import PageNotFound from '../../pages/PageNotFound';
import { useEffect, useState } from 'react';
import { useFolderContext } from '../../contexts/FolderContext';

function HerbDetail() {
  const params = useParams();
  const navigate = useNavigate();

  const [herb, setHerb] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { saveState, saveDispatch } = useFolderContext();

  const folders = saveState.folders;

  // TODO: 測試用
  useEffect(() => {
    console.log('🔑 folders', saveState.folders);
  }, [saveState.folders]);

  useEffect(() => {
    async function fetchHerb() {
      try {
        const res = await axios.get(`/herbs/${params.id}`);
        setHerb(res.data.data.herb);
      } catch (err) {
        console.error('抓取此中藥資料失敗 🥲:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchHerb();
  }, [params.id]);

  if (isLoading) return <div className="py-8 text-center">加載資料中...</div>; //TODO: 改成加載動畫
  if (!herb) return <PageNotFound />;

  const handleSave = async () => {
    const tempFolder = folders.find((folder) => folder.name === '暫存區');
    if (!tempFolder) return;

    const isAlreadyInFolder = tempFolder.items.some((item) => item.herbId === params.id);
    if (isAlreadyInFolder) {
      alert('此中藥已收藏過囉！');
      return;
    }

    try {
      const res = await axios.post(
        `/my-lab/folders/add-item`,
        {
          id: params.id, // 當前URL抓到的中藥id
        },
        { withCredentials: true }
      );

      const updatedFolder = res.data.data;

      saveDispatch({
        type: 'updateFolder',
        payload: updatedFolder,
      });

      const addedItem = updatedFolder.items.find(
        (item) => item.herbId && item.herbId._id === params.id
      );

      if (addedItem && addedItem.herbId.name_zh && addedItem.herbId.function_group) {
        navigate('/my-lab');
      } else {
        alert('資料同步失敗，請稍後再試');
      }
    } catch (err) {
      console.error('儲存失敗', err);
      alert('此中藥已收藏，或儲存失敗，請稍後再試。');
    }
  };

  return (
    <div className="container-narrow my-8">
      <div className="text-sm md:mb-4 md:grid md:grid-cols-8 md:gap-x-2 md:text-base lg:text-lg">
        <div className="justify-items-center md:col-span-4 md:row-span-4">
          <img
            src={`/images/herbs/img_${herb.slug}.jpg`}
            title={`${herb.name_zh}藥材`}
            alt={`${herb.name_zh}藥材`}
            className="w-full rounded-xl"
          />
        </div>
        <div className="bg-jade my-4 flex items-center gap-6 rounded-xl p-2 md:col-start-5 md:col-end-9 md:row-span-2 md:my-2 md:py-4">
          <h1 className="basis-auto text-xl font-semibold md:pl-8 md:text-2xl lg:text-3xl">
            {herb.name_zh}
          </h1>
          <p className="flex-3 text-sm font-light break-words md:pr-8 md:text-base lg:text-lg">
            英文｜{herb.name_en}
            <br />
            拉丁文｜{herb.name_lat}
          </p>
        </div>
        <HerbDetailTag herb={herb} />
      </div>

      <HerbDetailContent herb={herb} />

      <div className="my-4 flex w-full justify-between gap-4 sm:justify-center">
        <NavLink
          to="/herbs"
          className="text-grass border-grass hover:bg-jade hover:text-oliver h-12 w-1/2 cursor-pointer rounded-full border-2 bg-white py-2.5 text-center sm:py-3.5 md:h-14 md:w-60"
        >
          回中藥列表
        </NavLink>

        <button
          className="bg-oliver h-12 w-1/2 cursor-pointer rounded-full text-stone-200 md:h-14 md:w-60"
          onClick={handleSave}
        >
          儲存
        </button>
      </div>

      <ul className="my-4 flex flex-col items-end justify-center text-xs font-light text-stone-600">
        <li>
          圖片來源 |{' '}
          <a
            href="https://sys01.lib.hkbu.edu.hk/cmed/mmid/index.php?lang=cht"
            target="_blank"
            rel="noreferrer"
          >
            香港浸會大學中藥材圖像數據庫
          </a>
        </li>
        <li>
          資料來源 |{' '}
          <a href="https://herbaltcm.sn.polyu.edu.hk/tc/" target="_blank" rel="noreferrer">
            香港理工大學中藥資料庫
          </a>
        </li>
      </ul>
    </div>
  );
}

export default HerbDetail;
