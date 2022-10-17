import './App.css';
import * as React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { AuthGuard } from './components/AuthGuard';
import { LoginCallback } from './pages/LoginCallback';

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
    path: '/auth-callback',
    element: <LoginCallback />
  }
])

function App() {

  return <>
    <RouterProvider router={router} />
  </>
}

export default App
