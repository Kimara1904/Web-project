var user = JSON.parse(sessionStorage.getItem('user'));

$(document).ready(function () {

    if (user == null) {
        $("a#message").hide();
        $("input#Logout").hide();
        $("#Title").text("Registruj se");
        $("div.RegisterCoach").hide();
        $("div.RegisterCustomer").show();
        $("input[name=Change]").val("Registruj se");
    }
    else {
        $("a#message").text(user.Username);
        $("#Title").text("Registruj trenera");
        $("div.RegisterCoach").show();
        $("div.RegisterCustomer").hide();
        $("input[name=Change]").val("Registruj trenera");

        loadFitnessCenters(user);

        function loadFitnessCenters(user) {
            $.get("/api/FitnessCenter?username=" + user.Username + "&token=1", function (data, status) {
                let FitnessCenters = '<option value="None" selected></option>';
                for (item in data) {
                    FitnessCenters += '<option value="' + data[item].Id + '">' + data[item].Name + '</option>'
                }
                $("select#fitnessCenter").html(FitnessCenters);
            });
        }
    }
});

$(document).on("submit", "form", function () {
    var bool = check(this);

    if (bool == true) {
        addUser();
    }
    
    function check(form) {
        let bUsername = true;
        let bPassword = true;
        let bFirstName = true;
        let bLastName = true;
        let bEmail = true;
        let bDate = true;
        let bFitnessCenter = true;
        $("label.Greska").empty();
        if (form.username.value === "") {
            $("label#username.Greska").text("Korisnicko ime je obavezno polje!!!");
            bUsername = false;
        }
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
        if (user != null && form.fitnessCenter.value === "None") {
            $("label#fitnessCenter.Greska").text("Fitnes centar je obavezno polje!!!");
            bFitnessCenter = false;
        }

        if (bUsername == false) {
            $("input[name=username]").focus();
            return false;
        }
        else if (bPassword == false) {
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
        else if (bFitnessCenter == false) {
            $("select#fitnessCenter").focus();
            return false;
        }
        else {
            return true;
        }
    }

    function addUser() {
        let role = 0;
        if (user != null) {
            role = 1;
        }
        $.post("/api/User",
            {
                'Username': $("input[name=username]").val(),
                'Password': $("input[name=passw]").val(),
                'FirstName': $("input[name=firstName]").val(),
                'LastName': $("input[name=lastName]").val(),
                'Gender': $("input[name=gender]:checked").val(),
                'EmailAddress': $("input[name=emailAddress]").val(),
                'DateOfBirth': $("input[name=dateOfBirth]").val(),
                'Role': role,
                'FitnessCenterId': $("select#fitnessCenter").find(":selected").val()
            }
        ).done(function (data, status) {
            if (user == null) {
                alert("Uspesno ste registrovani");
                sessionStorage.setItem('user', JSON.stringify(data));
                window.location.href = "Index.html";
            }
            else {
                alert("Uspesno ste registrovali trenera");
                location.reload();
            }
        }
        ).fail(function (xhr, status) {
            if (xhr.status == 409) {
                alert("Korisnicko ime mora biti jedinstveno");
                $("input[name=username]").val('');
                $("input[name=username]").focus();
            }
            else if (xhr.status == 405) {
                alert("Email adresa mora biti jedinstvena");
                $("input[name=emailAddress]").val('');
                $("input[name=emailAddress]").focus();
            }
            else if (xhr.status == 406) {
                alert("Datum mora biti stariji od danasnjeg");
                $("input[name=dateOfBirth]").val('');
                $("input[name=dateOfBirth]").focus();
            }
            else {
                alert("Doslo je do neke greske u registraciji. Molimo pokusajte opet!");
            }
            
        });
    }
    event.preventDefault();
});

$(document).on("click", "button#Login", function () {
    window.location.href = "Login.html";
});