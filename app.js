// Example data for products
let products = [
    { id: 1, name: 'Smartphone', category: 'electronics', price: 299.99, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'T-shirt', category: 'clothing', price: 19.99, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Blender', category: 'home', price: 89.99, image: 'https://via.placeholder.com/150' },
  ];
  
  // Cart array to store selected products
  let cart = [];
  
  // Render products on the page
  function renderProducts() {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';
  
    // Get search and category filters
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const categoryFilter = document.getElementById('category-filter').value;
  
    // Filter products based on search and category
    const filteredProducts = products.filter(product => {
      return (product.name.toLowerCase().includes(searchTerm) && 
              (categoryFilter === '' || product.category === categoryFilter));
    });
  
    filteredProducts.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
        <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      productsContainer.appendChild(productCard);
    });
  }
  
  // Add product to cart
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartCount();
  }
  
  // Update cart count
  function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
  }
  
  // Open cart modal
  function openCart() {
    const cartModal = document.getElementById('cart-modal');
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
  
    cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
        <h4>${item.name}</h4>
        <p>$${item.price}</p>
        <button onclick="removeFromCart(${item.id})">Remove</button>
      `;
      cartItemsContainer.appendChild(cartItem);
    });
  
    cartModal.style.display = 'flex';
  }
  
  // Close cart modal
  function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
  }
  
  // Remove product from cart
  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    openCart();
  }
  
  // Checkout process (simple alert for now)
  function checkout() {
    if (cart.length === 0) {
      alert('Your cart is empty!');
    } else {
      alert('Proceeding to checkout...');
    }
  }
  
  // Event listeners
  document.getElementById('cart-btn').addEventListener('click', openCart);
  document.getElementById('search-bar').addEventListener('input', renderProducts);
  document.getElementById('category-filter').addEventListener('change', renderProducts);
  
  // Initial render
  renderProducts();
  