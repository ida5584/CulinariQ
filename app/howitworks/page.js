'use client'

import React from 'react';
import { AppBar, Box, Button, Container, Typography, Grid, Paper, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faHatChef, faList, faRobot, faUtensils } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

const StepPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

const GreenButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#4CAF50',
  color: 'white',
  borderRadius: '20px',
  padding: '10px 20px',
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

export default function HowItWorks() {
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
                <Link href="/howitworks" passHref style={{ textDecoration: 'none' }}>
                    <NavButton>How it works</NavButton>
                  </Link>
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


      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ mb: 6, fontWeight: 'bold', color: '#333' }}>
            How It Works
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <StepPaper elevation={3}>
                <FontAwesomeIcon icon={faList} style={{ fontSize: '3rem', color: '#4CAF50', marginBottom: '1rem' }} />
                <Typography variant="h5" component="h2" gutterBottom>
                  Step 1: Select Your Ingredients
                </Typography>
                <Typography>
                  Choose from our extensive list of ingredients that you have on hand.
                </Typography>
              </StepPaper>
            </Grid>
            <Grid item xs={12} md={4}>
              <StepPaper elevation={3}>
                <FontAwesomeIcon icon={faRobot} style={{ fontSize: '3rem', color: '#4CAF50', marginBottom: '1rem' }} />
                <Typography variant="h5" component="h2" gutterBottom>
                  Step 2: AI Magic
                </Typography>
                <Typography>
                  Our AI considers your ingredients and cooking skill level to create personalized recipes.
                </Typography>
              </StepPaper>
            </Grid>
            <Grid item xs={12} md={4}>
              <StepPaper elevation={3}>
                <FontAwesomeIcon icon={faUtensils} style={{ fontSize: '3rem', color: '#4CAF50', marginBottom: '1rem' }} />
                <Typography variant="h5" component="h2" gutterBottom>
                  Step 3: Get Your Recipes
                </Typography>
                <Typography>
                  Receive 3 tailored recipes that match your ingredients and skill level.
                </Typography>
              </StepPaper>
            </Grid>
          </Grid>
          <Box sx={{ mt: 6, textAlign: 'center' }}>
            <Link href="/ingredients" passHref style={{ textDecoration: 'none' }}>
              <GreenButton variant="contained" size="large">
                Get Started Now
              </GreenButton>
            </Link>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}