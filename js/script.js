// =========================================
// LOGIN CHECK
// =========================================

const loggedInUser = localStorage.getItem("e-shop-logged-in-user");

if (!loggedInUser) {
    window.location.href = "login.html";
}


// =========================================
// E-SHOP HOMEPAGE FUNCTIONALITY
// =========================================

const CART_KEY = "e-shop-cart";

const productGrid = document.getElementById("product-grid");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const noProducts = document.getElementById("no-products");
const productCount = document.getElementById("product-count");

const productModal = document.getElementById("product-modal");
const modalBody = document.getElementById("modal-body");
const closeModal = document.getElementById("close-modal");

const logoutButton = document.getElementById("logout-button");


// =========================================
// LOGOUT
// =========================================

if (logoutButton) {

    logoutButton.addEventListener("click", () => {

        localStorage.removeItem("e-shop-logged-in-user");

        alert("You have been logged out.");

        window.location.href = "login.html";

    });

}


// =========================================
// GET CART FROM LOCAL STORAGE
// =========================================

function getCart() {

    return JSON.parse(
        localStorage.getItem(CART_KEY)
    ) || [];

}


// =========================================
// SAVE CART TO LOCAL STORAGE
// =========================================

function saveCart(cart) {

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );

}


// =========================================
// UPDATE CART COUNT
// =========================================

function updateCartCount() {

    const cart = getCart();

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const cartCount =
        document.getElementById("cart-count");

    if (cartCount) {

        cartCount.textContent = totalItems;

    }

}


// =========================================
// DISPLAY PRODUCTS
// =========================================

function displayProducts(productList) {

    if (!productGrid) {
        return;
    }

    productGrid.innerHTML = "";


    // Product count
    if (productCount) {

        productCount.textContent =
            `${productList.length} Products`;

    }


    // No products found
    if (productList.length === 0) {

        if (noProducts) {

            noProducts.style.display = "block";

        }

        return;

    }


    if (noProducts) {

        noProducts.style.display = "none";

    }


    // Create product cards
    productList.forEach(product => {

        const card =
            document.createElement("div");

        card.className = "product-card";


        card.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
                class="product-image"
                onerror="this.src='https://placehold.co/600x400?text=Image+Not+Found'"
            >

            <div class="product-info">

                <div class="product-category">
                    ${product.category}
                </div>

                <h3 class="product-name">
                    ${product.name}
                </h3>

                <p class="product-description">
                    ${product.description}
                </p>

                <div class="product-rating">
                    ⭐ ${product.rating}
                </div>

                <div class="product-price">
                    ₹${product.price.toLocaleString("en-IN")}
                </div>

                <div class="product-actions">

                    <button
                        class="btn view-btn"
                        data-action="view"
                        data-id="${product.id}"
                    >
                        View Details
                    </button>

                    <button
                        class="btn add-btn"
                        data-action="add"
                        data-id="${product.id}"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>

        `;

        productGrid.appendChild(card);

    });

}


// =========================================
// ADD PRODUCT TO CART
// =========================================

function addToCart(productId) {

    const cart = getCart();

    const existingProduct =
        cart.find(item => item.id === productId);


    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({

            id: productId,

            quantity: 1

        });

    }


    saveCart(cart);

    updateCartCount();

    alert("Product added to cart!");

}


// =========================================
// SHOW PRODUCT DETAILS
// =========================================

function showProductDetails(productId) {

    const product =
        products.find(
            item => item.id === productId
        );


    if (
        !product ||
        !productModal ||
        !modalBody
    ) {

        return;

    }


    modalBody.innerHTML = `

        <img
            src="${product.image}"
            alt="${product.name}"
            class="product-image"
            onerror="this.src='https://placehold.co/600x400?text=Image+Not+Found'"
        >

        <h2>
            ${product.name}
        </h2>

        <p class="product-category">
            ${product.category}
        </p>

        <p class="product-rating">
            ⭐ ${product.rating}
        </p>

        <p class="product-description">
            ${product.description}
        </p>

        <p class="product-price">
            ₹${product.price.toLocaleString("en-IN")}
        </p>

        <button
            class="btn add-btn"
            id="modal-add-cart"
        >
            Add to Cart
        </button>

    `;


    productModal.classList.add("active");


    const modalAddCart =
        document.getElementById(
            "modal-add-cart"
        );


    if (modalAddCart) {

        modalAddCart.addEventListener(
            "click",
            () => {

                addToCart(product.id);

                productModal.classList.remove(
                    "active"
                );

            }
        );

    }

}


// =========================================
// PRODUCT BUTTON EVENTS
// =========================================

if (productGrid) {

    productGrid.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest("button");


            if (!button) {
                return;
            }


            const productId =
                Number(button.dataset.id);

            const action =
                button.dataset.action;


            // Add to Cart
            if (action === "add") {

                addToCart(productId);

            }


            // View Details
            if (action === "view") {

                showProductDetails(productId);

            }

        }
    );

}


// =========================================
// SEARCH PRODUCTS
// =========================================

function searchProducts() {

    if (!searchInput) {
        return;
    }


    const searchTerm =
        searchInput.value
            .trim()
            .toLowerCase();


    // Show all products when search is empty
    if (searchTerm === "") {

        displayProducts(products);

        return;

    }


    // Search only by product name
    const filteredProducts =
        products.filter(product =>

            product.name
                .toLowerCase()
                .includes(searchTerm)

        );


    displayProducts(filteredProducts);

}


// =========================================
// SEARCH WHILE TYPING
// =========================================

if (searchInput) {

    searchInput.addEventListener(
        "input",
        searchProducts
    );

}


// =========================================
// SEARCH BUTTON
// =========================================

if (searchButton) {

    searchButton.addEventListener(
        "click",
        searchProducts
    );

}


// =========================================
// CLOSE MODAL
// =========================================

if (closeModal) {

    closeModal.addEventListener(
        "click",
        () => {

            if (productModal) {

                productModal.classList.remove(
                    "active"
                );

            }

        }
    );

}


// =========================================
// CLOSE MODAL WHEN CLICKING OUTSIDE
// =========================================

if (productModal) {

    productModal.addEventListener(
        "click",
        event => {

            if (
                event.target === productModal
            ) {

                productModal.classList.remove(
                    "active"
                );

            }

        }
    );

}


// =========================================
// ESC KEY CLOSES MODAL
// =========================================

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            productModal
        ) {

            productModal.classList.remove(
                "active"
            );

        }

    }
);


// =========================================
// INITIALIZE E-SHOP
// =========================================

displayProducts(products);

updateCartCount();