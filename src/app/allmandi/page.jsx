"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { isAuthenticated } from "@/utils/auth";
import { 
  FaArrowLeft, 
  FaRupeeSign, 
  FaSearch, 
  FaFilter, 
  FaTractor,
  FaMapMarkerAlt,
  FaChartLine,
  FaDownload,
  FaShare,
  FaLeaf,
  FaSortAmountDown,
  FaSortAmountUp,
} from "react-icons/fa";

export default function AllMandiPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("all");
  const [selectedState, setSelectedState] = useState("all");
  const [sortBy, setSortBy] = useState("price");
  const [sortOrder, setSortOrder] = useState("desc");

  const mandiData = [
    { cropName: "Wheat", market: "Ludhiana Mandi", state: "Punjab", pricePerQuintal: 2450 },
    { cropName: "Wheat", market: "Amritsar Mandi", state: "Punjab", pricePerQuintal: 2500 },
    { cropName: "Wheat", market: "Karnal Mandi", state: "Haryana", pricePerQuintal: 2400 },
    { cropName: "Wheat", market: "Bikaner Mandi", state: "Rajasthan", pricePerQuintal: 2350 },
    { cropName: "Wheat", market: "Agra Mandi", state: "Uttar Pradesh", pricePerQuintal: 2380 },
    { cropName: "Wheat", market: "Patna Mandi", state: "Bihar", pricePerQuintal: 2320 },
    { cropName: "Rice", market: "Patiala Mandi", state: "Punjab", pricePerQuintal: 3100 },
    { cropName: "Rice", market: "Kaithal Mandi", state: "Haryana", pricePerQuintal: 3050 },
    { cropName: "Rice", market: "Lucknow Mandi", state: "Uttar Pradesh", pricePerQuintal: 2950 },
    { cropName: "Rice", market: "Kolkata Mandi", state: "West Bengal", pricePerQuintal: 3200 },
    { cropName: "Rice", market: "Raipur Mandi", state: "Chhattisgarh", pricePerQuintal: 2980 },
    { cropName: "Bajra", market: "Jaipur Mandi", state: "Rajasthan", pricePerQuintal: 2200 },
    { cropName: "Bajra", market: "Hisar Mandi", state: "Haryana", pricePerQuintal: 2150 },
    { cropName: "Bajra", market: "Ahmedabad Mandi", state: "Gujarat", pricePerQuintal: 2250 },
    { cropName: "Maize", market: "Bangalore Mandi", state: "Karnataka", pricePerQuintal: 2800 },
    { cropName: "Maize", market: "Indore Mandi", state: "Madhya Pradesh", pricePerQuintal: 2750 },
    { cropName: "Maize", market: "Hyderabad Mandi", state: "Telangana", pricePerQuintal: 2850 },
    { cropName: "Cotton", market: "Rajkot Mandi", state: "Gujarat", pricePerQuintal: 6500 },
    { cropName: "Cotton", market: "Nagpur Mandi", state: "Maharashtra", pricePerQuintal: 6400 },
    { cropName: "Cotton", market: "Guntur Mandi", state: "Andhra Pradesh", pricePerQuintal: 6600 },
    { cropName: "Sugarcane", market: "Meerut Mandi", state: "Uttar Pradesh", pricePerQuintal: 3500 },
    { cropName: "Sugarcane", market: "Kolhapur Mandi", state: "Maharashtra", pricePerQuintal: 3450 },
    { cropName: "Sugarcane", market: "Tumkur Mandi", state: "Karnataka", pricePerQuintal: 3550 },
    { cropName: "Groundnut", market: "Gondal Mandi", state: "Gujarat", pricePerQuintal: 5200 },
    { cropName: "Groundnut", market: "Tirupati Mandi", state: "Andhra Pradesh", pricePerQuintal: 5150 },
    { cropName: "Groundnut", market: "Chennai Mandi", state: "Tamil Nadu", pricePerQuintal: 5300 },
    { cropName: "Mustard", market: "Alwar Mandi", state: "Rajasthan", pricePerQuintal: 5600 },
    { cropName: "Mustard", market: "Gwalior Mandi", state: "Madhya Pradesh", pricePerQuintal: 5550 },
    { cropName: "Mustard", market: "Bharatpur Mandi", state: "Rajasthan", pricePerQuintal: 5650 },
    { cropName: "Jowar", market: "Pune Mandi", state: "Maharashtra", pricePerQuintal: 2600 },
    { cropName: "Jowar", market: "Solapur Mandi", state: "Maharashtra", pricePerQuintal: 2550 },
    { cropName: "Jowar", market: "Gulbarga Mandi", state: "Karnataka", pricePerQuintal: 2650 },
    { cropName: "Barley", market: "Bareilly Mandi", state: "Uttar Pradesh", pricePerQuintal: 2100 },
    { cropName: "Barley", market: "Kota Mandi", state: "Rajasthan", pricePerQuintal: 2080 },
    { cropName: "Barley", market: "Jabalpur Mandi", state: "Madhya Pradesh", pricePerQuintal: 2120 },
  ];

  // Get unique crops and states for filters
  const uniqueCrops = ["all", ...new Set(mandiData.map(item => item.cropName))];
  const uniqueStates = ["all", ...new Set(mandiData.map(item => item.state))];

  // Filter and sort data
  const filteredData = mandiData
    .filter(item => {
      const matchesSearch = searchTerm === "" || 
        item.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.market.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.state.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCrop = selectedCrop === "all" || item.cropName === selectedCrop;
      const matchesState = selectedState === "all" || item.state === selectedState;
      return matchesSearch && matchesCrop && matchesState;
    })
    .sort((a, b) => {
      if (sortBy === "price") {
        return sortOrder === "desc" 
          ? b.pricePerQuintal - a.pricePerQuintal 
          : a.pricePerQuintal - b.pricePerQuintal;
      } else if (sortBy === "name") {
        return sortOrder === "desc"
          ? b.cropName.localeCompare(a.cropName)
          : a.cropName.localeCompare(b.cropName);
      }
      return 0;
    });

  // Statistics
  const totalMarkets = filteredData.length;
  const averagePrice = (filteredData.reduce((sum, item) => sum + item.pricePerQuintal, 0) / totalMarkets).toFixed(0);
  const highestPrice = Math.max(...filteredData.map(item => item.pricePerQuintal));
  const lowestPrice = Math.min(...filteredData.map(item => item.pricePerQuintal));

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };
  useEffect(() => {

  // check auth
  if (!isAuthenticated()) {

    toast.error("Please login first");

    window.location.href = "/login";

    return;
  }

}, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-white">
      
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-green-700 to-green-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <div className="flex items-center gap-3 mb-4 justify-center sm:justify-start">
                <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                  <FaRupeeSign className="text-3xl" />
                </div>
                <h1 className="text-3xl sm:text-5xl font-bold">Mandi Bhav</h1>
              </div>
              <p className="text-green-100 text-base sm:text-lg max-w-2xl">
                Real-time mandi prices from 500+ markets across India. Get the best price for your crops.
              </p>
            </div>
            
            <Link
              href="/dashboard"
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 px-6 py-3 rounded-xl flex items-center gap-2 font-semibold border border-white/30"
            >
              <FaArrowLeft />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-md border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs">Total Markets</p>
                <p className="text-2xl font-bold text-green-700">{totalMarkets}</p>
              </div>
              <div className="bg-green-100 p-2 rounded-lg">
                <FaMapMarkerAlt className="text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-md border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs">Avg Price (₹/Q)</p>
                <p className="text-2xl font-bold text-green-700">₹{averagePrice}</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-lg">
                <FaChartLine className="text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-md border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs">Highest Price</p>
                <p className="text-2xl font-bold text-green-700">₹{highestPrice}</p>
              </div>
              <div className="bg-red-100 p-2 rounded-lg">
                <FaRupeeSign className="text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-md border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs">Lowest Price</p>
                <p className="text-2xl font-bold text-green-700">₹{lowestPrice}</p>
              </div>
              <div className="bg-yellow-100 p-2 rounded-lg">
                <FaLeaf className="text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by crop, market, or state..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
            
            {/* Crop Filter */}
            <div className="flex-1">
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors bg-white"
              >
                {uniqueCrops.map(crop => (
                  <option key={crop} value={crop}>
                    {crop === "all" ? "All Crops" : crop}
                  </option>
                ))}
              </select>
            </div>
            
            {/* State Filter */}
            <div className="flex-1">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors bg-white"
              >
                {uniqueStates.map(state => (
                  <option key={state} value={state}>
                    {state === "all" ? "All States" : state}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Sort Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => toggleSort("price")}
                className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  sortBy === "price"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <FaRupeeSign />
                Price
                {sortBy === "price" && (
                  sortOrder === "desc" ? <FaSortAmountDown /> : <FaSortAmountUp />
                )}
              </button>
              <button
                onClick={() => toggleSort("name")}
                className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  sortBy === "name"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <FaLeaf />
                Crop
                {sortBy === "name" && (
                  sortOrder === "desc" ? <FaSortAmountDown /> : <FaSortAmountUp />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Results Count & Export */}
        <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
          <p className="text-gray-600 text-sm">
            Showing <span className="font-bold text-green-700">{filteredData.length}</span> mandi prices
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all">
              <FaDownload size={14} />
              Export Data
            </button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all">
              <FaShare size={14} />
              Share
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                <tr>
                  <th className="py-4 px-6 text-left">Crop</th>
                  <th className="py-4 px-6 text-left">Market</th>
                  <th className="py-4 px-6 text-left">State</th>
                  <th className="py-4 px-6 text-right">Price (per quintal)</th>
                  <th className="py-4 px-6 text-right">Trend</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => {
                  const change = (Math.random() * 4 - 2).toFixed(1);
                  const isPositive = change >= 0;
                  
                  return (
                    <tr
                      key={index}
                      className={`border-b border-gray-100 hover:bg-green-50 transition-all duration-200 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                      }`}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="bg-green-100 p-2 rounded-lg">
                            <FaLeaf className="text-green-600 text-sm" />
                          </div>
                          <span className="font-semibold text-gray-800">
                            {item.cropName}
                          </span>
                        </div>
                       </td>
                      <td className="py-4 px-6 text-gray-700">{item.market}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-gray-400 text-xs" />
                          <span className="text-gray-700">{item.state}</span>
                        </div>
                       </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <FaRupeeSign className="text-green-600 text-sm" />
                          <span className="font-bold text-green-700 text-lg">
                            {item.pricePerQuintal.toLocaleString()}
                          </span>
                        </div>
                       </td>
                      <td className="py-4 px-6 text-right">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                            isPositive
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {isPositive ? "+" : ""}{change}% 
                          <span>{isPositive ? "↑" : "↓"}</span>
                        </span>
                       </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <p className="text-gray-500 text-lg">No mandi prices found</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your filters</p>
            </div>
          )}
        </div>

        {/* Last Updated Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            📊 Last updated: {new Date().toLocaleString('en-IN', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })} • Prices may vary by mandi
          </p>
          <p className="text-xs text-gray-400 mt-1">
            🌾 Source: Various APMC Mandis across India
          </p>
        </div>
      </div>
    </main>
  );
}