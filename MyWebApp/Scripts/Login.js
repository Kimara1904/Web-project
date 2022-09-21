$(document).on("submit", "form", function () {
    var bool = check(this);

    if (bool == true) {
        LogUser($("input[name=username]").val(), $("input[name=passw]").val());
    }

    function check(form) {
        let bUsername = true;
        let bPassword = true;
        $("label#username.Greska").empty();
        $("label#password.Greska").empty();
        if (form.username.value === "") {
            $("label#username.Greska").text("Korisnicko ime je obavezno polje!!!");
            bUsername = false;
        }
        if (form.passw.value === "") {
            $("label#password.Greska").text("Lozinka je obavezno polje!!!");
            bPassword = false;
        }
        if (bUsername == false) {
            $("input[name=username]").focus();
            return false;
        }
        else if (bPassword == false) {
            $("input[name=passw]").focus();
            return false;
        }
        else {
            return true;
        }
    }

    function LogUser(username, password) {
        $.get("/api/User?username=" + username + "&password=" + password).done(function (data, status) {
            alert("Uspesna prijava " + username);
            sessionStorage.setItem('user', JSON.stringify(data));
            window.location.href = "Index.html";
        }).fail(function (xhr, status) {
            if (xhr.status == 405) {
                alert("Ovaj nalog je blokiran");
            }
            else {
                alert("Greska username ili password nisu dobro uneseni");
            }
            $("input[name=username]").val("");
            $("input[name=username]").focus();
            $("input[name=passw]").val("");
        });
    }
    event.preventDefault();
});

$(document).on("click", "button#Register", function () {
    window.location.href = "Register.html";
});