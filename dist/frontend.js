import { Shop } from './backend';
// Attach the loginUser method to the login form's submit event
var loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', Shop.loginUser);
// Call showItems and updateCart initially
var shop = new Shop();
shop.showItems();
Shop.updateCart();
//# sourceMappingURL=frontend.js.map