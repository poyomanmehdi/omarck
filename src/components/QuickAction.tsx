import React, { ReactNode } from 'react';

interface QuickActionProps {
  icon: ReactNode;
  label: string;
}

export function QuickAction({ icon, label }: QuickActionProps) {
  return (
    <button className="bg-white rounded-xl p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 card-hover">
      <div className="text-blue-500 mb-2">{icon}</div>
      <span className="text-sm font-medium text-gray-600">{label}</span>
    </button>
  );
}