import NotFound from 'pages/shared/NotFound';
import { PRIVATE_ROUTES } from 'Routes';
import { Route, Routes } from 'react-router';
import AdminShell from 'layout/AdminShell';

function Private() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-100">
      <div className="flex flex-1 flex-col overflow-hidden">
        <Routes>
          <Route path="*" element={<AdminShell />}>
            {PRIVATE_ROUTES.map((module) => (
              <Route
                key={module.url}
                path={module.url}
                element={module.component}
              />
            ))}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default Private;
