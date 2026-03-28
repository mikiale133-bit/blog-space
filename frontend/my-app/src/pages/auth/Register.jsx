import { useState } from "react";
import { API } from "../../api/Axios";
import { User, Mail, Lock, Loader2, CheckCircle, Image } from "lucide-react";
import Footer from "../../components/Footer";
import { useAuthStore } from "../../store/useAuthStore";
import ImageUpload from "../../components/ImageUpload2";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const register = useAuthStore((state) => state.register);
  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validation happens HERE, right before the API call
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("image", image);
    // formData.append("confirmPassword", confirmPassword);

    try {
      // 2. Destructure to send only what the server expects

      const resp = await API.post("/api/users/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      localStorage.setItem("token", resp.data.token);

      register(resp.data);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setImage(null);

    navigate(-1);
  };

  return (
    <div>
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-slate-200"
        >
          <h2 className="text-2xl font-bold mb-6">Create Account</h2>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Example Input - Apply this pattern to all fields */}
          <div className="mb-5 flex justify-center flex-col items-center -ml-10">
            <div className="mb-5 flex justify-center flex-col items-center">
              <ImageUpload onImageSelect={setImage} currentImage={null} />
              <label className="font-bold">Profile Image</label>
            </div>
          </div>

          {success && (
            <p className="text-green-500 text-sm mb-4">
              Registered successfully !
            </p>
          )}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <div className="relative">
              <User
                className="absolute right-3 top-3 text-slate-400"
                size={18}
              />
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                className="w-full pl-2 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-900 outline-none"
                placeholder="e.g. John Doe"
                onChange={(e) => setName(e.target.value)}
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
                name="email"
                id="email"
                value={email}
                className="w-full pl-2 pr-4 py-2 border border-slate-300 rounded-lg focus:ring focus:ring-blue-900 outline-none"
                placeholder="example@gmail.com"
                required
                onChange={(e) => setEmail(e.target.value)}
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
                name="password"
                id="password"
                value={password}
                className="w-full pl-2 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-900 outline-none"
                placeholder="••••••••"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="relative mb-4">
            <Lock className="absolute right-3 top-3 text-slate-400" size={18} />
            <input
              type="confirmPassword"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              className="w-full pl-2 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-900 outline-none"
              placeholder="Confirm password..."
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
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

      <Footer />
    </div>
  );
};

export default Register;

// Previous version with issues:
