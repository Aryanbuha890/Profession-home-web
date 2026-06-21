import { createContext, useContext } from 'react';

export const StartupContext = createContext<any>(null);

export function useStartupContext() {
  const context = useContext(StartupContext);
  if (!context) {
    throw new Error('useStartupContext must be used within StartupLayout');
  }
  return context;
}
