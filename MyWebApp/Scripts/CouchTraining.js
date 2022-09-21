var user = JSON.parse(sessionStorage.getItem('user'));
sessionStorage.setItem('action', 'add');
$(document).ready(function () {
    $("a#message").text(user.Username);
    loadTrainings();
   
    function loadTrainings() {
        $.get("/api/GroupTraining?username=" + user.Username + "&sort=" + 0 + "&type=new", function (data, status) {
            let types = ["YOGA", "LES_MILLS_TONE", "BODY_PUMP"];
            let tableOfGroupTrainings = '<table class="table table-bordered"><tr><th>Naziv</th><th>Tip Treninga</th><th>Trajanje treninga</th><th>Pocetak</th><th>Max Kapacitet</th><th>Trenutni Kapacitet</th>';
            if (data.length == 0) {
                tableOfGroupTrainings += '</tr><tr><td colspan="6">Trenutno nema pristupacnih treninga</td></tr>'
            }
            else {
                tableOfGroupTrainings += '<th colspan="3"></th></tr>';
                for (item in data) {
                    let training = '<td>' + data[item].Name + '</td>';
                    training += '<td>' + (types[data[item].Type].charAt(0) + types[data[item].Type].substring(1).toLowerCase()).replace(/_/g, " ") + '</td>';
                    training += '<td>' + data[item].MinutesOfTraining + '</td>';
                    var date = new Date(data[item].TimeTrainingStarts);
                    date.setMonth(date.getMonth() + 1);
                    training += '<td>' + date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + date.toLocaleTimeString([], { hour12: false }).substring(0, date.toLocaleTimeString([], { hour12: false }).length - 3) + '</td>';
                    training += '<td>' + data[item].MaxNumOfCustomers + '</td>';
                    training += '<td>' + data[item].Customers.length + '</td>';
                    training += '<td><button class="Modify btn btn-default" value="' + data[item].Id + '">Izmeni</button></td>';
                    training += '<td><button class="Delete btn btn-default" value="' + data[item].Id + '">Obrisi</button></td>';
                    training += '<td><button class="Customers btn btn-default" value="' + data[item].Id + '">Posetioci</button></td>';
                    tableOfGroupTrainings += '<tr>' + training + '</tr>';
                }
            }
            tableOfGroupTrainings += '</table>'
            $('#FutureTrainings').html(tableOfGroupTrainings);
        });
    }
});


$(document).on("click", "button.Modify", function () {
    sessionStorage.setItem('TrainingId', $(this).val());
    sessionStorage.setItem('action', 'modify');
    window.location.href = "ModifyTraining.html";
});

$(document).on("click", "button.Delete", function () {
    DeleteTraining($(this).val());

    function DeleteTraining(id) {
        if (confirm("Da li ste sigurni da zelite da obrisete trening?") == true) {
            $.ajax({
                url: "/api/GroupTraining/" + id,
                type: "DELETE",
                success: function () {
                    alert("Uspesno obrisan trening");
                    location.reload();
                },
                error: function (xhr) {
                    if (xhr.status == 409) {
                        alert("Ne mozete da obrisete trening unutar kojeg ima prijavljenih posetilaca");
                    }
                    else {

                        alert("Doslo je do greske pokusajte opet");
                    }
                }
            });
        }
    }
});
