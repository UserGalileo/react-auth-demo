import './App.css';
import * as React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { AuthGuard } from './components/AuthGuard';
import { useAuthStore } from './store/auth-store';
import { useEffect, useState } from 'react';

const router = createBrowserRouter([
  {
    path: '',
    element: <AuthGuard><Home /></AuthGuard>
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  }
])

function App() {
  const { init } = useAuthStore();
  const [initAuth, setInitAuth] = useState<boolean>(false);

  useEffect(() => {
    init().then(() => setInitAuth(true));
  }, []);

  return <>
    {initAuth && <RouterProvider router={router} />}
  </>
}

export default App
