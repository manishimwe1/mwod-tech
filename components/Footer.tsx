// components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="container mx-auto grid md:grid-cols-3 gap-6 text-center md:text-left">
        <div>
          <h3 className="font-semibold mb-2">eCommax</h3>
          <p className="text-sm">High-quality electronics & great deals.</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Links</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-blue-300">About</a></li>
            <li><a href="#" className="hover:text-blue-300">Contact</a></li>
            <li><a href="#" className="hover:text-blue-300">Privacy</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-3">
            <a href="#"><span>🔗</span></a>
            <a href="#"><span>🔗</span></a>
            <a href="#"><span>🔗</span></a>
          </div>
        </div>
      </div>
      <div className="text-center mt-4 text-sm text-blue-200">
        &copy; 2025 eCommax. All rights reserved.
      </div>
    </footer>
  );
}
