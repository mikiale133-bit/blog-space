import React, { useState } from "react";
import { API } from "../../api/Axios";

const Register = () => {
  // state values
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // validation
  if (formData.password !== formData.confirmPassword) {
    setError("password must match.");
  }

  const register = async (userData) => {
    setLoading(true);
    setError("");
    try {
      setLoading(true);
      // const { confirmPassword, password } = formData;
      const resp = await API.post("/api/users/register", userData);
      localStorage.setItem("token", resp.data.token);
    } catch (error) {
      console.error(error);
      setError(error?.resp?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData);
  };
  return (
    <div>
      <div>
        <h2>Sign Up</h2>
        <p>Create a new account!</p>
      </div>

      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label className="font-semibold">Full Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            placeholder="type yout full name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label className="font-semibold">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>

        <div>
          <label className="font-semibold">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>

        <div>
          <label className="font-semibold">Password:</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            required
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
        </div>

        <button type="submit">
          {loading ? "creating account..." : "Create account"}
        </button>
      </form>
    </div>
  );
};

export default Register;

// Bugs of this file:

// 1. confirmPassword is being sent to the backend, which is not needed. You should write const { confirmPassword, ...userData } = formData;

// 2. password match validation is being done inside the component body, which will cause an infinite loop of re-rendering. It should be done inside the handleSubmit function before calling the register function.
// Conditional Rendering/Infinite Loop: You have a top-level if statement that sets an error while the component is rendering. This is dangerous because setting state during render triggers a re-render, which runs the if statement again, potentially creating an infinite loop that crashes your browser.

// 3.wrong Axios error: axios uses error?.response?.data?.message instead of error?.resp?.data?.message #response, not #resp

// Look at the correct code in src/wrongAuth/RegisterFixChatGpt.jsx to see how these bugs are fixed.
