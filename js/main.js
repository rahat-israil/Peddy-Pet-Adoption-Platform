const apiUrl = 'https://openapi.programming-hero.com/api/peddy/pets';
const categoriesApiUrl =
  'https://openapi.programming-hero.com/api/peddy/categories';

let petsData = [];
let likedPets = [];
let activeCategory = 'All';

// Fetch pets data and categories from the API when the page loads
window.onload = async function () {
  try {
    // Fetching pets data
    const petsResponse = await fetch(apiUrl);
    const petsDataJson = await petsResponse.json();
    petsData = petsDataJson.pets;

    // Fetching categories data
    const categoriesResponse = await fetch(categoriesApiUrl);
    const categoriesDataJson = await categoriesResponse.json();
    const categoriesData = categoriesDataJson.categories.slice(0, 4);

    displayCategories(categoriesData);
    displayPets('All');
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

