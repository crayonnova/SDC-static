const cartItem = document.querySelector("#cart-count");

function loadCart() {
  const cartJSON = localStorage.getItem("cart");
  return cartJSON ? JSON.parse(cartJSON) : [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addItemToCart(item) {
  const cart = loadCart();
  const existingItem = cart.find((cartItem) => cartItem.id === item.id);

  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  saveCart(cart);
  updateCartDisplay(cart);
}

function removeItemFromCart(itemId) {
  let cart = loadCart();
  cart = cart.filter((item) => item.id !== itemId);

  saveCart(cart);
  updateCartDisplay(cart);
}

function getTotalItemCount() {
  const cart = loadCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}

function updateCartDisplay(cart) {
    cartItem.textContent = getTotalItemCount();
}

updateCartDisplay();
