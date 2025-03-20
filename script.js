// Menu Data
const menuItems = [
    // South Indian
    {
        id: 1,
        name: "Masala Dosa",
        category: "south-indian",
        price: 120,
        description: "Crispy crepe filled with spiced potato mixture",
        image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        name: "Idli Sambar",
        category: "south-indian",
        price: 80,
        description: "Steamed rice cakes served with lentil soup",
        image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    // North Indian
    {
        id: 3,
        name: "Butter Chicken",
        category: "north-indian",
        price: 250,
        description: "Tender chicken in rich tomato gravy",
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        name: "Paneer Tikka",
        category: "north-indian",
        price: 200,
        description: "Grilled cottage cheese marinated in spiced yogurt",
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    // Chinese
    {
        id: 5,
        name: "Fried Rice",
        category: "chinese",
        price: 150,
        description: "Stir-fried rice with vegetables and soy sauce",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 6,
        name: "Chow Mein",
        category: "chinese",
        price: 180,
        description: "Stir-fried noodles with vegetables and sauce",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    // Continental
    {
        id: 7,
        name: "Pasta Alfredo",
        category: "continental",
        price: 220,
        description: "Creamy pasta with parmesan cheese",
        image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 8,
        name: "Grilled Chicken",
        category: "continental",
        price: 280,
        description: "Grilled chicken breast with herbs",
        image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    // Beverages
    {
        id: 9,
        name: "Fresh Lime Soda",
        category: "beverages",
        price: 40,
        description: "Refreshing lime drink with soda",
        image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 10,
        name: "Mango Shake",
        category: "beverages",
        price: 60,
        description: "Creamy mango milkshake",
        image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
];

// Cart State
let cart = [];

// DOM Elements
const menuGrid = document.getElementById('menu-grid');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const cartTotalAmount = document.getElementById('cart-total-amount');
const cartIcon = document.querySelector('.cart-icon');
const cartCount = document.querySelector('.cart-count');
const categoryButtons = document.querySelectorAll('.category-btn');

// Initialize Menu
function initializeMenu() {
    displayMenuItems('all');
    setupCategoryButtons();
    setupCartIcon();
}

// Display Menu Items
function displayMenuItems(category) {
    menuGrid.innerHTML = '';
    const filteredItems = category === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === category);

    filteredItems.forEach(item => {
        const menuItem = createMenuItem(item);
        menuGrid.appendChild(menuItem);
    });
}

// Create Menu Item Element
function createMenuItem(item) {
    const div = document.createElement('div');
    div.className = 'menu-item';
    div.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="menu-item-content">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <div class="price">₹${item.price}</div>
            <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
        </div>
    `;

    div.querySelector('.add-to-cart').addEventListener('click', () => {
        addToCart(item);
    });

    return div;
}

// Setup Category Buttons
function setupCategoryButtons() {
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            displayMenuItems(button.dataset.category);
        });
    });
}

// Cart Functions
function addToCart(item) {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    
    updateCartCount();
    showNotification('Item added to cart!');
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function updateCartDisplay() {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">₹${item.price}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    cartTotalAmount.textContent = `₹${total}`;
}

function updateQuantity(itemId, change) {
    const item = cart.find(cartItem => cartItem.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(cartItem => cartItem.id !== itemId);
        }
        updateCartCount();
        updateCartDisplay();
    }
}

// Cart Modal Functions
function setupCartIcon() {
    cartIcon.addEventListener('click', () => {
        cartModal.classList.add('active');
        updateCartDisplay();
    });

    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
        if (!cartModal.contains(e.target) && !cartIcon.contains(e.target)) {
            cartModal.classList.remove('active');
        }
    });
}

// Notification System
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// Form Submission
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    showNotification('Message sent successfully!');
    e.target.reset();
});

// Check if user is logged in
function checkLogin() {
    const userType = localStorage.getItem('userType');
    if (!userType) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Checkout Modal
const checkoutModal = document.createElement('div');
checkoutModal.className = 'checkout-modal';
checkoutModal.innerHTML = `
    <div class="checkout-content">
        <h2>Checkout</h2>
        <div class="checkout-section">
            <h3>Order Summary</h3>
            <div class="order-summary" id="checkout-order-summary">
                <!-- Order summary will be dynamically added here -->
            </div>
        </div>
        <div class="checkout-section">
            <h3>Billing Details</h3>
            <form class="billing-form" id="billing-form">
                <input type="text" placeholder="Full Name" required>
                <input type="email" placeholder="Email" required>
                <input type="tel" placeholder="Phone Number" required>
                <input type="text" placeholder="Address" required>
                <input type="text" placeholder="City" required>
                <input type="text" placeholder="State" required>
                <input type="text" placeholder="PIN Code" required>
            </form>
        </div>
        <div class="checkout-section">
            <h3>Payment Method</h3>
            <div class="payment-options">
                <div class="payment-option" data-method="card">
                    <i class="fas fa-credit-card"></i>
                    <p>Credit/Debit Card</p>
                </div>
                <div class="payment-option" data-method="upi">
                    <i class="fas fa-mobile-alt"></i>
                    <p>UPI</p>
                </div>
                <div class="payment-option" data-method="netbanking">
                    <i class="fas fa-university"></i>
                    <p>Net Banking</p>
                </div>
                <div class="payment-option" data-method="cash">
                    <i class="fas fa-money-bill-wave"></i>
                    <p>Cash on Delivery</p>
                </div>
            </div>
        </div>
        <button class="place-order-btn">Place Order</button>
    </div>
`;
document.body.appendChild(checkoutModal);

// Payment Method Selection
const paymentOptions = checkoutModal.querySelectorAll('.payment-option');
paymentOptions.forEach(option => {
    option.addEventListener('click', () => {
        paymentOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
    });
});

// Update Checkout Order Summary
function updateCheckoutSummary() {
    const summaryDiv = checkoutModal.querySelector('#checkout-order-summary');
    summaryDiv.innerHTML = '';
    let subtotal = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const summaryItem = document.createElement('div');
        summaryItem.className = 'order-summary-item';
        summaryItem.innerHTML = `
            <span>${item.name} x ${item.quantity}</span>
            <span>₹${itemTotal}</span>
        `;
        summaryDiv.appendChild(summaryItem);
    });

    const totalDiv = document.createElement('div');
    totalDiv.className = 'order-summary-total';
    totalDiv.innerHTML = `
        <span>Total Amount</span>
        <span>₹${subtotal}</span>
    `;
    summaryDiv.appendChild(totalDiv);
}

// Modify the checkout button click handler
document.querySelector('.checkout-btn').addEventListener('click', () => {
    if (!checkLogin()) return;
    
    updateCheckoutSummary();
    checkoutModal.classList.add('active');
});

// Close checkout modal when clicking outside
document.addEventListener('click', (e) => {
    if (!checkoutModal.contains(e.target) && !e.target.closest('.checkout-btn')) {
        checkoutModal.classList.remove('active');
    }
});

// Handle order placement
checkoutModal.querySelector('.place-order-btn').addEventListener('click', () => {
    const billingForm = document.getElementById('billing-form');
    const selectedPayment = checkoutModal.querySelector('.payment-option.selected');

    if (!billingForm.checkValidity() || !selectedPayment) {
        showNotification('Please fill all required fields and select a payment method');
        return;
    }

    // Get user information
    const userType = localStorage.getItem('userType');
    const userId = localStorage.getItem('userId');
    const userName = billingForm.querySelector('input[type="text"]').value;

    // Create order object
    const order = {
        id: `ORD${Date.now()}`,
        user: userName,
        type: userType === 'teacher' ? 'Teacher' : 'Student',
        items: cart.map(item => `${item.quantity}x ${item.name}`).join(', '),
        amount: cart.reduce((total, item) => total + (item.price * item.quantity), 0),
        status: 'pending',
        date: new Date().toLocaleString(),
        paymentMethod: selectedPayment.dataset.method,
        billingDetails: {
            email: billingForm.querySelector('input[type="email"]').value,
            phone: billingForm.querySelector('input[type="tel"]').value,
            address: billingForm.querySelector('input[placeholder="Address"]').value,
            city: billingForm.querySelector('input[placeholder="City"]').value,
            state: billingForm.querySelector('input[placeholder="State"]').value,
            pincode: billingForm.querySelector('input[placeholder="PIN Code"]').value
        }
    };

    // Get existing orders from localStorage
    let orders = JSON.parse(localStorage.getItem('orders') || '[]');
    
    // Add new order
    orders.push(order);
    
    // Save updated orders back to localStorage
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear cart and close modal
    showNotification('Order placed successfully!');
    cart = [];
    updateCartCount();
    updateCartDisplay();
    checkoutModal.classList.remove('active');
    billingForm.reset();
});

// Check login status on page load
document.addEventListener('DOMContentLoaded', () => {
    if (!checkLogin()) return;
});

// Initialize the application
initializeMenu(); 