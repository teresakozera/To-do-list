const logoutBtn = document.getElementById('logout').addEventListener('click', (e) => {
    alert('You will be logged out!');
    window.location.replace('./index.html');
    const token = null;
});