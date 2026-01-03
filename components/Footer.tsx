// components/Footer.jsx
import Image from "next/image";

export default function Footer() {
  return (
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 relative h-10 bg-white rounded-lg flex items-center justify-center">
                  <Image src="/logo.png" alt="mwod technology" fill />
                </div>
                <span className="font-bold text-xl">Easy Fix</span>
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
                <li>Email: baganinezjb@gmail.com</li>
                <li>Phone: +250783805516</li>
                <li>Address: 123 Tech Lane, Innovation City, TX 78701</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()}. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
  );
}
