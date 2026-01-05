"use client";

import {
  Menu,
  Search,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCart,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import UserButton from "./userButton";
import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "convex/react";
import { NavLinks } from "@/constants";
import { cn } from "@/lib/utils";

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setshowSearch] = useState(false);
  const [searchValue, setsearchValue] = useState("");

  const session = useSession();

  const user = useQuery(
    api.users.getUserByEmail,
    session.data ? { email: session.data.user.email ?? "" } : "skip"
  );
  const cartItems = useQuery(
    api.cart.get,
    user?._id ? { userId: user._id as any } : "skip"
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-close search when open & empty after 5 sec
  useEffect(() => {
    if (!showSearch) return;

    // If user is typing, do not auto-close
    if (searchValue.trim() !== "") return;

    const timer = setTimeout(() => {
      setshowSearch(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, [showSearch, searchValue]);

  // Close search when clicking outside
  useEffect(() => {
    if (!showSearch) return;

    const handleClickOutside = (e: MouseEvent) => {
      const searchEl = document.getElementById("mobile-search-bar");
      if (searchEl && !searchEl.contains(e.target as Node)) {
        setshowSearch(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showSearch]);

  return (
    <header
      className={`sticky top-0 z-50  transition-all duration-300 rounded-b-lg
    backdrop-blur-xl 
    bg-white/50 
    shadow-[0_4px_20px_rgba(0,0,0,0.07)]
    border-b border-blue-600/10 overflow-hidden
  `}
    >
      <nav className="bg-blue-400/10 rounded-b-lg ">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-12 lg:h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center relative gap-2 h-10 lg:h-40 w-10 lg:w-40 rounded-full">
                <Link href="/" className="text-2xl font-bold text-green-600">
                  <Image
                    src="/logo1.png"
                    alt="logo"
                    fill
                    priority
                    className="object-cover"
                  />
                </Link>
              </div>
              {/* <span className="font-bold text-xl text-gray-900 hidden sm:inline">
              mwod technology
            </span> */}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {NavLinks.map((item, i) => (
                <Link
                  key={i}
                  href={item === "Browse" ? "/" : `/${item.toLowerCase()}`}
                  className={cn(
                    "text-gray-800 font-medium hover:text-blue-600 transition-all hover:scale-[1.03]",
                    item === "SuperDeals" ? "text-blue-600 font-semibold" : ""
                  )}
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-xl mx-6">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search for phones, laptops, accessories..."
                  className="w-full pl-10 pr-4 py-2 border  placeholder:text-stone-500 text-stone-800 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  aria-label="Search products"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <div className="lg:hidden flex items-center">
                <Button
                  className="p-2 hover:bg-gray-100 cursor-pointer rounded-lg transition"
                  aria-label="Menu"
                  variant={"ghost"}
                  size={"sm"}
                  onClick={() => setshowSearch(!showSearch)}
                >
                  <Search className="w-6 h-6 text-gray-700" />
                </Button>
              </div>
              <Link href={"/cart"} prefetch>
                <Button
                  className="relative p-2 hover:bg-gray-100 cursor-pointer rounded-lg transition"
                  aria-label="Shopping cart"
                  variant={"secondary"}
                  size={"sm"}
                >
                  <ShoppingCart className="w-6 h-6 text-gray-700" />
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItems?.length ?? 0}
                  </span>
                </Button>
              </Link>
              {user ? (
                <UserButton />
              ) : (
                <Button
                  className="relative p-2 hover:bg-gray-100 cursor-pointer rounded-lg transition"
                  aria-label="Shopping cart"
                  variant={"secondary"}
                  size={"sm"}
                >
                  Sign in
                </Button>
              )}
              <Button
                variant={"secondary"}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                aria-label="Menu"
                size={"sm"}
              >
                {showMobileMenu ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </Button>
            </div>
          </div>

          <div
            className={`md:hidden transition-all duration-300 ${
              showSearch
                ? "opacity-100 translate-y-0 "
                : "opacity-0 -translate-y-3 pointer-events-none"
            }`}
          >
            <div
              id="mobile-search-bar"
              className="
      fixed top-1 left-1/2 -translate-x-1/2
      w-[90%] 
      backdrop-blur-xl bg-black/60 
      shadow-xl rounded-2xl 
      border border-white/40 
      p-3 z-[999]
      transition-all duration-300
    "
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  autoFocus
                  type="search"
                  placeholder="Search electronics..."
                  className="
          w-full pl-10 pr-4 py-3
          bg-white 
          placeholder:text-gray-500 text-gray-800
          rounded-xl border border-white/30
          shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500
        "
                  aria-label="Search products"
                  value={searchValue}
                  onChange={(e) => setsearchValue(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="lg:hidden border-t bg-white ">
          <div className="px-4 py-4 space-y-3 flex flex-col items-center">
            {["Browse", "Sell", "About", "Dashboard"].map((item, i) => (
              <Link
                key={i}
                href={item === "Browse" ? "/" : `/${item.toLowerCase()}`}
                className="text-gray-800 py-2 w-[200px] font-medium hover:text-blue-600 transition-all hover:scale-[1.03]"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
