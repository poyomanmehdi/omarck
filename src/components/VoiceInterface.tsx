// 🎯 Salut Honne ! C'est ici que la magie opère visuellement
// Pour le backend, voici les points d'intégration importants :
// 1. Statut de la connexion WebSocket
// 2. Feedback en temps réel
// 3. Gestion des erreurs

import React from 'react';
import { Mic, MicOff } from 'lucide-react';
import { WaveAnimation } from './WaveAnimation';

interface VoiceInterfaceProps {
  isListening: boolean;
  animation: boolean;
  onToggle: () => void;
}

export function VoiceInterface({ isListening, animation, onToggle }: VoiceInterfaceProps) {
  // Tu pourrais ajouter ici :
  // - Un indicateur de qualité du signal
  // - Un retour visuel des mots reconnus
  // - Des animations selon l'humeur détectée 🎭
  return (
    <div className="flex flex-col items-center py-12">
      {/* Le bouton qui fait "bip bip" 🔊 */}
      <div className="relative">
        <button
          onClick={onToggle}
          className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 
            ${isListening 
              ? 'bg-gradient-to-br from-red-400 to-red-500 text-white shadow-red-200' 
              : 'bg-gradient-to-br from-blue-400 to-blue-500 text-white shadow-blue-200'} 
            ${animation ? 'scale-95' : 'scale-100'}
            shadow-lg hover:shadow-xl hover:scale-105 group`}
        >
          {/* Petit effet stylé pour le swag ✨ */}
          <div className={`absolute inset-1 rounded-full bg-white/10 backdrop-blur-sm 
            transition-opacity duration-300 ${isListening ? 'opacity-100' : 'opacity-0'}`} />
          
          {isListening ? (
            <MicOff className="w-10 h-10 relative z-10" />
          ) : (
            <Mic className="w-10 h-10 relative z-10" />
          )}

          {/* La touche Apple, c'est le dégradé subtil 🍎 */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/10 to-transparent" />
        </button>

        {/* Les ondes qui font "woosh woosh" 🌊 */}
        {isListening && (
          <>
            <div className="absolute inset-0 rounded-full border-4 border-red-200 animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]" />
            <div className="absolute inset-0 rounded-full border-4 border-red-200 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" style={{ animationDelay: '0.5s' }} />
          </>
        )}
      </div>

      {/* Le petit texte qui dit ce qu'il se passe */}
      <div className={`mt-6 text-sm font-medium transition-all duration-300 
        ${isListening ? 'text-red-500' : 'text-blue-500'}`}>
        {isListening ? 'Tap to stop' : 'Tap to speak'}
      </div>

      {/* L'animation qui bouge au son de ta voix 🎵 */}
      {isListening && (
        <div className="mt-8">
          <WaveAnimation />
        </div>
      )}
    </div>
  );
}