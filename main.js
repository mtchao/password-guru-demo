var passguruReturnArray = [];
var totalscore = 0;

function getForm(form) {
    console.log(words.length);

    var Username1 = $('#username').val();
    var Password1 = $('#password').val();
    updateDatabase(Username1, Password1);
    checkCommon(Password1);
};

function updateDatabase(Username1, Password1) {
    console.log(Username1 + Password1);

    $.post("/ddimov/Password-Guru-Test-Environment", {
        username: Username1,
        password: Password1
    })
    /*.done(function(data){
      console.log("post request is done")
      if(data.result == "failed"){
        console.log("failed post")
        $("#result").text("Failed to login! " + data.message);
      } else {
        console.log("success post")
        $("#result"+index).text("Logged in as: " + data.username + (data.randomCode ? " (CODE: " + data.randomCode + ")" : ""));
      }
    });
    */
}

$(function() {

    var data = {};
    data.user = $("#username").val();
    data.password = $("#password").val();

    console.log(data);
    /*
	$.ajax({
						type: 'POST',
						data: JSON.stringify(data),
				        contentType: 'application/json',
                        url: 'http://localhost:3000/endpoint',
                        success: function(data) {
                            console.log('success');
                            console.log(JSON.stringify(data));
                        }
                    });
					*/
    /*
$('#register-button').click(function () {
		alert("register submitted")
      $.post("/createnewuser", {username: $("#username").val(), password: $("#password").val()}).done(function( data ) {
	  alert( "Response: " + data);
    });
})

$('#login-button').click(function () {
		alert("login submitted")
      $.post("/loginuser", {username: $("#username").val(), password: $("#password").val()}).done(function( data ) {
	  alert( "Response: " + data);
    });
})
})
*/


    $("#password").keyup(function checkCommon() {

        var specialCharCount = 0;
        var numberCount = 0;
        var letterCount = 0;
        var leetCount = 0;

        var specialCharList = "`~!@#$%^&*()_+-=-[]{}\|;:'<<,>.?//*-"
        var numberList = "1234567890"
        var leets = "48({<31057"

        for (i = 0; i < password.length; i++) {
            var at = password.charAt(i);
            console.log(at);

            if (specialCharList.contains(at)) {
                specialCharCount++;
            } else if (numberList.contains(at)) {
                numberlist++;
            } else if (numberList.contains(at)) {
                leetCount++;
            } else {
                letterlist++;
            }
        }

        var leet = {
            "0": "o",
            "1": "i",
            "3": "e",
            "4": "a",
            "5": "s",
            "7": "t",
            "8": "b",
            "@": "a",
            "(": "c",
            "{": "c",
            "<": "c"
        }



        //creates a new password with common leetspeak taken out
        var simplePassword = password.value;
        var commonSubstitutions = 0;
        for (var leetChar in leet) {
            simplePassword.replace(leetChar, leet[leetChar]);
        }

        simplePassword = simplePassword.toLowerCase();
        console.log(simplePassword + specialCharCount + numberCount + letterCount + leetCount);




        var pass1 = $('#password').val();
        var user1 = $('#username').val();
        var passguruReturnArray = "";
		//guruStrengthTest(pass1, user1);
        var strengthScore = passguruReturnArray[0];
        var lengthBool = passguruReturnArray[1];
        var commonPassBool = passguruReturnArray[2];
        var commonWordBool = passguruReturnArray[3];
        var capitalBool = passguruReturnArray[4];
        var recommendation = passguruReturnArray[5];

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

        var containslist = [""];

        var i;
        var j;
        var alreadycontained = false;
        var longest = true;
        for (i = 0; i <= commonwords.length; i++) {
            if (pass1.includes(commonwords[i]) && commonwords[i].length > 2) {
                containslist.push(commonwords[i]);
            }
        }
        var longest = true;
        var word;
        for (i = 0; i < containslist.length; i++) {
            longest = true;
            word = containslist[i];
            for (j = 0; j < containslist.length; j++) {
                if (containslist[j].includes(word)) {
                    longest = false;
                }
                //if we find a word that's included in our word and shorter
                if (word.includes(containslist[j]) && (word.length > containslist[j].length)) {
                    containslist.splice(j, 1);
                }

            }
            if (!longest) {
                containslist.splice(containslist.indexOf(word), 1);
                i = 0;
            }
        }


        var commonwordcount = containslist.length;
        console.log(containslist);
        console.log(commonwordcount);
        containslist = [""];

        if (commonwordcount > 1) {
            document.getElementById("picture4").src = "cross.jpg";
            commonwordscore = 0;
        } else if (commonwordcount == 1) {
            document.getElementById("picture4").src = "cross.jpg";
            commonwordscore = 0;
        } else {
            console.log("hit");
            document.getElementById("picture4").src = "che.jpg";
            commonwordscore++;
        }
        console.log(commonwordcount);
        commonwordcount = 0;


        totalscore = lengthscore + commonpasswordscore + commonwordscore;

        if (pass1.length == 0) {
            document.getElementById("picture1").src = "che.jpg";
            totalscore = 0;
        }

        if (totalscore < 0) {
            totalscore = 0;
        }

        $('#score').text(totalscore * 20);

        //  if (secret.localeCompare(Password1)) document.getElementById("picture2").src = "che.jpg";
        //   if (!secret.localeCompare(Password1)) document.getElementById("picture2").src = "cross.jpg";
    });



    $('#register-button').click(function() {
        alert("register submitted")

        //This doesn't work when you use backspace to go down to a lower score.

        if ($('#score').text == "100" || $('#score').text == "90") {
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




$('.submitnewuser').submit(function() {
    alert("Form Submitted")
    $.post("/createnewuser", {
        username: $("#username").val(),
        password: $("#password").val()
    })
    //.done(function(data){
    /*if(data.result == "failed"){
      console.log(data)
      $("#result").text("Failed to login! " + data.message);
    } else {
      console.log(data)
      $("#result"+index).text("Logged in as: " + data.username + (data.randomCode ? " (CODE: " + data.randomCode + ")" : ""));
    }
    */
    //};
});