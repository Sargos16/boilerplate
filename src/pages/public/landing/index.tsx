import { Card, CardContent } from 'components';
import { Play } from 'lucide-react';
import Login from 'features/auth';

function Landing() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F0F4F8] p-6">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="p-8">
          <div className="mb-8 flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
                <Play className="ml-0.5 h-5 w-5 text-white" />
              </div>
            </div>
          </div>

          <h1 className="mb-8 text-center text-2xl font-bold text-gray-800">
            Sign in to your account
          </h1>

          <Login />

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">App v1.0.0</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Landing;
