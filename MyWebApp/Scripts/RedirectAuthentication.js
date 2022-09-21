$(document).on('click', 'input:submit#Register', function () {
    window.location.href = "Register.html";
});

$(document).on('click', 'input:submit#Login', function () {
    window.location.href = "Login.html";
});

$(document).on("click", "input#Logout", function () {
    sessionStorage.setItem('user', JSON.stringify(null));
    window.location.href = "Index.html";
});