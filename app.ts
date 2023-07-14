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
}

class User {
  private _id: string;
  private _name: string;
  private _age: number;
  private _cart: Item[];

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

  get cart(): Item[] {
    return this._cart;
  }

  addToCart(item: Item): void {
    this._cart.push(item);
  }

  removeFromCart(item: Item): void {
    this._cart = this._cart.filter((cartItem) => cartItem.id !== item.id);
  }

  removeQuantityFromCart(item: Item, quantity: number): void {
    const index = this._cart.findIndex((cartItem) => cartItem.id === item.id);
    if (index !== -1) {
      this._cart[index] = { ...this._cart[index] };
      this._cart[index].quantity -= quantity;
      if (this._cart[index].quantity <= 0) {
        this._cart.splice(index, 1);
      }
    }
  }

  cartTotal(): number {
    let total = 0;
    for (const item of this._cart) {
      total += item.price;
    }
    return total;
  }

  printCart(): void {
    console.log(`Cart for ${this._name}:`);
    for (const item of this._cart) {
      console.log(`- ${item.name} ($${item.price})`);
    }
  }
}

class Shop {
  private _items: Item[];

  constructor() {
    this._items = [];
    const item1 = new Item('Red Hat', 10, 'A stylish red hat');
    const item2 = new Item('Blue Shirt', 20, 'A comfortable blue shirt');
    const item3 = new Item('Green Pants', 30, 'Trendy green pants');

    this._items.push(item1, item2, item3);
  }

  get items(): Item[] {
    return this._items;
  }
}

// Driver Code
const shop = new Shop();
const user = new User('John Doe', 25);

const itemToAdd = shop.items[0];
user.addToCart(itemToAdd);

console.log('User cart after adding an item:');
user.printCart();
console.log('Cart total:', user.cartTotal());

const itemToRemove = shop.items[0];
user.removeFromCart(itemToRemove);

console.log('User cart after removing an item:');
user.printCart();
console.log('Cart total:', user.cartTotal());

const itemWithQuantityToRemove = shop.items[0];
user.addToCart(itemWithQuantityToRemove);
user.addToCart(itemWithQuantityToRemove);
user.addToCart(itemWithQuantityToRemove);

console.log('User cart before removing quantity:');
user.printCart();
console.log('Cart total:', user.cartTotal());

user.removeQuantityFromCart(itemWithQuantityToRemove, 2);

console.log('User cart after removing quantity:');
user.printCart();
console.log('Cart total:', user.cartTotal());

