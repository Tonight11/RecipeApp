const form = document.querySelector('.recipe__form')
const search = document.querySelector('.recipe__input');
const btn = document.querySelector('.recipe__btn');
const container = document.querySelector('.recipe__row');
let searchValue = '';
const apiId = '50d84d9e';
const apiKey = '43c8cc7824a78be2faea655b02215c36';

search.value = '';

form.addEventListener('submit', function (e) {
	e.preventDefault();
	searchValue = search.value;
	const api = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchValue}&app_id=${apiId}&app_key=${apiKey}`;


	fetch(api)
		.then(response => {
			return response.json()
		})
		.then(data => {
			console.log(data);
			const recipes = data.hits;
			let recipeItem = '';
			recipes.map(function(recipe) {
				recipeItem +=
				`
				<div class="recipe__column">
					<div class="recipe__item item-recipe">
						<div class="item-recipe__img">
							<img src="${recipe.recipe.image}" alt="">
						</div>
						<div class="item-recipe__title">${recipe.recipe.label}</div>
						<a target="_blank" class="item-recipe__btn" href="${recipe.recipe.url}">View Recipe</a>
					</div>
				</div>
				`
			})
			container.innerHTML = recipeItem;
		})

	search.value = '';
})
