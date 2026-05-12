"use client";

import { useState, useEffect } from "react";
import API from "@/services/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/utils/auth";

import {
  FaLeaf,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaTractor,
  FaSeedling,
  FaCloudSun,
} from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();
  useEffect(() => {

  if (isAuthenticated()) {

    router.push("/dashboard");
  }

}, []);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Load saved email if "Remember Me" was checked
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      const response = await API.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", response.data.token);
      
      // Handle "Remember Me" functionality
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", formData.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      toast.success(response.data.message || "Welcome back! 🌾");
      
      // Small delay for better UX
      setTimeout(() => {
        router.push("/dashboard");
      }, 500);

    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 py-8 sm:px-6"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1620200423727-8127f75d7f53?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3A%3D')",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative w-full max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 bg-white/95 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl border border-white/30">
          
          {/* LEFT SIDE - Farm Features Section */}
          <div className="hidden lg:flex flex-col justify-center p-8 xl:p-12 text-white bg-gradient-to-br from-green-900/90 to-green-800/90">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-green-500 p-3 rounded-2xl">
                  <FaTractor size={32} className="text-white" />
                </div>
                <h1 className="text-3xl xl:text-4xl font-bold">
                  Smart Krishi
                </h1>
              </div>
              <h2 className="text-5xl xl:text-6xl font-extrabold leading-tight">
                Sahayak
                <span className="text-green-300 block text-3xl xl:text-4xl mt-2">
                  Your Digital Companion
                </span>
              </h2>
            </div>

            <div className="w-24 h-1 bg-green-400 my-6 rounded-full"></div>

            <p className="text-base xl:text-lg text-gray-100 leading-relaxed mb-8">
              India's most trusted agricultural platform helping 
              <span className="font-bold text-green-300"> 2M+ farmers</span> make data-driven decisions.
            </p>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <FaSeedling className="text-green-400 mt-1 text-xl" />
                <div>
                  <h3 className="font-semibold text-white">Smart Crop Advisory</h3>
                  <p className="text-sm text-gray-200">Personalized crop calendar & sowing alerts</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaCloudSun className="text-green-400 mt-1 text-xl" />
                <div>
                  <h3 className="font-semibold text-white">Weather Intelligence</h3>
                  <p className="text-sm text-gray-200">Hyper-local forecasts & pest warnings</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaLeaf className="text-green-400 mt-1 text-xl" />
                <div>
                  <h3 className="font-semibold text-white">Market Connect</h3>
                  <p className="text-sm text-gray-200">Real-time mandi prices & direct selling</p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE - Login Form */}
          <div className="bg-white p-6 sm:p-8 md:p-10">
            <div className="flex flex-col items-center mb-8">
              <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-full shadow-lg mb-4">
                <FaLeaf size={28} />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-green-800 text-center">
                Welcome Back!
              </h2>
              <p className="text-gray-600 mt-2 text-center text-sm sm:text-base">
                Login to access your personalized farming dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* EMAIL FIELD */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center border-2 border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus-within:border-green-500 focus-within:bg-white transition-all duration-300">
                  <FaEnvelope className="text-gray-400 mr-3 text-lg flex-shrink-0" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="farmer@example.com"
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent outline-none text-gray-800 placeholder:text-gray-400 text-base"
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* PASSWORD FIELD */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center border-2 border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus-within:border-green-500 focus-within:bg-white transition-all duration-300">
                  <FaLock className="text-gray-400 mr-3 text-lg flex-shrink-0" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    placeholder="Enter your password"
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent outline-none text-gray-800 placeholder:text-gray-400 text-base"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="ml-2 text-gray-400 hover:text-green-600 transition-colors flex-shrink-0"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
              </div>

              {/* REMEMBER ME & FORGOT PASSWORD */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                
                <button
                  type="button"
                  onClick={() => toast.success("Password reset link sent to your email! 📧")}
                  className="text-sm text-green-700 hover:text-green-800 font-semibold hover:underline text-left sm:text-right"
                >
                  Forgot Password?
                </button>
              </div>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-all duration-300 text-white py-3.5 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] ${
                  isLoading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Logging in...</span>
                  </div>
                ) : (
                  "Login to Dashboard"
                )}
              </button>

              {/* QUICK HELP SECTION */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                <p className="text-blue-800 text-xs sm:text-sm text-center">
                  💡 <span className="font-semibold">Need help?</span> Call our farmer support: 
                  <span className="font-bold"> 1800-123-4567</span> (Toll-free)
                </p>
              </div>
            </form>

            {/* SIGNUP LINK */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm sm:text-base">
                New to Smart Krishi Sahayak?{" "}
                <button
                  onClick={() => router.push("/signup")}
                  className="text-green-700 font-bold hover:text-green-800 hover:underline transition-all duration-200 cursor-pointer"
                >
                  Create Free Account
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}