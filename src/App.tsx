import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Hero } from './components/Hero';
import { VoiceInterface } from './components/VoiceInterface';
import { Features } from './components/Features';
import { QuickActions } from './components/QuickActions';
import { BottomNavigation } from './components/navigation/BottomNavigation';
import { CoursesPage } from './pages/CoursesPage';
import { ChatPage } from './pages/ChatPage';
import { useVoiceControl } from './hooks/useVoiceControl';

function App() {
  const { isListening, animation, toggleListening } = useVoiceControl();

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-white pb-20">
            <Hero />
            <div className="max-w-4xl mx-auto px-4 space-y-8">
              <VoiceInterface 
                isListening={isListening}
                animation={animation}
                onToggle={toggleListening}
              />
              <Features />
              <QuickActions />
            </div>
          </div>
        } />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
      <BottomNavigation />
    </Router>
  );
}

export default App;