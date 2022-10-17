import { useAuthStore } from '../store/auth-store';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const { login } = useAuthStore();
  const navigate = useNavigate()

  function onClick() {
    login().then(() => {
      navigate('/')
    })
  }

  return <div>
    <button onClick={onClick}>Login</button>
  </div>
}
