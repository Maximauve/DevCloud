import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/auth.context';

const Login = () => {

  const { user, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleSubmit = async (event) => {

    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch('/api/auth/signIn', {
        method: 'POST',
        body: JSON.stringify({
          email: formData.get('email'),
          password: formData.get('password'),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {

        const data = await response.json();

        login(data.username, data.token);

        router.push('/');

      } else {
        console.error('Failed to sign in');
      }
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password" required />
      <button type="submit">Sign In</button>
    </form>
  );
}

export default Login;