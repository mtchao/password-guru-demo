var passguruReturnArray = [];
var totalscore = 0;
var strengthScore = 0;

$(function() {
    $("#password").keyup(function checkCommon() {
        var pass1 = $('#password').val();
        var user1 = $('#username').val();
        passguruReturnArray = guruStrengthTest(pass1, user1)
        strengthScore = passguruReturnArray[0];
        var lengthBool = passguruReturnArray[0];
		    var commonPassBool = passguruReturnArray[0];
        var commonWordBool = passguruReturnArray[0];
        var capitalBool = passguruReturnArray[0];

        if (lengthBool == 1) {
			      document.getElementById("picture1").src = "che.jpg";
		    } else {
      			document.getElementById("picture1").src = "cross.jpg";
  		  }

        if (commonPassBool == 1) {
            document.getElementById("picture2").src = "che.jpg";
        } else {
            document.getElementById("picture2").src = "cross.jpg";
        }

        if (commonWordBool == 1) {
            document.getElementById("picture3").src = "che.jpg";
        } else {
            document.getElementById("picture3").src = "cross.jpg";
        }

        if (multipleCommonWordBool == 1) {
            document.getElementById("picture4").src = "che.jpg";
        } else {
			       document.getElementById("picture4").src = "cross.jpg";
        }
        if (strengthScore < 70) {
             document.getElementById("register-button").style.color = "grey";
        } else {
              document.getElementById("register-button").style.color = null;
        }

		    $('#score').text(strengthScore);
    });

    $('#register-button').click(function() {
        if(strengthScore > 70){
            $.post("/createnewuser", {
                username: $("#username").val(),
                password: $("#password").val()
            }).done(function(data) {
                alert(data);
            });
      }
    });

    $('#login-button').click(function() {
        //alert("login submitted")
        $.post("/loginuser", {
            username: $("#username").val(),
            password: $("#password").val()
        }).done(function(data) {
            alert(data);
        });
    })
})



/*
$('.submitnewuser').submit(function() {
    alert("Form Submitted")
    $.post("/createnewuser", {
        username: $("#username").val(),
        password: $("#password").val()
    })
});
*/
