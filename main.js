/*
    $.get("/ping", function(data){
        if(data.error == "true"){
            $("#results").prepend("<div class='alert alert-danger'><strong>Error!</strong> "+ data.message +"</div>");
        }
    }, "json")

    $("#submit1").click(function(){
      alert("it worked!")
      submitData();
    });
*/
var commonpasswords = '';
var commonwords = '';

$(document).ready(function() {
    fetch('10k_most_common.txt').then(function(response) {
        if (response.ok) {
            response.text().then(function(text) {

                commonpasswords = text.split('\n');
            });
        } else {
            console.log('Network request for products.json failed with response ' + response.status + ': ' + response.statusText);
        }
    })

    fetch('google-10000-english-usa.txt').then(function(response) {
        if (response.ok) {
            response.text().then(function(text) {

                commonwords = text.split('\n');
            });
        } else {
            console.log('Network request for products.json failed with response ' + response.status + ': ' + response.statusText);
        }
    });
});


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

        //console.log("into parse")
        /*$.get('10k_most_common.txt', function(data) {
        //split on new lines
        var lines = data.split('\n');
        console.log(lines);
       });*/
        // var secret = "password";
        //console.log(typeof Password1);
        var pass1 = $('#password').val();

        //Password1 = Password1.toString();
        //reader.readAsText(10k_most_common.txt, "UTF-8");
        if (pass1.length > 8) document.getElementById("picture1").src = "che.jpg";
        if (pass1.length < 8) document.getElementById("picture1").src = "cross.jpg";


        if (commonpasswords.includes(pass1)) {
            document.getElementById("picture2").src = "cross.jpg";
        } else {
            document.getElementById("picture2").src = "che.jpg";
        }

        if (commonwords.includes(pass1)) {
            document.getElementById("picture3").src = "cross.jpg";
        } else {
            document.getElementById("picture3").src = "che.jpg";
        }

        //  if (secret.localeCompare(Password1)) document.getElementById("picture2").src = "che.jpg";
        //   if (!secret.localeCompare(Password1)) document.getElementById("picture2").src = "cross.jpg";
    });



    $('#register-button').click(function() {
        //alert("register submitted")
        $.post("/createnewuser", {
            username: $("#username").val(),
            password: $("#password").val()
        }).done(function(data) {
            alert(data);
        });
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