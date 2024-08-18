// 'use client'
// import React, { useState } from 'react';
// import Link from 'next/link';
// import Head from 'next/head';
// import { Button, Grid, List, ListItem, ListItemButton, ListItemText, Card, CardContent, Typography, Chip, Box, AppBar, Toolbar } from '@mui/material';
// import ReactMarkdown from 'react-markdown';
// import { styled } from '@mui/system';

// const ingredients = {
//   carbs: ['Rice', 'Pasta', 'Potato', 'Bread', 'Quinoa'],
//   proteins: ['Chicken', 'Beef', 'Fish', 'Eggs', 'Tofu'],
//   vegetables: ['Broccoli', 'Carrot', 'Spinach', 'Tomato', 'Bell Pepper']
// };


// const PageContainer = styled('div')({
//   padding: '20px',
//   paddingTop: '80px',
// });

// const IngredientGrid = styled(Grid)({
//   marginBottom: '20px',
// });

// const GenerateButton = styled(Button)({
//   display: 'block',
//   marginLeft: 'auto',
//   marginRight: '0',
//   marginTop: '20px',
//   marginBottom: '20px',
// });

// const IngredientsPage = () => {
//   const [selectedCategory, setSelectedCategory] = useState('carbs');
//   const [selectedIngredients, setSelectedIngredients] = useState([]);
//   const [recipeName, setRecipeName] = useState('');
//   const [recipeIngredients, setRecipeIngredients] = useState('');
//   const [instructions, setInstructions] = useState('');
//   const [cookingTips, setCookingTips] = useState('');

//   const handleIngredientToggle = (ingredient) => {
//     setSelectedIngredients(prevSelected =>
//       prevSelected.includes(ingredient)
//         ? prevSelected.filter(item => item !== ingredient)
//         : [...prevSelected, ingredient]
//     );
//   };

//   const handleRemoveIngredient = (ingredient) => {
//     setSelectedIngredients(prevSelected => prevSelected.filter(item => item !== ingredient));
//   };

//   const fetchRecipe = async () => {
//     const response = await fetch('/api/chat', {
//       method: "POST",
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify([{
//         role: "user",
//         content: `Ingredients: ${selectedIngredients.join(', ')}, Skill level: beginner, Cuisine: any`
//       }]),
//     });

//     const reader = response.body.getReader();
//     const decoder = new TextDecoder();

//     let result = '';
//     await reader.read().then(function processText({ done, value }) {
//       if (done) {
//         try {
//           console.log(result);
//           const responseData = JSON.parse(result);
//           setRecipeName(responseData.recipeName);
//           setRecipeIngredients(responseData.ingredients);
//           setInstructions(responseData.instructions);
//           setCookingTips(responseData.cookingTips);
//         } catch (error) {
//           console.error('Error parsing JSON:', error);
//         }
//         return result;
//       }
//       const text = decoder.decode(value || new Int8Array(), { stream: true });
//       result += text;
//       return reader.read().then(processText);
//     });
//   };

//   return (
//     <>
//       <Head>
//         <title>Recipes - CulinariQ</title>
//         <meta name="description" content="Choose your recipe with CulinariQ" />
//       </Head>
//       <AppBar position="fixed">
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             CulinariQ
//           </Typography>
//           <Button color="inherit" component={Link} href="/">
//             Back to Home
//           </Button>
//         </Toolbar>
//       </AppBar>
//       <PageContainer>
//         <h1 className="text-2xl font-bold mb-4">Select Ingredients</h1>

//         {/* Selected Ingredients List */}
//         <div className="mb-4">
//           <Typography variant="h6" className="mb-2">Selected Ingredients:</Typography>
//           <div className="flex flex-wrap gap-2">
//             {selectedIngredients.map((ingredient) => (
//               <Chip
//                 key={ingredient}
//                 label={ingredient}
//                 onDelete={() => handleRemoveIngredient(ingredient)}
//                 color="primary"
//                 variant="outlined"
//               />
//             ))}
//           </div>
//         </div>

//         <IngredientGrid container spacing={3}>
//           <Grid item xs={3}>
//             <List>
//               {['carbs', 'proteins', 'vegetables'].map((category) => (
//                 <ListItem key={category} disablePadding>
//                   <ListItemButton
//                     selected={selectedCategory === category}
//                     onClick={() => setSelectedCategory(category)}
//                   >
//                     <ListItemText primary={category.charAt(0).toUpperCase() + category.slice(1)} />
//                   </ListItemButton>
//                 </ListItem>
//               ))}
//             </List>
//           </Grid>
//           <Grid item xs={9}>
//             <Grid container spacing={2}>
//               {ingredients[selectedCategory].map((ingredient) => (
//                 <Grid item xs={4} key={ingredient}>
//                   <Card
//                     onClick={() => handleIngredientToggle(ingredient)}
//                     sx={{
//                       cursor: 'pointer',
//                       backgroundColor: selectedIngredients.includes(ingredient) ? '#e3f2fd' : 'white',
//                     }}
//                   >
//                     <CardContent>
//                       <Typography variant="h6">{ingredient}</Typography>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           </Grid>
//         </IngredientGrid>

//         <GenerateButton variant="contained"
//           onClick={fetchRecipe}
//           disabled={selectedIngredients.length === 0}>
//           Generate Recipe
//         </GenerateButton>

//         {recipeName && (
//           <Box mt={3}>
//             <Typography variant="h5" component="div" gutterBottom>
//               {recipeName}
//             </Typography>
//             <Typography variant="h6" component="div" gutterBottom>
//               Ingredients
//             </Typography>
//             <ReactMarkdown>{recipeIngredients}</ReactMarkdown>
//             <Typography variant="h6" component="div" gutterBottom paddingTop={2}>
//               Instructions
//             </Typography>
//             <ReactMarkdown>{instructions}</ReactMarkdown>
//             <Typography variant="h6" component="div" gutterBottom paddingTop={2}>
//               Cooking Tips
//             </Typography>
//             <ReactMarkdown>{cookingTips}</ReactMarkdown>
//           </Box>
//         )}
//       </PageContainer>
//     </>
//   );
// };

// export default IngredientsPage;
'use client'
import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Button, Container } from '@mui/material';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../CSS/RecipePage.css'; // Import CSS for animations

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

const RecipePage = () => {
  const [visibleRecipes, setVisibleRecipes] = useState(recipesData.slice(0, 3)); // Show first 3 recipes initially
  const [unseenRecipes, setUnseenRecipes] = useState(recipesData.slice(3)); // Remaining recipes

  const [hoveredRecipe, setHoveredRecipe] = useState(null);

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
                      {recipe.name}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Ingredients:</strong>
                      <ul>
                        {recipe.ingredients.map((ingredient, i) => (
                          <li key={i}>{ingredient}</li>
                        ))}
                      </ul>
                    </Typography>
                    {/* Show instructions and tips on hover */}
                    {hoveredRecipe === index && (
                      <Box mt={2}>
                        <Typography variant="body2">
                          <strong>Instructions:</strong> {recipe.instructions}
                        </Typography>
                        <Typography variant="body2" mt={1}>
                          <strong>Cooking Tips:</strong> {recipe.tips}
                        </Typography>
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
  );
};

export default RecipePage;
