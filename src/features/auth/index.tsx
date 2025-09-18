import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router';
import {
  Button,
  Input,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components';
import { useSession } from 'context';
import { Eye, EyeOff } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [, setSession] = useSession(() => null);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = async (_data: LoginFormData) => {
    setIsLoading(true);

    // Mock authentication - simulate API call
    setTimeout(() => {
      // Mock successful login
      setSession({
        isAuthenticated: true,
        token: 'mock-jwt-token-' + Date.now(),
      });
      setIsLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleQuickLogin = () => {
    setSession({
      isAuthenticated: true,
      token: 'mock-jwt-token-' + Date.now(),
    });
    navigate('/dashboard');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                Email address
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                Password
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="w-full pr-10"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={handleTogglePassword}
                    className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="text-right">
          <Button
            type="button"
            variant="link"
            className="h-auto p-0 text-sm text-blue-600 hover:text-blue-700"
          >
            Forgot your password?
          </Button>
        </div>

        <Button
          type="submit"
          className="w-full rounded-lg bg-[#6B46C1] py-3 font-semibold text-white hover:bg-[#5B21B6]"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Signing in...</span>
            </div>
          ) : (
            'Sign in'
          )}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">Or</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleQuickLogin}
          className="w-full rounded-lg border-2 border-[#6B46C1] py-3 font-semibold text-[#6B46C1] hover:bg-[#6B46C1] hover:text-white"
        >
          Quick Login (Mock)
        </Button>
      </form>
    </Form>
  );
}

export default Login;
