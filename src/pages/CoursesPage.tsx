import React from 'react';
import { CourseList } from '../components/courses/CourseList';
import { CourseFilters } from '../components/courses/CourseFilters';
import { CourseSearch } from '../components/courses/CourseSearch';
import { useCourses } from '../hooks/useCourses';

export function CoursesPage() {
  const { 
    courses, 
    isLoading, 
    filters, 
    searchQuery,
    setFilters,
    setSearchQuery
  } = useCourses();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
            Mes Cours
          </h1>
          <p className="mt-2 text-gray-500">
            Accédez à tous vos cours et ressources pédagogiques
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <CourseFilters 
              filters={filters} 
              onChange={setFilters} 
            />
          </aside>

          <main className="lg:col-span-3 space-y-6">
            <CourseSearch 
              value={searchQuery}
              onChange={setSearchQuery}
            />
            
            <CourseList 
              courses={courses}
              isLoading={isLoading}
            />
          </main>
        </div>
      </div>
    </div>
  );
}