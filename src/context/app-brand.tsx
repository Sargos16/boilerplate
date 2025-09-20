import { createContext, useContext, type ReactNode } from 'react';
import { UI_VERSION } from '../version';

interface GlobalContextData {
  app_name: string;
  app_long_name: string;
  app_logo_url: string;
  app_icon_url: string;
  app_login_bg: string;
  app_theme: string;
  api_version: string;
  ui_version: string;
}

const defaultGlobalData: GlobalContextData = {
  app_name: 'BOILERPLATE',
  app_long_name: 'Boilerplate Application',
  app_logo_url: '',
  app_icon_url: '',
  app_login_bg: '',
  app_theme: 'default',
  api_version: '1.0.0',
  ui_version: UI_VERSION,
};

const GlobalContext = createContext<GlobalContextData | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
  value?: Partial<GlobalContextData>;
}

export function GlobalProvider({ children, value = {} }: GlobalProviderProps) {
  const contextValue = {
    ...defaultGlobalData,
    ...value,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal(): GlobalContextData {
  const context = useContext(GlobalContext);

  if (context === undefined) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }

  return context;
}

export { GlobalContext };
export type { GlobalContextData };
