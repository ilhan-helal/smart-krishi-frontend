"use client";

import { useRouter } from "next/navigation";

import {
  FaTools,
  FaArrowLeft,
  FaLeaf,
  FaRocket,
  FaLanguage,
} from "react-icons/fa";

export default function ComingSoonPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-4 py-8">
      
      <div className="max-w-7xl w-full">


        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          
          {/* LEFT SIDE - ENGLISH */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 text-center border border-green-100">
            {/* ICON */}
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 text-green-700 p-6 rounded-full shadow-md">
                <FaTools size={42} />
              </div>
            </div>

            {/* TITLE */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
              Feature Coming Soon
            </h1>

            {/* SUBTITLE */}
            <p className="text-green-700 font-semibold text-base md:text-lg mt-4 flex items-center justify-center gap-2 flex-wrap">
              <FaRocket />
              We are continuously improving Smart Krishi Sahayak
            </p>

            {/* DESCRIPTION */}
            <p className="text-gray-500 mt-6 leading-relaxed text-base md:text-lg">
              This functionality is currently under development and will be available in upcoming updates.
              Our team is working to deliver a smarter, faster, and more impactful experience for farmers across India.
            </p>

            {/* HIGHLIGHT BOX */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mt-8">
              <div className="flex items-center justify-center gap-2 text-green-700 font-semibold mb-2">
                <FaLeaf />
                Smart Krishi Vision
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                AI-powered agriculture support, real-time market insights,
                weather intelligence, expert guidance, and smart farming solutions —
                all integrated into one digital platform.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE - HINDI */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 text-center border border-green-100">
            {/* ICON */}
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 text-green-700 p-6 rounded-full shadow-md">
                <FaTools size={42} />
              </div>
            </div>

            {/* TITLE - HINDI */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
              सुविधा जल्द आ रही है
            </h1>

            {/* SUBTITLE - HINDI */}
            <p className="text-green-700 font-semibold text-base md:text-lg mt-4 flex items-center justify-center gap-2 flex-wrap">
              <FaRocket />
              हम स्मार्ट कृषि सहायक को लगातार बेहतर बना रहे हैं
            </p>

            {/* DESCRIPTION - HINDI */}
            <p className="text-gray-500 mt-6 leading-relaxed text-base md:text-lg">
              यह सुविधा वर्तमान में विकासाधीन है और आगामी अपडेट में उपलब्ध होगी।
              हमारी टीम देश भर के किसानों के लिए एक स्मार्ट, तेज़ और अधिक प्रभावशाली अनुभव प्रदान करने के लिए काम कर रही है।
            </p>

            {/* HIGHLIGHT BOX - HINDI */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mt-8">
              <div className="flex items-center justify-center gap-2 text-green-700 font-semibold mb-2">
                <FaLeaf />
                स्मार्ट कृषि विजन
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                एआई-संचालित कृषि सहायता, वास्तविक समय बाजार अंतर्दृष्टि,
                मौसम पूर्वानुमान, विशेषज्ञ मार्गदर्शन, और स्मार्ट कृषि समाधान —
                सभी एक ही डिजिटल प्लेटफॉर्म पर एकीकृत।
              </p>
            </div>
          </div>
        </div>

        {/* CENTER BUTTON - Below both columns */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => router.back()}
            className="bg-green-600 hover:bg-green-700 transition-all duration-300 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg flex items-center justify-center gap-3"
          >
            <FaArrowLeft />
            वापस जाएं / Go Back
          </button>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-400">
            🌾 हम आपके लिए बेहतर कृषि समाधान ला रहे हैं | We are bringing better farming solutions for you
          </p>
        </div>
      </div>
    </main>
  );
}