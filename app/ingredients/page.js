'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Button, Grid, Typography, Chip, Box, AppBar, Toolbar, Paper } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { styled } from '@mui/system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faBellConcierge, faBowlRice, faDrumstickBite, faCarrot } from '@fortawesome/free-solid-svg-icons';

const PRIMARY_GREEN = '#4CAF50';
const PRIMARY_GREEN_DARK = '#45a049';

const ingredients = {
  carbs: ['Rice', 'Pasta', 'Potato', 'Bread', 'Quinoa'],
  proteins: ['Chicken', 'Beef', 'Fish', 'Eggs', 'Tofu'],
  vegetables: ['Broccoli', 'Carrot', 'Spinach', 'Tomato', 'Bell Pepper']
};

const PageContainer = styled('div')({
  padding: '20px',
  paddingTop: '80px',
});

const CategoryCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '16px',
}));

const IngredientChip = styled(Chip)(({ theme, selected }) => ({
  margin: theme.spacing(0.5),
  borderRadius: '20px',
  backgroundColor: selected ? PRIMARY_GREEN : 'transparent',
  color: selected ? 'white' : 'rgba(0, 0, 0, 0.87)',
  '&:hover': {
    backgroundColor: selected ? PRIMARY_GREEN_DARK : 'rgba(0, 0, 0, 0.08)',
  },
}));

const PrepareButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  borderRadius: '30px',
  padding: '10px 20px',
  color: PRIMARY_GREEN,
  borderColor: PRIMARY_GREEN,
  '&:hover': {
    backgroundColor: 'rgba(76, 175, 80, 0.04)',
    borderColor: PRIMARY_GREEN,
  },
  '& .MuiButton-startIcon': {
    marginRight: theme.spacing(1),
  },
}));

const IngredientsPage = () => {
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


  const categoryIcons = {
    carbs: faBowlRice,
    proteins: faDrumstickBite,
    vegetables: faCarrot,
  };

  const categoryColors = {
    carbs: '#FFD700',
    proteins: '#FFA07A',
    vegetables: '#90EE90',
  };

  return (
    <>
      <Head>
        <title>Ingredients - CulinariQ</title>
        <meta name="description" content="Select your ingredients with CulinariQ" />
      </Head>
      <AppBar position="fixed" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', color: '#4CAF50' }}>
            <FontAwesomeIcon icon={faCloud} style={{ marginRight: '8px' }} /> CulinariQ
          </Typography>
          <Button color="inherit" component={Link} href="/">
            Back to Home
          </Button>
        </Toolbar>
      </AppBar>
      <PageContainer>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#333', mb: 4 }}>
          Select ingredients to begin
        </Typography>

        <Grid container spacing={3}>
          {Object.entries(ingredients).map(([category, items]) => (
            <Grid item xs={12} md={4} key={category}>
              <CategoryCard style={{ backgroundColor: categoryColors[category] }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                  <FontAwesomeIcon icon={categoryIcons[category]} style={{ marginRight: '8px' }} />
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Typography>
                <Box>
                  {items.map((ingredient) => (
                    <IngredientChip
                      key={ingredient}
                      label={ingredient}
                      onClick={() => handleIngredientToggle(ingredient)}
                      selected={selectedIngredients.includes(ingredient)}
                      variant="outlined"
                    />
                  ))}
                </Box>
              </CategoryCard>
            </Grid>
          ))}
        </Grid>

        <Box display="flex" justifyContent="center" mt={3}>
          <PrepareButton
            variant="outlined"
            onClick={fetchRecipe}
            disabled={selectedIngredients.length === 0}
            startIcon={<FontAwesomeIcon icon={faBellConcierge} />}
          >
            Prepare
          </PrepareButton>
        </Box>

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
