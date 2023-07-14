import { Shop } from './backend';

// Attach the loginUser method to the login form's submit event
const loginForm = document.getElementById('loginForm') as HTMLFormElement;
loginForm.addEventListener('submit', Shop.loginUser);

// Call showItems and updateCart initially
const shop = new Shop();
shop.showItems();
Shop.updateCart();

