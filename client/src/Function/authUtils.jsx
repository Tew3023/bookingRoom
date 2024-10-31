import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function useAdminProtection() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminAuth = () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          navigate('/');
          return;
        }

        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }

        if (decodedToken.role !== 'admin') {
          navigate('/login');
          return;
        }

      } catch (error) {
        console.error("Error in authentication:", error);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    checkAdminAuth();
  }, [navigate]);

  return null;
}
