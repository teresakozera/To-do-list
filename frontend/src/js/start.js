// przejscie miedzy register a login
const login = document.getElementById("hrefLogin").addEventListener("click", 
function (event) {
    event.target.parentNode.parentNode.parentNode.parentNode.style.display = "none";
    event.target.parentNode.parentNode.parentNode.parentNode.nextElementSibling.style.display = "block";  
});

// przejscie miedzy login a register
const register = document.getElementById("hrefRegister").addEventListener("click", 
function (event) {
    event.target.parentNode.parentNode.parentNode.parentNode.style.display = "none";
    event.target.parentNode.parentNode.parentNode.parentNode.previousElementSibling.style.display = "block";
});

