import { useState, useEffect } from 'react';
import { Course, CourseFilters } from '../types/course';
import { courseApi } from '../services/api';
import { MOCK_COURSES } from '../components/courses/mockData';

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<CourseFilters>({
    subjects: [],
    levels: []
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        // Simulation d'un appel API avec un délai
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // En attendant l'API Laravel, on utilise les données mockées
        let filteredCourses = [...MOCK_COURSES];
        
        if (searchQuery) {
          filteredCourses = filteredCourses.filter(course => 
            course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        
        if (filters.subjects.length > 0) {
          filteredCourses = filteredCourses.filter(course =>
            filters.subjects.includes(course.subject)
          );
        }
        
        if (filters.levels.length > 0) {
          filteredCourses = filteredCourses.filter(course =>
            filters.levels.includes(course.level)
          );
        }
        
        setCourses(filteredCourses);
      } catch (error) {
        console.error('Erreur lors du chargement des cours:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [searchQuery, filters]);

  return {
    courses,
    isLoading,
    searchQuery,
    filters,
    setSearchQuery,
    setFilters
  };
}