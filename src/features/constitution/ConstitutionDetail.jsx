import { useParams } from 'react-router-dom';
import { useConstitutionContext } from '../../contexts/ConstitutionContext';
import { ConstitutionDetailAccordion } from './ConstitutionDetailAccordion';
import ConstitutionDetailFlex from './ConstitutionDetailFlex';
import ConstitutionDetailHeader from './ConstitutionDetailHeader';
import PageNotFound from '../../pages/PageNotFound';

function ConstitutionDetail() {
  const { constitutions } = useConstitutionContext();
  const params = useParams();
  const constitution = constitutions.find((constitution) => constitution.slug === params.slug);
  if (!constitution) return <PageNotFound />;

  return (
    <section className="prose prose-sm md:prose-base lg:prose-lg mx-auto">
      {/* 標題與主圖 */}
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
  );
}

export default ConstitutionDetail;
