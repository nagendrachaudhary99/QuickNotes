'use client';

import { useState, useRef } from 'react';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import Head from 'next/head';
import { Link as ScrollLink } from 'react-scroll';
import { useRouter } from 'next/navigation';
import getStripe from '@/utils/get-stripe' //

export default function Home() {
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const checkoutsession = await fetch('/api/checkout_session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const checkoutsessionJson = await checkoutsession.json();

      if (checkoutsessionJson.statusCode === 500) {
        console.error(checkoutsessionJson.message);
        return;
      }

      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({
        sessionId: checkoutsessionJson.id,
      });

      if (error) {
        console.error('Error redirecting to checkout:', error.message);
      }
    } catch (error) {
      console.error('Error during checkout:', error.message);
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  // Create a reference for the pricing section
  const pricingRef = useRef(null);

  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #2e026d, #000000)',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Head>
        <title>QuickNotes</title>
        <meta name="description" content="Create flashcards from your text" />
      </Head>

      {/* Navbar */}
      <AppBar position="static" color="transparent" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 'bold', letterSpacing: 1.5 }}>
            QuickNotes
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <SignedOut>
              <Button color="primary" variant="contained" sx={{ borderRadius: 20 }} href="/sign-in">
                Login
              </Button>
              <Button color="secondary" variant="contained" sx={{ borderRadius: 20 }} href="/sign-up">
                Sign Up
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuClick}
              sx={{ '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' } }}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  borderRadius: 2,
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
              <MenuItem onClick={handleMenuClose}>Help</MenuItem>
              <MenuItem onClick={handleMenuClose}>About</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          textAlign: 'center',
          my: 6,
          p: 6,
          borderRadius: 3,
          background: 'linear-gradient(135deg, #9b51e0, #6e27d4)',
          color: 'white',
          mx: 'auto',
          maxWidth: 'md',
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
          Welcome to QuickNotes
        </Typography>
        <Typography variant="h5" paragraph sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
          The smartest way to manage and create flashcards from your notes.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={{ mt: 2, borderRadius: 20, mr: 2 }}
          onClick={() => {
            router.push('/generate');
          }}
        >
          Get Started
        </Button>
        <ScrollLink to="pricing" smooth={true} duration={500}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 2, borderRadius: 20, color: 'white', borderColor: 'white' }}
          >
            View Plans
          </Button>
        </ScrollLink>
      </Box>

      {/* Features Section */}
      <Box sx={{ my: 6, textAlign: 'center', maxWidth: 'md', mx: 'auto' }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
          Why Choose QuickNotes?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
          <Box
            sx={{
              flex: 1,
              p: 2,
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              backgroundColor: '#353C46',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'black' }}>
              Easy Text Input
            </Typography>
            <Typography sx={{ color: 'text.white' }}>
              Simply input your text and let QuickNotes generate flashcards automatically.
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              p: 2,
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              backgroundColor: '#353C46',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'black' }}>
              Smart Flashcards
            </Typography>
            <Typography sx={{ color: 'text.white' }}>
              AI-powered flashcards, perfect for studying and mastering content.
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              p: 2,
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              backgroundColor: '#353C46',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'black' }}>
              Anywhere Access
            </Typography>
            <Typography sx={{ color: 'text.white' }}>
              Access your flashcards from any device, anytime, anywhere.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Pricing Section */}
      <Box
        id="pricing"
        ref={pricingRef}
        sx={{
          textAlign: 'center',
          my: 6,
          p: 6,
          borderRadius: 2,
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
          backgroundColor: 'background.paper',
          mx: 'auto',
          maxWidth: 'md',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Pricing Plans
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, color: 'text.secondary', fontWeight: 'bold' }}>
          Choose a plan that fits your needs:
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
          <Box
            sx={{
              flex: 1,
              p: 2,
              borderRadius: 2,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              backgroundColor: '#7396D3',
            }}
          >
            <Typography variant="h6"> Basic</Typography>
            <Typography sx={{ color: 'text.secondary' }}>$5 / month</Typography>
            <Button variant="contained" color="secondary" sx={{ mt: 2, borderRadius: 20 }}>
              Basic
            </Button>
          </Box>
          <Box
            sx={{
              flex: 1,
              p: 2,
              borderRadius: 2,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              backgroundColor: '#7396D3',
            }}
          >
            <Typography variant="h6">Pro</Typography>
            <Typography sx={{ color: 'text.primary' }}>$10 / month</Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2, borderRadius: 20 }} onClick={handleSubmit}>
              Pro
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}



