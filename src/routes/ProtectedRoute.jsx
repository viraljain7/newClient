import { use, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import useInitializeAuth from '../shared/useActiveServices';

const ProtectedRoute = ({ children, roles = [], serviceCode }) => {
  const token = localStorage.getItem('app-token');
  const location = useLocation();
  // not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const userServices = useSelector((state) => state?.user?.service);
  const { fetchProfile, fetchActiveService } = useInitializeAuth();

  useEffect(() => {
    const init = async () => {
      try {
        if (token) {
          const res = await fetchProfile();

          setUser(res?.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [token]);

  useEffect(() => {
    const init = async () => {
      await fetchActiveService();

      console.log('SERVICE FETCHEDdd', location.pathname);
    };

    init();
  }, [location.pathname]);
  // loading state
  if (loading) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // role validation
  if (roles.length && !roles.includes(user?.role?.name)) {
    return <Navigate to="/dashboard/default" replace />;
  }

  if (serviceCode) {

    const hasService = userServices?.some((service) => service.code === serviceCode && service.value === '1');

    if (!hasService) {
      return <Navigate to="/dashboard/default" replace />;
    }
  }

  //new Addition

  return children;
};

export default ProtectedRoute;

const AuthRedirect = ({ children }) => {
  const token = localStorage.getItem('app-token');

  if (token) return <Navigate to="/dashboard/default" replace />;
  return <>{children}</>;
};

export { AuthRedirect, ProtectedRoute };
