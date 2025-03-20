// Get orders from localStorage
let orders = JSON.parse(localStorage.getItem('orders') || '[]');

// DOM Elements
const statsCounters = {
    pending: document.querySelector('.stat-card:nth-child(1) p'),
    processing: document.querySelector('.stat-card:nth-child(2) p'),
    delivered: document.querySelector('.stat-card:nth-child(3) p'),
    total: document.querySelector('.stat-card:nth-child(4) p')
};

const ordersTable = document.querySelector('.orders-table tbody');
const statusFilter = document.querySelector('#status-filter');
const searchInput = document.querySelector('.admin-search input');

// Update statistics
function updateStats() {
    const stats = {
        pending: orders.filter(order => order.status === 'pending').length,
        processing: orders.filter(order => order.status === 'processing').length,
        delivered: orders.filter(order => order.status === 'delivered').length,
        total: orders.length
    };

    statsCounters.pending.textContent = stats.pending;
    statsCounters.processing.textContent = stats.processing;
    statsCounters.delivered.textContent = stats.delivered;
    statsCounters.total.textContent = stats.total;
}

// Create order row
function createOrderRow(order) {
    const row = document.createElement('tr');
    if (order.type === 'Teacher') {
        row.classList.add('teacher-order');
    }

    row.innerHTML = `
        <td>${order.id}</td>
        <td>${order.user}</td>
        <td>${order.type}</td>
        <td>${order.items}</td>
        <td>₹${order.amount}</td>
        <td><span class="status-badge status-${order.status}">${order.status}</span></td>
        <td>
            <div class="action-buttons">
                <button class="action-btn view" onclick="viewOrder('${order.id}')">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn update" onclick="updateOrderStatus('${order.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete" onclick="deleteOrder('${order.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </td>
    `;

    return row;
}

// Display orders
function displayOrders(filteredOrders = orders) {
    ordersTable.innerHTML = '';
    filteredOrders.forEach(order => {
        ordersTable.appendChild(createOrderRow(order));
    });
}

// Filter orders by status
function filterOrdersByStatus(status) {
    if (status === 'all') {
        displayOrders();
    } else {
        const filtered = orders.filter(order => order.status === status);
        displayOrders(filtered);
    }
}

// Search orders
function searchOrders(query) {
    const filtered = orders.filter(order => 
        order.id.toLowerCase().includes(query.toLowerCase()) ||
        order.user.toLowerCase().includes(query.toLowerCase()) ||
        order.items.toLowerCase().includes(query.toLowerCase())
    );
    displayOrders(filtered);
}

// View order details
function viewOrder(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        alert(`
            Order Details:
            ID: ${order.id}
            User: ${order.user}
            Type: ${order.type}
            Items: ${order.items}
            Amount: ₹${order.amount}
            Status: ${order.status}
            Date: ${order.date}
            Payment Method: ${order.paymentMethod}
            
            Billing Details:
            Email: ${order.billingDetails.email}
            Phone: ${order.billingDetails.phone}
            Address: ${order.billingDetails.address}
            City: ${order.billingDetails.city}
            State: ${order.billingDetails.state}
            PIN Code: ${order.billingDetails.pincode}
        `);
    }
}

// Update order status
function updateOrderStatus(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        const statuses = ['pending', 'processing', 'delivered'];
        const currentIndex = statuses.indexOf(order.status);
        const nextIndex = (currentIndex + 1) % statuses.length;
        order.status = statuses[nextIndex];
        
        // Update orders in localStorage
        localStorage.setItem('orders', JSON.stringify(orders));
        
        displayOrders();
        updateStats();
    }
}

// Delete order
function deleteOrder(orderId) {
    if (confirm('Are you sure you want to delete this order?')) {
        orders = orders.filter(order => order.id !== orderId);
        // Update orders in localStorage
        localStorage.setItem('orders', JSON.stringify(orders));
        displayOrders();
        updateStats();
    }
}

// Event Listeners
statusFilter.addEventListener('change', (e) => {
    filterOrdersByStatus(e.target.value);
});

searchInput.addEventListener('input', (e) => {
    searchOrders(e.target.value);
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayOrders();
    updateStats();
}); 