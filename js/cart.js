const CART_KEY = "e-shop-cart";

const cartContainer = document.getElementById("cart-container");
const cartSubtotal = document.getElementById("cart-subtotal");
const cartDelivery = document.getElementById("cart-delivery");
const cartTotal = document.getElementById("cart-total");
const checkoutButton = document.getElementById("checkout-button");
const cartCount = document.getElementById("cart-count");


function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}


function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}


function updateCartCount() {
    const cart = getCart();

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}


function renderCart() {
    const cart = getCart();

    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty 🛒</h2>
                <p>Add some products to your cart to continue shopping.</p>
                <a href="index.html" class="btn add-btn">
                    Continue Shopping
                </a>
            </div>
        `;

        updateSummary(0);
        return;
    }

    cartContainer.innerHTML = "";

    let subtotal = 0;

    cart.forEach(item => {

        const product = products.find(
            product => product.id === item.id
        );

        if (!product) return;

        const itemTotal = product.price * item.quantity;
        subtotal += itemTotal;

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <img 
                src="${product.image}" 
                alt="${product.name}"
                class="cart-item-image"
                onerror="this.src='https://placehold.co/300x200?text=Image+Not+Found'"
            >

            <div class="cart-item-info">
                <h3>${product.name}</h3>
                <p>${product.category}</p>
                <p class="cart-item-price">
                    ₹${product.price.toLocaleString("en-IN")}
                </p>
            </div>

            <div class="cart-item-actions">

                <div class="quantity-controls">
                    <button 
                        class="quantity-btn"
                        data-action="decrease"
                        data-id="${product.id}">
                        −
                    </button>

                    <span class="quantity">
                        ${item.quantity}
                    </span>

                    <button 
                        class="quantity-btn"
                        data-action="increase"
                        data-id="${product.id}">
                        +
                    </button>
                </div>

                <p class="cart-item-total">
                    ₹${itemTotal.toLocaleString("en-IN")}
                </p>

                <button 
                    class="remove-btn"
                    data-action="remove"
                    data-id="${product.id}">
                    Remove
                </button>

            </div>
        `;

        cartContainer.appendChild(cartItem);
    });

    updateSummary(subtotal);
}


function updateSummary(subtotal) {

    if (!cartSubtotal || !cartTotal || !cartDelivery) {
        return;
    }

    const delivery = subtotal > 0 ? 50 : 0;

    const total = subtotal + delivery;

    cartSubtotal.textContent =
        `₹${subtotal.toLocaleString("en-IN")}`;

    cartDelivery.textContent =
        `₹${delivery.toLocaleString("en-IN")}`;

    cartTotal.textContent =
        `₹${total.toLocaleString("en-IN")}`;
}


function updateQuantity(productId, change) {

    const cart = getCart();

    const item = cart.find(
        item => item.id === productId
    );

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        const index = cart.findIndex(
            item => item.id === productId
        );

        cart.splice(index, 1);
    }

    saveCart(cart);

    renderCart();
    updateCartCount();
}


function removeFromCart(productId) {

    let cart = getCart();

    cart = cart.filter(
        item => item.id !== productId
    );

    saveCart(cart);

    renderCart();
    updateCartCount();
}


if (cartContainer) {

    cartContainer.addEventListener("click", event => {

        const button = event.target.closest("button");

        if (!button) return;

        const productId = Number(button.dataset.id);
        const action = button.dataset.action;

        if (action === "increase") {
            updateQuantity(productId, 1);
        }

        if (action === "decrease") {
            updateQuantity(productId, -1);
        }

        if (action === "remove") {
            removeFromCart(productId);
        }

    });

}


if (checkoutButton) {

    checkoutButton.addEventListener("click", () => {

        const cart = getCart();

        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        alert("Checkout feature is ready for integration!");

    });

}


renderCart();
updateCartCount();