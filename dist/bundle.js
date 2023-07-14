(()=>{"use strict";const e={randomUUID:"undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};let t;const n=new Uint8Array(16);function r(){if(!t&&(t="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!t))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return t(n)}const i=[];for(let e=0;e<256;++e)i.push((e+256).toString(16).slice(1));const o=function(t,n,o){if(e.randomUUID&&!n&&!t)return e.randomUUID();const a=(t=t||{}).random||(t.rng||r)();if(a[6]=15&a[6]|64,a[8]=63&a[8]|128,n){o=o||0;for(let e=0;e<16;++e)n[o+e]=a[e];return n}return function(e,t=0){return(i[e[t+0]]+i[e[t+1]]+i[e[t+2]]+i[e[t+3]]+"-"+i[e[t+4]]+i[e[t+5]]+"-"+i[e[t+6]]+i[e[t+7]]+"-"+i[e[t+8]]+i[e[t+9]]+"-"+i[e[t+10]]+i[e[t+11]]+i[e[t+12]]+i[e[t+13]]+i[e[t+14]]+i[e[t+15]]).toLowerCase()}(a)};var a=function(){return a=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},a.apply(this,arguments)},c=function(){function e(e,t,n){this._id=o(),this._name=e,this._price=t,this._description=n}return Object.defineProperty(e.prototype,"id",{get:function(){return this._id},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"name",{get:function(){return this._name},set:function(e){this._name=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"price",{get:function(){return this._price},set:function(e){this._price=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"description",{get:function(){return this._description},set:function(e){this._description=e},enumerable:!1,configurable:!0}),e.prototype.itemElement=function(){var e=this,t=document.createElement("div");t.classList.add("item-card");var n=document.createElement("h3");n.textContent=this._name,t.appendChild(n);var r=document.createElement("p");r.textContent=this._description,t.appendChild(r);var i=document.createElement("p");i.textContent="Price: $".concat(this._price),t.appendChild(i);var o=document.createElement("button");return o.textContent="Add to Cart",o.addEventListener("click",(function(){var t;null===(t=d.myUser)||void 0===t||t.addToCart(e),d.updateCart()})),t.appendChild(o),t},e}(),u=function(){function e(e,t){this._id=o(),this._name=e,this._age=t,this._cart=[]}return Object.defineProperty(e.prototype,"id",{get:function(){return this._id},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"name",{get:function(){return this._name},set:function(e){this._name=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"age",{get:function(){return this._age},set:function(e){this._age=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"cart",{get:function(){return this._cart},enumerable:!1,configurable:!0}),e.prototype.addToCart=function(e,t){void 0===t&&(t=1);var n=this._cart.find((function(t){return t.item.id===e.id}));if(n)n.quantity+=t;else{var r={item:e,quantity:t};this._cart.push(r)}},e.prototype.removeFromCart=function(e){this._cart=this._cart.filter((function(t){return t.item.id!==e.id}))},e.prototype.removeQuantityFromCart=function(e,t){var n=this._cart.findIndex((function(t){return t.item.id===e.id}));if(-1!==n){var r=a({},this._cart[n]);r.quantity-=t,r.quantity<=0?this._cart.splice(n,1):this._cart[n]=r}},e.prototype.cartTotal=function(){for(var e=0,t=0,n=this._cart;t<n.length;t++){var r=n[t];e+=r.item.price*r.quantity}return e},e.prototype.printCart=function(){console.log("Cart for ".concat(this._name,":"));for(var e=0,t=this._cart;e<t.length;e++){var n=t[e];console.log("- ".concat(n.item.name," ($").concat(n.item.price,") - Quantity: ").concat(n.quantity))}},e.prototype.cartHTMLElement=function(){for(var e=document.createElement("div"),t=0,n=this._cart;t<n.length;t++){var r=n[t],i=document.createElement("div");i.classList.add("cart-item");var o=document.createElement("h4");o.textContent=r.item.name,i.appendChild(o);var a=document.createElement("p");a.textContent="Quantity: ".concat(r.quantity),i.appendChild(a);var c=document.createElement("p");c.textContent="Price: $".concat(r.item.price),i.appendChild(c);var u=document.createElement("button");u.textContent="Remove One",u.id="removeOne-".concat(r.item.id),i.appendChild(u);var d=document.createElement("button");d.textContent="Remove All",d.id="removeAll-".concat(r.item.id),i.appendChild(d),e.appendChild(i)}return e},e.prototype.addRemoveEventListeners=function(){for(var e=this,t=function(t){document.getElementById("removeOne-".concat(t.item.id)).addEventListener("click",(function(){e.removeQuantityFromCart(t.item,1),d.updateCart()})),document.getElementById("removeAll-".concat(t.item.id)).addEventListener("click",(function(){e.removeFromCart(t.item),d.updateCart()}))},n=0,r=this._cart;n<r.length;n++)t(r[n])},e}(),d=function(){function e(){this._items=[];var e=new c("Red Hat",10,"A stylish red hat"),t=new c("Blue Shirt",20,"A comfortable blue shirt"),n=new c("Green Pants",30,"Trendy green pants"),r=new c("Yellow Dress",25,"A beautiful yellow dress"),i=new c("Black Shoes",40,"Classic black shoes"),o=new c("White Sneakers",35,"Casual white sneakers");this._items.push(e,t,n,r,i,o)}return Object.defineProperty(e.prototype,"items",{get:function(){return this._items},enumerable:!1,configurable:!0}),e.prototype.showItems=function(){var e=document.getElementById("shop");e.innerHTML="";for(var t=0,n=this._items;t<n.length;t++){var r=n[t].itemElement();e.appendChild(r)}},e.updateCart=function(){var t=document.getElementById("cart");if(t.innerHTML="",e.myUser&&0!==e.myUser.cart.length){var n=e.myUser.cartHTMLElement();t.appendChild(n),e.myUser.addRemoveEventListeners()}else{var r=document.createElement("p");r.textContent="Cart is empty.",t.appendChild(r)}},e}(),m=new d;document.getElementById("cartForm").addEventListener("submit",(function(e){var t;e.preventDefault();var n=document.getElementById("item"),r=document.getElementById("quantity"),i=n.value.trim(),o=parseInt(r.value.trim(),10);if(i&&!isNaN(o)){var a=new c(i,0,"");null===(t=d.myUser)||void 0===t||t.addToCart(a,o),d.updateCart()}else console.log("Invalid item or quantity.")})),document.getElementById("loginForm").addEventListener("submit",(function(e){e.preventDefault();var t=document.getElementById("name"),n=document.getElementById("age"),r=t.value.trim(),i=parseInt(n.value.trim(),10);r&&!isNaN(i)?(d.myUser=new u(r,i),console.log("Logged in as ".concat(d.myUser.name)),console.log("Age: ".concat(d.myUser.age)),m.showItems(),d.updateCart()):console.log("Invalid login credentials.")})),document.getElementById("cartForm").addEventListener("submit",(function(e){var t;e.preventDefault();var n=document.getElementById("item"),r=document.getElementById("quantity"),i=n.value.trim(),o=parseInt(r.value.trim(),10)||1;if(i){var a=s.items.find((function(e){return e.name===i}));a?(null===(t=d.myUser)||void 0===t||t.addToCart(a,o),d.updateCart()):console.log("Item not found in the shop.")}else console.log("Please enter a valid item name.");n.value="",r.value=""}));var s=new d;s.showItems(),d.updateCart()})();