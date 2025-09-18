import { useSession } from 'context';
import Private from 'pages/private';
import Landing from 'pages/public/landing';
import type { JSX } from 'react';
import { Navigate, Route, Routes } from 'react-router';

const PrivateMapper = (): JSX.Element => {
  const [isAuthenticated] = useSession((state) => state.isAuthenticated);
  if (!isAuthenticated)
    return <Navigate to="/" state={{ from: window.location.pathname }} />;
  return <Private />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="*" element={<PrivateMapper />} />
    </Routes>
  );
}

export default App;
