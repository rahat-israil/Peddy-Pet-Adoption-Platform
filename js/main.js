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

// Display dynamic categories with icons
function displayCategories(categoriesData) {
  const categoriesDiv = document.querySelector('.categories');

  // Clear previous categories (if any)
  categoriesDiv.innerHTML = '';
  // Loop through the categories and add each category dynamically
  categoriesData.forEach(category => {
    const button = document.createElement('button');
    button.classList.add(
      'px-14',
      'py-3',
      'border',
      'rounded-lg',
      'hover:bg-green-100',
      'text-xl',
      'flex',
      'items-center',
      'justify-center',
      'mr-2',
      'font-extrabold'
    );
    button.setAttribute('data-category', category.category);
    button.onclick = () => filterByCategory(category.category);

    // Add icon to the button
    const img = document.createElement('img');
    img.src = category.category_icon;
    img.alt = category.category;
    img.classList.add('w-8', 'mr-2');

    // Append the icon and text to the button
    button.appendChild(img);
    button.append(category.category);
    categoriesDiv.appendChild(button);
  });
}


