import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth-store';

export function Login() {
  const { login } = useAuthStore();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    login({
      email: emailRef.current!.value,
      password: passwordRef.current!.value
    }).then(() => {
      navigate('/');
    }).catch(() => {
      setError('Wrong credentials.')
    })
  }

  return <form onSubmit={onSubmit}>
    <input type="text" placeholder="Email" ref={emailRef} />
    <input type="password" placeholder="Password" ref={passwordRef} />
    <button>Login</button>
    <Link to="/register"><button>Create account</button></Link>
    <p style={{ color: 'red' }}>{error}</p>
  </form>
}
