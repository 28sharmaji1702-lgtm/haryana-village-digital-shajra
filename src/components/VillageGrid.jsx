import { useState } from "react";

import VillageCard from "./VillageCard";

import "../styles/VillageGrid.css";

function VillageGrid({
  title,
  villages,
}) {

  const PAGE_SIZE = 12;

  const [visible, setVisible] =
    useState(PAGE_SIZE);

  if (!villages.length) {

    return (

      <section
        id="village-grid"
        className="village-section"
      >

        <div className="section-heading">

          <h2>

            No Villages Found

          </h2>

          <p>

            Select a District or Tehsil.

          </p>

        </div>

      </section>

    );

  }

  const displayedVillages =
    villages.slice(0, visible);

  const hasMore =
    visible < villages.length;

  function loadMore() {

    setVisible((prev) =>
      prev + PAGE_SIZE
    );

  }

  return (

    <section
      id="village-grid"
      className="village-section"
    >

      <div className="section-heading">

        <h2>

          {title}

        </h2>

        <p>

          {villages.length}
          {" "}
          Villages

        </p>

      </div>

      <div className="village-grid">

        {displayedVillages.map(
          (village) => (

            <VillageCard

              key={village.code}

              village={village}

            />

          )
        )}

      </div>

      {hasMore && (

        <div className="more-wrapper">

          <button

            className="more-btn"

            onClick={loadMore}

          >

            More Villages ▼

          </button>

        </div>

      )}

    </section>

  );

}

export default VillageGrid;