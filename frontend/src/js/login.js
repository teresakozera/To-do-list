// login clicked
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const mail = document.getElementById('log_email').value;
    const pass = document.getElementById('log_psw').value;

    const usr = JSON.stringify({
        email: mail,
        password: pass
    });

    const xhr = new XMLHttpRequest();
    xhr.onloadend = function () {
        alert(xhr.response);
    };
    xhr.open("POST", "http://localhost:3000/api/auth/");
    xhr.send(usr);

});