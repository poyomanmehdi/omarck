import React from 'react';
import { CourseFilters as FilterType } from '../../types/course';

interface CourseFiltersProps {
  filters: FilterType;
  onChange: (filters: FilterType) => void;
}

export function CourseFilters({ filters, onChange }: CourseFiltersProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Matières</h3>
        <div className="space-y-2">
          {['Mathématiques', 'Français', 'Histoire', 'Sciences'].map((subject) => (
            <label key={subject} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.subjects.includes(subject)}
                onChange={(e) => {
                  const newSubjects = e.target.checked
                    ? [...filters.subjects, subject]
                    : filters.subjects.filter((s) => s !== subject);
                  onChange({ ...filters, subjects: newSubjects });
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">{subject}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Niveau</h3>
        <div className="space-y-2">
          {['Débutant', 'Intermédiaire', 'Avancé'].map((level) => (
            <label key={level} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.levels.includes(level)}
                onChange={(e) => {
                  const newLevels = e.target.checked
                    ? [...filters.levels, level]
                    : filters.levels.filter((l) => l !== level);
                  onChange({ ...filters, levels: newLevels });
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">{level}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}