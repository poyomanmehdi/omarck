import React, { ReactNode } from 'react';

interface BottomNavItemProps {
  icon: ReactNode;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

export function BottomNavItem({ icon, label, isActive = false, onClick }: BottomNavItemProps) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-16 py-1 transition-all duration-200
        ${isActive 
          ? 'text-blue-500' 
          : 'text-gray-400 hover:text-blue-400'}`}
    >
      <div className="relative">
        {icon}
        {isActive && (
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full" />
        )}
      </div>
      <span className="text-xs mt-1 font-medium">{label}</span>
    </button>
  );
}