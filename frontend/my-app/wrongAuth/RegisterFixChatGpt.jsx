import React, { useState } from "react";
import { API } from "../../api/Axios";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const register = async (userData) => {
    setLoading(true);
    setError("");

    try {
      const resp = await API.post("/api/users/register", userData);

      localStorage.setItem("token", resp.data.token);
    } catch (error) {
      console.error(error);
      setError(error?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords must match");
      return;
    }

    const { confirmPassword, ...userData } = formData;

    register(userData);
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <p>Create a new account!</p>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Confirm password"
          required
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
        />

        <button type="submit">
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>
    </div>
  );
};

export default Register;
