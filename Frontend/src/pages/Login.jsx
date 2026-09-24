import { useState } from "react";

function Login() {

  const [form, setForm] =
    useState({
      email: "",
      password: ""
    });

  const [error, setError] =
    useState("");

  const [message, setMessage] =
    useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    setError("");
    setMessage("");

    if (
      !form.email ||
      !form.password
    ) {

      setError(
        "Please enter both email and password."
      );

      return;
    }

    setMessage(
      "Login UI is ready. Authentication can be connected to the backend next."
    );
  };

  return (
    <section className="auth-section">

      <div className="auth-card">

        <p className="eyebrow dark">
          WELCOME BACK
        </p>

        <h1>Login</h1>

        <p>
          Login to manage your tourism
          destinations.
        </p>

        {error && (
          <div className="form-message error">
            {error}
          </div>
        )}

        {message && (
          <div className="form-message success">
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          noValidate
        >

          <label>
            Email
          </label>

          <input
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value
              })
            }
            placeholder="you@example.com"
          />

          <label>
            Password
          </label>

          <input
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value
              })
            }
            placeholder="Enter password"
          />

          <button
            className="primary-button full-button"
            type="submit"
          >
            Login
          </button>

        </form>

      </div>

    </section>
  );
}

export default Login;