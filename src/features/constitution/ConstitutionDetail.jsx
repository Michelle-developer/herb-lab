import { NavLink, useParams } from 'react-router-dom';
import { useConstitutionContext } from '../../contexts/ConstitutionContext';
import { useToastContext } from '../../contexts/ToastContext';
import { ConstitutionDetailAccordion } from './ConstitutionDetailAccordion';
import ConstitutionDetailFlex from './ConstitutionDetailFlex';
import ConstitutionDetailHeader from './ConstitutionDetailHeader';
import PageNotFound from '../../pages/PageNotFound';

function ConstitutionDetail() {
  const { constitutions } = useConstitutionContext();
  const { showToast } = useToastContext();
  const params = useParams();
  const constitution = constitutions.find((constitution) => constitution.slug === params.slug);
  if (!constitution) return <PageNotFound />;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast('網址已複製！', 'success');
    } catch (err) {
      console.error(err.message);
      showToast('複製失敗，請稍後再試。', 'error');
    }
  }
  return (
    <div>
      <section className="prose prose-sm md:prose-base lg:prose-lg mx-auto">
        {/* 特定體質頁的標題 + 代表人物圖 */}
        <header className="border-land mb-6 grid grid-cols-5 place-items-center gap-2 border-b">
          <ConstitutionDetailHeader constitution={constitution} />
        </header>

        <article className="flex flex-col items-center">
          {/* 文章區（風琴模組） */}
          <ConstitutionDetailAccordion constitution={constitution} />

          {/* 文章區（雙欄模組） */}
          <div className="bg-jade my-2 rounded-sm">
            <ConstitutionDetailFlex constitution={constitution} />
          </div>
        </article>
      </section>

      <div className="mx-auto my-8 flex max-w-prose justify-between gap-4 sm:justify-center sm:gap-8">
        <NavLink
          to="/constitutions"
          className="text-grass border-grass hover:bg-jade hover:text-oliver underline-none h-12 w-1/2 cursor-pointer rounded-full border-2 bg-white py-2.5 text-center sm:py-3.5 md:h-14 md:w-60"
        >
          回體質互動
        </NavLink>

        <button
          onClick={handleCopy}
          className="bg-grass hover:bg-oliver h-12 w-1/2 cursor-pointer rounded-full text-stone-200 md:h-14 md:w-60"
        >
          與好友分享
        </button>
      </div>
    </div>
  );
}

export default ConstitutionDetail;
