import { StarIcon } from 'lucide-react'
import React from 'react'

const SocialProof = () => {
  return (
      <section className="py-16 lg:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why 10,000+ Rwandans Trust ElectroX
            </h2>
            <p className="text-lg text-gray-600">Real reviews from real customers</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Jean Pierre M.',
                location: 'Kigali, Rwanda',
                text: 'Found my dream MacBook at an amazing price! Delivery was super fast and the laptop was exactly as described. Highly recommend!',
                rating: 5,
                avatar: '👨🏿'
              },
              {
                name: 'Marie Claire K.',
                location: 'Remera, Kigali',
                text: 'Best place to sell electronics in Rwanda. Sold my old iPhone in 2 days! The process was smooth and secure.',
                rating: 5,
                avatar: '👩🏿'
              },
              {
                name: 'David N.',
                location: 'Nyarutarama',
                text: 'Excellent customer service! They helped me choose the perfect laptop for my business. Very professional team.',
                rating: 5,
                avatar: '👨🏿‍💼'
              }
            ].map((review, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition border border-gray-100">
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-2xl">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{review.name}</p>
                    <p className="text-sm text-gray-600">{review.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button className="text-blue-600 font-semibold hover:underline">
              Read All 1,250+ Reviews →
            </button>
          </div>
        </div>
      </section>
  )
}

export default SocialProof