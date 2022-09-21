$(document).ready(function () {

    var user = JSON.parse(sessionStorage.getItem('user'));
    if (user == null || user === 'undefined') {
        $("a#message").hide();
        $("input#Register").show();
        $("input#Login").show();
        $("input#Logout").hide();
        $("input#Info").hide();
        $("input#FormerTraining").hide();
        $("input#Trainings").hide();
        $("input#RegisterCoach").hide();
        $("input#OwnersFitnessCenters").hide();
        $("input#ListCoaches").hide();
        $("input#Comments").hide();
    }
    else {
        $("a#message").text(user.Username);
        $("input#Register").hide();
        $("input#Login").hide();
        $("input#Logout").show();
        $("input#Info").show();
        role = user.Role;
        if (role == 0) {
            $("input#FormerTraining").show();
            $("input#Trainings").hide();
            $("input#RegisterCoach").hide();
            $("input#OwnersFitnessCenters").hide();
            $("input#ListCoaches").hide();
            $("input#Comments").hide();
        }
        else if (role == 1) {
            $("input#Trainings").show();
            $("input#FormerTraining").show();
            $("input#RegisterCoach").hide();
            $("input#OwnersFitnessCenters").hide();
            $("input#ListCoaches").hide();
            $("input#Comments").hide();
        }
        else{
            $("input#FormerTraining").hide();
            $("input#Trainings").hide();
            $("input#RegisterCoach").show();
            $("input#OwnersFitnessCenters").show();
            $("input#ListCoaches").show();
            $("input#Comments").show();
        }

    }

    var name = $("input[name=name]").val();
    var address = $("input[name=address]").val();
    var yearMin = $("input[name=yearMin]").val();
    var yearMax = $("input[name=yearMax]").val();
    var sort = $("input[name=sort]:checked").val();

    loadFitnessCenters(name, address, yearMin, yearMax, sort);

    function loadFitnessCenters(name, address, yearMin, yearMax, sort) {
        $.get("/api/FitnessCenter?sort=" + sort, function (data, status) {
            let tableOfFitnessCenters = '<table class="table table-bordered"><tr><th>Naziv</th><th>Adresa</th><th>Godina otvaranja</th><th></th></tr>';
            for (item in data) {
                if ((name.length != 0 && name != null) && !data[item].Name.toLowerCase().includes(name.toLowerCase())) {

                    continue;
                }
                let bigAddress = data[item].Address.Street.toLowerCase() + ' ' + data[item].Address.Number + ', ' + data[item].Address.Place.toLowerCase() + ' ' + data[item].Address.Postcode;
                if (address.length != 0 && address != null && !bigAddress.includes(address.toLowerCase())) {
                    
                    continue;
                }
                if ((yearMin.length != 0 && yearMin != null) && data[item].YearOfOpening < yearMin) {
                    
                    continue;
                }
                if ((yearMax.length != 0 && yearMax != null) && data[item].YearOfOpening > yearMax) {
                    
                    continue;
                }
                
                let fitnessCenter = '<td>' + data[item].Name + '</td>';
                fitnessCenter += '<td>' + data[item].Address.Street + ' ' + data[item].Address.Number + ', ' + data[item].Address.Place + ' ' + data[item].Address.Postcode + '</td>';
                fitnessCenter += '<td>' + data[item].YearOfOpening + '</td>';
                fitnessCenter += '<td><button class="btn btn-default Redirect" value="' + data[item].Id + '">Detalji</button></td>';
                tableOfFitnessCenters += '<tr>' + fitnessCenter + '</tr>';
            }
            tableOfFitnessCenters += '</table>'
            $('#FitnessCenterTable').html(tableOfFitnessCenters);
        });
    }

    $("form[name=Search]").submit(function () {
        name = $("input[name=name]").val();
        address = $("input[name=address]").val();
        yearMin = $("input[name=yearMin]").val();
        yearMax = $("input[name=yearMax]").val();
        sort = $("input[name=sort]:checked").val();

        loadFitnessCenters(name, address, yearMin, yearMax, sort);
        event.preventDefault();
    });

    $("input[name=sort]").change(function () {
        sort = $("input[name=sort]:checked").val();

        loadFitnessCenters(name, address, yearMin, yearMax, sort);
        event.preventDefault();
    });

    $("input[name=ClearSearchAndSort]").click(function () {
        $("input[name=name]").val('');
        $("input[name=address]").val('');
        $("input[name=yearMin]").val('');
        $("input[name=yearMax]").val('');
        $("input:radio[value=0]").prop("checked", true);

        name = $("input[name=name]").val();
        address = $("input[name=address").val();
        yearMin = $("input[name=yearMin").val();
        yearMax = $("input[name=yearMax").val();
        sort = $("input[name=sort]:checked").val();

        loadFitnessCenters(name, address, yearMin, yearMax, sort);
        event.preventDefault();
    });
});

$(document).on("click", ".Redirect", function () {
    let id = $(this).val();
    ChangeToDetails(id);

    function ChangeToDetails(id) {
        sessionStorage.setItem('FitnessCenter', id);
        window.location.href = "Details.html";
    }
});
