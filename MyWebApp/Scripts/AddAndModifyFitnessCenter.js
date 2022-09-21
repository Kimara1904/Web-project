var user = JSON.parse(sessionStorage.getItem('user'));
var action = sessionStorage.getItem('action');
var id = sessionStorage.getItem('FitnessCenterId');
$(document).ready(function () {
    $("a#message").text(user.Username);
    if (action === 'modify') {
        $("#Title").text("Izmeni fitnes centar");
        $("input[name=Action]").val("Izmeni");
        loadInfoFitnessCenter(id);

        function loadInfoFitnessCenter(id) {
            $.get("/api/FitnessCenter?id=" + id, function (data, status) {
                $("input[name=name]").val(data.Name);
                $("input[name=street]").val(data.Address.Street);
                $("input[name=num]").val(data.Address.Number);
                $("input[name=place]").val(data.Address.Place);
                $("input[name=postcode]").val(data.Address.Postcode);
                $("input[name=yearOfOpening]").val(data.YearOfOpening);
                $("input[name=monthlyMembership]").val(data.PriceOfMonthlyMembership);
                $("input[name=yearlyMembership]").val(data.PriceOfYearlyMembership);
                $("input[name=oneTraining]").val(data.PriceOfOneTraining);
                $("input[name=groupTraining]").val(data.PriceOfOneGroupTraining);
                $("input[name=withPersonalCoach]").val(data.PriceOfTrainingWithCoach);
            });
        }
    }
    else {
        $("#Title").text("Dodaj novi fitnes centar");
        $("input[name=Action]").val("Dodaj");
    }
})

$(document).on("submit", "form#Action", function () {
    var bool = check(this);

    if (bool == true) {
        executeAction();
    }

    function check(form) {
        let bName = true;
        let bStreet = true;
        let bNumber = true;
        let bPlace = true;
        let bPostcode = true;
        let bYearOfOpening = true;
        let bMonthlyMembership = true;
        let bYearlyMembership = true;
        let bOneTraining = true;
        let bGroupTraining = true;
        let bPersonalTraining = true;
        $("label.Greska").empty();
        if (form.name.value === "") {
            $("label#name.Greska").text("Naziv fitnes centra je obavezno polje!!!");
            bName = false;
        }
        if (form.street.value === "") {
            $("label#street.Greska").text("Ulica je obavezno polje!!!");
            bStreet = false;
        }
        if (form.num.value === "") {
            $("label#num.Greska").text("Broj je obavezno polje!!!");
            bNumber = false;
        }
        else if (form.place.value <= 0) {
            $("label#place.Greska").text("Mesto je obavezno polje!!!");
            bPlace = false;
        }
        if (form.postcode.value === "") {
            $("label#postcode.Greska").text("Postanski broj je obavezno polje!!!");
            bPostcode = false;
        }
        if (form.yearOfOpening.value === "") {
            $("label#yearOfOpening.Greska").text("Godina otvaranja je obavezno polje!!!");
            bYearOfOpening = false;
        }
        else if (form.yearOfOpening.value < 0) {
            $("label#yearOfOpening.Greska").text("Godina otvaranja ne moze biti manja od 0!!!");
            bYearOfOpening = false;
        }
        if (form.monthlyMembership.value === "") {
            $("label#monthlyMembership.Greska").text("Cena mesecne clanarine je obavezno polje!!!");
            bMonthlyMembership = false;
        }
        else if (form.monthlyMembership.value < 0) {
            $("label#monthlyMembership.Greska").text("Cena mesecne clanarine ne moze biti manja od 0!!!");
            bMonthlyMembership = false;
        }
        if (form.yearlyMembership.value === "") {
            $("label#yearlyMembership.Greska").text("Cena godisnje clanarine je obavezno polje!!!");
            bYearlyMembership = false;
        }
        else if (form.yearlyMembership.value < 0) {
            $("label#yearlyMembership.Greska").text("Cena godisnje clanarine ne moze biti manja od 0!!!");
            bYearlyMembership = false;
        }
        if (form.oneTraining.value === "") {
            $("label#oneTraining.Greska").text("Broj posetilaca je obavezno polje!!!");
            bOneTraining = false;
        }
        else if (form.oneTraining.value < 0) {
            $("label#oneTraining.Greska").text("Broj posetilaca ne moze biti manja od 0!!!");
            bOneTraining = false;
        }
        if (form.groupTraining.value === "") {
            $("label#groupTraining.Greska").text("Broj posetilaca je obavezno polje!!!");
            bGroupTraining = false;
        }
        else if (form.groupTraining.value < 0) {
            $("label#groupTraining.Greska").text("Broj posetilaca ne moze biti manja od 0!!!");
            bGroupTraining = false;
        }
        if (form.withPersonalCoach.value === "") {
            $("label#withPersonalCoach.Greska").text("Broj posetilaca je obavezno polje!!!");
            bPersonalTraining = false;
        }
        else if (form.withPersonalCoach.value < 0) {
            $("label#withPersonalCoach.Greska").text("Broj posetilaca ne moze biti manja od 0!!!");
            bPersonalTraining = false;
        }

        if (bName == false) {
            $("input[name=name]").focus();
            return false;
        }
        else if (bStreet == false) {
            $("input[name=street]").focus();
            return false;
        }
        else if (bNumber == false) {
            $("input[name=num]").focus();
            return false;
        }
        else if (bPlace == false) {
            $("input[name=place]").focus();
            return false;
        }
        else if (bPostcode == false) {
            $("input[name=postcode]").focus();
            return false;
        }
        else if (bYearOfOpening == false) {
            $("input[name=yearOfOpening]").focus();
            return false;
        }
        else if (bMonthlyMembership == false) {
            $("input[name=monthlyMembership]").focus();
            return false;
        }
        else if (bYearlyMembership == false) {
            $("input[name=yearlyMembership]").focus();
            return false;
        }
        else if (bOneTraining == false) {
            $("input[name=oneTraining]").focus();
            return false;
        }
        else if (bGroupTraining == false) {
            $("input[name=groupTraining]").focus();
            return false;
        }
        else if (bPersonalTraining == false) {
            $("input[name=withPersonalCoach]").focus();
            return false;
        }
        else {
            return true;
        }
    }

    function executeAction() {
        if (action === 'add') {
            $.post("/api/FitnessCenter",
                {
                    'Name': $("input[name=name]").val(),
                    'Address': {
                        'Street': $("input[name=street]").val(),
                        'Number': $("input[name=num]").val(),
                        'Place': $("input[name=place]").val(),
                        'Postcode': $("input[name=postcode]").val()
                    },
                    'YearOfOpening': $("input[name=yearOfOpening]").val(),
                    'Owner': {
                        'Username': user.Username
                    },
                    'PriceOfMonthlyMembership': $("input[name=monthlyMembership]").val(),
                    'PriceOfYearlyMembership': $("input[name=yearlyMembership]").val(),
                    'PriceOfOneTraining': $("input[name=oneTraining]").val(),
                    'PriceOfOneGroupTraining': $("input[name=groupTraining]").val(),
                    'PriceOfTrainingWithCoach': $("input[name=withPersonalCoach]").val()
                }
            ).done(function (data, status) {
                alert("Uspesno ste dodali fitnes centar");
                window.location.href = "OwnersFitnessCenters.html";
            }
            ).fail(function (xhr, status) {
                if (xhr.status == 409) {
                    alert("Godina otvaranja teretane mora biti najkasnije ove.");
                    $("input[name=trainingStart]").focus();
                }
                else {
                    alert("Doslo je do neke greske molimo pokusajte ponovo");
                }
            });
        }
        else {
            if (confirm("Da li ste sigurni da zelite da modifikujete fitnes centar?") == true) {
                $.ajax({
                    url: "/api/FitnessCenter",
                    type: "PUT",
                    data: {
                        'Name': $("input[name=name]").val(),
                        'Address': {
                            'Street': $("input[name=street]").val(),
                            'Number': $("input[name=num]").val(),
                            'Place': $("input[name=place]").val(),
                            'Postcode': $("input[name=postcode]").val()
                        },
                        'YearOfOpening': $("input[name=yearOfOpening]").val(),
                        'PriceOfMonthlyMembership': $("input[name=monthlyMembership]").val(),
                        'PriceOfYearlyMembership': $("input[name=yearlyMembership]").val(),
                        'PriceOfOneTraining': $("input[name=oneTraining]").val(),
                        'PriceOfOneGroupTraining': $("input[name=groupTraining]").val(),
                        'PriceOfTrainingWithCoach': $("input[name=withPersonalCoach]").val(),
                        'Id': id
                    },
                    success: function () {
                        alert("Uspesno ste modifikovali fitnes centar");
                        window.location.href = "OwnersFitnessCenters.html";
                    },
                    error: function (xhr, status) {
                        if (xhr.status == 409) {
                            alert("Godina otvaranja teretane mora biti najkasnije ove.");
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


