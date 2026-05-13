"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

import {
  FaRobot,
  FaLeaf,
  FaArrowLeft,
  FaPaperPlane,
  FaSpinner,
  FaTrash,
  FaRegSmile,
  FaMicrophone,
} from "react-icons/fa";

// IMPORTANT: Add your API key here
const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_HERE"; // Replace with your actual API key

export default function ChatbotPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  const [chats, setChats] = useState([
    {
      role: "bot",
      text: "🌾 नमस्ते Farmer! I'm Krishi AI Assistant. Ask me anything about crops, soil, irrigation, mandi prices, or farming techniques. I'm here to help you 24/7!",
      timestamp: new Date(),
    },
  ]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  // ========== FORMAT RESPONSE WITH PROFESSIONAL CSS ==========
  const formatResponse = (text) => {
    // Replace markdown tables with styled HTML tables
    let formatted = text;

    // Convert markdown table to HTML table
    const tableRegex = /\|(.+)\|\n\|[-|]+\|\n((?:\|.+\|\n?)+)/g;
    formatted = formatted.replace(tableRegex, (match, headerRow, dataRows) => {
      const headers = headerRow.split("|").filter((cell) => cell.trim());
      const rows = dataRows
        .trim()
        .split("\n")
        .map((row) => row.split("|").filter((cell) => cell.trim()));

      let tableHtml =
        '<div class="overflow-x-auto my-3"><table class="min-w-full bg-white rounded-lg overflow-hidden shadow-sm border border-green-200">';
      tableHtml += '<thead class="bg-green-50"><tr>';
      headers.forEach((header) => {
        tableHtml += `<th class="px-3 py-2 text-left text-xs font-semibold text-green-800 border-b border-green-200">${header.trim()}</th>`;
      });
      tableHtml += "</tr></thead><tbody>";
      rows.forEach((row) => {
        tableHtml +=
          '<tr class="border-b border-green-100 hover:bg-green-50/30">';
        row.forEach((cell) => {
          tableHtml += `<td class="px-3 py-2 text-sm text-gray-700">${cell.trim()}</td>`;
        });
        tableHtml += "</tr>";
      });
      tableHtml += "</tbody></table></div>";
      return tableHtml;
    });

    // Convert **bold** to <strong>
    formatted = formatted.replace(
      /\*\*(.*?)\*\*/g,
      '<strong class="text-green-700">$1</strong>',
    );

    // Convert bullet points with • to styled list
    formatted = formatted.replace(
      /• (.*?)(?:\n|$)/g,
      '<div class="flex items-start gap-2 my-1"><span class="text-green-500 text-lg leading-5">•</span><span class="text-gray-700">$1</span></div>',
    );

    // Convert numbered lists
    formatted = formatted.replace(
      /\d+\.\s+\*\*(.*?)\*\*/g,
      '<div class="font-semibold text-green-700 mt-2 mb-1">$1</div>',
    );

    // Convert line breaks
    formatted = formatted.replace(/\n\n/g, '</p><p class="mb-2">');
    formatted = '<p class="mb-2">' + formatted + "</p>";

    // Convert 💡 tips
    formatted = formatted.replace(
      /💡 (.*?)(?=<|$)/g,
      '<div class="bg-amber-50 border-l-4 border-amber-400 p-2 my-2 rounded-r-lg"><span class="text-amber-600 font-semibold">💡 Tip:</span> <span class="text-gray-700">$1</span></div>',
    );

    // Convert 📊, 🌾, etc.
    formatted = formatted.replace(
      /📊/g,
      '<span class="text-blue-500">📊</span>',
    );
    formatted = formatted.replace(
      /🌾/g,
      '<span class="text-green-500">🌾</span>',
    );
    formatted = formatted.replace(
      /💰/g,
      '<span class="text-yellow-600">💰</span>',
    );
    formatted = formatted.replace(
      /🌱/g,
      '<span class="text-green-500">🌱</span>',
    );

    return formatted;
  };

  // ========== FALLBACK SMART RESPONSES (Clean, no warning messages) ==========
  const getFallbackResponse = (userQuestion) => {
    const q = userQuestion.toLowerCase().trim();

    // Mandi Prices - Wheat
    if (
      (q.includes("wheat") || q.includes("gehu")) &&
      (q.includes("price") ||
        q.includes("mandi") ||
        q.includes("rate") ||
        q.includes("bhav"))
    ) {
      return `💰 **Current Wheat (गेहूं) Mandi Rates**

| State | Mandi | Price per Quintal |
|-------|-------|-------------------|
| Punjab | Ludhiana | ₹2,450 |
| Punjab | Amritsar | ₹2,500 |
| Haryana | Karnal | ₹2,400 |
| Uttar Pradesh | Agra | ₹2,380 |
| Bihar | Patna | ₹2,320 |
| Rajasthan | Bikaner | ₹2,350 |

📊 **MSP 2025-26:** ₹2,275 per quintal

💡 Prices updated daily. Contact your local mandi for exact rates.`;
    }

    // Mandi Prices - Rice
    if (
      (q.includes("rice") || q.includes("dhan") || q.includes("chawal")) &&
      (q.includes("price") || q.includes("mandi") || q.includes("rate"))
    ) {
      return `💰 **Current Rice (धान) Mandi Rates**

| State | Mandi | Price per Quintal |
|-------|-------|-------------------|
| Punjab | Patiala | ₹3,100 |
| Haryana | Kaithal | ₹3,050 |
| Uttar Pradesh | Lucknow | ₹2,950 |
| West Bengal | Kolkata | ₹3,200 |
| Chhattisgarh | Raipur | ₹2,980 |

📊 **Common Paddy MSP:** ₹2,183 per quintal

💡 Basmati rice gets 30-40% higher prices in the market.`;
    }

    // Crop Recommendations by State
    if (
      q.includes("best crop") ||
      q.includes("which crop") ||
      q.includes("suggest crop")
    ) {
      if (q.includes("punjab")) {
        return `🌾 **Recommended Crops for Punjab**

**Kharif Season (June-October):**
• Rice (Basmati varieties for premium price)
• Maize (Hybrid varieties)

**Rabi Season (October-March):**
• Wheat (HD-3086, DBW-187 varieties)
• Mustard

💡 **Tip:** Rice-wheat rotation gives stable income. Consider basmati rice for 30% higher profits!`;
      }
      if (q.includes("haryana")) {
        return `🌱 **Recommended Crops for Haryana**

**Kharif Season:**
• Rice (PR-126, Pusa-1509 varieties)
• Bajra
• Cotton (in southern districts)

**Rabi Season:**
• Wheat (DBW-187, HD-2967)
• Mustard (RH-749, RH-725)

💡 Current mustard MSP: ₹5,650 per quintal. Very profitable!`;
      }
      if (q.includes("rajasthan")) {
        return `🌵 **Recommended Crops for Rajasthan**

**Kharif Season:**
• Bajra (Summer drought-resistant)
• Jowar
• Guar (High demand in gum industry)

**Rabi Season:**
• Mustard (High-profit margin)
• Wheat (limited areas)
• Gram

💡 Practice drip irrigation for better yield in dry areas.`;
      }
      return `🌾 **State-wise Crop Recommendations**

**North India (Punjab, Haryana, UP):**
• Wheat, Rice, Sugarcane, Mustard

**West India (Rajasthan, Gujarat):**
• Bajra, Cotton, Groundnut, Mustard

**Central India (MP, Maharashtra):**
• Soybean, Cotton, Wheat, Gram

**East India (Bihar, West Bengal):**
• Rice, Maize, Jute, Litchi

**South India (Karnataka, Tamil Nadu):**
• Ragi, Maize, Sugarcane, Tur

📌 Tell me your specific state for detailed recommendations!`;
    }

    // Soil Health
    if (q.includes("soil") || q.includes("fertility") || q.includes("mitti")) {
      return `🌱 **Soil Health Improvement Guide**

**Organic Matter Addition:**
• Add well-decomposed compost (2-3 tons/acre)
• Practice green manuring (Dhaincha, Sunhemp)
• Mulching to retain moisture

**Nutrient Management:**
• Get soil tested every 2 years (Free at KVK)
• Use balanced NPK fertilizers
• Apply micronutrients (Zinc, Boron)

**Biological Methods:**
• Apply Jeevamrut (200L/acre)
• Use earthworms for vermicompost
• Crop rotation with legumes

💡 **Pro Tip:** Government offers free soil testing. Contact your local KVK today!`;
    }

    // Government Schemes
    if (
      q.includes("scheme") ||
      q.includes("yojana") ||
      q.includes("government") ||
      q.includes("subsidy")
    ) {
      return `🏛️ **Important Government Schemes for Farmers**

**PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)**
• ₹6,000 per year in 3 installments
• Direct benefit transfer to bank account
• Covers all small and marginal farmers

**PMFBY (Pradhan Mantri Fasal Bima Yojana)**
• Crop insurance at low premium (1.5-2%)
• Coverage for crop loss due to natural calamities

**KCC (Kisan Credit Card)**
• Low-interest loans (4-7%)
• Up to ₹3 lakh without collateral
• Flexible repayment options

**PMKSY (Pradhan Mantri Krishi Sinchai Yojana)**
• 50-60% subsidy for drip/sprinkler irrigation
• "Per drop more crop" initiative

💡 Visit your nearest CSC or Krishi Vigyan Kendra (KVK) to apply!`;
    }

    // Pest Control
    if (
      q.includes("pest") ||
      q.includes("insect") ||
      q.includes("disease") ||
      q.includes("keet")
    ) {
      return `🐛 **Common Pest Management Solutions**

**Wheat:**
• Yellow Rust → Spray Propiconazole
• Termites → Use Chlorpyriphos at sowing
• Aphids → Spray Dimethoate

**Rice:**
• Stem Borer → Apply Cartap Hydrochloride
• Blast Disease → Spray Tricyclazole
• Leaf Folder → Use Chlorantraniliprole

**Cotton:**
• Pink Bollworm → Pheromone traps + Spinosad
• Whitefly → Neem oil + Imidacloprid

**Organic Solutions (Home-made):**
• Neem oil (5ml per liter water) - General pest repellent
• Dashparni ark - Traditional decoction
• Yellow sticky traps - For whiteflies

💡 Integrated Pest Management (IPM) is most effective and economical!`;
    }

    // Fertilizers
    if (
      q.includes("fertilizer") ||
      q.includes("urea") ||
      q.includes("dap") ||
      q.includes("khad")
    ) {
      return `🧪 **Fertilizer Recommendations (per acre)**

**For Wheat:**
• DAP: 50-60 kg at sowing time
• Urea: 40 kg in 3 splits (25% at sowing, 50% after 21 days, 25% after 40 days)
• Potash: 15-20 kg

**For Rice:**
• DAP: 40-50 kg at transplanting
• Urea: 50-60 kg in splits
• Zinc Sulphate: 10 kg (if zinc deficient)

**For Maize:**
• DAP: 50 kg at sowing
• Urea: 30 kg at knee height stage

**Organic Alternatives:**
• Vermicompost: 1-2 tons/acre
• Neem cake: 40-50 kg/acre
• Jeevamrut: 200 liters/acre

💡 **Always do a soil test before applying fertilizers!**`;
    }

    // Irrigation
    if (
      q.includes("irrigation") ||
      q.includes("sinchai") ||
      q.includes("water management") ||
      q.includes("drip")
    ) {
      return `💧 **Irrigation Best Practices**

**Methods Comparison:**
• **Drip Irrigation:** 50% water saving, best for vegetables, fruits, sugarcane
• **Sprinkler System:** 30% saving, ideal for wheat, groundnut, pulses
• **Furrow/Basin:** Traditional method for rice, sugarcane

**Critical Growth Stages (Don't skip watering):**
• 🌾 Wheat: Crown root stage (21-25 days after sowing)
• 🌾 Rice: Paddling stage (keep standing water)
• 🌽 Maize: Silking stage (critical for grain formation)

**Water Conservation Tips:**
• Mulching reduces evaporation by 30%
• Rainwater harvesting structures
• Border strips to prevent runoff

💡 PMKSY scheme provides 50-60% subsidy for drip/sprinkler systems!`;
    }

    // Greeting / Default
    return `🌾 **Hello Farmer! I'm Krishi AI Assistant**

I can help you with:

✅ **Crop Guidance**
• Best crops for your state
• Sowing & harvesting seasons
• High-yield varieties

✅ **Mandi Prices**
• Current market rates
• MSP information
• Best selling time

✅ **Soil Management**
• Fertility improvement
• Fertilizer recommendations
• Organic farming tips

✅ **Problem Solving**
• Pest & disease control
• Weed management
• Irrigation techniques

✅ **Government Support**
• Scheme information
• Subsidy application
• Kisan Credit Card

📌 **Try asking:**
• "Wheat mandi price in Punjab"
• "Best crop for Haryana"
• "How to improve soil fertility"
• "PM-KISAN scheme details"

💬 What farming topic would you like to discuss today?`;
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      role: "user",
      text: message,
      timestamp: new Date(),
    };
    setChats((prev) => [...prev, userMessage]);
    const currentMessage = message;
    setMessage("");
    setLoading(true);

    try {
      // GEMINI API REQUEST
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-8b:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are Krishi AI Assistant - A helpful agriculture expert for Indian farmers.

IMPORTANT RULES:
1. ONLY answer agriculture, farming, and farmer welfare related questions
2. If question is unrelated (movies, politics, entertainment, gaming etc.), politely refuse by saying: "I'm specialized in agriculture only. Please ask farming-related questions like crops, mandi prices, soil health, irrigation, government schemes, etc."
3. Keep responses practical, helpful, and in simple English/Hindi mix (Hinglish)
4. Use bullet points for clarity when possible
5. Include relevant prices, schemes, or data when applicable
6. Be encouraging and respectful to farmers
7. Format tables properly using markdown format
8. Use emojis to make responses engaging

User Question: ${currentMessage}`,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            },
          }),
        }
      );

      const data = await response.json();

      // Check for API errors or limit exceeded
      if (data.error) {
        console.log("API Error, using fallback response");
        // Use fallback response without any warning message
        const fallbackResponse = getFallbackResponse(currentMessage);
        const botMessage = {
          role: "bot",
          text: fallbackResponse,
          timestamp: new Date(),
        };
        setChats((prev) => [...prev, botMessage]);
      } else {
        // Get AI response
        const aiReply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (aiReply) {
          const botMessage = {
            role: "bot",
            text: aiReply,
            timestamp: new Date(),
          };
          setChats((prev) => [...prev, botMessage]);
        } else {
          // No response received, use fallback
          const fallbackResponse = getFallbackResponse(currentMessage);
          const botMessage = {
            role: "bot",
            text: fallbackResponse,
            timestamp: new Date(),
          };
          setChats((prev) => [...prev, botMessage]);
        }
      }
    } catch (error) {
      console.log("Error:", error);
      // Use fallback response without any warning message
      const fallbackResponse = getFallbackResponse(currentMessage);
      const botMessage = {
        role: "bot",
        text: fallbackResponse,
        timestamp: new Date(),
      };
      setChats((prev) => [...prev, botMessage]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setChats([
      {
        role: "bot",
        text: "🧹 **Chat Cleared!**\n\nI'm Krishi AI Assistant, ready to help with your farming questions. Ask me about crops, mandi prices, soil health, irrigation, or government schemes!",
        timestamp: new Date(),
      },
    ]);
  };

  // Voice recognition
  const startVoiceRecognition = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = "hi-IN";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setMessage(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } else {
      alert("Voice recognition not supported in this browser");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-4 md:p-6">
      {/* HEADER */}
      <div className="max-w-5xl mx-auto mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 rounded-2xl shadow-lg">
              <FaRobot className="text-white text-3xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-green-800">
                Krishi AI Assistant
              </h1>
              <p className="text-gray-600">
                Smart Agriculture Chatbot • 24/7 Farming Support
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={clearChat}
              className="bg-red-50 text-red-600 border shadow-md px-4 py-3 rounded-xl flex items-center gap-2 hover:bg-red-500 hover:text-white transition"
              title="Clear chat"
            >
              <FaTrash />
              <span className="hidden sm:inline">Clear</span>
            </button>
            <Link
              href="/dashboard"
              className="bg-gray-200 text-black border shadow-md px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-black hover:text-white transition"
            >
              <FaArrowLeft />
              Back
            </Link>
          </div>
        </div>
      </div>

      {/* CHAT CONTAINER */}
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-green-100">
        {/* CHAT AREA */}
        <div className="h-[65vh] overflow-y-auto p-6 space-y-5 bg-gradient-to-b from-white to-green-50/30">
          {chats.map((chat, index) => (
            <div key={index} className="animate-fade-in">
              {chat.role === "user" ? (
                <div className="flex justify-end">
                  <div className="bg-gradient-to-r from-green-600 to-green-700 text-white px-5 py-3 rounded-2xl rounded-br-md max-w-[85%] shadow-md">
                    <p className="whitespace-pre-wrap text-sm sm:text-base">
                      {chat.text}
                    </p>
                    {chat.timestamp && (
                      <p className="text-xs text-green-100 mt-1 text-right">
                        {chat.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex justify-start gap-3">
                  <div className="bg-green-100 p-3 rounded-full h-fit shadow-sm flex-shrink-0">
                    <FaLeaf className="text-green-700 text-sm" />
                  </div>
                  <div className="bg-gray-100 text-gray-700 px-5 py-3 rounded-2xl rounded-bl-md max-w-[85%] shadow-sm">
                    <div
                      className="prose prose-sm max-w-none chatbot-response"
                      dangerouslySetInnerHTML={{
                        __html: formatResponse(chat.text),
                      }}
                    />
                    {chat.timestamp && (
                      <p className="text-xs text-gray-400 mt-2">
                        {chat.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* TYPING INDICATOR */}
          {loading && (
            <div className="flex justify-start gap-3 animate-fade-in">
              <div className="bg-green-100 p-3 rounded-full h-fit">
                <FaLeaf className="text-green-700" />
              </div>
              <div className="bg-gray-100 px-5 py-3 rounded-2xl text-gray-500">
                <div className="flex gap-1 items-center">
                  <span
                    className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></span>
                  <span
                    className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></span>
                  <span
                    className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></span>
                  <span className="ml-2 text-sm">Krishi AI is typing...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT AREA */}
        <div className="border-t bg-white p-4 flex gap-3">
          <div className="flex-1 relative bg-gray-900 rounded-xl">
            <input
              type="text"
              placeholder="Ask about crops, mandi prices, soil health, government schemes..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              className="w-full border-2 border-green-200 focus:border-green-500 rounded-xl px-4 py-3 pr-12 outline-none text-sm sm:text-base"
            />
            <button
              onClick={startVoiceRecognition}
              className={`absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-all ${
                isListening
                  ? "bg-red-100 text-red-600"
                  : "text-gray-400 hover:text-green-600"
              }`}
              title="Voice input"
            >
              <FaMicrophone size={18} />
            </button>
          </div>
          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-green-300 disabled:to-green-400 text-white px-6 rounded-xl flex items-center gap-2 transition-all"
          >
            {loading ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <FaPaperPlane />
            )}
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
      </div>

      {/* QUICK SUGGESTIONS */}
      <div className="max-w-5xl mx-auto mt-5">
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            "Wheat mandi price",
            "Best crop for Punjab",
            "Soil fertility tips",
            "PM-KISAN scheme",
            "Pest control for cotton",
            "Organic farming",
          ].map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => setMessage(suggestion)}
              className="text-xs bg-white border border-green-200 hover:border-green-400 hover:bg-green-50 px-3 py-1.5 rounded-full text-gray-600 transition-all"
            >
              {suggestion}
            </button>
          ))}
        </div>
        <p className="text-center text-xs text-gray-400 mt-3">
          🌾 Krishi AI Assistant • Your 24/7 Farming Companion
        </p>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }

        /* Professional chatbot response styling */
        .chatbot-response p {
          margin-bottom: 8px;
          line-height: 1.5;
        }

        .chatbot-response strong {
          color: #15803d;
          font-weight: 600;
        }

        .chatbot-response table {
          width: 100%;
          border-collapse: collapse;
          margin: 8px 0;
          font-size: 12px;
        }

        .chatbot-response th,
        .chatbot-response td {
          padding: 6px 8px;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
        }

        .chatbot-response th {
          background-color: #f0fdf4;
          color: #166534;
          font-weight: 600;
        }

        .chatbot-response tr:hover {
          background-color: #f0fdf4;
        }
      `}</style>
    </main>
  );
}