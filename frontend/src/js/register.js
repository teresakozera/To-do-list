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

    const xhr = new XMLHttpRequest();
    xhr.onloadend = function () {
        if(xhr.status != 200) {
            alert(xhr.response);
        } else {
            window.location.replace('./main.html');
        }
    };
    xhr.open("POST", "http://localhost:3000/api/users/");
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(usr);
    
});