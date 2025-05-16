const products = [
{ id: 1, name: "Product 1", price: 10.00, description: "Description for Product 1" },
{ id: 2, name: "Product 2", price: 20.00, description: "Description for Product 2" }
];

// Helper: Get cart from localStorage or initialize
function getCart() {
const cart = localStorage.getItem('cart');
return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
localStorage.setItem('cart', JSON.stringify(cart));
}

// Load product details page
if (window.location.pathname.endsWith('product.html')) {
const urlParams = new URLSearchParams(window.location.search);
const id = parseInt(urlParams.get('id'));
const product = products.find(p => p.id === id);
const container = document.getElementById('product-details');
if (product) {
container.innerHTML = `
<h2>${product.name}</h2>
<p>Price: $${product.price.toFixed(2)}</p>
<p>${product.description}</p>
`;
window.currentProduct = product; // store globally for addToCart
} else {
container.innerHTML = "<p>Product not found.</p>";
}
}

function addToCart() {
const cart = getCart();
const product = window.currentProduct;
if (product) {
cart.push(product);
saveCart(cart);
alert('Product added to cart.');
}
}

// Load cart page
if (window.location.pathname.endsWith('cart.html')) {
const cartContainer = document.getElementById('cart-items');
const cart = getCart();
if (cart.length === 0) {
cartContainer.innerHTML = "<p>Your cart is empty.</p>";
} else {
cartContainer.innerHTML = cart.map((item, index) => `
<div class="cart-item">
<h3>${item.name}</h3>
<p>Price: $${item.price.toFixed(2)}</p>
<button onclick="removeFromCart(${index})">Remove</button>
</div>
`).join('');
}
}

function removeFromCart(index) {
const cart = getCart();
cart.splice(index, 1);
saveCart(cart);
location.reload();
}

function clearCart() {
localStorage.removeItem('cart');
location.reload();
}