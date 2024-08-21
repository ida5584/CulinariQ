'use client'

import React from 'react';
import { AppBar, Box, Button, Grid, Toolbar, Typography, Container } from "@mui/material";
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faHatChef } from '@fortawesome/free-solid-svg-icons';
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

const GreenButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#4CAF50',
  color: 'white',
  borderRadius: '20px',
  padding: '8px 20px',
  '&:hover': {
    backgroundColor: '#45a049',
  },
}));

const OutlinedButton = styled(Button)(({ theme }) => ({
  color: '#4CAF50',
  borderColor: '#4CAF50',
  borderRadius: '20px',
  padding: '8px 20px',
  '&:hover': {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: '#4CAF50',
  fontWeight: 500,
  fontSize: '16px',
  textTransform: 'none',
  padding: '8px 16px',
  '&:hover': {
    backgroundColor: 'transparent',
    color: '#45a049',
  },
}));

export default function Home() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #e0e0e0' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center', color: '#4CAF50', mr: 4 }}>
                <FontAwesomeIcon icon={faCloud} style={{ marginRight: '8px' }} /> CulinariQ
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <NavButton>How it works</NavButton>
                <NavButton>Product</NavButton>
                <NavButton>Pricing</NavButton>
              </Box>
            </Box>
            <Box>
              <SignedOut>
                <Link href="/sign-in" passHref style={{ textDecoration: 'none' }}>
                  <OutlinedButton variant="outlined" sx={{ mr: 2 }}>Login</OutlinedButton>
                </Link>
                <Link href="/sign-up" passHref style={{ textDecoration: 'none' }}>
                  <GreenButton variant="contained">Get Started</GreenButton>
                </Link>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 8 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="overline" display="block" gutterBottom sx={{ color: '#4CAF50' }}>
              👋 Welcome to CulinariQ
            </Typography>
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
              Seamlessly organize your meals and reclaim 30% of your time daily.
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: '#666', mb: 4 }}>
              We believe meal-time should be enjoyable and stress-free. CulinariQ makes it easy. Maximize your ingredients with smart recipes.
            </Typography>
            <Link href="/ingredients" passHref style={{ textDecoration: 'none' }}>
              <GreenButton variant="contained" size="large">
                Get Started
              </GreenButton>
            </Link>
          </Grid>
          <Grid item xs={12} md={6}>
            <Image
              src="/assets/hero-image.jpg"
              alt="Woman holding two bowls of food"
              width={600}
              height={400}
              layout="responsive"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}