"use client";

import { useEffect, useState } from "react";
import API from "@/services/api";
import toast from "react-hot-toast";
import { isAuthenticated } from "@/utils/auth";
import Link from "next/link";

import {
  FaCloudSun,
  FaLeaf,
  FaRupeeSign,
  FaUpload,
  FaTemperatureHigh,
  FaTractor,
  FaSeedling,
  FaChartLine,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMobileAlt,
  FaPhone,
  FaWhatsapp,
  FaBell,
  FaUserCircle,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaHeart,
  FaSearch,
  FaExchangeAlt,
} from "react-icons/fa";

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [mandiData, setMandiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState("");
  const [aiResult, setAiResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  // fetch dashboard data
  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        window.location.href = "/login";
        return;
      }

      const response = await API.get("/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setDashboardData(response.data);
      
      const mandiRes = await API.get("/mandi/all", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMandiData(mandiRes.data.mandiPrices || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load dashboard data");
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  };
  // image select
const handleImageChange = async (e) => {

  const file = e.target.files[0];

  if (!file) return;

  try {

    setUploading(true);

    setSelectedImage(file);

    setPreview(URL.createObjectURL(file));

    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append("image", file);

    const response = await API.post(
      "/upload",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setUploadedImage(
      `http://localhost:5000${response.data.imagePath}`
    );

    setAiResult(null);

    toast.success("Image uploaded successfully");

  } catch (error) {

    console.log(error);

    toast.error("Upload failed");

  } finally {

    setUploading(false);
  }
};
useEffect(() => {

  // check auth
  if (!isAuthenticated()) {

    toast.error("Please login first");

    window.location.href = "/login";

    return;
  }

  fetchDashboard();

}, []);

const handleAnalyze = async () => {

  if (!uploadedImage) {
    return toast.error("Upload image first");
  }

  try {

   setAnalyzing(true);

// clear previous result first
setAiResult(null);

// small delay so React re-render force ho
await new Promise((resolve) =>
  setTimeout(resolve, 300)
);

    const token = localStorage.getItem("token");

    const response = await API.post(
      "/ai/analyze",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data.analysis);
    setAiResult(response.data.analysis);

    toast.success("AI analysis completed");

  } catch (error) {

    console.log(error);

    toast.error("AI analysis failed");

  } finally {

    setAnalyzing(false);
  }
};
const handleClearAnalysis = () => {
  setAiResult(null);
  setUploadedImage("");
  setPreview("");
  setSelectedImage(null);

  toast.success("Analysis cleared");
};

  // loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
          <FaLeaf className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-600 text-2xl animate-pulse" />
        </div>
        <p className="mt-6 text-green-700 font-semibold text-lg">Loading your farm data...</p>
        <p className="text-gray-500 text-sm mt-2">Smart Krishi Sahayak</p>
      </div>
    );
  }



  return (
    <main className="min-h-screen bg-fixed bg-cover bg-center relative" 
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1573119798379-011dfedae008?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }}>
      
      {/* MOBILE HEADER - Visible only on mobile */}
      <div className="lg:hidden bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="bg-green-600 p-2 rounded-lg">
              <FaLeaf className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-green-800">Krishi Sahayak</h1>
              <p className="text-xs text-gray-500">Smart Farming Assistant</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="relative">
              <FaBell className="text-gray-600 text-xl" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600"
            >
              <FaUserCircle size={28} />
            </button>
          </div>
        </div>
        
        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t z-50">
            <div className="p-4 border-b">
              <p className="font-semibold text-gray-800">{dashboardData?.user?.name}</p>
              <p className="text-sm text-gray-500">{dashboardData?.user?.email}</p>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/";
              }}
              className="w-full text-left p-4 text-red-600 font-semibold hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* DESKTOP NAVBAR - Hidden on mobile */}
      <nav className="hidden lg:block bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-2 rounded-xl">
                <FaTractor className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-green-800">Smart Krishi Sahayak</h1>
                <p className="text-xs text-gray-500">Intelligent Farming Decision Support System</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">

              <button className="relative">
                <FaBell className="text-gray-600 text-xl" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/";
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition-all duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        
        {/* WELCOME SECTION - Mobile optimized */}
        <div className="mb-6 sm:mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-4xl font-bold text-gray-800">
                Welcome, {dashboardData?.user?.name?.split(' ')[0]}! 👋
              </h2>
              <p className="text-gray-500 text-sm sm:text-base mt-1">
                Here's your farming overview for today
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-lg shadow-sm">
              <FaCalendarAlt />
              <span>{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </div>

        {/* TOP STATS - Mobile responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-10">
          
          {/* TEMPERATURE CARD */}
          <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Temperature</p>
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-800 mt-1">
                  {dashboardData?.weather?.temperature || 28}°C
                </h3>
                <p className="text-xs text-gray-400 mt-2">Feels like {dashboardData?.weather?.temperature || 28}°C</p>
              </div>
              <div className="bg-orange-100 text-orange-500 p-3 sm:p-4 rounded-full">
                <FaTemperatureHigh size={24} className="sm:w-7 sm:h-7" />
              </div>
            </div>
          </div>

          {/* WEATHER CARD */}
          <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Weather Condition</p>
                <h3 className="text-xl sm:text-3xl font-bold mt-1 text-gray-800">
                  {dashboardData?.weather?.weather || "Sunny"}
                </h3>
                <p className="text-xs text-gray-400 mt-2">Humidity: {dashboardData?.weather?.humidity || 65}%</p>
              </div>
              <div className="bg-blue-100 text-blue-500 p-3 sm:p-4 rounded-full">
                <FaCloudSun size={24} className="sm:w-7 sm:h-7" />
              </div>
            </div>
          </div>

          {/* LOCATION CARD */}
          <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Your Location</p>
                <h3 className="text-lg sm:text-3xl font-bold mt-1 text-gray-800">
                  {dashboardData?.user?.location || "Not set"}
                </h3>
                <p className="text-xs text-gray-400 mt-2">Local growing zone</p>
              </div>
              <div className="bg-green-100 text-green-600 p-3 sm:p-4 rounded-full">
                <FaMapMarkerAlt size={24} className="sm:w-7 sm:h-7" />
              </div>
            </div>
          </div>
        </div>

        {/* CROPS + MANDI SECTION */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          
          {/* RECOMMENDED CROPS - Mobile optimized */}
          <div className="bg-white rounded-2xl p-5 sm:p-8 shadow-md">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
                <FaSeedling className="text-green-600" />
                Recommended Crops
              </h2>
              <span className="text-green-600 text-xs sm:text-sm bg-green-50 px-3 py-1 rounded-full">
                Based on your location & season
              </span>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {dashboardData?.recommendedCrops?.length > 0 ? (
                dashboardData.recommendedCrops.map((crop, index) => (
                  <div
                    key={index}
                    className="border-2 border-gray-100 rounded-xl p-4 hover:border-green-200 hover:shadow-md transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedCrop(crop)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-base sm:text-xl font-semibold text-gray-800">
                          {crop.name}
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">
                            Season: {crop.season}
                          </span>
                          <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                            Best yield in your area
                          </span>
                        </div>
                      </div>
                      <div className="bg-green-100 text-green-600 p-2 sm:p-3 rounded-full">
                        <FaLeaf size={20} className="sm:w-5 sm:h-5" />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <FaLeaf className="text-gray-300 text-5xl mx-auto mb-3" />
                  <p className="text-gray-500">No crop recommendations available</p>
                  <button className="mt-3 text-green-600 text-sm font-semibold">
                    Update your profile
                  </button>
                </div>
              )}
            </div>

            {/* Quick tip for farmers */}
            <div className="mt-6 bg-amber-50 rounded-xl p-3 border border-amber-200">
              <p className="text-amber-800 text-xs sm:text-sm">
                💡 <span className="font-semibold">Pro Tip:</span> Plant {dashboardData?.recommendedCrops?.[0]?.name || "recommended crops"} this season for best yield in {dashboardData?.user?.location || "your region"}!
              </p>
            </div>
          </div>

          {/* MANDI PRICES - Mobile optimized with horizontal scroll */}
          <div className="bg-white rounded-2xl p-5 sm:p-8 shadow-md">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
                <FaRupeeSign className="text-green-600" />
                Mandi Rates
              </h2>
              <Link
  href="/allmandi"
  className="text-green-600 font-semibold cursor-pointer hover:underline text-lg"
>
  View All
</Link>
            </div>

            {/* Mobile: Cards view, Desktop: Table view */}
            <div className="block lg:hidden space-y-3">
              {mandiData.slice(0, 5).map((item, index) => {
                const change = (Math.random() * 4 - 2).toFixed(1);
                const isPositive = change >= 0;
                return (
                  <div key={index} className="border border-gray-100 rounded-xl p-4 bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg">{item.cropName}</h3>
                        <p className="text-xs text-gray-500">{item.market}, {item.state}</p>
                      </div>
                      <div className={`text-right font-bold ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
                        {isPositive ? '+' : ''}{change}%
                      </div>
                    </div>
                    <div className="flex justify-between items-end mt-2">
                      <div>
                        <p className="text-xs text-gray-500">Price per quintal</p>
                        <p className="text-xl font-bold text-gray-800">₹{item.pricePerQuintal}</p>
                      </div>
                      <div className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
                        {isPositive ? '↑' : '↓'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-500 border-b text-sm">
                    <th className="py-3">Crop</th>
                    <th>Market</th>
                    <th>Price (per quintal)</th>
                    <th className="text-right">Trend</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {mandiData.slice(0, 6).map((item, index) => {
                    const change = (Math.random() * 4 - 2).toFixed(1);
                    const isPositive = change >= 0;
                    return (
                      <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="py-4 font-medium text-sm">{item.cropName}</td>
                        <td className="text-sm">{item.market}</td>
                        <td className="text-sm font-semibold">₹{item.pricePerQuintal}</td>
                        <td className={`text-right font-semibold text-sm ${isPositive ? "text-green-600" : "text-red-500"}`}>
                          {isPositive ? "+" : ""}{change}% {isPositive ? "↑" : "↓"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {mandiData.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No mandi prices available</p>
              </div>
            )}

            {/* Market alert */}
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-400">
                Last updated: Today at 10:30 AM • Prices may vary by market
              </p>
            </div>
          </div>
        </div>

        {/* UPLOAD SOIL IMAGE SECTION - Mobile optimized */}
        {/* UPLOAD SECTION */}
<div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md mt-8">

  <div className="flex flex-col lg:flex-row gap-10 items-center justify-between">

    {/* LEFT */}
    <div className="flex-1">

      <div className="flex items-center gap-3 mb-3">

        <div className="bg-green-100 p-3 rounded-full">
          <FaUpload className="text-green-600 text-xl" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800">
          Soil Image Scanner
        </h2>

      </div>

      <p className="text-gray-500 mb-6">
        Upload farmland or soil image for future AI-based crop analysis and recommendations.
      </p>

      {/* FILE INPUT */}
      <label className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl cursor-pointer shadow-lg transition-all duration-300">

  <FaUpload />

  {uploading
  ? "Uploading..."
  : "Choose Soil Image"}

  <input
    type="file"
    accept="image/*"
    onChange={handleImageChange}
    className="hidden"
  />

</label>


      <button
  onClick={handleAnalyze}
  disabled={uploading || analyzing || !uploadedImage}
  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl flex items-center gap-3 shadow-lg transition-all duration-300"
>

  🤖

  {analyzing
    ? "Analyzing..."
    : "Analyze Soil"}

</button>

    </div>

    {/* RIGHT SIDE */}
    <div className="flex gap-6 flex-wrap justify-center">

      {/* PREVIEW */}
      {preview && (

        <div>

          <p className="mb-3 font-semibold text-gray-700 text-center">
            Preview
          </p>

          <img
            src={preview}
            alt="preview"
            className="w-56 h-56 object-cover rounded-2xl border shadow-md"
          />

        </div>
      )}



    </div>

  </div>

</div>

  {/* AI RESULT */}
{aiResult && (
  <div key={aiResult.analysisId}>

  <div className="bg-white rounded-2xl p-8 shadow-md mt-8 border border-green-100">

    <div className="flex items-center gap-3 mb-6">

      <div className="bg-blue-100 p-3 rounded-full">
        🤖
      </div>

      <h2 className="text-2xl font-bold text-gray-800">
        AI Soil Analysis
      </h2>

    </div>

    <div className="grid md:grid-cols-2 gap-6">

      <div className="space-y-4">

        <div className="bg-gray-50 p-4 rounded-xl">
          <p className="text-gray-500 text-sm">
            Soil Type
          </p>

          <h3 className="text-xl font-bold text-gray-800">
            {aiResult.soilType}
          </h3>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl">
          <p className="text-gray-500 text-sm">
            Moisture Level
          </p>

          <h3 className="text-xl font-bold text-gray-800">
            {aiResult.moisture}
          </h3>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl">
          <p className="text-gray-500 text-sm">
            Fertility
          </p>

          <h3 className="text-xl font-bold text-gray-800">
            {aiResult.fertility}
          </h3>
        </div>

      </div>

      <div>

        <div className="bg-green-50 p-5 rounded-xl">

          <h3 className="text-xl font-bold text-green-800 mb-4">
            Recommended Crops
          </h3>

          <div className="flex flex-wrap gap-3">

            {aiResult.recommendedCrops.map(
              (crop, index) => (

                <span
                  key={index}
                  className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold"
                >
                  {crop}
                </span>
              )
            )}

          </div>

          <p className="mt-6 text-sm text-gray-600">
            AI Confidence:
            <span className="font-bold text-green-700 ml-2">
              {aiResult.confidence}
            </span>
          </p>

        </div>

            </div>

    </div>

    {/* DELETE BUTTON */}
    <div className="flex justify-end mt-6">

      <button
        onClick={handleClearAnalysis}
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300"
      >
        Delete Analysis
      </button>

    </div>
    </div>
  </div>
)}

        {/* QUICK ACTIONS MARQUEE */}
<div className="mt-6 sm:mt-8 overflow-hidden">

  <div className="marquee-track">

    {/* FIRST SET */}
    <div className="marquee-group">

      <div className="min-w-[180px] bg-white p-4 rounded-xl text-center hover:shadow-md transition-all border">

      <div className="bg-green-100 p-2 rounded-lg inline-block mb-2">
        <FaPhone className="text-green-600 text-xl" />
      </div>

      <p className="text-sm font-semibold text-gray-700">
        Expert Help
      </p>

    </div>

      <div className="min-w-[180px] bg-white p-4 rounded-xl text-center hover:shadow-md transition-all border">

      <div className="bg-blue-100 p-2 rounded-lg inline-block mb-2">
        <FaCloudSun className="text-blue-600 text-xl" />
      </div>

      <p className="text-sm font-semibold text-gray-700">
        Weather Alert
      </p>

    </div>

      <div className="min-w-[180px] bg-white p-4 rounded-xl text-center hover:shadow-md transition-all border">

      <div className="bg-purple-100 p-2 rounded-lg inline-block mb-2">
        <FaChartLine className="text-purple-600 text-xl" />
      </div>

      <p className="text-sm font-semibold text-gray-700">
        Market Trends
      </p>

    </div>

      <div className="min-w-[180px] bg-white p-4 rounded-xl text-center hover:shadow-md transition-all border">

      <div className="bg-yellow-100 p-2 rounded-lg inline-block mb-2">
        <FaMobileAlt className="text-yellow-600 text-xl" />
      </div>

      <p className="text-sm font-semibold text-gray-700">
        Offline Mode
      </p>

    </div>

    </div>

    {/* SECOND SET (EXACT DUPLICATE) */}
    <div className="marquee-group">

      <div className="min-w-[180px] bg-white p-4 rounded-xl text-center hover:shadow-md transition-all border">

      <div className="bg-green-100 p-2 rounded-lg inline-block mb-2">
        <FaPhone className="text-green-600 text-xl" />
      </div>

      <p className="text-sm font-semibold text-gray-700">
        Expert Help
      </p>

    </div>

      <div className="min-w-[180px] bg-white p-4 rounded-xl text-center hover:shadow-md transition-all border">

      <div className="bg-blue-100 p-2 rounded-lg inline-block mb-2">
        <FaCloudSun className="text-blue-600 text-xl" />
      </div>

      <p className="text-sm font-semibold text-gray-700">
        Weather Alert
      </p>

    </div>

      <div className="min-w-[180px] bg-white p-4 rounded-xl text-center hover:shadow-md transition-all border">

      <div className="bg-purple-100 p-2 rounded-lg inline-block mb-2">
        <FaChartLine className="text-purple-600 text-xl" />
      </div>

      <p className="text-sm font-semibold text-gray-700">
        Market Trends
      </p>

    </div>

      <div className="min-w-[180px] bg-white p-4 rounded-xl text-center hover:shadow-md transition-all border">

      <div className="bg-yellow-100 p-2 rounded-lg inline-block mb-2">
        <FaMobileAlt className="text-yellow-600 text-xl" />
      </div>

      <p className="text-sm font-semibold text-gray-700">
        Offline Mode
      </p>

    </div>

    </div>

    {/* THIRD SET (EXACT DUPLICATE) */}
    <div className="marquee-group">

      <div className="min-w-[180px] bg-white p-4 rounded-xl text-center hover:shadow-md transition-all border">

      <div className="bg-green-100 p-2 rounded-lg inline-block mb-2">
        <FaPhone className="text-green-600 text-xl" />
      </div>

      <p className="text-sm font-semibold text-gray-700">
        Expert Help
      </p>

    </div>

      <div className="min-w-[180px] bg-white p-4 rounded-xl text-center hover:shadow-md transition-all border">

      <div className="bg-blue-100 p-2 rounded-lg inline-block mb-2">
        <FaCloudSun className="text-blue-600 text-xl" />
      </div>

      <p className="text-sm font-semibold text-gray-700">
        Weather Alert
      </p>

    </div>

      <div className="min-w-[180px] bg-white p-4 rounded-xl text-center hover:shadow-md transition-all border">

      <div className="bg-purple-100 p-2 rounded-lg inline-block mb-2">
        <FaChartLine className="text-purple-600 text-xl" />
      </div>

      <p className="text-sm font-semibold text-gray-700">
        Market Trends
      </p>

    </div>

      <div className="min-w-[180px] bg-white p-4 rounded-xl text-center hover:shadow-md transition-all border">

      <div className="bg-yellow-100 p-2 rounded-lg inline-block mb-2">
        <FaMobileAlt className="text-yellow-600 text-xl" />
      </div>

      <p className="text-sm font-semibold text-gray-700">
        Offline Mode
      </p>

    </div>

    </div>

  </div>

</div>

      </div>

      {/* MOBILE BOTTOM NAVIGATION */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg px-4 py-2 flex justify-around z-50">
        <button className="flex flex-col items-center text-green-600">
          <FaLeaf size={20} />
          <span className="text-xs mt-1">Home</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <FaChartLine size={20} />
          <span className="text-xs mt-1">Analytics</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <FaRupeeSign size={20} />
          <span className="text-xs mt-1">Market</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <FaUserCircle size={20} />
          <span className="text-xs mt-1">Profile</span>
        </button>
      </div>
      {/* FOOTER SECTION */}
        <footer className="bg-gray-900/95 backdrop-blur-sm text-gray-400 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {/* Company Info */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-green-600 p-2 rounded-lg">
                    <FaLeaf className="text-white" />
                  </div>
                  <span className="font-bold text-xl text-white">
                    Smart Krishi Sahayak
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  Empowering Indian farmers with AI-driven insights, real-time mandi prices, and expert agricultural guidance.
                </p>
                <div className="flex gap-3">
                  <a href="#" className="hover:text-green-400 transition-colors">
                    <FaFacebook size={20} />
                  </a>
                  <a href="#" className="hover:text-green-400 transition-colors">
                    <FaTwitter size={20} />
                  </a>
                  <a href="#" className="hover:text-green-400 transition-colors">
                    <FaYoutube size={20} />
                  </a>
                  <a href="#" className="hover:text-green-400 transition-colors">
                    <FaWhatsapp size={20} />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/" className="hover:text-green-400 transition-colors">About Us</a></li>
                  <li><a href="#features" className="hover:text-green-400 transition-colors">Features</a></li>
                  <li><a href="/contact" className="hover:text-green-400 transition-colors">Government Officials</a></li>
                  <li><a href="/coming-soon" className="hover:text-green-400 transition-colors">Privacy Policy</a></li>
                  <li><a href="/coming-soon" className="hover:text-green-400 transition-colors">Terms of Service</a></li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="text-white font-semibold text-lg mb-4">Farmer Support</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <FaPhoneAlt size={14} />
                    <a href="tel:18001801551" className="hover:text-green-400 transition-colors">1800-180-1551 (Toll Free)</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaEnvelope size={14} />
                    <a href="mailto:support@krishisahayak.com" className="hover:text-green-400 transition-colors">support@krishisahayak.com</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaPhone size={14} />
                    <a href="/contact" className="hover:text-green-400 transition-colors">Support</a>
                  </li>
                </ul>
              </div>

              {/* Newsletter */}
              <div>
                <h3 className="text-white font-semibold text-lg mb-4">Stay Updated</h3>
                <p className="text-sm text-gray-400 mb-3">
                  Get latest agriculture news and mandi rates directly in your inbox.
                </p>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="flex-1 px-3 py-2 rounded-l-lg text-gray-800 focus:outline-none"
                  />
                  <Link href="/coming-soon">
                  <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-r-lg text-white transition-colors">
                    Subscribe
                  </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 mt-10 pt-8 text-center text-sm">
              <p>© 2026 Smart Krishi Sahayak. All rights reserved. Made for Indian Farmers</p>
              <p className="text-xs text-gray-500 mt-2">An initiative to empower agriculture through technology</p>
            </div>
          </div>
        </footer>
        
    </main>
  );
}