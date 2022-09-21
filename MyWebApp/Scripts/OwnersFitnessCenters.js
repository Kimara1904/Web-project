var user = JSON.parse(sessionStorage.getItem('user'));
$(document).ready(function () {
    $("a#message").text(user.Username);
    loadFitnessCenters();

    function loadFitnessCenters() {
        $.get("/api/FitnessCenter?username=" + user.Username + "&token=" + 1, function (data, status) {
            let tableOfFitnessCenters = '<table class="table table-bordered"><tr><th>Naziv</th><th>Adresa</th><th>Godina otvaranja</th><th>Mesecna clanarina</th><th>Godisnja clanarina</th><th>Jedan trening</th><th>Grupni trening</th><th>Sa personalnim Trenerom</th>';
            if (data.length == 0) {
                tableOfFitnessCenters += '</tr><tr><td colspan="8">Trenutno nema pristupacnih treninga</td></tr>';
            }
            else {
                tableOfFitnessCenters += '<th colspan=2></th></tr>';
                for (item in data) {
                    let fitnessCenter = '<td>' + data[item].Name + '</td>';
                    fitnessCenter += '<td>' + data[item].Address.Street + ' ' + data[item].Address.Number + ', ' + data[item].Address.Place + ' ' + data[item].Address.Postcode + '</td>';
                    fitnessCenter += '<td>' + data[item].YearOfOpening + '</td>';
                    fitnessCenter += '<td>' + data[item].PriceOfMonthlyMembership + '</td>';
                    fitnessCenter += '<td>' + data[item].PriceOfYearlyMembership + '</td>';
                    fitnessCenter += '<td>' + data[item].PriceOfOneTraining + '</td>';
                    fitnessCenter += '<td>' + data[item].PriceOfOneGroupTraining + '</td>';
                    fitnessCenter += '<td>' + data[item].PriceOfTrainingWithCoach + '</td>';
                    fitnessCenter += '<td><button class="Modify btn btn-default" value="' + data[item].Id + '">Izmeni</button></td>';
                    fitnessCenter += '<td><button class="Delete btn btn-default" value="' + data[item].Id + '">Obrisi</button></td>';
                    tableOfFitnessCenters += '<tr>' + fitnessCenter + '</tr>';
                }
            }
            tableOfFitnessCenters += '</table>'
            $('#FitnessCenters').html(tableOfFitnessCenters);
        });
    }
});

$(document).on("click", "#AddFitnessCenter", function () {
    sessionStorage.setItem('action', 'add');
    window.location.href = "AddAndModifyFitnessCenter.html";
});

$(document).on("click", "button.Modify", function () {
    sessionStorage.setItem('FitnessCenterId', $(this).val());
    sessionStorage.setItem('action', 'modify');
    window.location.href = "AddAndModifyFitnessCenter.html";
});

$(document).on("click", "button.Delete", function () {
    DeleteFitnessCenter($(this).val());

    function DeleteFitnessCenter(id) {
        if (confirm("Da li ste sigurni da zelite da obrisete fitnes centar?") == true) {
            $.ajax({
                url: "/api/FitnessCenter/" + id,
                type: "DELETE",
                success: function () {
                    alert("Uspesno obrisan trening");
                    location.reload();
                },
                error: function (xhr) {
                    if (xhr.status == 409) {
                        alert("Ne mozete da obrisete fitnes centar unutar kojeg ima prijavljenih posetilaca za neki grupni trening");
                    }
                    else {

                        alert("Doslo je do greske pokusajte opet");
                    }
                }
            });
        }
    }
});