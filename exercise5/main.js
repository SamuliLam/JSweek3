'use strict';

import { fetchRestaurants, fetchDailyMenu } from "./utils.js";
import { restaurantRow, restaurantModal } from './components.js';

let table = document.querySelector('table');
let tbody = document.createElement('tbody');
let modalWindow = document.querySelector('dialog');
let highlightedCell = null;
let sodexhoRadio = document.querySelector('#sodexho');
let compassRadio = document.querySelector('#compass');

// Fetch restaurants
const fetchAndDisplayRestaurants = () => {
  fetchRestaurants()
    .then((restaurants) => {
      tbody.innerHTML = '';

      if (sodexhoRadio.checked) {
        restaurants = restaurants.filter(restaurant => restaurant.company === 'Sodexo');
      } else if (compassRadio.checked) {
        restaurants = restaurants.filter(restaurant => restaurant.company === 'Compass Group');
      }

      restaurants.forEach((restaurant) => {
        let row = restaurantRow(restaurant);
        tbody.appendChild(row);

        row.querySelector('td').addEventListener('click', () => {
          if (highlightedCell) {
            highlightedCell.classList.remove('highlight');
          }
          row.querySelector('td').classList.add('highlight');
          highlightedCell = row.querySelector('td');

          fetchDailyMenu(restaurant._id, restaurant.lang)
            .then((menu) => {
              modalWindow.innerHTML = restaurantModal(restaurant, menu);
              modalWindow.querySelector('button').addEventListener('click', () => {
                modalWindow.close();
              });
              modalWindow.showModal();
            })
            .catch((error) => {
              console.error('Error fetching daily menu:', error);
              alert('Failed to fetch daily menu. Please try again later.');
            });
        });
      });
      table.appendChild(tbody);
    })
    .catch((error) => {
      console.error('Error fetching restaurants:', error);
      alert('Failed to fetch restaurants. Please try again later.');
    });
}

fetchAndDisplayRestaurants();

sodexhoRadio.addEventListener('change', fetchAndDisplayRestaurants);
compassRadio.addEventListener('change', fetchAndDisplayRestaurants);
