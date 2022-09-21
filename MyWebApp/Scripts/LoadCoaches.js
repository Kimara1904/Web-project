$(document).ready(function () {
    var user = JSON.parse(sessionStorage.getItem('user'));
    $("a#message").text(user.Username);
    loadCoaches(user.Username);

    function loadCoaches(username) {
        $.get("/api/User?username=" + username + "&role=" + 1, function (data, status) {
            if (data == null) {
                alert("Doslo je do greske pokusajte ponovo");
            }
            else {
                let tableOfCoaches = '<table class="table table-bordered"><tr><th>Ime</th><th>Prezime</th><th>Pol</th><th>Datum rodjenja</th><th>Korisnicko ime</th><th>Email</th><th>Fitnes centar</th><th></th></tr>';
                if (data.length == 0) {
                    tableOfCoaches += '<tr><td colspan="6">Na ovom treningu nema/nije bilo posetilaca</td></tr>';
                }
                else {
                    for (item in data) {
                        let coach = '<td>' + data[item].FirstName + '</td>';
                        coach += '<td>' + data[item].LastName + '</td>';
                        coach += '<td>' + data[item].Gender + '</td>';
                        coach += '<td>' + data[item].DateOfBirth.split("T")[0] + '</td>';
                        coach += '<td>' + data[item].Username + '</td>';
                        coach += '<td>' + data[item].EmailAddress + '</td>';
                        coach += '<td>' + data[item].FitnessCenterId + '</td>';
                        if (data[item].Blocked == false) {
                            coach += '<td><button class="block btn btn-default" value="' + data[item].Username + '">Blokiraj</button></td>'
                        }
                        else {
                            coach += '<td><button class="unblock btn btn-default" value="' + data[item].Username + '">Odblokiraj</button></td>'
                        }
                        tableOfCoaches += '<tr>' + coach + '</tr>';
                    }
                }
                tableOfCoaches += '</table>'
                $('#ListOfCoaches').html(tableOfCoaches);
            }
        })
    }
});

$(document).on("click", ".block", function () {
    blockCoach($(this).val());

    function blockCoach(username) {
        if (confirm("Da li ste sigurni da zelite da blokirate ovog trenera?") == true) {
            $.ajax({
                url: "/api/User/" + username,
                type: "DELETE",
                success: function () {
                    alert("Blokirali ste korisnika " + username);
                    location.reload();
                },
                error: function () {
                    alert("Doslo je do greske prilikom blokiranja trenera " + username + "pokusajte ponovo");
                }
            });
        }
    }
});

$(document).on("click", ".unblock", function () {
    unblockCoach($(this).val());

    function unblockCoach(username) {
        $.ajax({
            url: "/api/User/" + username,
            type: "PUT",
            success: function () {
                alert("Odblokirali ste korisnika " + username);
                location.reload();
            },
            error: function () {
                alert("Doslo je do greske prilikom blokiranja trenera " + username + " pokusajte ponovo");
            }
        });
    }
});