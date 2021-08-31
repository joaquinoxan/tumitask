function resetForms(){
    var regform = document.getElementById("register-form");
    var logform = document.getElementById("login-form");
    regform.reset();
    logform.reset();
}

const registerButton = document.getElementById("register-acc-btn");
const loginButton = document.getElementById("login-acc-btn");

registerButton.addEventListener("click", function(){
    document.location.href = "home.html";
});
loginButton.addEventListener("click", function(){
    document.location.href = "home.html";
});

