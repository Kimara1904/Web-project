var idFitnessCenter = sessionStorage.getItem('FitnessCenter');
let user = JSON.parse(sessionStorage.getItem('user'));

$(document).ready(function () {

    if (user != null) {
        $("a#message").text(user.Username);
        $("input#Register").hide();
        $("input#Login").hide();
        $("input#Logout").show();
        var role = user.Role;

        if (role == 0) {
            $("#AddComments").show();
            $("input[name=rate]").val(0);
        }
        else {
            $("#AddComments").hide();
        }
    }
    else {
        $("#AddComments").hide();
        $("a#message").hide();
        $("input#Register").show();
        $("input#Login").show();
        $("input#Logout").hide();
    }
    
    loadDetails(idFitnessCenter);
    loadTrainings(idFitnessCenter);
    loadComments(idFitnessCenter);

    function loadDetails(id) {
        $.get("/api/FitnessCenter?id=" + id, function (data, status) {
            showDetails = '<table>';
            showDetails += '<tr><th>Naziv</th><td>' + data.Name + '</td></tr>';
            showDetails += '<tr><th>Adresa</th><td>' + data.Address.Street + ' ' + data.Address.Number + ', ' + data.Address.Place + ' ' + data.Address.Postcode + '</td></tr>';
            showDetails += '<tr><th>Godina otvaranja</th><td>' + data.YearOfOpening + '</td></tr>';
            showDetails += `<tr><th>Vlasnik</th><td><table><tr><th>Ime</th><td>` + data.Owner.FirstName + `</td></tr>
                            <tr><th>Prezime</th><td>` + data.Owner.LastName + `</td></tr>
                            <tr><th>Username</th><td>` + data.Owner.Username + `</td></tr>
                            <tr><th>Email</th><td>` + data.Owner.EmailAddress + `</td></tr></table></td></tr> `;
            showDetails += '<tr><th>Mesecna clanarina</th><td>' + data.PriceOfMonthlyMembership + '</td></tr>';
            showDetails += '<tr><th>Godisnja clanarina</th><td>' + data.PriceOfYearlyMembership + '</td></tr>';
            showDetails += '<tr><th>Cena jednog treninga</th><td>' + data.PriceOfOneTraining + '</td></tr>';
            showDetails += '<tr><th>Cena jednog grupnog treninga</th><td>' + data.PriceOfOneGroupTraining + '</td></tr>';
            showDetails += '<tr><th>Cena jednog treninga sa trenerom</th><td>' + data.PriceOfTrainingWithCoach + '</td></tr>';
            showDetails += '</table>';

            $("#Details").html(showDetails);
        });
    }
    
    function loadTrainings(id) {
        let types = ["YOGA", "LES_MILLS_TONE", "BODY_PUMP"];
        
        $.get("/api/GroupTraining?id=" + id + "&by=fitnessCenter", function (data, status) {
            let tableOfGroupTrainings = '<table class="table table-bordered"><tr><th>Naziv</th><th>Tip Treninga</th><th>Trajanje treninga</th><th>Datum i vreme pocetka treninga</th><th>Max Kapacitet</th><th>Trenutni Kapacitet</th>';
            if (role == 0) {
                if (data.length == 0) {
                    tableOfGroupTrainings += '</tr>';
                }
                else {
                    tableOfGroupTrainings += '<th></th></tr>';
                }
            }
            else {
                tableOfGroupTrainings += '</tr>';
            }
            if (data.length == 0) {
                tableOfGroupTrainings += '<tr><td colspan="6">Trenutno nema pristupacnih treninga</td></tr>';
            }
            else {
                for (item in data) {
                    let training = '<td>' + data[item].Name + '</td>';
                    training += '<td>' + (types[data[item].Type].charAt(0) + types[data[item].Type].substring(1).toLowerCase()).replace(/_/g, " ") + '</td>';
                    training += '<td>' + data[item].MinutesOfTraining + '</td>';
                    var date = new Date(data[item].TimeTrainingStarts);
                    date.setMonth(date.getMonth() + 1);
                    training += '<td>' + date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + date.toLocaleTimeString([], { hour12: false }).substring(0, date.toLocaleTimeString([], { hour12: false }).length - 3) + '</td>';
                    training += '<td>' + data[item].MaxNumOfCustomers + '</td>';
                    training += '<td>' + data[item].Customers.length + '</td>';
                    if (role == 0) {
                        training += '<td><button class="Join btn btn-default" value="' + data[item].Id + '">Prijavi se</button></td>';
                    }
                    tableOfGroupTrainings += '<tr>' + training + '</tr>';
                }
            }
            tableOfGroupTrainings += '</table>'
            $('#GroupTrainings').html(tableOfGroupTrainings);
        });
    }

    function loadComments(id) {
        $.get("/api/Comment?id=" + id, function (data, status) {
            var listOfComments = "<hr>";
            for (item in data) {
                if (data[item].Approved == true) {
                    listOfComments += '<h3>Korisnik: ' + data[item].Customer + '</h3>';
                    listOfComments += '<h4>Komentar:</h4><pre>' + data[item].Text + '</pre>';
                    listOfComments += '<div>Ocena: ' + data[item].Rate + '</div>';
                    listOfComments += '<hr>';
                }
            }
            $('#Comments').html(listOfComments);
        });
    }

    $(document).on("click", "button.Join", function () {

        joinToTraining(this);

        function joinToTraining(button) {
            if (confirm("Da li ste sigurni da zelite da se prijavite na ovaj trening?") == true) {
                $.ajax({
                    url: "/api/GroupTraining",
                    type: "PUT",
                    data: {
                        'id': $(button).val(),
                        'username': user.Username
                    },
                    success: function () {
                        alert("Uspesno ste se prijavili na trening sa sifrom: " + $(button).val());
                    },
                    error: function (xhr, status) {
                        if (xhr.status == 406) {
                            alert("Ovaj termin je vec popunjen");
                        }
                        else if (xhr.status == 405) {
                            alert("Vec ste se prijavili na ovaj termin");
                        }
                        else {
                            alert("Doslo je do greske")
                        }
                    },
                    complete: function () {
                        loadTrainings(idFitnessCenter);
                        event.preventDefault();
                    }
                });
            }
        }
    });
});

$(document).on("submit", "form#AddComment", function () {
    
    var bool = check();

    if (bool == true) {
        AddComment();
    }

    function check() {
        $("label#NewComment.Greska").empty();
        if ($("textarea[name=NewComment]").val() === "") {
            $("label#NewComment.Greska").text("Sam komentar je obavezno polje!!!");
            $("textarea[name=NewComment]").focus();
            return false;
        }
        return true;
    }

    function AddComment() {
        $.post("/api/Comment",
            {
                'Customer': user.Username,
                'FitnessCenter': {
                    'Id': idFitnessCenter
                },
                'Text': $("textarea[name=NewComment]").val(),
                'Rate': Math.round(($("input[name=rate]").val() / 100) * 4 + 1)
            }).done(function (data, status) {
                $("textarea[name=NewComment]").val('');
                $("input[name=rate]").val(0);
                alert("Uspesno ste dodali komentar");
            }).fail(function (data, status) {
                alert("Doslo je do greske pokusajte kasnije");
            }
        );
    }
    event.preventDefault();
});