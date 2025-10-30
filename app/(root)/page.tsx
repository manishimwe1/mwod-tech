// 'use client'

// import CategoryGrid from "@/components/CategoryGrid";
// import TrendingProducts from "@/components/TrendingProducts";

// export default function Home() {

//   return (
//     <main className="min-h-screen bg-white">
//       {/* <Hero /> */}
//       {/* <FeaturedProducts products={[]} /> */}
//       <CategoryGrid />
//       <TrendingProducts />
//     </main>
//   );
// }

'use client'

import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Star, Package, Truck, RotateCcw, Lock, ShieldCheck, TrendingUp, Eye, ChevronRight, ArrowRight, Check, Phone, MessageCircle, Search, Menu, X, Flame, Sparkles, Zap, Award } from 'lucide-react';
import HeroSection from '@/components/Hero';
import TrendingProducts from '@/components/TrendingProducts';
import SocialProof from '@/components/SocialProof';
import { Button } from '@/components/ui/button';

// Metadata configuration (add this to your actual page.tsx)
const pageMetadata = {
  title: 'ElectroX Rwanda | Buy & Sell Phones, Laptops & Electronics Online',
  description: "Rwanda's #1 marketplace for verified electronics. Shop 14,000+ phones, MacBooks, laptops & accessories. Secure payments. Fast delivery in Kigali.",
};

export default function EnhancedHomePage() {
  
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [email, setEmail] = useState('');

  // Scroll detection for sticky header
 

  // Exit intent detection
  useEffect(() => {
    let hasShownPopup = false;
    const handleMouseLeave = (e) => {
      if (e.clientY < 10 && !hasShownPopup) {
        hasShownPopup = true;
        setShowExitIntent(true);
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    alert(`Welcome discount sent to ${email}!`);
    setShowExitIntent(false);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* SEO - Hidden H1 */}
      <h1 className="sr-only">ElectroX - Buy and Sell Electronics in Rwanda - Phones, Laptops & More</h1>
      {/* Hero Section */}
      <HeroSection/>

      {/* Trust Badges */}
      <section className="bg-gray-50 py-8 border-y">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheck, title: 'Verified Sellers', desc: 'All sellers verified' },
              { icon: Truck, title: 'Fast Delivery', desc: 'Same day in Kigali' },
              { icon: RotateCcw, title: '7-Day Returns', desc: 'Easy returns policy' },
              { icon: Lock, title: 'Secure Payment', desc: '100% protected' }
            ].map((badge, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <badge.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{badge.title}</div>
                  <div className="text-xs text-gray-600">{badge.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16 lg:py-20 px-4 bg-gray-50">
        <TrendingProducts/>
        <div className="max-w-7xl mx-auto">
          
        </div>
      </section>

      <SocialProof/>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Buy or Sell?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of satisfied customers on Rwanda's most trusted electronics marketplace
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-blue-500 text-white px-4 py-6 shadow rounded-lg font-bold text-lg hover:bg-blue-700 cursor-pointer transition shadow-xl">
              Start Shopping Now
            </Button>
            <Button variant={'secondary'} className="text-blue-500 px-4 py-5.5 rounded-lg font-bold text-lg hover:bg-blue-100 cursor-pointer transition border-2 border-blue-500">
              List Your Product
            </Button>
          </div>
        </div>
      </section>

      {/* Exit Intent Popup */}
      {showExitIntent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowExitIntent(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Wait! Get 10% Off Your First Purchase
              </h3>
              <p className="text-gray-600">
                Subscribe to our newsletter and receive an exclusive discount code
              </p>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Get My 10% Discount Code
              </button>
              <p className="text-xs text-gray-500 text-center">
                No spam, unsubscribe anytime. Terms apply.
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Contact Buttons */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex gap-2 z-40 shadow-lg">
        <a
          href="tel:+250788123456"
          className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
        >
          <Phone className="w-4 h-4" />
          Call Us
        </a>
        <a
          href="https://wa.me/250788123456"
          className="flex-1 bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </a>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-xl">ElectroX</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Your ultimate destination for high-quality electronics and unbeatable deals. Discover innovation, reliability, and exceptional customer service.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-4">Shop</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="/products" className="hover:text-white transition">Products</a></li>
                <li><a href="/deals" className="hover:text-white transition">Deals</a></li>
                <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-bold text-lg mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="/how-to-sell" className="hover:text-white transition">How to Sell</a></li>
                <li><a href="/buying-guide" className="hover:text-white transition">Buying Guide</a></li>
                <li><a href="/warranty-info" className="hover:text-white transition">Warranty Info</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-lg mb-4">Contact Us</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li>Email: info@electrox.com</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Address: 123 Tech Lane, Innovation City, TX 78701</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}