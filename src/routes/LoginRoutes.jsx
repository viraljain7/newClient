import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import { AuthRedirect } from './ProtectedRoute';

// jwt auth
const LoginPage = Loadable(lazy(() => import('pages/auth/Login')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      children: [
        {
          path: '/login',
          element: (
            <AuthRedirect>
              <LoginPage />
            </AuthRedirect>
          )
        }
      ]
    }
  ]
};

export default LoginRoutes;
