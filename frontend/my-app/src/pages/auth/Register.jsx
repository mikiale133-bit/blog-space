import { useState } from "react";
import { API } from "../../api/Axios";
import { User, Mail, Lock, Loader2 } from "lucide-react";
import Footer from "../../components/Footer";
import { useAuthStore } from "../../store/useAuthStore";
import ImageUpload from "../../components/ImageUpload2";
import { NavLink, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

/* ZOD SCHEMA */
const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

/* COMPONENT  */
const Register = () => {
  const registerUser = useAuthStore((state) => state.register);
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  /* REACT HOOK FORM  */
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  /* SUBMIT HANDLER */
  const onSubmit = async (data) => {
    setLoading(true);
    setServerError("");

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);

      if (image) {
        formData.append("image", image);
      }

      const resp = await API.post("/api/users/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      localStorage.setItem("token", resp.data.token);
      registerUser(resp.data);

      // clear form
      reset();
      setImage(null);

      navigate("/"); // better than navigate(-1)
    } catch (err) {
      setServerError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold mb-6">Create Account</h2>

          {/* SERVER ERROR */}
          {serverError && <p className="text-red-500 text-sm mb-4">{serverError}</p>}

          {/* IMAGE UPLOAD */}
          <div className="mb-5 flex flex-col items-center">
            <ImageUpload onImageSelect={setImage} currentImage={null} />
            <label className="font-bold mt-2">Profile Image</label>
          </div>

          {/* NAME */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute right-3 top-3 text-slate-400" size={18} />
              <input
                {...register("name")}
                className="w-full pl-2 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-900 outline-none"
                placeholder="e.g. John Doe"
              />
            </div>
            <p className="text-red-500 text-sm">{errors.name?.message}</p>
          </div>

          {/* EMAIL */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute right-3 top-3 text-slate-400" size={18} />
              <input
                {...register("email")}
                type="email"
                className="w-full pl-2 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-900 outline-none"
                placeholder="example@gmail.com"
              />
            </div>
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>

          {/* PASSWORD */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute right-3 top-3 text-slate-400" size={18} />
              <input
                {...register("password")}
                type="password"
                className="w-full pl-2 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-900 outline-none"
                placeholder="••••••••"
              />
            </div>
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="mb-4">
            <div className="relative">
              <Lock className="absolute right-3 top-3 text-slate-400" size={18} />
              <input
                {...register("confirmPassword")}
                type="password"
                className="w-full pl-2 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-900 outline-none"
                placeholder="Confirm password..."
              />
            </div>
            <p className="text-red-500 text-sm">{errors.confirmPassword?.message}</p>
          </div>

          {/* SUBMIT BTN */}
          <button disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold flex justify-center items-center gap-2">
            {loading ? <Loader2 className="animate-spin" /> : "Sign Up"}
          </button>

          {/* LOGIN LINK */}
          <div className="mt-3">
            <h2>
              Do you have an account?{" "}
              <NavLink to={"/auth/login"} className="text-blue-500 hover:underline">
                Login here
              </NavLink>
            </h2>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
