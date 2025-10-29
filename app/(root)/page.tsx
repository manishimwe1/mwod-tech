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

      {/* Featured Categories */}
      <section className="py-16 lg:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Shop by <span className="text-blue-600">Category</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse our verified collection of electronics at unbeatable prices
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Phones + iPhones',
                image: '📱',
                listings: 14861,
                views: 1422,
                gradient: 'from-blue-50 to-blue-100',
                slug: 'phones-iphones',
                priceFrom: '250,000'
              },
              {
                title: 'MacBooks + Laptops',
                image: '💻',
                listings: 920,
                views: 408,
                gradient: 'from-purple-50 to-purple-100',
                slug: 'computers-laptops',
                priceFrom: '440,000'
              },
              {
                title: 'Watches + Accessories',
                image: '⌚',
                listings: 1274,
                views: 264,
                gradient: 'from-pink-50 to-pink-100',
                slug: 'watches-accessories',
                priceFrom: '180,000'
              }
            ].map((category) => (
              <div
                key={category.slug}
                className={`group bg-gradient-to-br ${category.gradient} rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-2 cursor-pointer`}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                    <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Verified
                    </div>
                  </div>

                  {/* Image */}
                  <div className="bg-white rounded-xl h-48 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                    <span className="text-8xl">{category.image}</span>
                  </div>

                  {/* Price Teaser */}
                  <div className="mb-4 text-center">
                    <span className="text-sm text-gray-600">From </span>
                    <span className="text-2xl font-bold text-blue-600">{category.priceFrom}</span>
                    <span className="text-sm text-gray-600"> RWF</span>
                  </div>

                  {/* Stats */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center justify-between text-sm bg-white bg-opacity-50 rounded-lg p-3">
                      <span className="text-gray-700 flex items-center gap-2">
                        <Package className="w-4 h-4 text-blue-600" />
                        Active Listings
                      </span>
                      <strong className="text-gray-900">{category.listings.toLocaleString()}</strong>
                    </div>
                    <div className="flex items-center justify-between text-sm bg-white bg-opacity-50 rounded-lg p-3">
                      <span className="text-gray-700 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        Views Today
                      </span>
                      <strong className="text-gray-900">{category.views.toLocaleString()}</strong>
                    </div>
                  </div>

                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 group-hover:gap-3">
                    Browse {category.title}
                    <ArrowRight className="w-5 h-5 transition-transform" />
                  </button>
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
          

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: 1,
                title: 'HP Elitebook 840 G5 Laptop Intel Core i7 1.80 GHz 16GB RAM',
                price: 450000,
                originalPrice: 500000,
                image: '💻',
                condition: 'Like New',
                rating: 4.5,
                reviews: 127,
                views: 342,
                badge: 'NEW'
              },
              {
                id: 2,
                title: 'Dell 16 Plus Laptop DB16250 16.0-inch 16:10 2.5K Display',
                price: 440000,
                originalPrice: 490000,
                image: '🖥️',
                condition: 'Excellent',
                rating: 4.8,
                reviews: 89,
                views: 256,
                badge: 'NEW'
              },
              {
                id: 3,
                title: 'iPhone 15 Pro Max 256GB Titanium Blue - Factory Unlocked',
                price: 1250000,
                originalPrice: null,
                image: '📱',
                condition: 'Brand New',
                rating: 5.0,
                reviews: 203,
                views: 891,
                badge: 'HOT'
              }
            ].map((product) => (
              <article
                key={product.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
              >
                <div className="relative">
                  {/* Badge */}
                  <div className={`absolute top-3 left-3 z-10 ${product.badge === 'HOT' ? 'bg-orange-500' : 'bg-blue-600'} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                    {product.badge}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    className="absolute top-3 right-3 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full shadow-md transition"
                    aria-label="Add to wishlist"
                  >
                    <Heart className="w-4 h-4 text-gray-700 hover:text-red-500 hover:fill-red-500 transition" />
                  </button>

                  {/* Product Image */}
                  <div className="h-56 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative overflow-hidden">
                    <span className="text-8xl group-hover:scale-110 transition-transform duration-300">{product.image}</span>
                    
                    {/* Views Badge */}
                    {product.views > 200 && (
                      <div className="absolute bottom-3 left-3 bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                        <Flame className="w-3 h-3" />
                        {product.views} viewing
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-5">
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({product.reviews})</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-base text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition min-h-[3rem]">
                    {product.title}
                  </h3>

                  {/* Condition */}
                  <div className="mb-3">
                    <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-medium">
                      <Award className="w-3 h-3" />
                      {product.condition}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-bold text-gray-900">
                      {product.price.toLocaleString()}
                      <span className="text-sm font-normal text-gray-600"> RWF</span>
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {product.originalPrice && (
                    <div className="bg-green-50 rounded-lg p-2 mb-4">
                      <p className="text-xs text-green-800 text-center font-semibold">
                        💰 Save {(product.originalPrice - product.price).toLocaleString()} RWF
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 text-sm">
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <button className="bg-gray-100 hover:bg-gray-200 p-3 rounded-lg transition" aria-label="Quick view">
                      <Eye className="w-5 h-5 text-gray-700" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
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