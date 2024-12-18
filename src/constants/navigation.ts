import { Home, Book, MessageSquare, User } from 'lucide-react';

export const NAV_ITEMS = [
  { icon: Home, label: 'Accueil', path: '/' },
  { icon: Book, label: 'Cours', path: '/courses' },
  { icon: MessageSquare, label: 'Chat', path: '/chat' },
  { icon: User, label: 'Profil', path: '/profile' }
] as const;