import React from 'react';
import { CourseCard } from './CourseCard';
import { CoursesSkeleton } from './CoursesSkeleton';
import { Course } from '../../types/course';

interface CourseListProps {
  courses: Course[];
  isLoading: boolean;
}

export function CourseList({ courses, isLoading }: CourseListProps) {
  if (isLoading) {
    return <CoursesSkeleton />;
  }

  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Aucun cours trouvé</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}