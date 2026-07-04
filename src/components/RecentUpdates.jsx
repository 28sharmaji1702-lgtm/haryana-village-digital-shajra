import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import {
  getRecentUpdates,
} from "../services/googleSheet";

import "../styles/RecentUpdates.css";

function RecentUpdates() {

  const [updates, setUpdates] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function load() {

      try {

        const data =
          await getRecentUpdates();

        setUpdates(data);

      }

      catch (error) {

        console.error(
          "Recent Updates Error:",
          error
        );

      }

      finally {

        setLoading(false);

      }

    }

    load();

  }, []);

  function formatTime(timestamp) {

  if (!timestamp) {

    return "Earlier";

  }

  const value = String(timestamp);

  const year = Number(value.substring(0,4));

  const month = Number(value.substring(4,6)) - 1;

  const day = Number(value.substring(6,8));

  const date = new Date(year, month, day);

  const today = new Date();

  today.setHours(0,0,0,0);

  date.setHours(0,0,0,0);

  const diffDays = Math.floor(

    (today - date) /

    (1000 * 60 * 60 * 24)

  );

  if (diffDays === 0) {

    return "Today";

  }

  if (diffDays === 1) {

    return "Yesterday";

  }

  if (diffDays > 1 && diffDays <= 30) {

    return `${diffDays} Days Ago`;

  }

  return date.toLocaleDateString(

    "en-IN",

    {

      day:"numeric",

      month:"short",

      year:"numeric",

    }

  );

}

   

  if (loading) {

    return (

      <section className="recent-section">

        <div className="recent-container">

          <div className="live-badge">

            🟢 LIVE

          </div>

          <h2>

            Recently Updated

          </h2>

          <p>

            Loading...

          </p>

        </div>

      </section>

    );

  }

  return (
    <section className="recent-section">

  <div className="recent-container">

    <div className="live-wrapper">

      <span className="live-badge">

        🟢 LIVE

      </span>

    </div>

    <div className="recent-header">

      <h2>

        Recently Updated

      </h2>

      <p>

        Latest villages added to the
        Haryana Village Digital Shajra
        database.

      </p>

    </div>

    <div className="recent-grid">

      {updates.length === 0 ? (

        <div className="recent-empty">

          No recent updates found.

        </div>

      ) : (

       updates.map((item) => (

          <Link

            key={item.code}

            to={`/village/${item.code}`}

            className="recent-card"

          >

            <div className="recent-left">

              <h3>

                📍 {item.village}

              </h3>

              <span>

                {item.district}

              </span>

              <small>

  {formatTime(item.updated)}

</small>
</div>
            <div className="recent-right">

              →

            </div>

          </Link>

        ))

      )}

    </div>

  </div>

</section>

);

}

export default RecentUpdates;