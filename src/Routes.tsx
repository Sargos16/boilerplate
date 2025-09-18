import { BarChart3 } from 'lucide-react';

export type AppRoute = {
  label: string;
  path: string;
  url: string;
  icon?: React.ReactNode;
  component?: React.ReactNode;
  children?: AppRoute[];
  hidden?: boolean;
};

export const PRIVATE_ROUTES: AppRoute[] = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    url: 'dashboard',
    icon: <BarChart3 />,
    component: <div>Dashboard</div>,
  },
];
