const loginForm = document.getElementById('loginForm');
const errorBox = document.getElementById('error-box');

// Demo Credentials
const VALID_USER = "admin";
const VALID_PASS = "password123";

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if (username === VALID_USER && pass === VALID_PASS) {
        // Success: Store login state
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', username);
        
        // Redirect to main music page
        window.location.href = 'index.html'; 
    } else {
        // Fail: Show error
        errorBox.classList.remove('hidden');
    }
});

// Check if already logged in
if (localStorage.getItem('isLoggedIn') === 'true') {
    window.location.href = 'index.html';
}
