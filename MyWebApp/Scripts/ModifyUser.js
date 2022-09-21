$(document).ready(function () {
    let user = JSON.parse(sessionStorage.getItem('user'));

    loadUserInfo(user);

    function loadUserInfo(user) {
        $("input[name=username]").val(user.Username);
        $("input[name=passw]").val(user.Password);
        $("input[name=firstName]").val(user.FirstName);
        $("input[name=lastName]").val(user.LastName);
        $("input:radio[value=" + user.Gender + "]").prop("checked", true);
        $("input[name=emailAddress]").val(user.EmailAddress);
        $("input[name=dateOfBirth]").val(user.DateOfBirth.split("T")[0]);
    }
});

$(document).on("submit", "form", function () {
    var bool = check(this);

    if (bool == true) {
        ModifyUser();
    }
    
    function check(form) {
        let bPassword = true;
        let bFirstName = true;
        let bLastName = true;
        let bEmail = true;
        let bDate = true;
        $("label.Greska").empty();
        if (form.passw.value === "") {
            $("label#password.Greska").text("Lozinka je obavezno polje!!!");
            bPassword = false;
        }
        if (form.firstName.value === "") {
            $("label#firstName.Greska").text("Ime je obavezno polje!!!");
            bFirstName = false;
        }
        if (form.lastName.value === "") {
            $("label#lastName.Greska").text("Prezime je obavezno polje!!!");
            bLastName = false;
        }
        if (form.emailAddress.value === "") {
            $("label#email.Greska").text("Email je obavezno polje!!!");
            bEmail = false;
        }
        if (form.dateOfBirth.value === "") {
            $("label#date.Greska").text("Datum rodjenja je obavezno polje!!!");
            bDate = false;
        }

        if (bPassword == false) {
            $("input[name=passw]").focus();
            return false;
        }
        else if (bFirstName == false) {
            $("input[name=firstName]").focus();
            return false;
        }
        else if (bLastName == false) {
            $("input[name=lastName]").focus();
            return false;
        }
        else if (bEmail == false) {
            $("input[name=emailAddress]").focus();
            return false;
        }
        else if (bDate == false) {
            $("input[name=dateOfBirth]").focus();
            return false;
        }
        else {
            return true;
        }
    }

    function ModifyUser() {
        if (confirm("Da li ste sigurni da zelite da promenite podatke?") == true) {
            $.ajax({
                url: "/api/User",
                type: "PUT",
                data: {
                    'Username': $("input[name=username]").val(),
                    'Password': $("input[name=passw]").val(),
                    'FirstName': $("input[name=firstName]").val(),
                    'LastName': $("input[name=lastName]").val(),
                    'Gender': $("input[name=gender]:checked").val(),
                    'EmailAddress': $("input[name=emailAddress]").val(),
                    'DateOfBirth': $("input[name=dateOfBirth]").val(),
                },
                success: function (data) {
                    alert("Uspesna izmena");
                    sessionStorage.setItem('user', JSON.stringify(data));

                    window.location.href = "Infos.html";
                },
                error: function (result) {
                    alert("Doslo je do neke greske pokusajte ponovo");
                }
            });
        }
    }
    event.preventDefault();
});