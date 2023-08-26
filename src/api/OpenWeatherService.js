const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';
const WEATHER_API_KEY = '87e7610ceaa776e9ecb2b42bb7217d5e';
const RAPID_API_KEY = '4f0dcce84bmshac9e329bd55fd14p17ec6fjsnff18c2e61917';

const GEO_API_HEADERS = {
  'X-RapidAPI-Key': RAPID_API_KEY,
  'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
};

export async function fetchWeatherData(lat, lon) {
  try {
    const [weatherResponse, forecastResponse] = await Promise.all([
      fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`),
      fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`),
    ]);

    const weatherData = await weatherResponse.json();
    const forecastData = await forecastResponse.json();

    return [weatherData, forecastData];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchCities(input) {
  try {
    const response = await fetch(
      `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${input}`,
      {
        method: 'GET',
        headers: GEO_API_HEADERS,
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
