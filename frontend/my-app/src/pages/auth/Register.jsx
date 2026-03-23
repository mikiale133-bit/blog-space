import { useState } from "react";
import { API } from "../../api/Axios";
import { User, Mail, Lock, Loader2, CheckCircle } from "lucide-react";
import Navbar from "../../components/Navbar";
import { useAuthStore } from "../../store/useAuthStore";

const Register = () => {
  const register = useAuthStore((state) => state.register);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validation happens HERE, right before the API call
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // 2. Destructure to send only what the server expects
      const { confirmPassword, ...userData } = formData;

      const resp = await API.post("/api/users/register", userData);
      localStorage.setItem("token", resp.data.token);
      alert("Registration successful!");

      register(resp.data);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-slate-200"
        >
          <h2 className="text-2xl font-bold mb-6">Create Account</h2>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Example Input - Apply this pattern to all fields */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <div className="relative">
              <User
                className="absolute right-3 top-3 text-slate-400"
                size={18}
              />
              <input
                type="text"
                className="w-full pl-2 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-900 outline-none"
                placeholder="e.g. John Doe"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Email</label>
            <div className="relative mb-4">
              <Mail
                className="absolute right-3 top-3 text-slate-400"
                size={18}
              />
              <input
                type="email"
                className="w-full pl-2 pr-4 py-2 border border-slate-300 rounded-lg focus:ring focus:ring-blue-900 outline-none"
                placeholder="example@gmail.com"
                required
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Password</label>
            <div className="relative">
              <Lock
                className="absolute right-3 top-3 text-slate-400"
                size={18}
              />
              <input
                type="password"
                className="w-full pl-2 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-900 outline-none"
                placeholder="••••••••"
                required
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          </div>
          <div className="relative mb-4">
            <Lock className="absolute right-3 top-3 text-slate-400" size={18} />
            <input
              type="password"
              className="w-full pl-2 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-900 outline-none"
              placeholder="Confirm password..."
              required
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
          </div>

          {/* ... Repeat for Email, Password, ConfirmPassword ... */}

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold flex justify-center items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

// Previous version with issues:
