import React from 'react';
import recipesData from '../data/recipes.json';
import { Box, Typography, List, ListItem, Paper } from '@mui/material';

const RecipeSection = ({ foodItem }) => {
  const lowerItem = foodItem.toLowerCase();

  const filteredRecipes = recipesData.filter(recipe =>
    recipe.ingredients.includes(lowerItem)
  );

  return (
    <Box mt={3}>
      <Typography variant="h5" gutterBottom>
        🍽️ Recommended Recipes for {foodItem}
      </Typography>

      {filteredRecipes.length > 0 ? (
        <List>
          {filteredRecipes.map((recipe, index) => (
            <ListItem key={index}>
              <Paper elevation={2} style={{ padding: '10px', width: '100%' }}>
                {recipe.name}
              </Paper>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No recipes found for {foodItem}.</Typography>
      )}
    </Box>
  );
};

export default RecipeSection;
