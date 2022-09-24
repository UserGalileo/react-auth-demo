import { useAuthStore } from '../store/auth-store';

export function Home() {

  const { user, logout } = useAuthStore();

  return <>
    <p>Hello {user?.displayName}!</p>
    <button onClick={() => logout()}>Logout</button>
  </>
}
