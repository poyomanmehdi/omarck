import React from 'react';
import { Clock, BookOpen, GraduationCap, Calendar } from 'lucide-react';
import { QuickAction } from './QuickAction';

export function QuickActions() {
  return (
    <div className="rounded-2xl bg-gray-50 p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-900">Actions rapides</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <QuickAction icon={<Clock className="w-6 h-6" />} label="Emploi du temps" />
        <QuickAction icon={<BookOpen className="w-6 h-6" />} label="Devoirs" />
        <QuickAction icon={<GraduationCap className="w-6 h-6" />} label="Cours" />
        <QuickAction icon={<Calendar className="w-6 h-6" />} label="Événements" />
      </div>
    </div>
  );
}