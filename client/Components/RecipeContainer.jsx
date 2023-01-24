//Import dependencies
import React from 'react';
import { useEffect } from 'react';
import '../App.scss';
import { Grid } from '@mui/material';

//Import Components
import RecipeCard from './RecipeCards.jsx';
import { syncRecipes } from '../store/recipes-slice';
import { useSelector, useDispatch } from 'react-redux';


const RecipeContainer = () => {
	const recipes = useSelector((state) => state.recipes.recipes);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(syncRecipes())
	}, []);

	const recipeList = [];

	for (const recipe of recipes) {
		const name = recipe.name;
		const query = recipe.query;
		const ingredientList = JSON.parse(recipe.data);
		recipeList.push(
		<Grid key={recipe._id} item>
			<RecipeCard  id={recipe._id} name={name} ingredientList={ingredientList} query={query}/>
		</Grid>)
	}

	return (
		<Grid container direction='column' spacing={4} sx={{marginTop: '200px'}} >
				{recipeList}
		</Grid>
	);
};

export default RecipeContainer;

/* 
data.food => array of objects
each obj => need access to certain info
store each as an obj in state
state= [{name: recipe name, ingredients=[], chart= .svg}, {second recipe}]

"food_name": "eggs",
"serving_qty": 2,
"serving_unit": "large",
"serving_weight_grams": 100,
"nf_calories": 143,
"nf_total_fat": 9.51,
"nf_saturated_fat": 3.13,
"nf_cholesterol": 372,
"nf_sodium": 142,
"nf_total_carbohydrate": 0.72,
"nf_dietary_fiber": 0,
"nf_sugars": 0.37,
"nf_protein": 12.56,

data.food.photo =>
"photo":{
        "thumb": "https://nix-tag-images.s3.amazonaws.com/542_thumb.jpg",
        "highres": "https://nix-tag-images.s3.amazonaws.com/542_highres.jpg",
        "is_user_uploaded": false
        },

*/
