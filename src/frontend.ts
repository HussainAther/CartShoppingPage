import { Shop, loginUser } from './backend';

// Attach the loginUser method to the login form's submit event
const loginForm = document.getElementById('loginForm') as HTMLFormElement;
loginForm.addEventListener('submit', loginUser);

// Attach the addToCart method to the cart form's submit event
const cartForm = document.getElementById('cartForm') as HTMLFormElement;
cartForm.addEventListener('submit', addToCart);

// Instantiate the Shop class outside of loginUser
const shop = new Shop();

// Call showItems and updateCart initially
shop.showItems();
Shop.updateCart();

// Function to handle adding items to the cart
function addToCart(event: Event): void {
  event.preventDefault();

  const itemInput = document.getElementById('item') as HTMLInputElement;
  const quantityInput = document.getElementById('quantity') as HTMLInputElement;

  const item = itemInput.value.trim();
  const quantity = parseInt(quantityInput.value.trim(), 10) || 1;

  if (item) {
    // Find the item in the shop items
    const selectedItem = shop.items.find((shopItem) => shopItem.name === item);

    if (selectedItem) {
      // Check if the item already exists in the cart
      const existingCartItem = Shop.myUser?.cart.find(
        (cartItem) => cartItem.item.id === selectedItem.id
      );

      if (existingCartItem) {
        // Update the quantity of the existing item in the cart
        existingCartItem.quantity += quantity;
      } else {
        // Call the addToCart method on the user instance with the item and quantity
        Shop.myUser?.addToCart(selectedItem, quantity);
      }

      Shop.updateCart();
    } else {
      console.log('Item not found in the shop.');
    }
  } else {
    console.log('Please enter a valid item name.');
  }

  // Reset the form inputs
  itemInput.value = '';
  quantityInput.value = '';
}
