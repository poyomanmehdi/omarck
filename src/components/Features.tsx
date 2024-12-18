import React from 'react';
import { FeatureCard } from './FeatureCard';
import { FEATURE_ITEMS } from '../constants/features';

export function Features() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {FEATURE_ITEMS.map(({ icon: Icon, title, description }) => (
        <FeatureCard
          key={title}
          icon={<Icon className="w-8 h-8" />}
          title={title}
          description={description}
        />
      ))}
    </div>
  );
}