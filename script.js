
// Dom variables---------------------------------------------------------
const form = document.getElementById("registrationForm");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirmPassword");

const usernameErrorBox = document.getElementById("usernameError");
const emailErrorBox = document.getElementById("emailError");
const passwordErrorBox = document.getElementById("passwordError");
const confirmErrorBox = document.getElementById("confirmPasswordError");


// Helper functions-------------------------------------------------------

// Username validation
const validateUsername = () => {
    let isValid = true;
    const username = usernameInput.value.trim();

    if (!username || username.length < 5) {
        usernameErrorBox.textContent = "Your username is too short!"
        isValid = false;
    } else {
        usernameErrorBox.textContent = "";
        isValid = true;
    }
    return isValid;
}
// Email validation
const validateEmail = () => {
    let isValid = true;

    if (emailInput.validity.valueMissing) {
        emailErrorBox.textContent = "Email is required";
        isValid = false;
    } else if (emailInput.validity.typeMismatch) {
        emailErrorBox.textContent = "Enter a valid email";
        isValid = false;
    } else {
        emailErrorBox.textContent = "";
    }

    return isValid;
}

// Password validation
const validatePassword = () => {
    let isValid = true;
    const password = passwordInput.value;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (passwordInput.validity.valueMissing) {
        passwordErrorBox.textContent = "Please enter your password";
        isValid = false;
    } else if (passwordInput.validity.tooShort) {
        passwordErrorBox.textContent = "Password must be at least 8 characters";
        isValid = false;
    } else if (!hasUpperCase || !hasLowerCase || !hasNumber) {
        passwordErrorBox.textContent =
            "Must include uppercase, lowercase, and a number";
        isValid = false;
    } else {
        passwordErrorBox.textContent = "";
    }

    return isValid;
}

// Confirm password validation
const validateConfirmPassword = () => {
    let isValid = true;
    const confirmPassword = confirmInput.value.trim();

    if (confirmInput.validity.valueMissing) {
        confirmErrorBox.textContent = "Please confirm your password";
        isValid = false;
    } else if (confirmPassword !== passwordInput.value) {
        confirmErrorBox.textContent = "Passwords do not match";
        isValid = false;
    } else {
        confirmErrorBox.textContent = "";
    }

    return isValid;
}

// Event listeners-------------------------------------------------------
usernameInput.addEventListener("input", validateUsername);
emailInput.addEventListener("input", validateEmail);
passwordInput.addEventListener("input", () => {
    validatePassword();
    validateConfirmPassword();
});
confirmInput.addEventListener("input", validateConfirmPassword);

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmValid = validateConfirmPassword();

    if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmValid) {
        alert("Registration successful!");
        localStorage.setItem("username", usernameInput.value);
        form.reset();
    } else {
        // Focus first invalid field
        if (!isUsernameValid) {
            usernameInput.focus();
        } else if (!isEmailValid) {
            emailInput.focus();
        } else if (!isPasswordValid) {
            passwordInput.focus();
        } else {
            confirmInput.focus();
        }
    }
})

