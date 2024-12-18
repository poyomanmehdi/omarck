import React from 'react';
import { ANIMATION_DELAYS } from '../utils/animations';

export function WaveAnimation() {
  return (
    <div className="flex gap-1.5 px-4 py-2 rounded-full bg-gray-50">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`w-1 h-8 rounded-full animate-wave
            ${i % 2 === 0 ? 'bg-gradient-to-t from-blue-500 to-blue-400' : 'bg-gradient-to-t from-blue-400 to-blue-300'}`}
          style={{ 
            animationDelay: `${i * ANIMATION_DELAYS.WAVE}s`,
            transform: `scaleY(${1 - Math.abs(2 - i) * 0.15})`
          }}
        />
      ))}
    </div>
  );
}