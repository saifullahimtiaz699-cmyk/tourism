import { useEffect, useMemo, useState } from "react";
import DestinationCard from "../component/DestinationCard";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

function Destinations() {

  const [destinations, setDestinations] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchDestinations = async () => {

      try {

        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/destinations`
        );

        if (!response.ok) {
          throw new Error(
            "Unable to load destinations."
          );
        }

        const data = await response.json();

        setDestinations(
          Array.isArray(data)
            ? data
            : data.destinations || []
        );

      } catch (err) {

        setError(
          err.message ||
          "Something went wrong."
        );

      } finally {

        setLoading(false);

      }
    };

    fetchDestinations();

  }, []);

  const categories = useMemo(() => {

    const values = destinations
      .map((item) => item.category)
      .filter(Boolean);

    return [
      "All",
      ...new Set(values)
    ];

  }, [destinations]);

  const filteredDestinations =
    useMemo(() => {

      return destinations.filter((item) => {

        const text =
          `${item.name} ${item.location} ${item.description}`
            .toLowerCase();

        const matchesSearch =
          text.includes(search.toLowerCase());

        const matchesCategory =
          category === "All" ||
          item.category === category;

        return (
          matchesSearch &&
          matchesCategory
        );
      });

    }, [
      destinations,
      search,
      category
    ]);

  return (
    <section className="section">

      <div className="page-heading">

        <div>

          <p className="eyebrow dark">
            EXPLORE PAKISTAN
          </p>

          <h1>Destinations</h1>

          <p>
            Find your next place to visit.
          </p>

        </div>

      </div>

      <div className="filters">

        <input
          type="text"
          placeholder="Search destinations..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >

          {categories.map((item) => (
            <option
              value={item}
              key={item}
            >
              {item}
            </option>
          ))}

        </select>

      </div>

      {loading && (
        <div className="status-box">
          Loading destinations...
        </div>
      )}

      {!loading && error && (
        <div className="status-box error">

          {error}

          <br />

          <small>
            Make sure your backend is running
            on port 5000.
          </small>

        </div>
      )}

      {!loading &&
        !error &&
        filteredDestinations.length === 0 && (

          <div className="status-box">
            No destinations found.
          </div>

        )}

      {!loading &&
        !error &&
        filteredDestinations.length > 0 && (

          <div className="destination-grid">

            {filteredDestinations.map(
              (destination) => (

                <DestinationCard
                  key={destination._id}
                  destination={destination}
                />

              )
            )}

          </div>

        )}

    </section>
  );
}

export default Destinations;