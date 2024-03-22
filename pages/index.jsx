import { useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/auth.context';

const Home = () => {

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    }
  }, [user, router]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Material UI - Next.js example
        </Typography>
        {user ? (
          <Typography variant="body1">
            Welcome, {user.username}! You are now signed in.
          </Typography>
        ) : (
          <Link href="/auth/login" color="secondary">
            Go to the Sign-In page
          </Link>
        )}
      </Box>
    </Container >
  );
}

export default Home;
