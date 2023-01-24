import { FormControl, TextField, Typography, Button, Card } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { recipeActions } from '../store/recipes-slice';
import { addRecipe, syncRecipes } from '../store/recipes-slice';

const AddRecipe = () => {

	const dispatch = useDispatch();
	const newRecipeName = useSelector((state) => state.recipes.newRecipeName);
	const newIngredientsList = useSelector((state) => state.recipes.newIngredientsList);

	const recipeNameHandler = (value) => {
		dispatch(recipeActions.setRecipeName(value));
	};
	const ingredientsListHandler = (value) => {
		dispatch(recipeActions.setIngredientList(value));
	};

const body = {
					name: newRecipeName,
					query: newIngredientsList,
				}

	return (
		<Card variant='outlined' sx={{ p: 2}}>

			<FormControl sx={{width: '100%'}}>
				<Box container sx={{display: 'flex'}}>

				<Typography variant='h4'>Add Recipe Here</Typography>
				<TextField
					required
					label="Name"
					sx={{ mx: 2 }}
					value={newRecipeName}
					onChange={(e) => recipeNameHandler(e.target.value)}
				/>
				<Box sx={{ mr: 2, flexGrow: 1}}>
				<TextField
					required
					label="Ingredients"
					sx={{ width: '100%' }}
					value={newIngredientsList}
					onChange={(e) => ingredientsListHandler(e.target.value)}
				/>
				</Box>
				<Button type='submit' variant='outlined' onClick={() => dispatch(addRecipe(body))
					.then(() => dispatch(recipeActions.setRecipeName('')))
					.then(() => dispatch(recipeActions.setIngredientList('')))
					.then(() => dispatch(syncRecipes()))}
					>
						Add
					</Button>
				</Box>
			</FormControl>
		</Card>
	)
}

export default AddRecipe