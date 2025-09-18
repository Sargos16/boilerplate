import { GlobalProvider, SessionProvider } from 'context';
import { BrowserRouter as Router } from 'react-router';

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Router>
      <SessionProvider>
        <GlobalProvider>{children}</GlobalProvider>
      </SessionProvider>
    </Router>
  );
}

export default Providers;
