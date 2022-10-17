import { useAuthStore } from '../store/auth-store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function LoginCallback() {

  const { completeAuthentication } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    completeAuthentication().then(() => {
      navigate('/');
    })
  }, []);

  return <p>Loading...</p>;
}
