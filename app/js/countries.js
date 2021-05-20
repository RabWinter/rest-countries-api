function initCountries() {
 const apiUrl = 'https://restcountries.eu/rest/v2/all';
 const cardContainer = document.getElementById('cards-container');
 const countriesContainer = document.getElementById('countries');
 const modal = document.querySelector('.modal');
 const modalCard = document.querySelector('.modal__card');

 getCountries();

 // Get countries data
 async function getCountries() {
  try {
   const res = await fetch(apiUrl);
   const countries = await res.json();

   showCountries(countries);
  } catch (err) {
   alert('Oops...no countries to be found');
  }
 }

 function showCountries(countries) {
  cardContainer.innerHTML = '';
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

   cardContainer.appendChild(countryEl);

   // Show clicked country
   countryEl.addEventListener('click', () => {
    countriesContainer.style.display = 'none';
    modal.style.display = 'flex';
    showModal(country);
   });
  });
 }

 // Render modal card
 function showModal(country) {
  modalCard.innerHTML = `
  <div class="modal__header">
  <img src="${country.flag}" alt="${country.name}" />
 </div>
 <div class="modal__body">
  <div class="modal__col-1">
    <h2 class="modal__heading">${country.name}</h2>
    <p>
     <strong>Native Name: </strong>${country.nativeName}
    </p>
    <p>
     <strong>Population: </strong>${new Intl.NumberFormat().format(
      country.population
     )}
    </p>
    <p class="modal__region"><strong>Region: </strong>${country.region}</p>
    <p><strong>Sub Region: </strong>${country.subregion}</p>
    <p><strong>Capital: </strong>${country.capital}</p>
  </div>
  <div class="modal__col-2">
    <p><strong>Top Level Domain: </strong>${country.topLevelDomain}</p>
    <p><strong>Currency: </strong>${country.currencies.map(
     (currency) => currency.code
    )}</p>
    <p><strong>Language: </strong>${country.languages
     .map((language) => language.name)
     .join(', ')}</p>
   </div>
   <div class="modal__borders">
      <h2>Border Countries:</h2>
      <div class="modal__borders--countries">
      </div>
    </div>
  </div>
     `;

  // Get border contries via alpha codes
  country.borders.forEach(async function (border) {
   try {
    const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${border}`);
    const data = await res.json();

    const borderP = document.createElement('p');
    borderP.classList.add('border-country');
    borderP.innerHTML = `${data.name}`;
    document.querySelector('.modal__borders--countries').appendChild(borderP);
   } catch (err) {
    alert('Oops...no countries to be found');
   }
  });
 }
}
initCountries();

export default initCountries;
