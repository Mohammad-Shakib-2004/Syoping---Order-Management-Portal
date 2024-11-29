// Update the quantity of items in the cart when + or - buttons are clicked
function updateQuantity(button, change) {
  const quantitySpan = button.closest('.cart-item').querySelector('.quantity');
  const quantityInput = button.closest('.cart-item').querySelector('.quantity-input');
  let currentQuantity = parseInt(quantitySpan.textContent);
  const newQuantity = currentQuantity + change;

  // Ensure quantity is always positive
  if (newQuantity >= 1) {
    quantitySpan.textContent = newQuantity;
    quantityInput.value = newQuantity; // Update the input field as well
  }

  // Update cart total after quantity change
  updateCartTotal();
}

// Update the quantity based on the user's input in the input field
function updateQuantityFromInput(input) {
  let newQuantity = parseInt(input.value);

  // Ensure quantity is at least 1
  if (newQuantity < 1) {
    newQuantity = 1;
    input.value = 1;
  }

  const quantitySpan = input.closest('.cart-item').querySelector('.quantity');
  quantitySpan.textContent = newQuantity;

  // Update cart total after quantity change
  updateCartTotal();
}

// Update the total cost of the cart based on item quantities and prices
function updateCartTotal() {
  let total = 0;
  const cartItems = document.querySelectorAll('.cart-item');

  cartItems.forEach(item => {
    const price = parseFloat(item.querySelector('p').textContent.replace('Price: $', ''));
    const quantity = parseInt(item.querySelector('.quantity').textContent);
    total += price * quantity;
  });

  // Display the updated total
  const totalSection = document.getElementById('cart-total');
  if (totalSection) {
    totalSection.textContent = `Total: $${total.toFixed(2)}`;
  }
}

// Redirect to the product page to add a new item
function redirectToProducts() {
  window.location.href = 'shop.html'; // Redirect to the Shop page
}

// Add an event listener for the proceed to payment button
document.getElementById('proceed-to-payment').addEventListener('click', function(e) {
  const cartItems = document.querySelectorAll('.cart-item');
  if (cartItems.length === 0) {
    e.preventDefault(); // Prevent redirect if cart is empty
    alert('Your cart is empty. Please add items to the cart before proceeding.');
  }
});

// Call updateCartTotal on page load to ensure total is accurate
window.addEventListener('load', updateCartTotal);
