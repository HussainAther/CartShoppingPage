declare var paypal: any;

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

// Load the PayPal SDK asynchronously
function loadPayPalSDK() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://www.paypal.com/sdk/js?client-id=AcC-hp1ZzvYcEtMfFm3dW0VpOFqCK1puPW9sIJKMJpKPhgOV0sQ-XONrymST6zHHLc3bTZEPzmLqPQMh';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  
function createOrder() {
// Logic to create the order and retrieve the order ID
return fetch('/create-order', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    totalAmount: '10.00' // Replace with the actual total amount of the order
    })
})
.then(function(response) {
    return response.json();
})
.then(function(data) {
    return data.orderId;
});
}

function onApprove(data: any) {
    // Logic to handle the approved payment
    return fetch('/capture-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        orderId: data.orderID
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        // Process the captured payment and finalize the order
        console.log('Payment captured');
        console.log(data);
      });
  }
  
function onError(err: any) {
// Logic to handle any errors that occur during the payment process
console.error('PayPal Error:', err);
}

// Create a function to initialize PayPal buttons
function initializePayPalButtons() {
    paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'blue',
        shape: 'rect',
        label: 'paypal'
      },
      createOrder: createOrder,
      onApprove: onApprove,
      onError: onError
    }).render('#paypal-button-container');
  }
  
// Load the PayPal SDK and then initialize the buttons
loadPayPalSDK().then(() => {
initializePayPalButtons();
});