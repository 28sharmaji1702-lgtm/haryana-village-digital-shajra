import { Link } from "react-router-dom";

import "../styles/VillageCard.css";

function VillageCard({
  village,
}) {

  return (

    <Link
      to={`/village/${village.code}`}
      className="village-card"
    >

      <div className="village-left">

        <h3>
          {village.village}
        </h3>

      </div>

      <div className="village-right">
        →
      </div>

    </Link>

  );

}

export default VillageCard;