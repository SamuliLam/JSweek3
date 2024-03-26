'use strict';

async function fetchRestaurants() {
  try {
    const response = await fetch(
      'https://10.120.32.94/restaurant/api/v1/restaurants'
    );

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const data = await response.json();
    console.log('Fetch response status: ', response.status);
    return data;
  } catch (error) {
    console.error('Error: ', error);
  }
}

async function fetchDailyMenu(id, lang) {
  try {
    const response = await fetch(
      `https://10.120.32.94/restaurant/api/v1/restaurants/daily/${id}/${lang}`
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
}

let table = document.querySelector('table');

let tbody = document.createElement('tbody');
let modalWindow = document.querySelector('dialog');

let highlightedCell = null;

// edessä karseeta koodia mutta riittää nyt tähän tehtävään

fetchRestaurants()
  .then((restaurants) => {
    restaurants.forEach((restaurant) => {
      let row = document.createElement('tr');
      let nameCell = document.createElement('td');
      nameCell.innerText = restaurant.name;
      nameCell.addEventListener('click', () => {
        if (highlightedCell) {
          highlightedCell.classList.remove('highlight');
        }
        nameCell.classList.add('highlight');
        highlightedCell = nameCell;
        modalWindow.innerHTML = `
        <h2>${restaurant.name}</h2>
        <p>Address: ${restaurant.address}</p>
        <p>Postal Code: ${restaurant.postalCode}</p>
        <p>City: ${restaurant.city}</p>
        <p>Phone Number: ${restaurant.phone}</p>
        <p>Company: ${restaurant.company}</p>
        <button>Close</button>`;

        fetchDailyMenu(restaurant._id, restaurant.lang)
          .then((data) => {
            let dailyMenuTitle = document.createElement('h3');
            dailyMenuTitle.innerText = 'Daily Menu';
            let coursesList = document.createElement('ul');

            data.courses.forEach((course) => {
              let courseItem = document.createElement('li');
              courseItem.innerText = `${course.name}: ${course.price}`;

              coursesList.appendChild(courseItem);
            });
            modalWindow.appendChild(dailyMenuTitle);
            modalWindow.appendChild(coursesList);
          })
          .catch((error) => {
            console.error('Error fetching daily menu:', error);
            alert('Failed to fetch daily menu. Please try again later.');
          });

        modalWindow.querySelector('button').addEventListener('click', () => {
          modalWindow.close();
        });
        modalWindow.showModal();
      });
      let addressCell = document.createElement('td');
      addressCell.innerText = restaurant.address;
      row.appendChild(nameCell);
      row.appendChild(addressCell);
      tbody.appendChild(row);
    });
    table.appendChild(tbody);
  })
  .catch((error) => {
    console.error('Error fetching restaurants:', error);
    alert('Failed to fetch restaurants. Please try again later.');
  });
