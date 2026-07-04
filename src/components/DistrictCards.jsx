import "../styles/DistrictCards.css";

function DistrictCards({
  district,
  tehsils,
  selectedTehsil,
  onSelectTehsil,
  villageCounts = {},
}) {

  if (!district || tehsils.length === 0) {
    return null;
  }

  return (

    <section className="district-section">

      <div className="section-heading">

        <h2>

          Browse Districts ({district})

        </h2>

        <p>

          Select a tehsil to browse villages

        </p>

      </div>

      <div className="district-grid">

        {tehsils.map((tehsil) => (

          <button

            key={tehsil}

            type="button"

            className={`district-card ${
              selectedTehsil === tehsil
                ? "active"
                : ""
            }`}

            onClick={() =>
              onSelectTehsil(tehsil)
            }

          >

            <div className="district-content">

              <h3>

                {tehsil}

              </h3>

              <span>

                {(villageCounts[tehsil] ?? 0)}
                {" "}
                Villages

              </span>

            </div>

            <div className="district-arrow">

              →

            </div>

          </button>

        ))}

      </div>

    </section>

  );

}

export default DistrictCards;