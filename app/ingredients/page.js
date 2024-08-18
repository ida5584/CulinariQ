'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Button, Grid, List, ListItem, ListItemButton, ListItemText, Card, CardContent, Typography, Chip, Box, AppBar, Toolbar } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { styled } from '@mui/system';

const ingredients = {
  carbs: ['Rice', 'Pasta', 'Potato', 'Bread', 'Quinoa'],
  proteins: ['Chicken', 'Beef', 'Fish', 'Eggs', 'Tofu'],
  vegetables: ['Broccoli', 'Carrot', 'Spinach', 'Tomato', 'Bell Pepper']
};


const PageContainer = styled('div')({
  padding: '20px',
  paddingTop: '80px',
});

const IngredientGrid = styled(Grid)({
  marginBottom: '20px',
});

const GenerateButton = styled(Button)({
  display: 'block',
  marginLeft: 'auto',
  marginRight: '0',
  marginTop: '20px',
  marginBottom: '20px',
});

const IngredientsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('carbs');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [recipeName, setRecipeName] = useState('');
  const [recipeIngredients, setRecipeIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [cookingTips, setCookingTips] = useState('');

  const handleIngredientToggle = (ingredient) => {
    setSelectedIngredients(prevSelected =>
      prevSelected.includes(ingredient)
        ? prevSelected.filter(item => item !== ingredient)
        : [...prevSelected, ingredient]
    );
  };

  const handleRemoveIngredient = (ingredient) => {
    setSelectedIngredients(prevSelected => prevSelected.filter(item => item !== ingredient));
  };

  const fetchRecipe = async () => {
    const response = await fetch('/api/chat', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([{
        role: "user",
        content: `Ingredients: ${selectedIngredients.join(', ')}, Skill level: beginner, Cuisine: any`
      }]),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let result = '';
    await reader.read().then(function processText({ done, value }) {
      if (done) {
        try {
          console.log(result);
          const responseData = JSON.parse(result);
          setRecipeName(responseData.recipeName);
          setRecipeIngredients(responseData.ingredients);
          setInstructions(responseData.instructions);
          setCookingTips(responseData.cookingTips);
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

  return (
    <>
      <Head>
        <title>Ingredients - CulinariQ</title>
        <meta name="description" content="Select your ingredients with CulinariQ" />
      </Head>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CulinariQ
          </Typography>
          <Button color="inherit" component={Link} href="/">
            Back to Home
          </Button>
        </Toolbar>
      </AppBar>
      <PageContainer>
        <h1 className="text-2xl font-bold mb-4">Select Ingredients</h1>

        {/* Selected Ingredients List */}
        <div className="mb-4">
          <Typography variant="h6" className="mb-2">Selected Ingredients:</Typography>
          <div className="flex flex-wrap gap-2">
            {selectedIngredients.map((ingredient) => (
              <Chip
                key={ingredient}
                label={ingredient}
                onDelete={() => handleRemoveIngredient(ingredient)}
                color="primary"
                variant="outlined"
              />
            ))}
          </div>
        </div>

        <IngredientGrid container spacing={3}>
          <Grid item xs={3}>
            <List>
              {['carbs', 'proteins', 'vegetables'].map((category) => (
                <ListItem key={category} disablePadding>
                  <ListItemButton
                    selected={selectedCategory === category}
                    onClick={() => setSelectedCategory(category)}
                  >
                    <ListItemText primary={category.charAt(0).toUpperCase() + category.slice(1)} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={9}>
            <Grid container spacing={2}>
              {ingredients[selectedCategory].map((ingredient) => (
                <Grid item xs={4} key={ingredient}>
                  <Card
                    onClick={() => handleIngredientToggle(ingredient)}
                    sx={{
                      cursor: 'pointer',
                      backgroundColor: selectedIngredients.includes(ingredient) ? '#e3f2fd' : 'white',
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6">{ingredient}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </IngredientGrid>

        <GenerateButton variant="contained"
          onClick={fetchRecipe}
          disabled={selectedIngredients.length === 0}>
          Generate Recipe
        </GenerateButton>

        {recipeName && (
          <Box mt={3}>
            <Typography variant="h5" component="div" gutterBottom>
              {recipeName}
            </Typography>
            <Typography variant="h6" component="div" gutterBottom>
              Ingredients
            </Typography>
            <ReactMarkdown>{recipeIngredients}</ReactMarkdown>
            <Typography variant="h6" component="div" gutterBottom paddingTop={2}>
              Instructions
            </Typography>
            <ReactMarkdown>{instructions}</ReactMarkdown>
            <Typography variant="h6" component="div" gutterBottom paddingTop={2}>
              Cooking Tips
            </Typography>
            <ReactMarkdown>{cookingTips}</ReactMarkdown>
          </Box>
        )}
      </PageContainer>
    </>
  );
};

export default IngredientsPage;