import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BottomNavItem } from './BottomNavItem';
import { NAV_ITEMS } from '../../constants/navigation';

export function BottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-200">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {NAV_ITEMS.map(({ icon: Icon, label, path }) => (
            <BottomNavItem
              key={label}
              icon={<Icon className="w-6 h-6" />}
              label={label}
              isActive={location.pathname === path}
              onClick={() => navigate(path)}
            />
          ))}
        </div>
      </div>
    </nav>
  );
}