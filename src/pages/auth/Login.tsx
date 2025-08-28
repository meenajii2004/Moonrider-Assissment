import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "@/contexts/AuthContext";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, googleLogin } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const from = (location.state as any)?.from?.pathname || "/dashboard";

  // // ✅ Load Google script once
  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://accounts.google.com/gsi/client";
  //   script.async = true;
  //   script.defer = true;
  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  // // ✅ Initialize Google button once script is ready
  // useEffect(() => {
  //   if (typeof window !== "undefined" && (window as any).google) {
  //     (window as any).google.accounts.id.initialize({
  //       client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  //       callback: async (response: any) => {
  //         try {
  //           await googleLogin(response.credential);
  //           toast.success("Google login successful!");
  //           navigate(from, { replace: true });
  //         } catch (error: any) {
  //           toast.error(error.message || "Google login failed");
  //         }
  //       },
  //     });

  //     (window as any).google.accounts.id.renderButton(
  //       document.getElementById("googleBtn"),
  //       { theme: "outline", size: "large", width: "100%" }
  //     );
  //   }
  // }, [googleLogin, navigate, from]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login({ email: formData.email, password: formData.password });
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (error: any) {
      toast.error(error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-md py-2 font-medium disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner size="sm" color="white" /> : "Login"}
          </button>
        </form>

        <div className="my-6 flex items-center">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* ✅ Google Sign-In button placeholder */}
        <div id="googleBtn" className="w-full flex justify-center"></div>

        <p className="mt-6 text-center text-gray-600 dark:text-gray-300">
          Don’t have an account?{" "}
          <Link to="/auth/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
