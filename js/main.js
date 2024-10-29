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

// Display pets based on category
function displayPets(category) {
  const petsGrid = document.getElementById('pets-grid');
  petsGrid.innerHTML = '';
  const filteredPets =
    category === 'All'
      ? petsData
      : petsData.filter(pet => pet.category === category);

  if (filteredPets.length === 0) {
    document.getElementById('no-pets-message').style.display = 'block';
    // document.getElementById('pets-grid').style.display = 'none';
    return;
  } else {
    document.getElementById('no-pets-message').style.display = 'none';
  }

  filteredPets.forEach(pet => {
    const petCard = document.createElement('div');
    petCard.classList.add(
      'border',
      'border-gray-300',
      'p-4',
      'text-center',
      'bg-white',
      'shadow-md',
      'rounded-lg'
    );

    petCard.innerHTML = `
            <img src="${pet.image}" alt="${pet.pet_name}" 
            class="w-full h-auto object-cover rounded-md">

            <div class="text-start ">
            <h2 class="font-bold text-xl mt-2">${pet.pet_name}</h2>

            <p class="text-gray-700 text-lg"> <span> <i class="fa-light fa-grid-2-plus"></i> <span class="pl-2"> Breed: </span> ${
              pet.breed
            } </span> </p>
            
            <p class="text-gray-700 text-lg"> <span> <i class="fa-light fa-calendar"></i>  <span class="pl-[10px]"> Birth:
            </span> ${pet.date_of_birth || 'Unknown Birth Date'} </span> </p>

            <p class="text-gray-700 text-lg"> <span> <i class="fa-light fa-mercury text-[22px]"></i> <span class="pl-[10px]"> Gender:  </span>${
              pet.gender || 'Unknown'
            }</span> </p>

            <p class="text-gray-700 text-lg"> <span class="pb-2" > <i class="fa-light fa-dollar-sign text-xl pl-[2px]"></i> <span class="pl-[12px]">
            Price: </span>$${pet.price || 'N/A'}</span> </p>
             </div>

             <div class="border w-full my-3"></div>

            <div class="flex justify-between  gap-[3px]">
            <button class="mt-2 px-6 md:px-3  border-2 rounded-lg border-gray-300 " onclick="likePet(${
              pet.petId
            })">

            <i class="fa-light fa-thumbs-up"></i>
            
            </button>
            <button id="adopt-button" class="mt-2 px-6 md:px-3 py-1 border-2 border-gray-300  text-[#0E7A81] font-bold rounded-lg" onclick="showAdoptModal()">Adopt</button>
            <button class="mt-2 px-6 md:px-3 py-1 border-2 border-gray-300 text-[#0E7A81] font-bold rounded-lg" 
            onclick="showPetDetails(${pet.petId})">Details</button>
            </div>
        `;
    petsGrid.appendChild(petCard);
  });
}


