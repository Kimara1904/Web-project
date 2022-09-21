var user = JSON.parse(sessionStorage.getItem('user'));
var action = sessionStorage.getItem('action');
var trainingId = sessionStorage.getItem('TrainingId');
$(document).on("submit", "form", function () {

    var bool = check(this);

    if (bool == true) {
        ExecuteAction();

    }

    function check(form) {
        let bNameTraining = true;
        let bTypeTraining = true;
        let bMinutesOfTraining = true;
        let bTimeOfTrainingStart = true;
        let bMaxCustomerNumber = true;
        $("label.Greska").empty();
        if (form.nameTraining.value === "") {
            $("label#name.Greska").text("Naziv treninga je obavezno polje!!!");
            bNameTraining = false;
        }
        if (form.type.value === "None") {
            $("label#type.Greska").text("Tip treninga je obavezno polje!!!");
            bTypeTraining = false;
        }
        if (form.minutesOfTraining.value === "") {
            $("label#minutesOfTraining.Greska").text("Trajanje treninga je obavezno polje!!!");
            bMinutesOfTraining = false;
        }
        else if (form.minutesOfTraining.value <= 0) {
            $("label#minutesOfTraining.Greska").text("Trajanje treninga ne moze biti manje ili jednako 0!!!");
            bMinutesOfTraining = false;
        }
        if (form.trainingStart.value === "") {
            $("label#trainingStart.Greska").text("Pocetak treninga je obavezno polje!!!");
            bTimeOfTrainingStart = false;
        }
        if (form.maxCustomers.value === "") {
            $("label#maxCustomers.Greska").text("Broj posetilaca je obavezno polje!!!");
            bMaxCustomerNumber = false;
        }

        if (bNameTraining == false) {
            $("input[name=nameTraining]").focus();
            return false;
        }
        else if (bTypeTraining == false) {
            $("select#type").focus();
            return false;
        }
        else if (bMinutesOfTraining == false) {
            $("input[name=minutesOfTraining]").focus();
            return false;
        }
        else if (bTimeOfTrainingStart == false) {
            $("input[name=trainingStart]").focus();
            return false;
        }
        else if (bMaxCustomerNumber == false) {
            $("input[name=maxCustomers]").focus();
            return false;
        }
        else {
            return true;
        }
    }

    function ExecuteAction() {
        if (action === 'add') {
            $.post("/api/GroupTraining",
                {
                    'Name': $("input[name=nameTraining]").val(),
                    'Type': $("select#type").find(":selected").val().toUpperCase(),
                    'FitnessCenter': {
                        'Id': user.FitnessCenterId
                    },
                    'MinutesOfTraining': $("input[name=minutesOfTraining]").val(),
                    'TimeTrainingStarts': $("input[name=trainingStart]").val(),
                    'MaxNumOfCustomers': $("input[name=maxCustomers]").val(),
                    'Customers': [
                        user.Username
                    ]
                }
            ).done(function (data, status) {
                alert("Uspesno ste dodali training");
                location.reload();
            }
            ).fail(function (xhr, status) {
                if (xhr.status == 409) {
                    alert("Trening se moze organizovati minimum 3 dana unapred od danasnjeg");
                    $("input[name=trainingStart]").focus();
                }
                else {
                    alert("Doslo je do neke greske molimo pokusajte ponovo");
                }
            });
        }
        else {
            if (confirm("Da li ste sigurni da zelite da modifikujete ovaj trening?") == true) {
                $.ajax({
                    url: "/api/GroupTraining/" + sessionStorage.getItem('TrainingId'),
                    type: "PUT",
                    data: {
                        'Name': $("input[name=nameTraining]").val(),
                        'Type': $("select#type").find(":selected").val(),
                        'MinutesOfTraining': $("input[name=minutesOfTraining]").val(),
                        'TimeTrainingStarts': $("input[name=trainingStart]").val(),
                        'MaxNumOfCustomers': $("input[name=maxCustomers]").val(),
                        'Id': sessionStorage.getItem('TrainingId')
                    },
                    success: function (result) {
                        alert("Uspesna izmena");

                        window.location.href = "CoachTraining.html";
                    },
                    error: function (xhr) {
                        if (xhr.status == 409) {
                            alert("Trening se moze organizovati minimum 3 dana unapred od danasnjeg");
                            $("input[name=trainingStart]").focus();
                        }
                        else {
                            alert("Doslo je do neke greske molimo pokusajte ponovo");
                        }
                    }
                });
            }
        }
    }

    event.preventDefault();
});