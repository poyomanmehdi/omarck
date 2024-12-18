export interface Course {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  subject: string;
  duration: string;
  studentsCount: number;
  teacher: {
    name: string;
    avatar: string;
  };
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
}

export interface CourseFilters {
  subjects: string[];
  levels: string[];
}

export interface CourseSearchParams {
  search?: string;
  filters?: CourseFilters;
}