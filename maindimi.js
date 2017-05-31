var passguruReturnArray = [];
var totalscore = 0;
var strengthScore = 0;

$(function() {
    $("#password").keyup(function checkCommon() {
        var pass1 = $('#password').val();
        var user1 = $('#username').val();
        passguruReturnArray = guruStrengthTest(user1, pass1);
        strengthScore = passguruReturnArray[0];
        var lengthBool = passguruReturnArray[1];
		var commonPassBool = passguruReturnArray[2];
        var multipleCommonWordBool = passguruReturnArray[3];
        var similarUsername = passguruReturnArray[4];
		var recommendation = passguruReturnArray[5];

        if (lengthBool == 1) {
			      document.getElementById("picture1").src = "che.jpg";
		    } else {
      			document.getElementById("picture1").src = "cross.jpg";
  		  }

        if (commonPassBool == 0) {
            document.getElementById("picture2").src = "cross.jpg";
        } else {
            document.getElementById("picture2").src = "che.jpg";
        }


        if (multipleCommonWordBool == 1) {
            document.getElementById("picture3").src = "che.jpg";
        } else {
			       document.getElementById("picture3").src = "cross.jpg";
        }
        if (strengthScore < 80) {
             document.getElementById("register-button").style.color = "grey";
        } else {
              document.getElementById("register-button").style.color = null;
        }

		    $('#score').text(strengthScore);
			$('#recommendation').text(recommendation);
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
});
