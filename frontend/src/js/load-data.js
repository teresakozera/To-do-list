//load lists of current user
const xhr = new XMLHttpRequest();
xhr.onloadend = function () {
    if (xhr.status != 200) {
        alert(xhr.response);
        window.location.replace('./index.html');
    } else {
        const user = JSON.parse(xhr.response);
        console.log(user);
    }
};
xhr.open("GET", "http://localhost:3000/api/users/me");
xhr.setRequestHeader('x-auth-token', token);
xhr.send();