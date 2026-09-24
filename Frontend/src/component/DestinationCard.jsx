import { Link } from "react-router-dom";
import { getDestinationImage } from "../destinationImages";

function DestinationCard({ destination }) {
  return (
    <article className="destination-card">

      <img
        src={
          getDestinationImage(destination)
        }
        alt={destination.name}
      />

      <div className="card-content">

        <span className="category-badge">
          {destination.category}
        </span>

        <h3>{destination.name}</h3>

        <p className="location">
          📍 {destination.location}
        </p>

        <p className="card-description">
          {(destination.description || "").slice(0, 110)}

          {destination.description?.length > 110
            ? "..."
            : ""}
        </p>

        <Link
          to={`/destinations/${destination._id}`}
          className="card-button"
        >
          View Details →
        </Link>

      </div>

    </article>
  );
}

export default DestinationCard;