// components/Header.jsx
import React from "react";

export default function Header() {
  return (
    <header className="bg-blue-900 text-white w-full">
        
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">eCommax</h1>
        <nav className="hidden md:flex space-x-4">
          <a href="#" className="hover:text-blue-300">Home</a>
          <a href="#" className="hover:text-blue-300">Products</a>
          <a href="#" className="hover:text-blue-300">Deals</a>
          <a href="#" className="hover:text-blue-300">Contact</a>
        </nav>
        <button className="md:hidden">☰</button>
      </div>
    </header>
  );
}
