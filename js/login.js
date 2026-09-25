const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Password validation
    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    // Get registered user
    const registeredUser = localStorage.getItem("e-shop-user");

    if (!registeredUser) {
        alert("No account found. Please sign up first.");
        return;
    }

    const user = JSON.parse(registeredUser);

    // Check email and password
    if (email !== user.email || password !== user.password) {
        alert("Invalid email or password. Please try again.");
        return;
    }

    // Store logged-in user
    const loggedInUser = {
        name: user.name,
        email: user.email,
        loginTime: new Date().toISOString()
    };

    localStorage.setItem(
        "e-shop-logged-in-user",
        JSON.stringify(loggedInUser)
    );

    alert(`Welcome, ${user.name}!`);

    // Redirect to homepage
    window.location.href = "index.html";
});