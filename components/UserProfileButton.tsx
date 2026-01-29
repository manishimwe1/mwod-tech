"use client";

import { useState } from "react";
import { User, ChevronDown, LogOut, Settings, ShoppingBag, Heart } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AuthModal } from "./AuthModal";
import Image from "next/image";
import { useRouter } from "next/navigation";

type User = {
  name: string;
  email: string;
  image?: string;
};

type Props = {
  user: User | null; // null if not logged in
  onLogout?: () => void;
  onGoogleLogin: () => void; // Function to trigger Google OAuth
};

export function UserProfileButton({ user, onLogout, onGoogleLogin }: Props) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
const router = useRouter()
  // If user is not logged in, show login button
  if (!user) {
    return (
      <>
        <Button
          onClick={() => setIsAuthModalOpen(true)}
          variant="ghost"
          className="flex items-center gap-2 hover:bg-gray-100 transition-colors"
        >
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-gray-600" />
          </div>
          <span className="hidden md:inline text-sm font-medium">Sign In</span>
        </Button>

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onGoogleLogin={() => {
            setIsAuthModalOpen(false);
            onGoogleLogin();
          }}
        />
      </>
    );
  }

  // If user is logged in, show profile dropdown
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 hover:bg-gray-100 transition-colors"
        >
          <div className="relative">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-white"
              />
            ) : (
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center ring-2 ring-white">
                <span className="text-white text-sm font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <span className="hidden md:inline text-sm font-medium max-w-[120px] truncate">
            {user.name}
          </span>
          <ChevronDown className="w-4 h-4 text-gray-500 hidden md:block" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 mt-2">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-semibold text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>My Profile</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="cursor-pointer" onClick={()=>router.push('/cart')}>
          <ShoppingBag className="mr-2 h-4 w-4" />
          <span>My Orders</span>
        </DropdownMenuItem>
        
        {/* <DropdownMenuItem className="cursor-pointer">
          <Heart className="mr-2 h-4 w-4" />
          <span>Wishlist</span>
        </DropdownMenuItem> */}
        
        <DropdownMenuItem className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
          onClick={onLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}