import { ArrowRight, ChevronRight, Phone, Sparkles } from 'lucide-react'
import React from 'react'

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Rwanda's #1 Electronics Marketplace
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Buy & Sell <span className="text-blue-600">Electronics</span> with Confidence
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Shop 14,000+ verified phones, laptops & accessories. Secure payments, fast delivery in Kigali.
              </p>
              
              {/* Trust Signals */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">14,861</div>
                  <div className="text-sm text-gray-600">Active Listings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">10K+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">4.8★</div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30">
                  Browse Products
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-gray-400 transition flex items-center justify-center gap-2">
                  Sell Your Device
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Hero Image/Illustration */}
            <div className="relative hidden lg:block">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold animate-pulse">
                  🔥 Hot Deals Today
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-2xl p-6 shadow-xl transform hover:scale-105 transition">
                    <div className="w-full h-32 relative bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                      <Phone className="w-16 h-16 text-blue-600" />
                    </div>
                    <div className="text-sm font-semibold text-gray-900">iPhone 15 Pro</div>
                    <div className="text-xs text-gray-600">From 850K RWF</div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-xl transform hover:scale-105 transition mt-8">
                    <div className="w-full h-32 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                      <svg className="w-16 h-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="text-sm font-semibold text-gray-900">MacBook Pro</div>
                    <div className="text-xs text-gray-600">From 440K RWF</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default HeroSection