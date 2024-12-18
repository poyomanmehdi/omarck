// 🚀 Service API - Ton interface avec le backend
// ------------------------------------------
// Hocine, voici la structure recommandée pour tes appels API !

import axios from 'axios';
import { CourseSearchParams } from '../types/course';

const api = axios.create({
  baseURL: process.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercepteur pour gérer les tokens (très pro!)
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const courseApi = {
  // GET /api/courses - Liste des cours avec filtres
  getCourses: (params?: CourseSearchParams) => 
    api.get('/courses', { params }),
  
  // GET /api/courses/:id - Détails d'un cours
  getCourseDetails: (id: string) => 
    api.get(`/courses/${id}`),
  
  // POST /api/courses/:id/enroll - Inscription à un cours
  enrollCourse: (id: string) => 
    api.post(`/courses/${id}/enroll`),
  
  // GET /api/courses/:id/progress - Progression dans un cours
  getCourseProgress: (id: string) => 
    api.get(`/courses/${id}/progress`)
};