'use client'
import { useState } from "react";
import { AppBar, Box, Button, Grid, Stack, Toolbar, Typography, ListItem, ListItemText, List, Link } from "@mui/material";
import ReactMarkdown from 'react-markdown';
import { getStripe } from '@/utils/get-stripe'
import hero_img from './Images/Food-hero_image.jpg'
import Head from 'next/head'
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

export default function Home() {

  return (
    <Box
      width="100vw"
      height="100vh"

    >
      <Head>
        <title>CulinariQ</title>
        <meta name="description" content="Meal planning service that makes use of existing ingredients and at your cooking skill level." />
      </Head>

      <AppBar position="">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>CulinariQ</Typography>
          <SignedOut>
            <Button color="inherit"><Link href="/sign-in" color="inherit">Login</Link></Button>
            <Button color="inherit"><Link href="/sign-up" color="inherit">Sign Up</Link></Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
            <Button color="inherit">Logout</Button>
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box width="100vw"
        height="100vh" display='flex'
        flexDirection="column" justifyContent="center" alignItems="center" style={{ marginTop: 80 }}>
        {/* Hero section 
Smart meal planning
Transform your ingredients into meals

Personalized meal planning
Your ingredients, your recipes.
CulinariQ transforms your cooking experience in Calgary with personalized meal planning. We assess your existing ingredients and cooking skill level to deliver tailored recipes and shopping lists. Say goodbye to food waste and hello to delicious meals made easy. Join us and discover how effortless cooking can be with the right guidance!
*/}
        <Box width="80vw"
          height="80vh" display='flex'
          flexDirection="column" justifyContent="center" alignItems="center" paddingBottom={3}>
          <Grid container spacing={2}>
            <Grid item xs={6} >
              {/* <Item>xs=6 md=8</Item> */}
              <Typography variant="h2">Smart meal planning</Typography>
              <Typography variant="h6">Transform your ingredients into meals</Typography>
              <Link href="/ingredients">
                <Button variant="contained" color="primary">Get Started</Button>
              </Link>
            </Grid>
            <Grid item xs={6} >
              {/* <img src={hero_img} /> */}
              {/* Image goes here */}
              {/* <Item>xs=6 md=8</Item> */}
            </Grid>

          </Grid>
        </Box>

        {/* Features */}
        <Box width="80vw"
          height="80vh" display='flex'
          flexDirection="column" justifyContent="center" alignItems="center" paddingBottom={3}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h6">Features</Typography>
              <Typography variant="h3">Tailored To Your Needs.</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">Personalized recipe planning</Typography>
              <Typography variant="">Tailor-made recipes based on what you have.</Typography>
              <Button>Read more</Button>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h6">Ingredient utilization</Typography>
              <Typography variant="">Maximize your ingredients with smart recipes.</Typography>
              <Button>Read more</Button>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">Grocery order lists</Typography>
              <Typography variant="">Streamline your shopping with tailored lists.</Typography>
              <Button>Read more</Button>
            </Grid>

          </Grid>
        </Box>

        {/* Pricing */}
        <Box width="80vw"
          height="80vh" display='flex'
          flexDirection="column" justifyContent="center" alignItems="center" paddingBottom={3}>
          <Typography variant="h3">Pricing</Typography>
          <Typography variant="h6">For you to unlock your culinary dreams!</Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Box sx={{ border: '1px solid', borderRadius: 2, p: 2 }}>
                <Typography variant="h6">Free Tier</Typography>
                <Typography variant="" >Weekly limits
                  <List dense={true}>
                    <ListItem>
                      <ListItemText primary="6 Recipes generated a week max" />
                      <ListItemText primary="Only 2 attempts at inputting ingredients" />
                    </ListItem>
                  </List>
                </Typography>
                <Button>Choose Free</Button>
              </Box>
            </Grid>

            <Grid item xs={4}>
              <Box sx={{ border: '1px solid', borderRadius: 2, p: 2 }}>
                <Typography variant="h6">Basic</Typography>
                <Typography variant="" >$5 USD/Month Weekly limits
                  <List dense={true}>
                    <ListItem>
                      <ListItemText primary="6 Recipes generated a week max" />
                      <ListItemText primary="Only 2 attempts at inputting ingredients" />
                    </ListItem>
                  </List>
                </Typography>
                <Button>Choose Basic</Button>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ border: '1px solid', borderRadius: 2, p: 2 }}>
                <Typography variant="h6">Free Tier</Typography>
                <Typography variant="" >Weekly limits
                  <List dense={true}>
                    <ListItem>
                      <ListItemText primary="6 Recipes generated a week max" />
                      <ListItemText primary="Only 2 attempts at inputting ingredients" />
                    </ListItem>
                  </List>
                </Typography>
                <Button>Read more</Button>
              </Box>
            </Grid>

          </Grid>
        </Box>

      </Box>
    </Box>
  )
}
