$(document).on("click", "button.Customers", function () {
    sessionStorage.setItem('TrainingId', $(this).val());
    window.location.href = "ListOfCustomersOnTraining.html";
});