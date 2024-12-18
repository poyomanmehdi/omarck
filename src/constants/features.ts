// 🎓 Les super fonctionnalités de Marck !
// Honne, pour chaque feature, tu devras implémenter :
// - Une API dédiée
// - Un système de cache
// - Des webhooks pour les mises à jour en temps réel

import { GraduationCap, BookOpen, Calendar } from 'lucide-react';

export const FEATURE_ITEMS = [
  {
    icon: GraduationCap,
    title: 'Aide aux devoirs',
    description: 'Assistance personnalisée pour tous vos travaux scolaires'
    // Backend: Connecte ça à ton API d'IA pour l'aide aux devoirs ! 🤖
  },
  {
    icon: BookOpen,
    title: 'Ressources pédagogiques',
    description: 'Accès à une bibliothèque de contenus éducatifs'
    // Backend: N'oublie pas le système de recommandation ! 📚
  },
  {
    icon: Calendar,
    title: 'Planning scolaire',
    description: 'Gestion intelligente de votre emploi du temps'
    // Backend: Synchronise avec l'API de calendrier de l'école ! 📅
  }
] as const;