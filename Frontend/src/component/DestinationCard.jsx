import { Link } from "react-router-dom";

function DestinationCard({ destination }) {
  return (
    <article className="destination-card">

      <img
        src={
          destination.image ||
          "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80"
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