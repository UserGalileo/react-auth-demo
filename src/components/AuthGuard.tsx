import React, { PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth-store';

export function AuthGuard({ children }: PropsWithChildren) {

  const { user, fetchUser } = useAuthStore();
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const navigate = useNavigate();

  // Fetch user
  useEffect(() => {
    fetchUser().then(user => {
      setHasLoaded(true);
      if (!user) {
        navigate('/login');
      }
    });
  }, []);

  // If the user logs out, go to login
  useEffect(() => {
    if (hasLoaded && !user) {
      navigate('/login');
    }
  }, [user, hasLoaded]);

  return user ? <>{children}</> : <p>Loading...</p>;

  // Alternativa all'ultimo effect:
  // if (user) return children;
  // if (!hasLoaded) return <p>Loading...</p>;
  // return <Navigate to="/login" replace />;
}
