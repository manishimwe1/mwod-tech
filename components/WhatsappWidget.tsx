"use client";

import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from './ui/button';
import { whatsappUrl } from '@/constants';

const WhatsappWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label={isOpen ? 'Close WhatsApp chat' : 'Open WhatsApp chat'}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </Button>

      {/* Chat Widget */}
      <div
        className={`
          absolute bottom-full right-0 mb-4 w-80 bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ease-in-out transform
          ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'}
        `}
      >
        {/* Header */}
        <div className="bg-green-500 text-white p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">Chat with us</h3>
            <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse"></div>
          </div>
          <p className="text-sm text-green-100 mt-1">We're here to help you 24/7</p>
        </div>

        {/* Chat Messages */}
        <div className="p-4 space-y-4 max-h-60 overflow-y-auto">
          <div className="flex items-start">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mr-2">
              <span className="text-green-600 font-semibold">MW</span>
            </div>
            <div className="bg-gray-100 rounded-lg p-3 max-w-[75%]">
              <p className="text-sm text-gray-800">
                Hi there! How can we help you today?
              </p>
              <p className="text-xs text-gray-500 mt-1">Just now</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-4">
          <p className="text-xs text-gray-500 mb-3 text-center">
            Click the button below to start chatting on WhatsApp
          </p>
          <Button
            onClick={() => {
              window.open(whatsappUrl, '_blank');
              setIsOpen(false);
            }}
            className="w-full bg-green-500 hover:bg-green-600 text-white"
          >
            Start Chatting
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WhatsappWidget;