const navbarCategories = document.querySelectorAll('.nav-link');
const displayDiv = document.getElementById('display');
const cartLink = document.getElementById('cartLink');
let cart = [];
let isCartOpen = false; // Initialize a flag to track whether the cart is open


const apiUrl = "https://fakestoreapi.com/products/category/";


function displayCards(data) {
  const cardContainer = document.getElementById('cardContainer');
  cardContainer.innerHTML = ''; // Clear the existing content

  data.forEach(item => {
    // Create a column for the card
    const col = document.createElement('div');
    col.classList.add('col');

    // Create a card element
    const card = document.createElement('div');
    card.classList.add('card');

    // Create an image element for the product image
    const img = document.createElement('img');
    img.src = item.image;
    img.classList.add('card-img-top');
    img.alt = item.title;

    // Create a card body
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    // Create card title and description elements
    const title = document.createElement('h5');
    title.classList.add('card-title');
    title.textContent = item.title;

    const description = document.createElement('p');
    description.classList.add('card-text');
    description.textContent = item.description;

    // Create a price element
    const price = document.createElement('p');
    price.classList.add('card-text');
    price.textContent = `Price: $${item.price.toFixed(2)}`;

    // Create "Add to Cart" button
    const addToCartButton = document.createElement('button');
    addToCartButton.classList.add('btn', 'btn-primary', 'btn-block'); // Add 'btn-block' class
    addToCartButton.textContent = 'Add to Cart';

    // Add click event listener to "Add to Cart" button
    addToCartButton.addEventListener('click', () => {
      submitToCart(item);
    });

    // Assemble the card elements
    card.appendChild(img);
    card.appendChild(cardBody);
    cardBody.appendChild(title);
    cardBody.appendChild(description);
    cardBody.appendChild(price);
    cardBody.appendChild(addToCartButton);

    // Append the card to the column
    col.appendChild(card);

    // Append the column to the card container
    cardContainer.appendChild(col);
  });
}

function submitToCart(item) {
  cart.push(item);
  console.log(`Added item to cart: ${item.title}`);
  console.log("Cart contents:", cart);
}


function updateCartModal() {
  // When updating the cart modal, you can set the flag to indicate that the cart is closed
  isCartOpen = false;
  const cartItemsContainer = document.getElementById('cartItems');
  cartItemsContainer.innerHTML = ''; // Clear the existing content

  cart.forEach(item => {
    // Create elements to display cart items (you can customize this part)
    const cartItemDiv = document.createElement('div');
    cartItemDiv.classList.add('cart-item');
    cartItemDiv.textContent = item.title;

    // Append the cart item to the container
    cartItemsContainer.appendChild(cartItemDiv);
  });
}

cartLink.addEventListener('click', function (event) {
  event.preventDefault(); // Prevent the default link behavior (e.g., navigating to a new page)
   // Set the flag to indicate that the cart is open
   

   // Open the cart modal
  openCartModal(); // Call the function to open the cart modal
});
function openCartModal() {
  isCartOpen = true;
  // Update the contents of the cart modal before opening it
  updateCartModal();
  
  // Get a reference to the cart modal element
  const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));

  // Open the cart modal
  cartModal.show();
}
// Define the fakeStore function as a block body arrow function
const fakeStore = async (endpoint) => {
  // Check if the cart is open, and if it is, return early without making the API request
  if (isCartOpen) {
    return;
  }

  try {
    const response = await fetch(apiUrl + endpoint);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.text(); // Read the response as text

    if (data) {
      try {
        // Attempt to parse the data as JSON
        const jsonData = JSON.parse(data);
        console.log(jsonData);
        displayCards(jsonData);
      } catch (error) {
        console.error('Error parsing JSON data:', error);
        // Handle the case where parsing the JSON data fails
        // You can display an error message or take other appropriate actions here.
      }
    } else {
      console.warn('API response is empty');
      // Handle the case where the response is empty, e.g., display a message to the user.
    }
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
        case 'Jewelery':
          endpoint = 'jewelery';
          break;
        case 'Men\'s Clothing':
          endpoint = `men's clothing`;
          break;
        case 'Women\'s Clothing':
          endpoint = `women's clothing`;
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