import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams
} from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

function DestinationDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [destination, setDestination] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [deleting, setDeleting] =
    useState(false);

  useEffect(() => {

    const fetchDestination = async () => {

      try {

        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/destinations/${id}`
        );

        if (!response.ok) {
          throw new Error(
            "Destination not found."
          );
        }

        const data = await response.json();

        setDestination(
          data.destination || data
        );

      } catch (err) {

        setError(
          err.message ||
          "Unable to load destination."
        );

      } finally {

        setLoading(false);

      }
    };

    fetchDestination();

  }, [id]);

  const handleDelete = async () => {

    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${destination.name}"?`
      );

    if (!confirmed) return;

    try {

      setDeleting(true);

      const response = await fetch(
        `${API_URL}/destinations/${id}`,
        {
          method: "DELETE"
        }
      );

      if (!response.ok) {
        throw new Error(
          "Could not delete destination."
        );
      }

      navigate("/destinations");

    } catch (err) {

      setError(
        err.message ||
        "Delete failed."
      );

      setDeleting(false);

    }
  };

  if (loading) {
    return (
      <div className="section">
        <div className="status-box">
          Loading destination...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <section className="section">

        <div className="status-box error">
          {error}
        </div>

        <Link
          to="/destinations"
          className="primary-button"
        >
          Back to Destinations
        </Link>

      </section>
    );
  }

  return (
    <section className="section">

      <Link
        to="/destinations"
        className="back-link"
      >
        ← Back to destinations
      </Link>

      <div className="details-card">

        <img
          className="details-image"
          src={
            destination.image ||
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80"
          }
          alt={destination.name}
        />

        <div className="details-content">

          <span className="category-badge">
            {destination.category}
          </span>

          <h1>{destination.name}</h1>

          <p className="details-location">
            📍 {destination.location}
          </p>

          <p className="details-description">
            {destination.description}
          </p>

          <div className="info-grid">

            <div>
              <strong>Best Time</strong>
              <span>
                {destination.bestTime}
              </span>
            </div>

            <div>
              <strong>Estimated Budget</strong>

              <span>
                PKR{" "}
                {Number(
                  destination.budget || 0
                ).toLocaleString()}
              </span>
            </div>

          </div>

          <button
            className="danger-button"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting
              ? "Deleting..."
              : "Delete Destination"}
          </button>

        </div>

      </div>

    </section>
  );
}

export default DestinationDetails;