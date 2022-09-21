$(document).ready(function () {
    let user = JSON.parse(sessionStorage.getItem('user'));

    loadUserInfo(user);

    function loadUserInfo(user) {
        let tableUserInfo = '<table><tr><th>Korisnicko ime</th><td>' + user.Username + '</td></tr>';
        tableUserInfo += '<tr><th>Lozinka</th><td>' + user.Password + '</td></tr>';
        tableUserInfo += '<tr><th>Ime</th><td>' + user.FirstName + '</td></tr>';
        tableUserInfo += '<tr><th>Prezime</th><td>' + user.LastName + '</td></tr>';
        tableUserInfo += '<tr><th>Pol</th><td>' + user.Gender + '</td></tr>';
        tableUserInfo += '<tr><th>Email</th><td>' + user.EmailAddress + '</td></tr>';
        var date = new Date(user.DateOfBirth);
        date.setMonth(date.getMonth() + 1);
        tableUserInfo += '<tr><th>Datum rodjenja</th><td>' + date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + '</td></tr></table>';
        $("#TableInfo").html(tableUserInfo);
    }
});

$(document).on("click", "input:submit#ModifyAcc", function () {
    window.location.href = "ModifyAcc.html";
});