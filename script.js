// OpenWeatherMap API key
const apiKey = 'd70014391161daeda23d9a8dcb065efd'; // Your API key

// Function to fetch weather data
async function getWeather() {
  const city = document.getElementById('city').value.trim();

  if (!city) {
    alert('Please enter a city!');
    return;
  }

  // Show loading spinner
  document.getElementById('loading').classList.add('loading');
  document.getElementById('error-message').textContent = '';
  document.getElementById('forecast').innerHTML = ''; // Clear previous forecast

  try {
    // Fetch the weather data from OpenWeatherMap API
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=7&units=metric&appid=${apiKey}`);
    const data = await response.json();

    // Check if the city is found
    if (data.cod !== '200') {
      throw new Error(data.message); // Handle error if city is not found
    }

    // Process and display the forecast
    displayForecast(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    document.getElementById('error-message').textContent = `Error: ${error.message}. Please try again.`;
  } finally {
    // Hide the loading spinner
    document.getElementById('loading').classList.remove('loading');
  }
}

// Function to display the forecast
function displayForecast(data) {
  const forecastContainer = document.getElementById('forecast');
  data.list.forEach(day => {
    const dayElement = document.createElement('div');
    dayElement.classList.add('day');

    // Get the day and date
    const date = new Date(day.dt * 1000);
    const dayName = date.toLocaleString('en', { weekday: 'short' });
    const dateString = date.toLocaleDateString();

    // Get the weather and temperature
    const weatherDescription = day.weather[0].description;
    const temperature = day.temp.day.toFixed(1);
    const iconCode = day.weather[0].icon;

    dayElement.innerHTML = `
      <h3>${dayName}</h3>
      <p>${dateString}</p>
      <img src="http://openweathermap.org/img/wn/${iconCode}.png" alt="${weatherDescription}" />
      <p>${weatherDescription}</p>
      <p>${temperature}°C</p>
    `;

    forecastContainer.appendChild(dayElement);
  });
}

// Handler for typing input (optional feature to add auto-complete)
function cityInputHandler() {
  const input = document.getElementById('city').value.trim();
  if (input.length > 2) {
    // You could add a city suggestion API here to provide autocomplete suggestions
    console.log('User is typing: ', input);
  }
}
