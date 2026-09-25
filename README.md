# E-Shop – E-Commerce Web Application
deployed link : https://e-shop-alpha-drab.vercel.app/


E-Shop is a responsive mini e-commerce website developed as a front-end capstone project. It allows users to browse products, search for products, view product details, add products to a cart, create an account, and log in.

## Features

- Responsive e-commerce homepage
- Navigation bar with Home, Products, Cart, and Logout
- Product cards with:
  - Product image
  - Product name
  - Category
  - Price
  - Rating
  - Description
  - View Details
  - Add to Cart
- Product search by name
- Clear search option
- Product details popup
- Shopping cart
- Increase/decrease product quantity
- Remove products from cart
- Cart total calculation
- Cart data stored using localStorage
- User Sign Up
- User Login
- Login validation
- Logout functionality
- Login protection for the website
- Responsive design for desktop, tablet, and mobile

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Browser localStorage

## Project Structure

```text
E-Shop/
│
├── index.html
├── cart.html
├── login.html
├── signup.html
├── README.md
│
├── css/
│   └── style.css
│
├── js/
│   ├── products.js
│   ├── script.js
│   ├── cart.js
│   ├── login.js
│   └── signup.js
│
└── images/
    └── product images

depolyed link : https://e-shop-alpha-drab.vercel.app/

- Main Pages
--> Home Page
The home page displays the available products in a responsive grid. Users can search for a product and add products to their cart.
Product Details- Users can click View Details to see additional information about a product.

--> Cart Page
   The cart displays selected products and allows users to:
  1:Increase quantity
  2:Decrease quantity
  3:Remove products
  4:View subtotal
  5:View delivery charges
  6:View total amount

-->Login and Sign Up
    New users can create an account using the Sign Up page. Registered users can log in using their email and password.
    For this student project, account and session information is stored using browser localStorage.
LocalStorage
The project uses localStorage for:
  - e-shop-user
Stores the registered user information.
  - e-shop-logged-in-user
Stores the current login session.
  - e-shop-cart
Stores the shopping cart items.

# How to Run
Download or clone the project.
Open the project folder.
Make sure the images folder contains the required product images.
Open index.html in a browser.
Create an account using Sign Up.
Log in using the registered account.
Browse products and add items to the cart.

--> Future Improvements
Backend integration
Secure user authentication
Database integration
Payment gateway
Product categories and filters
Order history
Admin dashboard
Product management

--> Project Purpose
  This project was developed to demonstrate front-end development skills including JavaScript logic, DOM manipulation, localStorage, responsive design, product management, authentication flow, and e-commerce UI development.
