var userNameInput = document.getElementById("userName");
var userEmailInput = document.getElementById("userEmail");
var userPasswordInput = document.getElementById("userPassword");
var message = document.getElementById("message");
var form = document.querySelector("form");
var loginEmail = document.getElementById("loginEmail");
var loginPassword = document.getElementById("loginPassword");
var loginMessage = document.getElementById("loginMessage");
var loginBtn = document.getElementById("loginBtn");
var welcomeMessage = document.getElementById("welcomeMessage");

// Account container
var container = [];

// Check if there are accounts in localStorage
if (localStorage.getItem("accountInfo") !== null) {
    container = JSON.parse(localStorage.getItem("accountInfo"));
}


// Form submission event
form.addEventListener("submit", function (e) {
    e.preventDefault();
    createAccount();
});

// SIGN UP
function createAccount() {
    if (userNameInput.value === "" || userEmailInput.value === "" || userPasswordInput.value === "") {
        message.innerHTML = "All Inputs are required";
        message.classList.add("text-danger");
        message.classList.remove("text-success");
        userNameInput.classList.add('is-invalid');
        userEmailInput.classList.add('is-invalid');
        userPasswordInput.classList.add('is-invalid');
        return false;
    }

    if (validateInput(userNameInput) && validateInput(userEmailInput) && validateInput(userPasswordInput)) {
        for (var i = 0; i < container.length; i++) {
            if (userEmailInput.value === container[i].email) {
                message.innerHTML = "This email already Exists !";
                message.classList.add("text-danger");
                message.classList.remove("text-success");
                return false;
            }
        }

        var account = {
            name: userNameInput.value,
            email: userEmailInput.value,
            password: userPasswordInput.value
        };
        container.push(account);
        localStorage.setItem("accountInfo", JSON.stringify(container));
        message.classList.remove("text-danger");
        message.classList.add("text-success");
        message.innerHTML = "Success";
        clear()
    }
}


function clear() {
    userNameInput.value = null
    userEmailInput.value = null
    userPasswordInput.value = null
}


// LOGIN
loginBtn.addEventListener("click", function () {
    login();
});

function login() {
    if (loginEmail.value === "" || loginPassword.value === "") {
        loginMessage.innerHTML = "All Inputs are required";
        loginMessage.classList.add("text-danger");
        loginMessage.classList.remove("text-success");
        return false;
    } else {
        for (var i = 0; i < container.length; i++) {
            if (loginEmail.value === container[i].email && loginPassword.value === container[i].password) {
                localStorage.setItem("username", JSON.stringify(container[i].name));
                window.location.href = "./home.html";
                return true;
            }
        }
        loginMessage.innerHTML = "Invalid email or password";
        loginMessage.classList.add("text-danger");
        loginMessage.classList.remove("text-success");
    }
}

// Load welcome message
function load() {
    welcomeMessage.innerHTML = "Welcome " + JSON.parse(localStorage.getItem("username"));
}

function logout() {
    localStorage.removeItem("username")
    window.location.href = "./index.html"
}




// VALIDATION

function validateInput(element) {
    var regex = {
        userName: /^[a-z0-9_-]{3,15}$/,
        userEmail: /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/,
        userPassword: /^[\dA-Za-z@_\-\=\+=\.]{5,}$/
    }

    if (regex[element.id].test(element.value) == true) {
        element.classList.add("is-valid")
        element.classList.remove("is-invalid")
        return true;

    } else {
        element.classList.remove("is-valid")
        element.classList.add("is-invalid")
        return false;
    }
}