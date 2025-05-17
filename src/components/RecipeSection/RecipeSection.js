import React from 'react';
import recipesData from '../../data/recipes.json';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Chip,
  Button,
  Container,
  Paper,
  Pagination
} from '@mui/material';
import { motion } from 'framer-motion';
import './RecipeSection.css';

const RecipeSection = ({ foodItem }) => {
  const [page, setPage] = React.useState(1);
  
  if (!foodItem) return null;

  // Normalize the food item and create variations for better matching
  const normalizedItem = foodItem.toLowerCase().trim();
  const singularItem = normalizedItem.endsWith('s') ? normalizedItem.slice(0, -1) : normalizedItem;
  
  // Improved recipe filtering logic
  const filteredRecipes = recipesData.filter(recipe => {
    const ingredients = recipe.ingredients.toLowerCase();
    const recipeName = recipe.name.toLowerCase();
    return (
      ingredients.includes(normalizedItem) ||
      ingredients.includes(singularItem) ||
      recipeName.includes(normalizedItem) ||
      recipeName.includes(singularItem)
    );
  });

  // Pagination calculations
  const recipesPerPage = 9;
  const pageCount = Math.ceil(filteredRecipes.length / recipesPerPage);
  const paginatedRecipes = filteredRecipes.slice(
    (page - 1) * recipesPerPage,
    page * recipesPerPage
  );

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <Box sx={{ py: 4 }}>
          <Typography variant="h4" sx={{ 
            mb: 4,
            fontWeight: 600,
            color: 'primary.main',
            textAlign: 'center'
          }}>
            🍽️ Recommended Recipes for {foodItem}
            <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
              Found {filteredRecipes.length} {filteredRecipes.length === 1 ? 'recipe' : 'recipes'}
            </Typography>
          </Typography>

          {filteredRecipes.length > 0 ? (
            <>
              <Grid container spacing={4}>
                {paginatedRecipes.map((recipe, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                      <Card sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 3,
                        overflow: 'hidden',
                        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
                        }
                      }}>
                        <CardMedia
                          component="img"
                          image={recipe.img_url || '/default-recipe.jpg'}
                          alt={recipe.name}
                          sx={{
                            objectFit: 'cover',
                            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                            height: 200,
                            width: '100%'
                          }}
                        />
                        <CardContent sx={{ 
                          flexGrow: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          p: 3
                        }}>
                          <Typography 
                            gutterBottom 
                            variant="h5" 
                            component="div" 
                            sx={{
                              fontWeight: 600,
                              mb: 1,
                              fontSize: '1.25rem',
                              lineHeight: 1.3,
                              minHeight: '3.2em',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }}
                          >
                            {recipe.name}
                          </Typography>
                          <Box sx={{ 
                            mb: 2,
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 1,
                            minHeight: '2em'
                          }}>
                            {recipe.course && <Chip label={recipe.course} size="small" color="primary" variant="outlined" />}
                            {recipe.state && <Chip label={recipe.state} size="small" />}
                            {recipe.diet && <Chip label={recipe.diet} size="small" />}
                          </Box>
                          <Box sx={{ mt: 'auto' }}>
                            <Typography variant="subtitle2" sx={{
                              fontWeight: 600,
                              mb: 1
                            }}>
                              Main Ingredients:
                            </Typography>
                            <Box sx={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              gap: 1,
                              mb: 2,
                              minHeight: '2.5em'
                            }}>
                              {recipe.ingredients.split(',').slice(0, 5).map((ingredient, i) => (
                                <Chip
                                  key={i}
                                  label={ingredient.trim()}
                                  size="small"
                                  sx={{
                                    backgroundColor: 'rgba(46, 125, 50, 0.1)',
                                    color: 'text.primary'
                                  }}
                                />
                              ))}
                            </Box>
                          </Box>
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            href={recipe.img_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            fullWidth
                            sx={{ 
                              mt: 2,
                              py: 1,
                              fontSize: '0.9rem',
                              fontWeight: 600
                            }}
                          >
                            View Recipe Details
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>

              {pageCount > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Pagination
                    count={pageCount}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                    sx={{
                      '& .MuiPaginationItem-root': {
                        fontSize: '1.1rem'
                      }
                    }}
                  />
                </Box>
              )}
            </>
          ) : (
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                No recipes found for {foodItem}. Try another ingredient!
              </Typography>
            </Paper>
          )}
        </Box>
      </Container>
    </motion.div>
  );
};

export default RecipeSection;