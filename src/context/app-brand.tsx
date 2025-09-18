import { createContext, useContext, type ReactNode } from 'react';

interface GlobalContextData {
  app_name: string;
  app_logo_url: string;
  app_icon_url: string;
  app_login_bg: string;
  app_theme: string;
}

const defaultGlobalData: GlobalContextData = {
  app_name: 'BOILERPLATE', // adjust based on project
  app_logo_url: '',
  app_icon_url: '',
  app_login_bg: '',
  app_theme: 'default',
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
