'use client';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { useAuth } from '@/contexts/auth.context';

const Home = () => {

  let user = localStorage.getItem('userData')
  user = user ? JSON.parse(user) : null

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Material UI - Next.js example
        </Typography>
        {user ? (
          <p>
            Welcome, {user.username}! You are now signed in.
          </p>
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
