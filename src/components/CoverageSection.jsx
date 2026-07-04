import { useEffect, useState } from "react";

import {
  getCoverage,
} from "../services/googleSheet";

import "../styles/CoverageSection.css";

function CoverageSection() {

  const [coverage, setCoverage] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function load() {

      try {

        const data =
          await getCoverage();

        setCoverage(data);

      }

      catch (error) {

        console.error(
          "Coverage Load Error:",
          error
        );

      }

      finally {

        setLoading(false);

      }

    }

    load();

  }, []);

  if (loading) {

    return (

      <section className="coverage-section">

        <div className="coverage-container">

          <div className="coverage-header">

            <span className="coverage-badge">

              Haryana Progress

            </span>

            <h2>

              Haryana Digital Coverage

            </h2>

            <p>

              Loading coverage...

            </p>

          </div>

        </div>

      </section>

    );

  }

  if (!coverage) {

    return null;

  }

  const districtPercent =
    coverage.totalDistricts
      ? (
          coverage.districtsLive /
          coverage.totalDistricts
        ) * 100
      : 0;

  const tehsilPercent =
    coverage.totalTehsils
      ? (
          coverage.tehsilsLive /
          coverage.totalTehsils
        ) * 100
      : 0;

  const villagePercent =
    coverage.totalVillages
      ? (
          coverage.villagesLive /
          coverage.totalVillages
        ) * 100
      : 0;

  const overall =
    coverage.digitalCoverage;

  return (
    <section className="coverage-section">

  <div className="coverage-container">

    {/* ==========================================
        Header
    ========================================== */}

    <div className="coverage-header">

      <span className="coverage-badge">

        Haryana Progress

      </span>

      <h2>

        Haryana Digital Coverage

      </h2>

      <p>

        Live progress of districts,
        tehsils and villages available
        on Haryana Village Digital Shajra.

      </p>

    </div>

    {/* ==========================================
        Cards
    ========================================== */}

    <div className="coverage-grid">

      {/* Districts */}

      <div className="coverage-card">

        <div className="coverage-icon green">

          🏛️

        </div>

        <div className="coverage-content">

          <h4>

            Districts Live

          </h4>

          <h3>

            {coverage.districtsLive}

            <span>

              /

              {coverage.totalDistricts}

            </span>

          </h3>

          <div className="progress">

            <div

              className="progress-fill green-fill"

              style={{

                width:
                  `${districtPercent}%`

              }}

            />

          </div>

          <small>

            {districtPercent.toFixed(1)}%

            Coverage

          </small>

        </div>

      </div>

      {/* ================================= */}

      <div className="coverage-card">

        <div className="coverage-icon blue">

          🗺️

        </div>

        <div className="coverage-content">

          <h4>

            Tehsils Live

          </h4>

          <h3>

            {coverage.tehsilsLive}

            <span>

              /

              {coverage.totalTehsils}

            </span>

          </h3>

          <div className="progress">

            <div

              className="progress-fill blue-fill"

              style={{

                width:
                  `${tehsilPercent}%`

              }}

            />

          </div>

          <small>

            {tehsilPercent.toFixed(1)}%

            Coverage

          </small>

        </div>

      </div>

      {/* ================================= */}

      <div className="coverage-card">

        <div className="coverage-icon orange">

          🏘️

        </div>

        <div className="coverage-content">

          <h4>

            Villages Live

          </h4>

          <h3>

            {coverage.villagesLive}

            <span>

              /

              {coverage.totalVillages}

            </span>

          </h3>

          <div className="progress">

            <div

              className="progress-fill orange-fill"

              style={{

                width:
                  `${villagePercent}%`

              }}

            />

          </div>

          <small>

            {villagePercent.toFixed(1)}%

            Coverage

          </small>

        </div>

      </div>

      {/* ================================= */}

      <div className="coverage-card overall-card">

        <div className="coverage-icon purple">

          📈

        </div>

        <div className="coverage-content">

          <h4>

            Digital Coverage

          </h4>

          <h3>

            {overall.toFixed(1)}%

          </h3>

          <div className="progress">

            <div

              className="progress-fill purple-fill"

              style={{

                width:
                  `${overall}%`

              }}

            />

          </div>

          <small>

            Live Google Sheet Data

          </small>

        </div>

      </div>

    </div>

    {/* ==========================================
        Bottom
    ========================================== */}

    <div className="coverage-summary">

      <div className="summary-left">

        <h3>

          Project Status

        </h3>

        <p>

          Haryana Village Digital
          Shajra is continuously
          expanding. Coverage updates
          automatically whenever new
          villages are added to the
          database.

        </p>

      </div>

      <div className="summary-right">

        <button>

          Live Data

        </button>

      </div>

    </div>

  </div>

</section>

);

}

export default CoverageSection;