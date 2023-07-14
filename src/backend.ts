import { v4 as uuidv4 } from 'uuid';

class Item {
  private _id: string;
  private _name: string;
  private _price: number;
  private _description: string;

  constructor(name: string, price: number, description: string) {
    this._id = uuidv4();
    this._name = name;
    this._price = price;
    this._description = description;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get price(): number {
    return this._price;
  }

  set price(price: number) {
    this._price = price;
  }

  get description(): string {
    return this._description;
  }

  set description(description: string) {
    this._description = description;
  }

  itemElement(): HTMLDivElement {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item-card');

    const nameElem = document.createElement('h3');
    nameElem.textContent = this._name;
    itemDiv.appendChild(nameElem);

    const descElem = document.createElement('p');
    descElem.textContent = this._description;
    itemDiv.appendChild(descElem);

    const priceElem = document.createElement('p');
    priceElem.textContent = `Price: $${this._price}`;
    itemDiv.appendChild(priceElem);

    const addButton = document.createElement('button');
    addButton.textContent = 'Add to Cart';
    addButton.addEventListener('click', () => {
      // Call the addToCart method on the user instance
      Shop.myUser?.addToCart(this);
      Shop.updateCart();
    });
    itemDiv.appendChild(addButton);

    return itemDiv;
  }
}

function addToCart(event: Event): void {
  event.preventDefault();

  const itemInput = document.getElementById('item') as HTMLInputElement;
  const quantityInput = document.getElementById('quantity') as HTMLInputElement;

  const itemName = itemInput.value.trim();
  const quantity = parseInt(quantityInput.value.trim(), 10);

  if (itemName && !isNaN(quantity)) {
    const item = new Item(itemName, 0, ''); // Replace 0 and '' with actual price and description
    Shop.myUser?.addToCart(item, quantity);
    Shop.updateCart();
  } else {
    console.log('Invalid item or quantity.');
  }
}

class User {
  private _id: string;
  private _name: string;
  private _age: number;
  private _cart: { item: Item; quantity: number }[];

  constructor(name: string, age: number) {
    this._id = uuidv4();
    this._name = name;
    this._age = age;
    this._cart = [];
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get age(): number {
    return this._age;
  }

  set age(age: number) {
    this._age = age;
  }

  get cart(): { item: Item; quantity: number }[] {
    return this._cart;
  }
  addToCart(item: Item, quantity: number = 1): void {
    const existingItem = this._cart.find((cartItem) => cartItem.item.id === item.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const newItem = { item: item, quantity: quantity };
      this._cart.push(newItem);
    }
  }
  

  removeFromCart(item: Item): void {
    this._cart = this._cart.filter((cartItem) => cartItem.item.id !== item.id);
  }

  removeQuantityFromCart(item: Item, quantity: number): void {
    const index = this._cart.findIndex((cartItem) => cartItem.item.id === item.id);
    if (index !== -1) {
      const updatedCartItem = { ...this._cart[index] };
      updatedCartItem.quantity -= quantity;
      if (updatedCartItem.quantity <= 0) {
        this._cart.splice(index, 1);
      } else {
        this._cart[index] = updatedCartItem;
      }
    }
  }

  cartTotal(): number {
    let total = 0;
    for (const cartItem of this._cart) {
      total += cartItem.item.price * cartItem.quantity;
    }
    return total;
  }

  printCart(): void {
    console.log(`Cart for ${this._name}:`);
    for (const cartItem of this._cart) {
      console.log(
        `- ${cartItem.item.name} ($${cartItem.item.price}) - Quantity: ${cartItem.quantity}`
      );
    }
  }

  cartHTMLElement(): HTMLDivElement {
    const cartDiv = document.createElement('div');

    for (const cartItem of this._cart) {
      const cartItemDiv = document.createElement('div');
      cartItemDiv.classList.add('cart-item');

      const nameElem = document.createElement('h4');
      nameElem.textContent = cartItem.item.name;
      cartItemDiv.appendChild(nameElem);

      const quantityElem = document.createElement('p');
      quantityElem.textContent = `Quantity: ${cartItem.quantity}`;
      cartItemDiv.appendChild(quantityElem);

      const priceElem = document.createElement('p');
      priceElem.textContent = `Price: $${cartItem.item.price}`;
      cartItemDiv.appendChild(priceElem);

      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove One';
      removeButton.id = `removeOne-${cartItem.item.id}`;
      cartItemDiv.appendChild(removeButton);

      const removeAllButton = document.createElement('button');
      removeAllButton.textContent = 'Remove All';
      removeAllButton.id = `removeAll-${cartItem.item.id}`;
      cartItemDiv.appendChild(removeAllButton);

      cartDiv.appendChild(cartItemDiv);
    }

    return cartDiv;
  }

  addRemoveEventListeners(): void {
    for (const cartItem of this._cart) {
      const removeOneButton = document.getElementById(
        `removeOne-${cartItem.item.id}`
      ) as HTMLButtonElement;
      removeOneButton.addEventListener('click', () => {
        this.removeQuantityFromCart(cartItem.item, 1);
        Shop.updateCart();
      });

      const removeAllButton = document.getElementById(
        `removeAll-${cartItem.item.id}`
      ) as HTMLButtonElement;
      removeAllButton.addEventListener('click', () => {
        this.removeFromCart(cartItem.item);
        Shop.updateCart();
      });
    }
  }
}

class Shop {
  private _items: Item[];
  static myUser: User | undefined;

  constructor() {
    this._items = [];
    const item1 = new Item('Red Hat', 10, 'A stylish red hat');
    const item2 = new Item('Blue Shirt', 20, 'A comfortable blue shirt');
    const item3 = new Item('Green Pants', 30, 'Trendy green pants');
    const item4 = new Item('Yellow Dress', 25, 'A beautiful yellow dress');
    const item5 = new Item('Black Shoes', 40, 'Classic black shoes');
    const item6 = new Item('White Sneakers', 35, 'Casual white sneakers');

    this._items.push(item1, item2, item3, item4, item5, item6);
  }

  get items(): Item[] {
    return this._items;
  }

  showItems(): void {
    const shopDiv = document.getElementById('shop') as HTMLDivElement;
    shopDiv.innerHTML = ''; // Clear existing items before showing new ones
  
    for (const item of this._items) {
      const itemElement = item.itemElement();
      shopDiv.appendChild(itemElement);
    }
  }
  

  static updateCart(): void {
    const cartDiv = document.getElementById('cart') as HTMLDivElement;
    cartDiv.innerHTML = '';

    if (!Shop.myUser || Shop.myUser.cart.length === 0) {
      const emptyCartElem = document.createElement('p');
      emptyCartElem.textContent = 'Cart is empty.';
      cartDiv.appendChild(emptyCartElem);
    } else {
      const cartItemsElement = Shop.myUser.cartHTMLElement();
      cartDiv.appendChild(cartItemsElement);
      Shop.myUser.addRemoveEventListeners();
    }
  }
}

const shop = new Shop(); // Instantiate the Shop class outside of loginUser

function loginUser(event: Event): void {
  event.preventDefault();

  const nameInput = document.getElementById('name') as HTMLInputElement;
  const ageInput = document.getElementById('age') as HTMLInputElement;

  const name = nameInput.value.trim();
  const age = parseInt(ageInput.value.trim(), 10);

  if (name && !isNaN(age)) {
    Shop.myUser = new User(name, age);
    console.log(`Logged in as ${Shop.myUser.name}`);
    console.log(`Age: ${Shop.myUser.age}`);

    shop.showItems(); // Use the existing shop instance to show items
    Shop.updateCart(); // Use the updateCart function
  } else {
    console.log('Invalid login credentials.');
  }
}

const cartForm = document.getElementById('cartForm') as HTMLFormElement;
cartForm.addEventListener('submit', addToCart);

export { Shop, User, loginUser };