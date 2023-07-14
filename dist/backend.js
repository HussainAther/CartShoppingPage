var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { v4 as uuidv4 } from 'uuid';
// import express from 'express';
// import path from 'path';
// const app = express();
var Item = /** @class */ (function () {
    function Item(name, price, description) {
        this._id = uuidv4();
        this._name = name;
        this._price = price;
        this._description = description;
    }
    Object.defineProperty(Item.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (name) {
            this._name = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "price", {
        get: function () {
            return this._price;
        },
        set: function (price) {
            this._price = price;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "description", {
        get: function () {
            return this._description;
        },
        set: function (description) {
            this._description = description;
        },
        enumerable: false,
        configurable: true
    });
    Item.prototype.itemElement = function () {
        var _this = this;
        var itemDiv = document.createElement('div');
        itemDiv.classList.add('item-card');
        var nameElem = document.createElement('h3');
        nameElem.textContent = this._name;
        itemDiv.appendChild(nameElem);
        var descElem = document.createElement('p');
        descElem.textContent = this._description;
        itemDiv.appendChild(descElem);
        var priceElem = document.createElement('p');
        priceElem.textContent = "Price: $".concat(this._price);
        itemDiv.appendChild(priceElem);
        var addButton = document.createElement('button');
        addButton.textContent = 'Add to Cart';
        addButton.addEventListener('click', function () {
            var _a;
            // Call the addToCart method on the user instance
            (_a = Shop.myUser) === null || _a === void 0 ? void 0 : _a.addToCart(_this);
            Shop.updateCart();
        });
        itemDiv.appendChild(addButton);
        return itemDiv;
    };
    return Item;
}());
var User = /** @class */ (function () {
    function User(name, age) {
        this._id = uuidv4();
        this._name = name;
        this._age = age;
        this._cart = [];
    }
    Object.defineProperty(User.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (name) {
            this._name = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "age", {
        get: function () {
            return this._age;
        },
        set: function (age) {
            this._age = age;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "cart", {
        get: function () {
            return this._cart;
        },
        enumerable: false,
        configurable: true
    });
    User.prototype.addToCart = function (item) {
        var existingItem = this._cart.find(function (cartItem) { return cartItem.item.id === item.id; });
        if (existingItem) {
            existingItem.quantity += 1;
        }
        else {
            var newItem = { item: item, quantity: 1 };
            this._cart.push(newItem);
        }
    };
    User.prototype.removeFromCart = function (item) {
        this._cart = this._cart.filter(function (cartItem) { return cartItem.item.id !== item.id; });
    };
    User.prototype.removeQuantityFromCart = function (item, quantity) {
        var index = this._cart.findIndex(function (cartItem) { return cartItem.item.id === item.id; });
        if (index !== -1) {
            var updatedCartItem = __assign({}, this._cart[index]);
            updatedCartItem.quantity -= quantity;
            if (updatedCartItem.quantity <= 0) {
                this._cart.splice(index, 1);
            }
            else {
                this._cart[index] = updatedCartItem;
            }
        }
    };
    User.prototype.cartTotal = function () {
        var total = 0;
        for (var _i = 0, _a = this._cart; _i < _a.length; _i++) {
            var cartItem = _a[_i];
            total += cartItem.item.price * cartItem.quantity;
        }
        return total;
    };
    User.prototype.printCart = function () {
        console.log("Cart for ".concat(this._name, ":"));
        for (var _i = 0, _a = this._cart; _i < _a.length; _i++) {
            var cartItem = _a[_i];
            console.log("- ".concat(cartItem.item.name, " ($").concat(cartItem.item.price, ") - Quantity: ").concat(cartItem.quantity));
        }
    };
    User.prototype.cartHTMLElement = function () {
        var _this = this;
        var cartDiv = document.createElement('div');
        var _loop_1 = function (cartItem) {
            var cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            var nameElem = document.createElement('h4');
            nameElem.textContent = cartItem.item.name;
            cartItemDiv.appendChild(nameElem);
            var quantityElem = document.createElement('p');
            quantityElem.textContent = "Quantity: ".concat(cartItem.quantity);
            cartItemDiv.appendChild(quantityElem);
            var priceElem = document.createElement('p');
            priceElem.textContent = "Price: $".concat(cartItem.item.price);
            cartItemDiv.appendChild(priceElem);
            var removeButton = document.createElement('button');
            removeButton.textContent = 'Remove One';
            removeButton.id = "removeOne-".concat(cartItem.item.id);
            removeButton.addEventListener('click', function () {
                _this.removeQuantityFromCart(cartItem.item, 1);
                Shop.updateCart();
            });
            cartItemDiv.appendChild(removeButton);
            var removeAllButton = document.createElement('button');
            removeAllButton.textContent = 'Remove All';
            removeAllButton.id = "removeAll-".concat(cartItem.item.id);
            removeAllButton.addEventListener('click', function () {
                _this.removeFromCart(cartItem.item);
                Shop.updateCart();
            });
            cartItemDiv.appendChild(removeAllButton);
            cartDiv.appendChild(cartItemDiv);
        };
        for (var _i = 0, _a = this._cart; _i < _a.length; _i++) {
            var cartItem = _a[_i];
            _loop_1(cartItem);
        }
        return cartDiv;
    };
    User.prototype.addRemoveEventListeners = function () {
        var _this = this;
        var _loop_2 = function (cartItem) {
            var removeOneButton = document.getElementById("removeOne-".concat(cartItem.item.id));
            removeOneButton.addEventListener('click', function () {
                _this.removeQuantityFromCart(cartItem.item, 1);
                Shop.updateCart();
            });
            var removeAllButton = document.getElementById("removeAll-".concat(cartItem.item.id));
            removeAllButton.addEventListener('click', function () {
                _this.removeFromCart(cartItem.item);
                Shop.updateCart();
            });
        };
        for (var _i = 0, _a = this._cart; _i < _a.length; _i++) {
            var cartItem = _a[_i];
            _loop_2(cartItem);
        }
    };
    return User;
}());
var Shop = /** @class */ (function () {
    function Shop() {
        this._items = [];
        var item1 = new Item('Red Hat', 10, 'A stylish red hat');
        var item2 = new Item('Blue Shirt', 20, 'A comfortable blue shirt');
        var item3 = new Item('Green Pants', 30, 'Trendy green pants');
        var item4 = new Item('Yellow Dress', 25, 'A beautiful yellow dress');
        var item5 = new Item('Black Shoes', 40, 'Classic black shoes');
        var item6 = new Item('White Sneakers', 35, 'Casual white sneakers');
        this._items.push(item1, item2, item3, item4, item5, item6);
    }
    Object.defineProperty(Shop.prototype, "items", {
        get: function () {
            return this._items;
        },
        enumerable: false,
        configurable: true
    });
    Shop.prototype.showItems = function () {
        var shopDiv = document.getElementById('shop');
        console.log(shopDiv);
        // shopDiv.innerHTML = '';
        for (var _i = 0, _a = this._items; _i < _a.length; _i++) {
            var item = _a[_i];
            var itemElement = item.itemElement();
            shopDiv.appendChild(itemElement);
        }
    };
    Shop.updateCart = function () {
        var cartDiv = document.getElementById('cart');
        // cartDiv.innerHTML = '';
        if (!Shop.myUser || Shop.myUser.cart.length === 0) {
            var emptyCartElem = document.createElement('p');
            emptyCartElem.textContent = 'Cart is empty.';
            cartDiv.appendChild(emptyCartElem);
        }
        else {
            var cartItemsElement = Shop.myUser.cartHTMLElement();
            cartDiv.appendChild(cartItemsElement);
            Shop.myUser.addRemoveEventListeners();
        }
    };
    Shop.loginUser = function (event) {
        event.preventDefault();
        var nameInput = document.getElementById('name');
        var ageInput = document.getElementById('age');
        var name = nameInput.value.trim();
        var age = parseInt(ageInput.value.trim(), 10);
        if (name && !isNaN(age)) {
            Shop.myUser = new User(name, age);
            console.log("Logged in as ".concat(Shop.myUser.name));
            console.log("Age: ".concat(Shop.myUser.age));
            var shop = new Shop();
            Shop.updateCart();
        }
        else {
            console.log('Invalid login credentials.');
        }
    };
    return Shop;
}());
// // Serve static files
// app.use(express.static(path.resolve(__dirname, '../dist')));
// // Handle other routes
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../dist/index.html'));
// });
// // Start the server
// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });
export { Shop };
//# sourceMappingURL=backend.js.map