// export default IngredientsPage;
'use client'
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Card, CardContent, Typography, Box, Button, Container, AppBar, Toolbar } from '@mui/material';
import { styled } from '@mui/system';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ReactMarkdown from 'react-markdown'
import '../CSS/RecipePage.css'; // Import CSS for animations
import Link from 'next/link';
import {
  useUser,
  SignedIn,
  UserButton
} from '@clerk/nextjs'
import { redirect } from 'next/navigation';

// Sample JSON array of recipes
const recipesData = [
  {
    name: "Chicken and Rice",
    ingredients: ["Chicken", "Rice", "Broccoli", "Garlic"],
    instructions: "Cook rice, grill chicken, and sauté broccoli with garlic. Combine and serve.",
    tips: "For extra flavor, marinate the chicken overnight."
  },
  {
    name: "Spinach & Peas Pasta",
    ingredients: ["Pasta", "Spinach", "Frozen Peas", "Parmesan Cheese"],
    instructions: "Cook pasta, steam spinach and peas. Mix with pasta and add parmesan.",
    tips: "Save pasta water to create a creamier sauce."
  },
  {
    name: "Carrot Soup",
    ingredients: ["Carrots", "Onions", "Garlic", "Vegetable Broth"],
    instructions: "Sauté onions and garlic, add carrots and broth, simmer until tender, and blend.",
    tips: "Roast the carrots beforehand for a richer flavor."
  },
  {
    name: "Beef Stew",
    ingredients: ["Beef", "Potatoes", "Carrots", "Onions", "Beef Broth"],
    instructions: "Brown the beef, then simmer with vegetables and broth until tender.",
    tips: "Cook low and slow for the best flavor."
  },
  {
    name: "Chicken Alfredo",
    ingredients: ["Chicken", "Fettuccine", "Cream", "Garlic", "Parmesan Cheese"],
    instructions: "Cook pasta, sauté chicken, and make a creamy Alfredo sauce. Mix together and serve.",
    tips: "Use fresh parmesan for a richer flavor."
  }
];

const PageContainer = styled('div')({
  padding: '20px',
  paddingTop: '80px',
});

const RecipePage = ({searchParams}) => {
  // User check
  const { isLoaded, isSignedIn, user } = useUser()
  
  const [visibleRecipes, setVisibleRecipes] = useState([]); // Show first 3 recipes initially
  const [unseenRecipes, setUnseenRecipes] = useState([]); // Remaining recipes
  // Temp testing
  // setVisibleRecipes(recipesData.slice(0, 3))
  // setUnseenRecipes(recipesData.slice(3))
  // const ingredients= ['Rice', 'Chicken']
  const [hoveredRecipe, setHoveredRecipe] = useState(null);

  
  const fetchRecipe = async () => {
    console.log("Posting Requesting Now")
    const response = await fetch('/api/chat', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([{
        role: "user",
        content: `Ingredients: ${searchParams.ingredients.constructor === Array? searchParams.ingredients.join(', ') : searchParams.ingredients}, Skill level: beginner, Cuisine: any`
      }]),
    });
    console.log("Recieved Response Now")
    
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let result = '';
    await reader.read().then(function processText({ done, value }) {
      if (done) {
        try {
          console.log(JSON.parse(result));
          setVisibleRecipes((JSON.parse(result)).slice(0, 3))
          console.log(visibleRecipes)
          setUnseenRecipes((JSON.parse(result)).slice(3))
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
        
        return result;
      }
      const text = decoder.decode(value || new Int8Array(), { stream: true });
      result += text;
      return reader.read().then(processText);
    });
  };

  useEffect(() => {
    if (isSignedIn === false ){
      return redirect('/sign-in')
    } else {
      try {
        console.log(searchParams.ingredients)
        // This code runs when the component is mounted (on page load)
        fetchRecipe()
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }, []);

  const handleDelete = (index) => {
    const newVisibleRecipes = [...visibleRecipes];
    newVisibleRecipes.splice(index, 1); // Remove the selected recipe

    // Check if there are any unseen recipes left
    if (unseenRecipes.length > 0) {
      const nextRecipe = unseenRecipes.shift(); // Get the next unseen recipe
      newVisibleRecipes.splice(index, 0, nextRecipe); // Add it to the same position
    }

    setVisibleRecipes(newVisibleRecipes); // Update visible recipes
    setUnseenRecipes(unseenRecipes); // Update unseen recipes
  };

  return (
    <>
    <Head>
        <title>Recipes - CulinariQ</title>
        <meta name="description" content="Select one of the Recipes with CulinariQ" />
      </Head>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CulinariQ
          </Typography>
          <Button color="inherit" href="/">
            Back to Home
          </Button>
          <Link href={{
            pathname:'ingredients',
            query:{ingredients:searchParams.ingredients}
          }} >
              <Button sx={{color:"white"}} color="inherit"
              >Back to Ingredients</Button>
          </Link>
          <SignedIn>
            <UserButton />
            <Button color="inherit">Logout</Button>
          </SignedIn>
        </Toolbar>
      </AppBar>
      <PageContainer>
        <h1 className="text-2xl font-bold mb-4">Select Recipe</h1>
        <Container>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <TransitionGroup component={null}>
              {visibleRecipes.map((recipe, index) => (
                <CSSTransition
                  key={recipe.name}
                  timeout={500}
                  classNames="recipe"
                >
                  <div style={{ flexBasis: '30%' }}>
                    <Card
                      onMouseEnter={() => setHoveredRecipe(index)}
                      onMouseLeave={() => setHoveredRecipe(null)}
                      style={{ minHeight: '300px', transition: '0.3s' }}
                    >
                      <CardContent>
                        <Typography variant="h5" component="div">
                          {recipe.recipeName}
                        </Typography>
                        <Typography variant="body1">
                        
                          <strong>Ingredients:</strong>
                          <ul>
                            <ReactMarkdown >
                              {recipe.ingredients}
                            </ReactMarkdown>
                            {/* {recipe.ingredients.map((ingredient, i) => (
                              <li key={i}>{ingredient}</li>
                            ))} */}
                          </ul>
                        </Typography>
                        {/* Show instructions and tips on hover */}
                        {hoveredRecipe === index && (
                          <Box mt={2}>
                            {/* <Typography variant="body2"> */}
                              <strong>Instructions:</strong> <ReactMarkdown >
                              {recipe.instructions}
                            </ReactMarkdown>
                            {/* {recipe.instructions} */}
                            {/* </Typography> */}
                            {/* <Typography variant="body2" mt={1}> */}
                              <strong>Cooking Tips:</strong> 
                              <ReactMarkdown >
                                {recipe.cookingTips}
                              </ReactMarkdown>
                              {/* {recipe.cookingTips} */}
                            {/* </Typography> */}
                          </Box>
                        )}
                        {/* Delete Button */}
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleDelete(index)}
                          sx={{ mt: 2 }}
                        >
                          Delete Recipe
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </div>
        </Container>
      </PageContainer>
    </>
  );
};

export default RecipePage;
