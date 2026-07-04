import { useEffect } from "react";

import "../styles/FilterSection.css";

function FilterSection({
  districts,
  tehsils,
  villages,
  selectedDistrict,
  selectedTehsil,
  selectedVillage,
  onDistrictChange,
  onTehsilChange,
  onVillageChange,
}) {

  useEffect(() => {

    if (
      villages.length &&
      !selectedVillage
    ) {

      onVillageChange("");

    }

  }, [villages]);

  return (

    <section className="filter-card">

      <div className="filter-grid">

        <div className="filter-item">

          <label>

            District

          </label>

          <select

            value={selectedDistrict}

            onChange={(e)=>
              onDistrictChange(
                e.target.value
              )
            }

          >

            {districts.map((district)=>(

              <option
                key={district}
                value={district}
              >

                {district}

              </option>

            ))}

          </select>

        </div>

        <div className="filter-item">

          <label>

            Tehsil

          </label>

          <select

            value={selectedTehsil}

            onChange={(e)=>
              onTehsilChange(
                e.target.value
              )
            }

          >

            {tehsils.map((tehsil)=>(

              <option
                key={tehsil}
                value={tehsil}
              >

                {tehsil}

              </option>

            ))}

          </select>

        </div>

        <div className="filter-item">

          <label>

            Village

          </label>

          <select

            value={selectedVillage}

            onChange={(e)=>
              onVillageChange(
                e.target.value
              )
            }

          >

            <option value="">

              Select Village

            </option>

            {villages.map((village)=>(

              <option
                key={village.code}
                value={village.code}
              >

                {village.village}

              </option>

            ))}

          </select>

        </div>

      </div>

    </section>

  );

}

export default FilterSection;