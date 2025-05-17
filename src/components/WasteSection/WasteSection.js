import React from 'react';
import wasteData from '../../data/grouped_waste_management.json';
import {
  Typography,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  Paper,
  Container
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  FaRecycle,
  FaTrash,
  FaLeaf,
  FaLightbulb
} from 'react-icons/fa';
import './WasteSection.css';

const WasteSection = ({ foodItem }) => {
  if (!foodItem) return null;

  // Normalize the food item for matching
  const normalizedFoodItem = foodItem.toLowerCase().trim();

  // Find matching waste solution
  const matchedSolution = wasteData.find(item => {
    const exampleItems = item.example_items.toLowerCase().split(',');
    return exampleItems.some(item => normalizedFoodItem.includes(item.trim()));
  });

  // Get appropriate icon based on category
  const getIcon = (category) => {
    switch (category) {
      case 'vegetables':
      case 'fruits':
        return <FaLeaf className="waste-icon compost" />;
      case 'milk':
      case 'egg':
        return <FaRecycle className="waste-icon recycle" />;
      case 'meat':
        return <FaTrash className="waste-icon landfill" />;
      default:
        return <FaLightbulb className="waste-icon special" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ 
            fontWeight: 600,
            color: 'primary.main',
            mb: 3
          }}>
            ♻️ Waste Management for {foodItem}
          </Typography>

          {matchedSolution ? (
            <Card component={Paper} elevation={3} sx={{ mb: 3 }}>
              <CardContent>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 2 
                }}>
                  <Chip
                    label={matchedSolution.category}
                    color="primary"
                    variant="outlined"
                    size="medium"
                    sx={{ mr: 2 }}
                  />
                  {getIcon(matchedSolution.category)}
                </Box>

                <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem' }}>
                  <strong>Recommended Solution:</strong> {matchedSolution.suggestion}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" gutterBottom sx={{ 
                  fontWeight: 600,
                  color: 'text.secondary'
                }}>
                  Pro Tips
                </Typography>
                <List dense>
                  {getProTips(normalizedFoodItem).map((tip, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <FaLightbulb color="secondary" />
                      </ListItemIcon>
                      <ListItemText primary={tip} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          ) : (
            <Card component={Paper} elevation={3} sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="body1" textAlign="center">
                  No specific waste management information found for {foodItem}. 
                  When in doubt, check with your local waste management authority for guidance.
                </Typography>
              </CardContent>
            </Card>
          )}

          <Card component={Paper} elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ 
                fontWeight: 600,
                color: 'text.secondary'
              }}>
                General Food Waste Reduction Tips
              </Typography>
              <List dense>
                {[
                  "Plan meals and buy only what you need",
                  "Store food properly to extend freshness",
                  "Use leftovers creatively in new meals",
                  "Freeze excess food before it spoils",
                  "Compost food scraps when possible",
                  "Donate surplus food to local organizations"
                ].map((tip, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <FaLeaf color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={tip} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </motion.div>
  );
};

// Helper function for category-specific tips
const getProTips = (foodItem) => {
  const tips = {
    "potato": [
      "Sprouted potatoes can be planted to grow new plants",
      "Potato peels make excellent compost material",
      "Use potato water (from boiling) as plant fertilizer"
    ],
    "tomato": [
      "Overripe tomatoes make great pasta sauce",
      "Tomato leaves can be used as natural insect repellent"
    ],
    "milk": [
      "Use expired milk for baking or making pancakes",
      "Milk can be used as a natural polish for leaves"
    ],
    "egg": [
      "Crushed eggshells deter slugs in the garden",
      "Egg cartons make great seed starters"
    ],
    "default": [
      "Store in proper containers to extend freshness",
      "Label leftovers with dates to track freshness"
    ]
  };

  return tips[foodItem] || tips.default;
};

export default WasteSection;