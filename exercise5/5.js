"use strict";



async function fetchRestaurants() {
    try {
      const response = await fetch(
        "https://10.120.32.94/restaurant/api/v1/restaurants"
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();
      console.log("Response status: ", response.status);
      return data;
    } catch (error) {
      console.error("Error: ", error);
    }
}

console.log(fetchRestaurants());

/*restaurants.sort((a, b) => a.name.localeCompare(b.name));

let table = document.querySelector("table");

let tbody = document.createElement("tbody");
let modalWindow = document.querySelector("dialog");

let highlightedCell = null;

restaurants.forEach((restaurant) => {
  let row = document.createElement("tr");
  let nameCell = document.createElement("td");
  nameCell.innerText = restaurant.name;
  nameCell.addEventListener("click", () => {
    if (highlightedCell) {
      highlightedCell.classList.remove("highlight");
    }
    nameCell.classList.add("highlight");
    highlightedCell = nameCell;
    modalWindow.innerHTML = `
    <h2>${restaurant.name}</h2>
    <p>Address: ${restaurant.address}</p>
    <p>Postal Code: ${restaurant.postalCode}</p>
    <p>City: ${restaurant.city}</p>
    <p>Phone Number: ${restaurant.phone}</p>
    <p>Company: ${restaurant.company}</p>
    <button>Close</button>
  `;
    modalWindow.querySelector("button").addEventListener("click", () => {
      modalWindow.close();
    });
    modalWindow.showModal();
  });
  let addressCell = document.createElement("td");
  addressCell.innerText = restaurant.address;
  row.appendChild(nameCell);
  row.appendChild(addressCell);
  tbody.appendChild(row);
});

table.appendChild(tbody);*/
