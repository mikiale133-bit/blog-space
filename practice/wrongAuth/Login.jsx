import React, { useEffect, useState } from "react";
import { API } from "../../api/Axios";

const Login = () => {
  // state values
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const loginUser = useEffect(() => {
    const loginUser = async () => {
      try {
        setLoading(true);
        const resp = await API.post("/api/users/login", formData);
        localStorage.setItem("token", resp.data.token);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loginUser();
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };
  return (
    <div>
      <div>
        <h2>Login</h2>
        <p>Sign in to your account!</p>
      </div>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label className="font-semibold">Email:</label>
          <input
            type="text"
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

        <button type="submit">{loading ? "Logging-in..." : "Login"}</button>
      </form>
    </div>
  );
};

export default Login;
