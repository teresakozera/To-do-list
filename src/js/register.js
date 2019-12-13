// register clicked
document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const mail = document.getElementById('reg_email').value;
    const pass = document.getElementById('reg_psw').value;
    const pass_rep = document.getElementById('reg_psw_repeat').value;

    if (pass != pass_rep) {
        return alert('Oba hasła muszą być takie same');
    }

    const usr = JSON.stringify({
        email: mail,
        password: pass
    });

    // TODO nauczyć się wysyłać zapytania
    const xhr = new XMLHttpRequest();
    xhr.onloadend = function () {
        alert(this.status);
    };
    xhr.open("POST", "https://localhost:3000/api/users/");
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(usr);
    
});

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
    xhr.withCredentials = true;
    xhr.open("POST", "https://localhost:3000/api/auth");
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            alert(xhr.status);
        }
    };
    xhr.send(usr);

});