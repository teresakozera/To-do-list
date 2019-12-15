// login clicked
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const mail = document.getElementById('log_email').value;
    const pass = document.getElementById('log_psw').value;

    const usr = JSON.stringify({
        email: mail,
        password: pass
    });

    let token = undefined;
    const xhr = new XMLHttpRequest();
    xhr.onloadend = function () {
        if(xhr.status != 200) {
            alert(xhr.response);
        } else {
            token = xhr.response;
            window.localStorage.setItem("token", token);
            window.location.replace('./main.html');
        }
    };
    xhr.open("POST", "http://localhost:3000/api/auth/");
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(usr);
});

