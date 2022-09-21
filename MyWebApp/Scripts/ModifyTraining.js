$(document).ready(function () {
    let trainingId = sessionStorage.getItem('TrainingId');
    let user = JSON.parse(sessionStorage.getItem('user'));
    $("a#message").text(user.Username);

    loadTrainingInfo(trainingId);

    function loadTrainingInfo(id) {
        $.get("/api/GroupTraining?id=" + id + "&by=training", function (data, status) {
            for (item in data) {
                let types = ["YOGA", "LES_MILLS_TONE", "BODY_PUMP"];
                $("input[name=nameTraining").val(data[item].Name);
                $("select#type option[value=" + types[data[item].Type].charAt(0) + types[data[item].Type].substring(1).toLowerCase() + "]").prop('selected', true);
                $("input[name=minutesOfTraining]").val(data[item].MinutesOfTraining);
                $("input[name=trainingStart]").val(data[item].TimeTrainingStarts);
                $("input[name=maxCustomers]").val(data[item].MaxNumOfCustomers);
            }
        });
    }
});