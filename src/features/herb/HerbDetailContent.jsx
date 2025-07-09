import PropTypes from 'prop-types';

function HerbDetailContent({ herb }) {
  return (
    <div className="gap-x-10 gap-y-2 divide-y divide-stone-200 sm:divide-none md:grid md:grid-flow-row-dense md:grid-cols-8">
      <section className="mb-4 md:col-span-4">
        <p
          dangerouslySetInnerHTML={{
            __html: `<span class="text-grass font-semibold">品種來源：</span>
              ${herb.source}`,
          }}
        />
      </section>

      <section className="mb-4 md:col-start-5 md:col-end-9">
        <span className="text-grass font-semibold">功效：</span>
        {herb.functions}
      </section>

      <section className="mb-4 md:col-start-5 md:col-end-9">
        <span className="text-grass font-semibold">主治：</span>
        {herb.indications}
      </section>

      <section className="mb-8 md:col-start-1 md:col-end-5">
        <span className="text-grass font-semibold">注意事項：</span>
        {herb.caution}
      </section>
    </div>
  );
}

HerbDetailContent.propTypes = {
  herb: PropTypes.object.isRequired,
};

export default HerbDetailContent;
