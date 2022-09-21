$(document).ready(function () {
    var user = JSON.parse(sessionStorage.getItem('user'));
    $("a#message").text(user.Username);
    loadComments(user.Username);

    function loadComments(username) {
        $.get("/api/Comment?username=" + username + "&token=1", function (data, status) {
            if (data == null) {
                alert("Doslo je do greske pokusajte ponovo");
            }
            else {
                var listOfComments = '<hr>';
                if (data.lenght == 0) {
                    listOfComments += '<p>Trenutno nema komentara vise</p><hr>';
                }
                for (item in data) {
                    
                    listOfComments += '<h3>Korisnik: ' + data[item].Customer + '</h3>';
                    listOfComments += '<h4>Fitnes centar: ' + data[item].FitnessCenter.Name + '</h4>';
                    listOfComments += '<h4>Komentar:</h4><pre>' + data[item].Text + '</pre>';
                    listOfComments += '<div>Ocena: ' + data[item].Rate + '</div>';
                    if (data[item].Approved == false) {
                        listOfComments += '<button class="Approve btn btn-default" value="' + data[item].Id + '">Odobri</button>';
                    }
                    else {
                        listOfComments += '<button class="Unapprove btn-default" value="' + data[item].Id + '">Odbiti</button>';
                    }
                    listOfComments += '<hr>';
                }
                $('#CommentList').html(listOfComments);
            }
        });
    }
});

$(document).on("click", ".Unapprove", function () {
    approveComment($(this).val());

    function approveComment(id) {
        $.ajax({
            url: "/api/Comment/" + id,
            type: "DELETE",
            success: function () {
                alert("Odbili ste komntar " + id);
                location.reload();
            },
            error: function () {
                alert("Doslo je do greske prilikom odbijanja komentara " + id + " pokusajte ponovo");
            }
        });
    }
});

$(document).on("click", ".Approve", function () {
    unapproveComment($(this).val());

    function unapproveComment(id) {
        $.ajax({
            url: "/api/Comment/" + id,
            type: "PUT",
            success: function () {
                alert("Odobrili ste komentar " + id);
                location.reload();
            },
            error: function () {
                alert("Doslo je do greske prilikom odobrenja komentara " + id + " pokusajte ponovo");
            }
        });
    }
});