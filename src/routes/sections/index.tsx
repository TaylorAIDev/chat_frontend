import { useRoutes } from 'react-router-dom';

// config
// import { PATH_AFTER_LOGIN } from 'src/config-global';
//
import JwtLoginPage from 'src/pages/auth/jwt/login'
// import { mainRoutes } from './main';
import AuthClassicLayout from 'src/layouts/auth/classic';
import { authRoutes } from './auth';
import { authDemoRoutes } from './auth-demo';
import { dashboardRoutes } from './dashboard';

// import { componentsRoutes } from './components';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // SET INDEX PAGE WITH SKIP HOME PAGE
    // {
    //   path: '/',
    //   element: <Navigate to={PATH_AFTER_LOGIN} replace />,
    // },

    // ----------------------------------------------------------------------

    // SET INDEX PAGE WITH HOME PAGE
    {
      path: '/',
      element: (
        <AuthClassicLayout>
          <JwtLoginPage />
        </AuthClassicLayout>
      ),
    },

    // Auth routes
    ...authRoutes,
    ...authDemoRoutes,

    // Dashboard routes
    ...dashboardRoutes,


    // No match 404
    // { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
