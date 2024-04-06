import { baseUrl } from './variables.js';
const fetchRestaurants = async () => {
  try {
    const response = await fetch(
      baseUrl+'/api/v1/restaurants'
    );

    // ternary operator
    const message = response.ok ? 'Fetch response status: ' + response.status : 'Network response was not ok.';
    console.log(message);

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error: ', error);
  }
};

const fetchDailyMenu = async (id, lang) => {
  try {
    console.log(baseUrl);
    const response = await fetch(
      baseUrl+`/api/v1/restaurants/daily/${id}/${lang}`
    );

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const data = await response.json();
    console.log('Fetch response status: ', response.status);
    return data;
  } catch (error) {
    console.error('Error:  ', error);
  }
};

export { fetchRestaurants, fetchDailyMenu };
