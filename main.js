
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



	$(function(){

	var data = {};
	data.user = $("#username").val();
	data.password = $("#password").val();

	console.log (data);
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

$('#register-button').click(function () {
		//alert("register submitted")
      $.post("/createnewuser", {username: $("#username").val(), password: $("#password").val()}).done(function( data ) {
	  alert(data);
    });
});

$('#login-button').click(function () {
		//alert("login submitted")
      $.post("/loginuser", {username: $("#username").val(), password: $("#password").val()}).done(function( data ) {
	  alert(data);
    });
})
})




$('.submitnewuser').submit(function () {
		alert("Form Submitted")
      $.post("/createnewuser", {username: $("#username").val(), password: $("#password").val()})
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


