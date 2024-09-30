document.addEventListener('DOMContentLoaded', () => {
    const mealContainer = document.getElementById('mealContainer');
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modalContent');
    async function fetchMeals() {
      try {
          const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const data = await response.json();
          displayMeals(data.meals.slice(0, 8));
      } catch (error) {
          console.error('There has been a problem with your fetch operation:', error);
      }
    }
    function displayMeals(meals) {
      if (!meals) {
          mealContainer.innerHTML = '<p>No meals found.</p>';
          return;
      }

      meals.forEach(meal => {
          const mealDiv = document.createElement('div');
          mealDiv.className = 'meal';
          
          const img = document.createElement('img');
          img.src = meal.strMealThumb; 
          img.alt = meal.strMeal;
          img.addEventListener('click', () => showMealDetails(meal));
          const addToCartButton = document.createElement('button');
          addToCartButton.className = 'add-to-cart';
          addToCartButton.innerText = 'Add to Cart';
          addToCartButton.addEventListener('click', (e) => {
              e.stopPropagation(); 
              alert(`${meal.strMeal} added to cart!`); 
          });

          mealDiv.appendChild(img);
          mealDiv.appendChild(addToCartButton);
          mealContainer.appendChild(mealDiv);
      });
      
      mealContainer.style.gridRowGap = '40px'; 
      mealContainer.style.marginTop = '30px'; 
    }

    function showMealDetails(meal) {
      modalContent.innerHTML = `
          <h2>${meal.strMeal}</h2>
          <p><strong>Category:</strong> ${meal.strCategory}</p>
          <p><strong>Instructions:</strong> ${meal.strInstructions}</p>
          <pre>${JSON.stringify(meal, null, 2)}</pre> <!-- Display JSON data -->
      `;
      
      modal.style.display = 'flex'; 
    }
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
          modal.style.display = 'none';
      }
    });
    fetchMeals();
});
