import {
  Lock,
  RotateCcw,
  ShieldCheck,
  Truck,
  MessageCircle,
} from "lucide-react";
import React from "react";

const TrustBadges = () => {
  return (
    <section className="bg-gray-50 py-10 border-y">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            {
              icon: ShieldCheck,
              title: "Warranty Included",
              desc: "Up to 3 months warranty",
            },
            {
              icon: Truck,
              title: "Fast Delivery",
              desc: "Same day delivery in Kigali",
            },
            {
              icon: RotateCcw,
              title: "7-Day Returns",
              desc: "Test & return if not satisfied",
            },
            {
              icon: Lock,
              title: "Safe Payment",
              desc: "Pay on delivery available",
            },
            {
              icon: MessageCircle,
              title: "Local Support",
              desc: "Chat with us on WhatsApp",
            },
          ].map((badge, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="bg-blue-100 p-3 rounded-lg">
                <badge.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">
                  {badge.title}
                </div>
                <div className="text-xs text-gray-600 leading-snug">
                  {badge.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Local trust line */}
        <p className="text-center text-xs text-gray-500 mt-6">
          Trusted by customers across Kigali & Rwanda 🇷🇼
        </p>
      </div>
    </section>
  );
};

export default TrustBadges;
