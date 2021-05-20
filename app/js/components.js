'use strict';
function initComponents() {
  const themeToggle = document.querySelector('.btn-toggle');
  const countriesContainer = document.getElementById('countries');
  const modal = document.querySelector('.modal');
  const searchBar = document.getElementById('search');
  const filterBtn = document.querySelector('.countries__dropdown');
  const filterRegions = filterBtn.querySelectorAll('.countries__dropdown--item');
  const backBtn = document.getElementById('btn-back');

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
    countriesContainer.style.display = 'flex';
  });
}
initComponents();

export default initComponents;