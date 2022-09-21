$(document).ready(function () {
    let user = JSON.parse(sessionStorage.getItem('user'));
    $("a#message").text(user.Username);
    if (user.Role == 0) {
        $("div.customerSearchAndSort").show();
        $("div.trainerSearchAndSort").hide();
    }
    else {
        $("div.customerSearchAndSort").hide();
        $("div.trainerSearchAndSort").show();
    }
    var nameTraining = $("input[name=nameTraining]").val();
    var type = $("select#type").find(":selected").val();
    var nameFitnessCenter = $("input[name=nameFitnessCenter]").val();
    var timeTrainingStartMin = $("input[name=trainingStartMin]").val();
    var timeTrainingStartMax = $("input[name=trainingStartMax]").val();
    var sort = $("input[name=sort]:checked").val();

    loadTrainings(user, nameTraining, type, nameFitnessCenter, timeTrainingStartMin, timeTrainingStartMax, sort);

    function loadTrainings(user, nameTraining, type, nameFitnessCenter, timeTrainingStartMin, timeTrainingStartMax, sort) {
        let types = ["YOGA", "LES_MILLS_TONE", "BODY_PUMP"];

        $.get("/api/GroupTraining?username=" + user.Username + "&sort=" + sort + "&type=old", function (data, status) {
            let tableOfGroupTrainings = '<table class="table table-bordered"><tr><th>Naziv</th><th>Tip Treninga</th><th>Naziv teretane</th><th>Trajanje treninga</th><th>Datum i vreme pocetka treninga</th><th>Max Kapacitet</th><th>Bilo posetilaca</th>';
            if (data == null) {
                tableOfGroupTrainings += '</tr><tr><td colspan="7">Trenutno nema pristupacnih treninga</td></tr>';
            }
            else if (data.length == 0) {
                tableOfGroupTrainings += '</tr><tr><td colspan="7">Trenutno nema pristupacnih treninga</td></tr>';
            }
            else {
                if (user.Role == 0) {
                    tableOfGroupTrainings += '</tr>';
                }
                else {
                    tableOfGroupTrainings += '<th></th></tr>';
                }
                for (item in data) {
                    if ((nameTraining.length != 0 && nameTraining != null) && !data[item].Name.toLowerCase().includes(nameTraining.toLowerCase())) {

                        continue;
                    }
                    if (type != "None" && type.toUpperCase() != types[data[item].Type]) {

                        continue;
                    }
                    if ((nameFitnessCenter.length != 0 && nameFitnessCenter != null) && !data[item].FitnessCenter.Name.toLowerCase().includes(nameFitnessCenter.toLowerCase())) {

                        continue;
                    }
                    if ((timeTrainingStartMin.length != 0 && timeTrainingStartMin != null)) {
                        let date1 = new Date(data[item].TimeTrainingStarts);
                        let date2 = new Date(timeTrainingStartMin);
                        
                        if (date1.getTime() < date2.getTime()) {
                            continue;
                        }
                    }
                    if ((timeTrainingStartMax.length != 0 && timeTrainingStartMax != null)) {
                        let date1 = new Date(data[item].TimeTrainingStarts);
                        let date2 = new Date(timeTrainingStartMax);

                        if (date1.getTime() < date2.getTime()) {
                            continue;
                        }
                    }
                    let training = '<td>' + data[item].Name + '</td>';
                    training += '<td>' + (types[data[item].Type].charAt(0) + types[data[item].Type].substring(1).toLowerCase()).replace(/_/g, " ") + '</td>';
                    training += '<td>' + data[item].FitnessCenter.Name + '</td>';
                    training += '<td>' + data[item].MinutesOfTraining + '</td>';
                    var date = new Date(data[item].TimeTrainingStarts);
                    date.setMonth(date.getMonth() + 1);
                    training += '<td>' + date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + date.toLocaleTimeString([], { hour12: false }).substring(0, date.toLocaleTimeString([], { hour12: false }).length - 3) + '</td>';
                    training += '<td>' + data[item].MaxNumOfCustomers + '</td>';
                    training += '<td>' + data[item].Customers.length + '</td>';
                    if (user.Role == 1) {
                        training += '<td><button class="Customers btn btn-default" value="' + data[item].Id + '">Posetioci</button></td>';
                    }
                    tableOfGroupTrainings += '<tr>' + training + '</tr>';
                }
            }
            tableOfGroupTrainings += '</table>'
            $('#Trainings').html(tableOfGroupTrainings);
        });
    }
    $("form[name=Search]").submit(function () {
        nameTraining = $("input[name=nameTraining]").val();
        type = $("select#type").find(":selected").val();
        nameFitnessCenter = $("input[name=nameFitnessCenter]").val();
        timeTrainingStartMin = $("input[name=trainingStartMin]").val();
        timeTrainingStartMax = $("input[name=trainingStartMax]").val();
        sort = $("input[name=sort]:checked").val();

        loadTrainings(user, nameTraining, type, nameFitnessCenter, timeTrainingStartMin, timeTrainingStartMax, sort);
        event.preventDefault();
    });

    $("input[name=sort]").change(function () {
        sort = $("input[name=sort]:checked").val();

        loadTrainings(user, nameTraining, type, nameFitnessCenter, timeTrainingStartMin, timeTrainingStartMax, sort);
        event.preventDefault();
    });

    $("input[name=ClearSearchAndSort]").click(function () {
        $("input[name=nameTraining]").val('');
        $("select#type option[value=None]").prop('selected', true);
        $("input[name=nameFitnessCenter]").val('');
        $("input[name=trainingStartMin]").val('');
        $("input[name=trainingStartMax]").val('');
        $("input:radio[value=0]").prop("checked", true);

        nameTraining = $("input[name=nameTraining]").val();
        type = $("select#type").find(":selected").val();
        nameFitnessCenter = $("input[name=nameFitnessCenter]").val();
        timeTrainingStartMin = $("input[name=trainingStartMin]").val();
        timeTrainingStartMax = $("input[name=trainingStartMax]").val();
        sort = $("input[name=sort]:checked").val();

        loadTrainings(user, nameTraining, type, nameFitnessCenter, timeTrainingStartMin, timeTrainingStartMax, sort);
        event.preventDefault();
    });
});