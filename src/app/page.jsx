"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaLeaf,
  FaUserTie,
  FaNewspaper,
  FaChalkboardTeacher,
  FaUsers,
  FaLanguage,
  FaTractor,
  FaChartLine,
  FaCloudSun,
  FaRupeeSign,
  FaWhatsapp,
  FaGlobe,
  FaTwitter,
  FaFacebook,
  FaYoutube,
  FaPhone,
  FaChevronRight,
  FaCheckCircle,
  FaQuoteLeft,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";

export default function HomePage() {
  const [language, setLanguage] = useState("en");
  const [news, setNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  // Add this with your other useState declarations
const [currentIndex, setCurrentIndex] = useState(0);

// Agriculture images for slideshow
const images = [
  {
    url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2070&auto=format&fit=crop",
    alt: "Green agricultural fields"
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1661880663489-7cbf2addd19d?q=80&w=1259&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Indian farmer in field"
  },
  {
    url: "https://images.unsplash.com/photo-1691693813200-1b2ef1836a03?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Wheat harvest"
  },
  {
    url: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=2070&auto=format&fit=crop",
    alt: "Rice paddy fields"
  },
  {
    url: "https://images.unsplash.com/photo-1620200423727-8127f75d7f53?q=80&w=1170&auto=format&fit=crop",
    alt: "Smart farming technology"
  }
];
// Auto-slide every 2 seconds
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, 2000); // 2 seconds interval

  return () => clearInterval(interval);
}, [images.length]);
  // Content based on language
  const content = {
    en: {
      nav: {
        home: "Home",
        features: "Features",
        news: "News",
        officials: "Officials",
        guide: "Guide",
      },
      hero: {
        title: "Smart Krishi Sahayak",
        subtitle: "AI-Powered Agriculture Support System",
        description:
          "Empowering Indian farmers with real-time insights, AI crop recommendations, mandi prices, weather forecasts, and expert guidance — all in your pocket.",
        cta1: "Get Started Free",
        cta2: "Watch Demo",
      },
      stats: {
        farmers: "Active Farmers",
        states: "States Covered",
        crops: "Crops Supported",
        satisfaction: "Satisfaction Rate",
      },
      features: {
        title: "Why Choose Smart Krishi Sahayak?",
        subtitle: "Technology that works for you",
        items: [
          {
            icon: <FaChartLine />,
            title: "AI Crop Recommendations",
            desc: "Personalized crop suggestions based on your soil, weather, and season.",
          },
          {
            icon: <FaRupeeSign />,
            title: "Live Mandi Prices",
            desc: "Real-time market rates from 500+ mandis across India.",
          },
          {
            icon: <FaCloudSun />,
            title: "Weather Alerts",
            desc: "Hyper-local forecasts and pest/disease warnings.",
          },
          {
            icon: <FaPhone />,
            title: "Expert Support",
            desc: "Connect with agriculture experts via Call.",
          },
        ],
      },
      news: {
        title: "Agriculture News & Updates",
        viewAll: "View All News",
      },
      officials: {
        title: "Government Agriculture Officials",
        subtitle: "Key leaders working for farmers' welfare",
        note: "*List of key officials in the Ministry of Agriculture & Farmers Welfare",
        department: "Department of Agriculture & Farmers Welfare",
        // In your content.hi.officers and content.en.officers arrays, update with:
officers: [
  {
    name: "Shivraj Singh Chouhan",
    position: "Union Minister",
    department: "Agriculture & Farmers Welfare",
    responsibility: "Overall policy direction & farmer welfare",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_tPfcnIsStIgDtmLSzA0hhiUqFBEbDSj-cg&s",
    contact: "minister-agri@gov.in"
  },
  {
    name: "Bhagirath Choudhary",
    position: "Minister of State",
    department: "Agriculture & Farmers Welfare",
    responsibility: "Agricultural extension & farmer outreach",
    image: "https://www.khabredinraat.com/wp-content/uploads/2024/06/mantri.jpg",
    contact: "mos-agri@gov.in"
  },
  {
    name: "Atish Chandra (IAS)",
    position: "Agriculture Secretary",
    department: "Ministry of Agriculture",
    responsibility: "Administrative head & policy implementation",
    image: "https://apacnewsnetwork.com/wp-content/uploads/2026/03/News123.webp",
    contact: "secy-agri@gov.in"
  },
  {
    name: "Chinmay P. Gotmare (IAS)",
    position: "Joint Secretary",
    department: "Dept. of Agriculture",
    responsibility: "Policy coordination & scheme implementation",
    image: "https://witnessinthecorridors.com/ImgNewsPolitical/260101175357915.png",
    contact: "js-agri@gov.in"
  }
],
        helpline: "Kisan Call Center: 1800-180-1551 (Toll Free)",
      },
      guide: {
        title: "How Smart Krishi Sahayak Works",
        subtitle: "Simple 3-step process to smarter farming",
        steps: [
          {
            step: "1",
            title: "Sign Up & Create Profile",
            desc: "Register with your basic details - name, location, state, and farm size.",
          },
          {
            step: "2",
            title: "Get AI Recommendations",
            desc: "Upload soil image or enter crop preferences for personalized advice.",
          },
          {
            step: "3",
            title: "Stay Informed & Grow",
            desc: "Access mandi prices, weather alerts, and expert help daily.",
          },
        ],
      },
      testimonials: {
        title: "Trusted by 2K+ Farmers",
        subtitle: "Real stories from our farming community",
        items: [
          {
            name: "Ramesh Singh",
            location: "Ludhiana, Punjab",
            text: "Weather alerts saved my wheat crop from unexpected rain! The mandi prices helped me get 20% better rates.",
            rating: 5,
          },
          {
            name: "Savitri Devi",
            location: "Jaipur, Rajasthan",
            text: "AI crop recommendation suggested bajra instead of wheat. Got the best yield in 5 years!",
            rating: 5,
          },
          {
            name: "Mohammed Iqbal",
            location: "Malegaon, Maharashtra",
            text: "Very easy to use even on my basic phone. The WhatsApp support is very helpful.",
            rating: 5,
          },
        ],
      },
      cta: {
        title: "Ready to transform your farming?",
        subtitle: "Join thousands of smart farmers using Smart Krishi Sahayak",
        button: "Create Free Account",
      },
      faq: {
  title: "Frequently Asked Questions",
  subtitle: "Everything farmers need to know",
  items: [
    {
      question: "Is Smart Krishi Sahayak free to use?",
      answer:
        "Yes, Smart Krishi Sahayak is completely free for farmers. Users can access crop recommendations, mandi prices, weather updates, and AI analysis without any cost.",
    },
    {
      question: "Which states are currently supported?",
      answer:
        "Currently, the platform supports Punjab, Haryana, Delhi, Uttar Pradesh, Rajasthan, and Bihar. More states will be added in future updates.",
    },
    {
      question: "Does the platform work offline?",
      answer:
        "Some features like previously loaded data can be viewed offline. However, live weather updates, mandi prices, and AI analysis require internet connection.",
    },
    {
      question: "How does the AI soil analysis work?",
      answer:
        "Farmers can upload soil or farmland images. The AI system analyzes soil conditions and suggests suitable crops based on soil type, moisture, and regional conditions.",
    },
  ],
},
      footer: {
        tagline: "Empowering Indian farmers with smart technology",
        quickLinks: "Quick Links",
        support: "Support",
        follow: "Follow Us",
        copyright: "© 2026 Smart Krishi Sahayak. All rights reserved.",
      },
    },
    hi: {
      nav: {
        home: "होम",
        features: "सुविधाएँ",
        news: "समाचार",
        officials: "अधिकारी",
        guide: "गाइड",
      },
      hero: {
        title: "स्मार्ट कृषि सहायक",
        subtitle: "एआई-संचालित कृषि सहायता प्रणाली",
        description:
          "भारतीय किसानों को वास्तविक समय की जानकारी, एआई फसल सलाह, मंडी भाव, मौसम पूर्वानुमान और विशेषज्ञ मार्गदर्शन से सशक्त बनाना — आपकी जेब में।",
        cta1: "मुफ्त शुरू करें",
        cta2: "डेमो देखें",
      },
      stats: {
        farmers: "सक्रिय किसान",
        states: "कवर राज्य",
        crops: "समर्थित फसलें",
        satisfaction: "संतुष्टि दर",
      },
      features: {
        title: "स्मार्ट कृषि सहायक क्यों चुनें?",
        subtitle: "प्रौद्योगिकी जो आपके लिए काम करती है",
        items: [
          {
            icon: <FaChartLine />,
            title: "एआई फसल सलाह",
            desc: "आपकी मिट्टी, मौसम और मौसम के आधार पर व्यक्तिगत फसल सुझाव।",
          },
          {
            icon: <FaRupeeSign />,
            title: "लाइव मंडी भाव",
            desc: "500+ मंडियों से वास्तविक समय के बाजार मूल्य।",
          },
          {
            icon: <FaCloudSun />,
            title: "मौसम अलर्ट",
            desc: "हाइपर-लोकल पूर्वानुमान और कीट/रोग चेतावनी।",
          },
          {
            icon: <FaPhone />,
            title: "विशेषज्ञ सहायता",
            desc: "कॉल के माध्यम से कृषि विशेषज्ञों से जुड़ें।",
          },
        ],
      },
      news: {
        title: "कृषि समाचार और अपडेट",
        viewAll: "सभी समाचार देखें",
      },
      officials: {
        title: "सरकारी कृषि अधिकारी",
        subtitle: "किसानों के कल्याण के लिए काम करने वाले प्रमुख नेता",
        note: "*कृषि एवं किसान कल्याण मंत्रालय के प्रमुख अधिकारियों की सूची",
        department: "कृषि एवं किसान कल्याण विभाग",
        officers: [
          {
            name: "शिवराज सिंह चौहान",
            position: "केंद्रीय मंत्री",
            department: "कृषि एवं किसान कल्याण",
             image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_tPfcnIsStIgDtmLSzA0hhiUqFBEbDSj-cg&s",
            responsibility: "समग्र नीति दिशा और किसान कल्याण",
          },
          {
            name: "भागीरथ चौधरी",
            position: "राज्य मंत्री",
            department: "कृषि एवं किसान कल्याण",
            image: "https://www.khabredinraat.com/wp-content/uploads/2024/06/mantri.jpg",
            responsibility: "कृषि विस्तार और किसान संपर्क",
          },
          {
            name: "अतीश चंद्र",
            position: "कृषि सचिव",
            department: "कृषि मंत्रालय",
            image: "https://apacnewsnetwork.com/wp-content/uploads/2026/03/News123.webp",
            responsibility: "प्रशासनिक प्रमुख और नीति कार्यान्वयन",
          },
          {
            name: "चिन्मय पी. गोटमारे (IAS)",
            position: "संयुक्त सचिव",
            department: "कृषि विभाग",
            image: "https://witnessinthecorridors.com/ImgNewsPolitical/260101175357915.png",
            responsibility: "नीति समन्वय और योजना कार्यान्वयन",
          },
        ],
        helpline: "किसान कॉल सेंटर: 1800-180-1551 (टोल फ्री)",
      },
      guide: {
        title: "स्मार्ट कृषि सहायक कैसे काम करता है",
        subtitle: "स्मार्ट खेती के लिए सरल 3-चरणीय प्रक्रिया",
        steps: [
          {
            step: "१",
            title: "साइन अप करें और प्रोफाइल बनाएं",
            desc: "अपना नाम, स्थान, राज्य और खेत का आकार पंजीकृत करें।",
          },
          {
            step: "२",
            title: "एआई सलाह प्राप्त करें",
            desc: "मिट्टी की फोटो अपलोड करें और व्यक्तिगत फसल सलाह पाएँ।",
          },
          {
            step: "३",
            title: "जानकार रहें और बढ़ें",
            desc: "रोजाना मंडी भाव, मौसम अलर्ट और विशेषज्ञ सहायता प्राप्त करें।",
          },
        ],
      },
      testimonials: {
        title: "20 लाख+ किसानों का भरोसा",
        subtitle: "हमारे किसान समुदाय की वास्तविक कहानियाँ",
        items: [
          {
            name: "रमेश सिंह",
            location: "लुधियाना, पंजाब",
            text: "मौसम अलर्ट ने अप्रत्याशित बारिश से मेरी गेहूं की फसल बचा ली! मंडी भाव से 20% बेहतर दर मिली।",
            rating: 5,
          },
          {
            name: "सावित्री देवी",
            location: "जयपुर, राजस्थान",
            text: "एआई फसल सलाह ने बाजरा की सिफारिश की। 5 सालों में सबसे अच्छी पैदावार मिली!",
            rating: 5,
          },
          {
            name: "मोहम्मद इकबाल",
            location: "मालेगांव, महाराष्ट्र",
            text: "बेसिक फोन पर भी बहुत आसान। व्हाट्सएप सपोर्ट बहुत मददगार है।",
            rating: 5,
          },
        ],
      },
      cta: {
        title: "अपनी खेती को बदलने के लिए तैयार हैं?",
        subtitle: "स्मार्ट कृषि सहायक का उपयोग करने वाले हजारों किसानों से जुड़ें",
        button: "मुफ्त खाता बनाएं",
      },
      faq: {
  title: "अक्सर पूछे जाने वाले प्रश्न",
  subtitle: "किसानों के लिए आवश्यक जानकारी",
  items: [
    {
      question: "क्या स्मार्ट कृषि सहायक मुफ्त है?",
      answer:
        "हाँ, स्मार्ट कृषि सहायक किसानों के लिए पूरी तरह मुफ्त है। किसान फसल सलाह, मंडी भाव, मौसम अपडेट और एआई विश्लेषण बिना किसी शुल्क के उपयोग कर सकते हैं।",
    },
    {
      question: "कौन-कौन से राज्य समर्थित हैं?",
      answer:
        "वर्तमान में यह प्लेटफ़ॉर्म पंजाब, हरियाणा, दिल्ली, उत्तर प्रदेश, राजस्थान और बिहार को सपोर्ट करता है। भविष्य में और राज्यों को जोड़ा जाएगा।",
    },
    {
      question: "क्या यह प्लेटफ़ॉर्म ऑफलाइन काम करता है?",
      answer:
        "कुछ फीचर्स जैसे पहले से लोड किया गया डेटा ऑफलाइन देखा जा सकता है। लेकिन लाइव मौसम, मंडी भाव और एआई विश्लेषण के लिए इंटरनेट आवश्यक है।",
    },
    {
      question: "एआई मिट्टी विश्लेषण कैसे काम करता है?",
      answer:
        "किसान मिट्टी या खेत की तस्वीर अपलोड कर सकते हैं। एआई सिस्टम मिट्टी की स्थिति का विश्लेषण करके उपयुक्त फसल सुझाव देता है।",
    },
  ],
},
      footer: {
        tagline: "स्मार्ट तकनीक से भारतीय किसानों को सशक्त बनाना",
        quickLinks: "त्वरित लिंक",
        support: "सहायता",
        follow: "हमें फॉलो करें",
        copyright: "© 2026 स्मार्ट कृषि सहायक। सभी अधिकार सुरक्षित।",
      },
    },
  };

  // Fetch real news from NewsAPI (using a proxy or backend)
  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Using a CORS proxy - for production, you should have a backend API
        const response = await fetch(
          `http://localhost:5000/api/news?language=en`
        );
        if (response.ok) {
          const data = await response.json();
          if (data.news) {
  setNews(data.news);
}
        }
      } catch (error) {
        console.log("News fetch error, using fallback data");
        // Fallback news data
        setNews([
          {
            title:
              "Agriculture Minister announces ₹5,659 cr mission for cotton productivity",
            source: { name: "Indian Express" },
            publishedAt: "2026-05-06",
            url: "#",
          },
          {
            title:
              "Food stocks abundant, no shortage in country: Shivraj Singh Chouhan",
            source: { name: "News On AIR" },
            publishedAt: "2026-05-11",
            url: "#",
          },
          {
            title:
              "Government accelerates maize procurement in Telangana amid high yield",
            source: { name: "The Hindu" },
            publishedAt: "2026-05-09",
            url: "#",
          },
          {
            title:
              "ICAR ties up with Panvel civic body to clear invasive lake weeds",
            source: { name: "Times of India" },
            publishedAt: "2026-05-08",
            url: "#",
          },
          {
            title:
              "Nitin Gadkari emphasizes AI & planning to reduce farmer distress",
            source: { name: "UNI India" },
            publishedAt: "2026-05-10",
            url: "#",
          },
          {
            title: "Paddy procurement scaled up amid unseasonal rain threats",
            source: { name: "Telangana Today" },
            publishedAt: "2026-05-04",
            url: "#",
          },
        ]);
      } finally {
        setLoadingNews(false);
      }
    };
    fetchNews();
  }, [language]);

  const t = content[language];

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
 

      {/* Navigation Bar */}
<nav className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-40">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    <div className="flex items-center justify-between h-16">
      
      {/* Logo */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="bg-green-600 p-2 rounded-lg">
          <FaLeaf className="text-white text-xl" />
        </div>

        <span className="font-bold text-lg lg:text-2xl text-green-800 whitespace-nowrap">
          Smart Krishi Sahayak
        </span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6 lg:gap-8">
        <a
          href="#"
          className="text-gray-700 hover:text-green-600 font-medium transition"
        >
          {t.nav.home}
        </a>

        <a
          href="#features"
          className="text-gray-700 hover:text-green-600 font-medium transition"
        >
          {t.nav.features}
        </a>

        <a
          href="#news"
          className="text-gray-700 hover:text-green-600 font-medium transition"
        >
          {t.nav.news}
        </a>

        <a
          href="#officials"
          className="text-gray-700 hover:text-green-600 font-medium transition"
        >
          {t.nav.officials}
        </a>

        <a
          href="#guide"
          className="text-gray-700 hover:text-green-600 font-medium transition"
        >
          {t.nav.guide}
        </a>
      </div>

      {/* Language Switcher */}
      <div className="flex items-center bg-green-50 rounded-full p-1 shadow-sm flex-shrink-0">
        
        <button
          onClick={() => setLanguage("en")}
          className={`px-3 lg:px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1 ${
            language === "en"
              ? "bg-green-600 text-white shadow"
              : "text-gray-700 hover:bg-green-100"
          }`}
        >
          <FaGlobe size={13} />
          <span className="hidden sm:inline">English</span>
        </button>

        <button
          onClick={() => setLanguage("hi")}
          className={`px-3 lg:px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            language === "hi"
              ? "bg-green-600 text-white shadow"
              : "text-gray-700 hover:bg-green-100"
          }`}
        >
          हिंदी
        </button>
      </div>
    </div>
  </div>
</nav>

      {/* Hero Section - Full Screen Image Slider */}
<section className="relative h-screen min-h-[600px] overflow-hidden">
  {/* Image Slider */}
  <div className="absolute inset-0 w-full h-full">
    {images.map((image, index) => (
      <div
        key={index}
        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
          currentIndex === index ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img
          src={image.url}
          alt={image.alt}
          className="w-full h-full object-cover"
        />
      </div>
    ))}
  </div>

  {/* Content Overlay */}
  <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
    <div className="max-w-4xl mx-auto">
      {/* Animated Logo/Icon */}
      <div className="animate-bounce mb-6">
        <div className="bg-green-600/90 backdrop-blur-sm w-20 h-20 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
          <FaLeaf className="text-white text-4xl" />
        </div>
      </div>
      
      {/* Main Title */}
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 animate-fade-in">
        {t.hero.title}
      </h1>
      
      {/* Subtitle */}
      <p className="text-xl md:text-2xl lg:text-3xl text-green-300 font-semibold mb-6 animate-slide-up">
        {t.hero.subtitle}
      </p>
      
      {/* Description */}
      <p className="text-base md:text-lg text-gray-200 max-w-2xl mx-auto mb-8 animate-slide-up-delayed">
        {t.hero.description}
      </p>
      
      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up-delayed-2">
        <Link
          href="/signup"
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          {t.hero.cta1}
        </Link>
        <Link
          href="https://youtu.be/HuIaB5uZ1no?si=mZwargo46nYw1ixJ"
          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-2 border-white px-8 py-3 rounded-xl font-semibold transition-all duration-300"
        >
          {t.hero.cta2}
        </Link>
      </div>
      
      {/* Stats Badge */}
      <div className="mt-12 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
        <FaCheckCircle className="text-green-400" />
        <span className="text-white text-sm font-semibold">Trusted by 2K+ Farmers</span>
      </div>
    </div>
  </div>

  {/* Slide Indicators */}
  <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2">
    {images.map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentIndex(index)}
        className={`transition-all duration-300 rounded-full ${
          currentIndex === index
            ? "w-8 h-2 bg-green-500"
            : "w-2 h-2 bg-white/50 hover:bg-white/80"
        }`}
      />
    ))}
  </div>
</section>

      {/* Stats Section */}
      <section className="bg-white py-12 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-600">2K+</div>
              <div className="text-gray-600 mt-1">{t.stats.farmers}</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-600">28</div>
              <div className="text-gray-600 mt-1">{t.stats.states}</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-600">50+</div>
              <div className="text-gray-600 mt-1">{t.stats.crops}</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-600">94%</div>
              <div className="text-gray-600 mt-1">{t.stats.satisfaction}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {t.features.title}
            </h2>
            <p className="text-gray-600 mt-4">{t.features.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.features.items.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 text-center group"
              >
                <div className="bg-green-100 text-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300 text-2xl">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
<section id="news" className="py-16 bg-white">

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <div className="flex justify-between items-center mb-8 flex-wrap gap-4">

      <div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-2">

          <FaNewspaper className="text-green-600" />

          {t.news.title}

        </h2>

      </div>

      <button className="text-green-600 font-semibold hover:underline flex items-center gap-1">

        {t.news.viewAll}

        <FaChevronRight size={12} />

      </button>

    </div>

    {/* LOADING */}
    {loadingNews ? (

      <div className="text-center py-16">

        <p className="text-gray-500 text-lg">
          Loading latest agriculture news...
        </p>

      </div>

    ) : (

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {news.slice(0, 6).map((item, idx) => (

          <a
            key={idx}
            href={item.link || item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 bg-white hover:-translate-y-1"
          >

            {/* IMAGE */}
            {item.image_url && (

              <img
                src={item.image_url}
                alt="news"
                className="w-full h-52 object-cover"
              />

            )}

            <div className="p-5">

              {/* DATE */}
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">

                <FaCalendarAlt />

                <span>

                  {item.pubDate
                    ? new Date(item.pubDate).toLocaleDateString()
                    : "Latest News"}

                </span>

              </div>

              {/* TITLE */}
              <h3 className="font-bold text-gray-800 text-lg mb-3 line-clamp-3">

                {item.title}

              </h3>

              {/* SOURCE */}
              <p className="text-green-700 text-sm font-medium">

                {item.source_id || "Agriculture News"}

              </p>

            </div>

          </a>

        ))}

      </div>

    )}

  </div>

</section>

{/* Government Officials Section - Enhanced with Images */}
<section id="officials" className="py-16 bg-gradient-to-br from-green-50 via-emerald-50 to-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    {/* Section Header */}
    <div className="text-center mb-12">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4">
        <FaUserTie className="text-green-600 text-2xl" />
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
        {t.officials.title}
      </h2>
      <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
        {t.officials.subtitle}
      </p>
      <p className="text-sm text-gray-500 mt-2 italic">
        {t.officials.note}
      </p>
      <div className="w-20 h-1 bg-green-600 mx-auto mt-4 rounded-full"></div>
    </div>

    {/* Officials Grid */}
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {t.officials.officers.map((officer, idx) => (
        <div
          key={idx}
          className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
        >
          {/* Image Section */}
          <div className="relative h-48 bg-gradient-to-br from-green-100 to-emerald-100 overflow-hidden">
            {officer.image ? (
              <img
                src={officer.image}
                alt={officer.name}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <FaUserTie className="text-green-400 text-6xl mx-auto mb-2" />
                  <p className="text-green-600 text-sm font-semibold">Government Official</p>
                </div>
              </div>
            )}
            {/* Position Badge */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
              <p className="text-white text-xs font-semibold">{officer.position}</p>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-5">
            <h3 className="font-bold text-gray-800 text-lg group-hover:text-green-700 transition-colors">
              {officer.name}
            </h3>
            
            {/* Department with Icon */}
            <div className="flex items-start gap-2 mt-3">
              <div className="mt-0.5">
                <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <p className="text-gray-600 text-sm flex-1">{officer.department}</p>
            </div>

            {/* Responsibility with Icon */}
            <div className="flex items-start gap-2 mt-2">
              <div className="mt-0.5">
                <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed flex-1">{officer.responsibility}</p>
            </div>

            {/* Contact Info (Optional) */}
            {officer.contact && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-400">{officer.contact}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>

    {/* Helpline Section - Enhanced */}
    <div className="mt-12">
      <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-6 border border-yellow-200 shadow-lg">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-100 p-3 rounded-full animate-pulse">
              <FaPhoneAlt className="text-yellow-700 text-xl" />
            </div>
            <div>
              <p className="text-sm text-yellow-700 font-semibold">Toll-Free Helpline</p>
              <p className="text-lg md:text-xl font-bold text-yellow-800">{t.officials.helpline}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-yellow-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Available 24/7 • Mon-Sun • 6 AM to 10 PM</span>
          </div>
          <Link href="/contact">
          <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300">
            Call Now
          </button>
          </Link>
        </div>
      </div>
    </div>

    {/* Quick Stats */}
    <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="text-center p-3 bg-white rounded-xl shadow-sm">
        <p className="text-2xl font-bold text-green-600">28</p>
        <p className="text-xs text-gray-500">States Covered</p>
      </div>
      <div className="text-center p-3 bg-white rounded-xl shadow-sm">
        <p className="text-2xl font-bold text-green-600">50+</p>
        <p className="text-xs text-gray-500">Schemes</p>
      </div>
      <div className="text-center p-3 bg-white rounded-xl shadow-sm">
        <p className="text-2xl font-bold text-green-600">24/7</p>
        <p className="text-xs text-gray-500">Support</p>
      </div>
      <div className="text-center p-3 bg-white rounded-xl shadow-sm">
        <p className="text-2xl font-bold text-green-600">10+</p>
        <p className="text-xs text-gray-500">Languages</p>
      </div>
    </div>
  </div>
</section>

      {/* How It Works Guide */}
      <section id="guide" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center justify-center gap-2">
              <FaChalkboardTeacher className="text-green-600" />
              {t.guide.title}
            </h2>
            <p className="text-gray-600 mt-3">{t.guide.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {t.guide.steps.map((step, idx) => (
              <div
                key={idx}
                className="relative bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">
                  {step.step}
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-500">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {t.testimonials.title}
            </h2>
            <p className="text-gray-600 mt-2">{t.testimonials.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {t.testimonials.items.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <FaQuoteLeft className="text-green-200 text-3xl mb-4" />
                <p className="text-gray-600 italic mb-4">"{item.text}"</p>
                <div>
                  <p className="font-bold text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-700 to-green-800">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {t.cta.title}
          </h2>
          <p className="text-green-100 mt-4 text-lg">{t.cta.subtitle}</p>
          <Link
            href="/signup"
            className="inline-block mt-8 bg-white text-green-700 hover:bg-gray-100 px-8 py-3 rounded-xl font-bold shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            {t.cta.button}
          </Link>
        </div>
      </section>

      {/* FAQ SECTION */}
<section className="py-16 bg-white">

  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

    <div className="text-center mb-12">

      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
        {t.faq.title}
      </h2>

      <p className="text-gray-600 mt-3">
        {t.faq.subtitle}
      </p>

    </div>

    <div className="space-y-5">

      {t.faq.items.map((item, index) => (

        <div
          key={index}
          className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all duration-300"
        >

          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">


            {item.question}

          </h3>

          <p className="text-gray-600 leading-relaxed">
            {item.answer}
          </p>

        </div>
      ))}

    </div>

  </div>

</section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-green-600 p-2 rounded-lg">
                  <FaLeaf className="text-white" />
                </div>
                <span className="font-bold text-xl text-white">
                  Smart Krishi Sahayak
                </span>
              </div>
              <p className="text-sm">{t.footer.tagline}</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">{t.footer.quickLinks}</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-green-400">
                    About Us
                  </a>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-green-400">
                    Contact
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">{t.footer.support}</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/contact" className="hover:text-green-400">
                    Help Center
                  </Link>
                </li>
                <li>
                  <a href="/coming-soon" className="hover:text-green-400">
                    Farmer Support
                  </a>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-green-400">
                    Kisan Call Center
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">{t.footer.follow}</h3>
              <div className="flex gap-4">
                <a href="#" className="hover:text-green-400 text-xl">
                  <FaTwitter />
                </a>
                <a href="#" className="hover:text-green-400 text-xl">
                  <FaFacebook />
                </a>
                <a href="#" className="hover:text-green-400 text-xl">
                  <FaYoutube />
                </a>
                <a href="#" className="hover:text-green-400 text-xl">
                  <FaWhatsapp />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-10 pt-8 text-center text-sm">
            {t.footer.copyright}
          </div>
        </div>
      </footer>
    </main>
  );
}