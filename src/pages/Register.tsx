import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth-store';

export function Register() {
  const { register } = useAuthStore();
  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const surnameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    register({
      email: emailRef.current!.value,
      name: nameRef.current!.value,
      surname: surnameRef.current!.value,
      password: passwordRef.current!.value
    }).then(() => {
      navigate('/login');
    }).catch(() => {
      setError('Something went wrong.');
    })
  }

  return <form onSubmit={onSubmit}>
    <input type="text" placeholder="Email" ref={emailRef} />
    <input type="text" placeholder="Name" ref={nameRef} />
    <input type="text" placeholder="Surname" ref={surnameRef} />
    <input type="password" placeholder="Password" ref={passwordRef} />
    <button>Register</button>
    <p style={{ color: 'red' }}>{error}</p>
  </form>
}
