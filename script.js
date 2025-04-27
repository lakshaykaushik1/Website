const recipeContainer = document.getElementById('recipe');
const themeToggle = document.getElementById('themeToggle');
const newRecipeBtn = document.getElementById('newRecipeBtn');

// Theme toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  themeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// Get new recipe
newRecipeBtn.addEventListener('click', getRecipe);

// Initial recipe load
getRecipe();

function getRecipe() {
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];
      const ingredients = [];

      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
          ingredients.push({ name: ingredient, measure });
        }
      }

      recipeContainer.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <h3>🍴 Ingredients</h3>
        <div class="ingredients">
          ${ingredients.map(ing => `
            <div class="ingredient">
              <img src="https://www.themealdb.com/images/ingredients/${encodeURIComponent(ing.name)}.png" />
              <p>${ing.measure} ${ing.name}</p>
            </div>
          `).join('')}
        </div>
        <h3>📝 Instructions</h3>
        <p>${meal.strInstructions}</p>
      `;
    })
    .catch(err => {
      recipeContainer.innerHTML = "Failed to fetch recipe. Try again!";
      console.error(err);
    });
}
