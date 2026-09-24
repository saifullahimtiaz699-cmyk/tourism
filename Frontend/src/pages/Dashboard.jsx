import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const emptyForm = {
  name: "",
  location: "",
  category: "Mountain",
  description: "",
  image: "",
  bestTime: "",
  budget: ""
};

function Dashboard() {

  const [destinations, setDestinations] =
    useState([]);

  const [form, setForm] =
    useState(emptyForm);

  const [editingId, setEditingId] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [errors, setErrors] =
    useState({});

  const loadDestinations =
    async () => {

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

  useEffect(() => {
    loadDestinations();
  }, []);

  const validate = () => {

    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name =
        "Name is required.";
    } else if (
      form.name.trim().length < 3
    ) {
      newErrors.name =
        "Name must be at least 3 characters.";
    }

    if (!form.location.trim()) {
      newErrors.location =
        "Location is required.";
    }

    if (!form.category) {
      newErrors.category =
        "Category is required.";
    }

    if (!form.description.trim()) {
      newErrors.description =
        "Description is required.";
    } else if (
      form.description.trim().length < 20
    ) {
      newErrors.description =
        "Description must be at least 20 characters.";
    }

    if (!form.image.trim()) {
      newErrors.image =
        "Image URL is required.";
    }

    if (!form.bestTime.trim()) {
      newErrors.bestTime =
        "Best time is required.";
    }

    if (!form.budget) {
      newErrors.budget =
        "Budget is required.";
    } else if (
      Number(form.budget) < 1000
    ) {
      newErrors.budget =
        "Budget must be at least 1000.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    setErrors({
      ...errors,
      [e.target.name]: ""
    });

    setSuccess("");
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validate()) return;

    try {

      setSaving(true);
      setError("");
      setSuccess("");

      const method =
        editingId ? "PUT" : "POST";

      const url =
        editingId
          ? `${API_URL}/destinations/${editingId}`
          : `${API_URL}/destinations`;

      const response = await fetch(
        url,
        {
          method,
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify({
            ...form,
            budget: Number(form.budget)
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Unable to save destination."
        );
      }

      const saved =
        data.destination || data;

      if (editingId) {

        setDestinations(
          (current) =>
            current.map(
              (item) =>
                item._id === editingId
                  ? saved
                  : item
            )
        );

        setSuccess(
          "Destination updated successfully."
        );

      } else {

        setDestinations(
          (current) => [
            saved,
            ...current
          ]
        );

        setSuccess(
          "Destination added successfully."
        );
      }

      setForm(emptyForm);
      setEditingId(null);
      setErrors({});

    } catch (err) {

      setError(
        err.message ||
        "Save failed."
      );

    } finally {

      setSaving(false);

    }
  };

  const handleEdit = (
    destination
  ) => {

    setEditingId(
      destination._id
    );

    setForm({
      name: destination.name || "",
      location:
        destination.location || "",
      category:
        destination.category ||
        "Mountain",
      description:
        destination.description || "",
      image:
        destination.image || "",
      bestTime:
        destination.bestTime || "",
      budget:
        destination.budget || ""
    });

    setErrors({});
    setSuccess("");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const cancelEdit = () => {

    setEditingId(null);
    setForm(emptyForm);
    setErrors({});
    setSuccess("");
  };

  const handleDelete = async (
    id,
    name
  ) => {

    if (
      !window.confirm(
        `Are you sure you want to delete "${name}"?`
      )
    ) {
      return;
    }

    try {

      setError("");

      const response = await fetch(
        `${API_URL}/destinations/${id}`,
        {
          method: "DELETE"
        }
      );

      if (!response.ok) {

        const data =
          await response.json();

        throw new Error(
          data.message ||
          "Delete failed."
        );
      }

      setDestinations(
        (current) =>
          current.filter(
            (item) =>
              item._id !== id
          )
      );

      setSuccess(
        "Destination deleted successfully."
      );

    } catch (err) {

      setError(
        err.message ||
        "Delete failed."
      );
    }
  };

  return (
    <section className="section">

      <div className="page-heading">

        <div>

          <p className="eyebrow dark">
            ADMIN / MANAGER AREA
          </p>

          <h1>
            Manage Destinations
          </h1>

          <p>
            Add, edit and delete tourism
            destinations.
          </p>

        </div>

      </div>

      <div className="dashboard-layout">

        <div className="form-card">

          <h2>
            {editingId
              ? "Edit Destination"
              : "Add New Destination"}
          </h2>

          {error && (
            <div className="form-message error">
              {error}
            </div>
          )}

          {success && (
            <div className="form-message success">
              {success}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            noValidate
          >

            <label>
              Destination Name
            </label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Hunza Valley"
            />

            {errors.name && (
              <small className="field-error">
                {errors.name}
              </small>
            )}

            <label>
              Location
            </label>

            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. Gilgit-Baltistan"
            />

            {errors.location && (
              <small className="field-error">
                {errors.location}
              </small>
            )}

            <label>
              Category
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option>Mountain</option>
              <option>Lake</option>
              <option>Historical</option>
              <option>Beach</option>
              <option>Cultural</option>
              <option>Adventure</option>
            </select>

            {errors.category && (
              <small className="field-error">
                {errors.category}
              </small>
            )}

            <label>
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="5"
              placeholder="Write at least 20 characters..."
            />

            {errors.description && (
              <small className="field-error">
                {errors.description}
              </small>
            )}

            <label>
              Image URL
            </label>

            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://..."
            />

            {errors.image && (
              <small className="field-error">
                {errors.image}
              </small>
            )}

            <label>
              Best Time to Visit
            </label>

            <input
              name="bestTime"
              value={form.bestTime}
              onChange={handleChange}
              placeholder="April to October"
            />

            {errors.bestTime && (
              <small className="field-error">
                {errors.bestTime}
              </small>
            )}

            <label>
              Estimated Budget (PKR)
            </label>

            <input
              type="number"
              name="budget"
              value={form.budget}
              onChange={handleChange}
              min="1000"
              placeholder="50000"
            />

            {errors.budget && (
              <small className="field-error">
                {errors.budget}
              </small>
            )}

            <div className="form-actions">

              <button
                className="primary-button"
                type="submit"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Destination"
                  : "Add Destination"}
              </button>

              {editingId && (
                <button
                  className="secondary-button"
                  type="button"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              )}

            </div>

          </form>

        </div>

        <div className="manage-list">

          <div className="list-header">

            <h2>
              Your Destinations
            </h2>

            <span>
              {destinations.length} items
            </span>

          </div>

          {loading && (
            <div className="status-box">
              Loading...
            </div>
          )}

          {!loading &&
            destinations.length === 0 && (
              <div className="status-box">
                No destinations yet.
                Add your first one.
              </div>
            )}

          {!loading &&
            destinations.map(
              (destination) => (

                <div
                  className="manage-item"
                  key={destination._id}
                >

                  <img
                    src={
                      destination.image ||
                      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=500&q=80"
                    }
                    alt={destination.name}
                  />

                  <div>

                    <h3>
                      {destination.name}
                    </h3>

                    <p>
                      {destination.location}
                    </p>

                    <span>
                      {destination.category}
                    </span>

                  </div>

                  <div className="item-actions">

                    <button
                      className="edit-button"
                      onClick={() =>
                        handleEdit(
                          destination
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-button"
                      onClick={() =>
                        handleDelete(
                          destination._id,
                          destination.name
                        )
                      }
                    >
                      Delete
                    </button>

                    <Link
                      className="view-button"
                      to={`/destinations/${destination._id}`}
                    >
                      View
                    </Link>

                  </div>

                </div>

              )
            )}

        </div>

      </div>

    </section>
  );
}

export default Dashboard;