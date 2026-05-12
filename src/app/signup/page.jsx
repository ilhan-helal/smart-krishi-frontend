"use client";

import { useState, useEffect } from "react";
import API from "@/services/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/utils/auth";

import {
  FaLeaf,
  FaUser,
  FaEnvelope,
  FaLock,
  FaMapMarkerAlt,
  FaEye,
  FaEyeSlash,
  FaPhoneAlt,
  FaTractor,
} from "react-icons/fa";

export default function SignupPage() {
  const router = useRouter();
  useEffect(() => {

  if (isAuthenticated()) {

    router.push("/dashboard");
  }

}, []);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Enhanced validation for farmers
    if (formData.name.length < 3) {
      return toast.error("Please enter your full name");
    }

    if (!formData.email.includes("@")) {
      return toast.error("Please enter a valid email address");
    }

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    try {
      const response = await API.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        location: formData.location,
      });

      toast.success(response.data.message || "Account created successfully! 🎉");
      router.push("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed. Please try again.");
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
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative w-full max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 bg-white/95 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl border border-white/30">
          
          {/* LEFT SIDE - Hidden on mobile, visible on desktop */}
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
                  Your Farming Partner
                </span>
              </h2>
            </div>

            <div className="w-24 h-1 bg-green-400 my-6 rounded-full"></div>

            <p className="text-base xl:text-lg text-gray-100 leading-relaxed mb-8">
              Join thousands of smart farmers using our platform to increase crop yield,
              get real-time weather updates, and access expert agricultural advice.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-green-200">
                <FaLeaf />
                <span>🌾 Personalized crop recommendations</span>
              </div>
              <div className="flex items-center gap-3 text-green-200">
                <FaLeaf />
                <span>📊 Real-time market prices & mandi rates</span>
              </div>
              <div className="flex items-center gap-3 text-green-200">
                <FaLeaf />
                <span>🌡️ Weather forecasts & pest alerts</span>
              </div>
              <div className="flex items-center gap-3 text-green-200">
                <FaLeaf />
                <span>💬 Expert consultation in local language</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Signup Form */}
          <div className="bg-white p-6 sm:p-8 md:p-10 overflow-y-auto max-h-screen lg:max-h-none">
            <div className="flex flex-col items-center mb-6">
              <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-full shadow-lg mb-4">
                <FaLeaf size={28} />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-green-800 text-center">
                Create Account
              </h2>
              <p className="text-gray-500 mt-2 text-center text-sm sm:text-base">
                Join Smart Krishi Sahayak for free
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* FULL NAME */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center border-2 border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus-within:border-green-500 focus-within:bg-white transition-all duration-300">
                  <FaUser className="text-gray-400 mr-3 text-lg" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    placeholder="e.g., Ram Singh"
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent outline-none text-gray-800 placeholder:text-gray-400 text-base"
                  />
                </div>
              </div>

              {/* EMAIL ADDRESS */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center border-2 border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus-within:border-green-500 focus-within:bg-white transition-all duration-300">
                  <FaEnvelope className="text-gray-400 mr-3 text-lg" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="farmer@example.com"
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent outline-none text-gray-800 placeholder:text-gray-400 text-base"
                  />
                </div>
              </div>

                {/* STATE SELECTION */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  State <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center border-2 border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus-within:border-green-500 transition-all duration-300">
                  <FaMapMarkerAlt className="text-gray-400 mr-3 text-lg" />
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent outline-none text-gray-800 cursor-pointer"
                  >
                    <option value="">Select your state</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>
                  </select>
                </div>
              </div>
              {/* PASSWORD */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center border-2 border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus-within:border-green-500 focus-within:bg-white transition-all duration-300">
                  <FaLock className="text-gray-400 mr-3 text-lg" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    placeholder="Create a strong password"
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent outline-none text-gray-800 placeholder:text-gray-400 text-base"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="ml-2 text-gray-400 hover:text-green-600 transition-colors"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1">Minimum 6 characters</p>
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center border-2 border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus-within:border-green-500 focus-within:bg-white transition-all duration-300">
                  <FaLock className="text-gray-400 mr-3 text-lg" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    placeholder="Confirm your password"
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent outline-none text-gray-800 placeholder:text-gray-400 text-base"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="ml-2 text-gray-400 hover:text-green-600 transition-colors"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* TERMS & CONDITIONS */}
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label htmlFor="terms" className="text-xs sm:text-sm text-gray-600">
                  I agree to the{" "}
                  <span className="text-green-700 font-semibold cursor-pointer hover:underline">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-green-700 font-semibold cursor-pointer hover:underline">
                    Privacy Policy
                  </span>
                </label>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-all duration-300 text-white py-3.5 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Create Free Account
              </button>

              {/* HINT FOR FARMERS */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                <p className="text-green-800 text-xs sm:text-sm">
                  🌱 <span className="font-semibold">Free forever!</span> No hidden charges. Get started with personalized farming advice today.
                </p>
              </div>
            </form>

            {/* LOGIN LINK */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm sm:text-base">
                Already have an account?{" "}
                <button
                  onClick={() => router.push("/login")}
                  className="text-green-700 font-bold hover:text-green-800 hover:underline transition-all duration-200 cursor-pointer"
                >
                  Login Here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}