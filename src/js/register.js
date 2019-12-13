// register clicked
document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const mail = document.getElementById('reg_email').value;
    const pass = document.getElementById('reg_psw').value;
    const pass_rep = document.getElementById('reg_psw_repeat').value;

    if(pass != pass_rep) {
        return alert('Oba hasła muszą być takie same');
    }

    const usr = {
        email: mail,
        password: pass
    };
    
    // TODO nauczyć się wysyłać zapytania
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://localhost:3000/api/users/", true);
    xhr.send(JSON.stringify(usr));
    console.log(xhr.response);
});

// login clicked
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('log_email').value;
    const pass = document.getElementById('log_psw').value;

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://localhost:3000/api/users/me", true);
    xhr.send(null);
    
});