$(document).ready(function () {
    let TrainingId = sessionStorage.getItem('TrainingId');
    let user = JSON.parse(sessionStorage.getItem('user'));
    $("a#message").text(user.Username);
    showTrainingInfo(TrainingId);
    loadCustomers(TrainingId);

    function showTrainingInfo(id) {
        $.get("/api/GroupTraining?id=" + id + "&by=trainer", function (data, status) {
            for (item in data) {
                var date = new Date(data[item].TimeTrainingStarts);
                date.setMonth(date.getMonth() + 1);
                $("#Title").text("Lista posetilaca grupnog treninga: " + data[item].Name + ", odrzanog " + date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + date.toLocaleTimeString([], { hour12: false }).substring(0, date.toLocaleTimeString([], { hour12: false }).length - 3));
            }
        });
    }

    function loadCustomers(id) {
        $.get("/api/User?id=" + id, function (data, status) {
            let tableOfCustomers = '<table class="table table-bordered"><tr><th>Ime</th><th>Prezime</th><th>Pol</th><th>Datum rodjenja</th><th>Korisnicko ime</th><th>Email</th></tr>';
            if (data.length == 0) {
                tableOfCustomers += '<tr><td colspan="6">Na ovom treningu nema/nije bilo posetilaca</td></tr>';
            }
            else {
                for (item in data) {
                    let customer = '<td>' + data[item].FirstName + '</td>';
                    customer += '<td>' + data[item].LastName + '</td>';
                    customer += '<td>' + data[item].Gender + '</td>';
                    customer += '<td>' + data[item].DateOfBirth.split("T")[0] + '</td>';
                    customer += '<td>' + data[item].Username + '</td>';
                    customer += '<td>' + data[item].EmailAddress + '</td>';
                    tableOfCustomers += '<tr>' + customer + '</tr>';
                }
            }
            tableOfCustomers += '</table>'
            $('#Customers').html(tableOfCustomers);
        });
    }
});