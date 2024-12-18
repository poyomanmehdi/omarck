import React from 'react';

export function Hero() {
  return (
    <div className="relative h-[40vh] bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
          Marck
        </h1>
        <p className="text-xl font-light text-gray-500">
          Votre assistant éducatif personnel
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-[subtle-bounce_1s_ease-in-out_infinite]"></div>
          <div className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-[subtle-bounce_1s_ease-in-out_infinite]" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-[subtle-bounce_1s_ease-in-out_infinite]" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
}