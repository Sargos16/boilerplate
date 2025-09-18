import Login from 'features/auth';

function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account or use quick login for demo
          </p>
        </div>
        <Login />
      </div>
    </div>
  );
}

export default AuthPage;

