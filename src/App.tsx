import './App.css';
import * as React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { AuthGuard } from './components/AuthGuard';

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

  return <>
    <RouterProvider router={router} />
  </>
}

export default App
