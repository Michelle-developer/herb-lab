function FeatureCards() {
  return (
    <div>
      <ul className="my-12 flex list-none justify-around">
        <li>
          <img
            src="/images/homepage/img_constitution-list_card.svg"
            className="w-50"
          />
          體質列表
        </li>
        <li>
          <img
            src="/images/homepage/img_constitution-detail_card.svg"
            className="w-50"
          />
          體質細節
        </li>
        <li>
          <img src="/images/homepage/img_herb-list_card.svg" className="w-50" />
          中藥列表
        </li>
        <li>
          <img
            src="/images/homepage/img_herb-detail_card.svg"
            className="w-50"
          />
          中藥細節
        </li>
      </ul>
    </div>
  );
}

export default FeatureCards;
