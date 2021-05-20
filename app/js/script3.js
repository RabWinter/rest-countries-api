'use strict';

const apiUrl = 'https://restcountries.eu/rest/v2/all';
const themeToggle = document.querySelector('.btn-toggle');
const cardContainer = document.getElementById('cards-container');

const searchBar = document.getElementById('search');
const filterBtn = document.querySelector('.countries__dropdown');
const filterRegions = filterBtn.querySelectorAll('.countries__dropdown--item');
const backBtn = document.getElementById('btn-back');
const modal = document.querySelector('.modal');
const modalCard = modal.querySelector('.modal__card');
const modalBorders = modal.querySelector('.modal__borders--countries');

// Add sticky header
// let results = [];
// console.log(results);

getCountries();

async function getCountries() {
 try {
  const res = await fetch(apiUrl);
  const countries = await res.json();
  renderUI(countries);

  console.log(countries);
  
 } catch (err) {
  console.log('Nae countries');
 }
}

function renderUI(countries) {
 countries.forEach((country) => {
  const countryEl = document.createElement('div');
  countryEl.classList.add('card');
  countryEl.innerHTML = `<div class="card__header">
    <img src="${country.flag}" alt="" />
    </div>
    <div class="card__body">
    <h2 class="card__heading">${country.name}</h2>
    <p><strong>Population: </strong>${new Intl.NumberFormat().format(
     country.population
    )}</p>
      <p class="card__region"><strong>Region: </strong>${country.region}</p>
      <p><strong>Capital: </strong>${country.capital}</p>
      </div>`;

  // Show modal country
  countryEl.addEventListener('click', (e) => {
   modal.style.display = 'flex';
   displayModalDetails(country);
   getBorders(country);

   function getBorders(country) {
    for (let i = 0; i < country.borders.length; i++) {
     const borders = country.borders[i];
     bastard(i);
    }
   }

   async function bastard(i) {
    try {
     const res = await fetch(
      `https://restcountries.eu/rest/v2/alpha/${country.borders[i]}`
     );
     const data = await res.json();

    //  let borderInfo = data;
    //  borderInfo = {
    //   border: borderInfo.name,
    //  };
    //  console.log(borderInfo);
      
     const bordersCont = `
     
     <h2>Border Countries:</h2>
     <div class="modal__borders--countries">
     <p>${data.name}</p>
     </div>
     
      `;
      
      modalBorders.insertAdjacentHTML('beforeend', bordersCont);
    } catch (err) {
     console.log('Fuck');
    }
   }
  });
  cardContainer.appendChild(countryEl);
 });
}

function displayModalDetails(country) {
  
//  const modalCard = modal.querySelector('.modal__card');
 modalCard.innerHTML = `
  <div class="modal__header">
  <img src="${country.flag}" alt="" />
 </div>
 <div class="modal__body">
  <div class="modal__col-1">
    <h2 class="modal__heading">${country.name}</h2>
    <p><strong>Native Name: </strong>${country.nativeName}</p>
    <p>
     <strong>Population: </strong>${new Intl.NumberFormat().format(
      country.population
     )}
    </p>
    <p class="modal__region"><strong>Region: </strong>${country.region}</p>
    <p class="modal__region"><strong>Sub Region: </strong>${
     country.subregion
    }</p>
    
    <p><strong>Capital: </strong>${country.capital}</p>
  </div>
  <div class="modal__col-2">
    <p><strong>Top Level Domain: </strong>${country.topLevelDomain}</p>
    <p><strong>Currency: </strong>${country.currencies.map(
     (currency) => currency.code
    )}</p>
    <p><strong>Language: </strong>${country.languages.map(
     (language) => language.name
    )}</p>
   </div>
   
 </div>`;
}

// Search by name
function userSearch(e) {
 const { value } = e.target;
 const countryName = document.querySelectorAll('.card__heading');

 countryName.forEach((country) => {
  if (country.innerText.toLowerCase().includes(value.toLowerCase())) {
   country.parentElement.parentElement.style.display = 'block';
  } else {
   country.parentElement.parentElement.style.display = 'none';
  }
 });
}

// Filter by region
function filterRegion(region) {
 const value = region.innerText;
 const regionName = document.querySelectorAll('.card__region');

 // If region name matches, go up 2 levels to the parent 'card' and show or hide
 regionName.forEach((region) => {
  if (region.innerText.includes(value) || value === 'All') {
   region.parentElement.parentElement.style.display = 'block';
  } else {
   region.parentElement.parentElement.style.display = 'none';
  }
 });
}

//////////////////////////////////////////////////////////

searchBar.addEventListener('input', (e) => {
 userSearch(e);
});

filterBtn.addEventListener('click', (e) => {
 document.querySelector('.countries__dropdown--list').classList.toggle('open');
});

filterRegions.forEach((region) => {
 region.addEventListener('click', () => {
  filterRegion(region);
 });
});

themeToggle.addEventListener('click', () => {
 document.querySelector('body').classList.toggle('dark');
});

// Close modal window
backBtn.addEventListener('click', () => {
 modal.style.display = 'none';
});

////////////////////////////

// async function getCodes() {
//   try {
//    for (let i = 0; i < country.borders.length; i++) {
//     const res = await fetch(
//      `https://restcountries.eu/rest/v2/alpha/${country.borders[i]}`
//     );
//     const codes = await res.json();
//    }
//   } catch (err) {
//    console.log('Nae codes');
//   }
//  }
//  getCodes();

/* <div class="modal__borders">
     <h2>Border Countries:</h2>
     <div class="modal__borders--countries">
       <p></p>
     </div>
  </div> */

// const modalCard = modal.querySelector('.modal__card');
//  modalCard.innerHTML = `
//   <div class="modal__header">
//   <img src="${country.flag}" alt="" />
//  </div>
//  <div class="modal__body">
//   <div class="modal__col-1">
//     <h2 class="modal__heading">${country.name}</h2>
//     <p><strong>Native Name: </strong>${country.nativeName}</p>
//     <p>
//      <strong>Population: </strong>${new Intl.NumberFormat().format(
//       country.population
//      )}
//     </p>
//     <p class="modal__region"><strong>Region: </strong>${country.region}</p>
//     <p class="modal__region"><strong>Sub Region: </strong>${
//      country.subregion
//     }</p>

//     <p><strong>Capital: </strong>${country.capital}</p>
//   </div>
//   <div class="modal__col-2">
//     <p><strong>Top Level Domain: </strong>${country.topLevelDomain}</p>
//     <p><strong>Currency: </strong>${country.currencies.map(
//      (currency) => currency.code
//     )}</p>
//     <p><strong>Language: </strong>${country.languages.map(
//      (language) => language.name
//     )}</p>
//    </div>
//    <div class="modal__borders">
//      <h2>Border Countries:</h2>
//      <div class="modal__borders--countries">
//        <p>${country.borders}</p>
//      </div>
//    </div>
//  </div>`;
