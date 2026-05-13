import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import api from '../shared/BaseApi';

const ProtectedRoute = ({ children, roles = [] }) => {
  const token = localStorage.getItem('app-token');

  // not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const formData = new FormData();
        formData.append('type', 'profile');

        const res = await api.post('/member/transaction', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        setUser(res?.data?.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [token]);



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

  return children;
};

export default ProtectedRoute;

const AuthRedirect = ({ children }) => {
  const token = localStorage.getItem('app-token');
  console.log(token);

  if (token) return <Navigate to="/dashboard/default" replace />;
  return <>{children}</>;
};

export { AuthRedirect, ProtectedRoute };
