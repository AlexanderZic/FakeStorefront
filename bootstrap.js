const navbarCategories = document.querySelectorAll('.nav-link');
const displayDiv = document.getElementById('display');

const apiUrl = "https://fakestoreapi.com/products/category/";

// Define the fakeStore function as a block body arrow function
const fakeStore = async (endpoint) => {
  try {
    const response = await fetch(apiUrl + endpoint);
    const data = await response.json();
    console.log(data); 
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function initializePage() {
  navbarCategories.forEach(category => {
    category.addEventListener('click', () => {
      let endpoint;
      
      // Determine the appropriate endpoint based on the category
      switch (category.textContent) {
        case 'Electronics':
          endpoint = 'electronics';
          break;
        case 'Jewelry':
          endpoint = 'jewelry';
          break;
        case 'Men\'s Clothing':
          endpoint = 'mens-clothing';
          break;
        case 'Women\'s Clothing':
          endpoint = 'womens-clothing';
          break;
        default:
          endpoint = '';
      }
      
      console.log(`Clicked on endpoint: ${endpoint}`); // Log the endpoint
      fakeStore(endpoint); // Invoke fakeStore with endpoint
    });
  });
}

initializePage(); // Call the initialization function

// Set the window onload event at the bottom
window.onload = () => {
  fakeStore(); 
};