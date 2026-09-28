import React from 'react';
import { MotionConfig } from 'framer-motion';
import { AppProvider } from './contexts/AppContext';
import { AppShell } from './components/layout/AppShell';

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <AppProvider>
        <AppShell />
      </AppProvider>
    </MotionConfig>);

}