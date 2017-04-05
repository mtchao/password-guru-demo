$(document).ready(function(){

console.log("JS works")
var showAllPlayersBtn = $('#btn-showAllPlayers');
showAllPlayersBtn.click(function (event) {
  console.log("button pressed")
  getPlayers();
});

var updateLevelBtn = $('#btn-updatePlayerLevel');
updateLevelBtn.click(function (event) {
  console.log("button pressed")
  var PlayerID = $('#PlayerIDField');
  updateLevel(PlayerID);
});

function getPlayers() {
  $.getJSON("/Players/all", function (data) {
    var table = $("#resultsTable");
    var tableHead = $('#tablehead');
    document.getElementById('resultsTable').innerHTML = "";
    document.getElementById('tablehead').innerHTML = "";
    tableHead.append(
      "<th>Username</th>", "<th>First Name</th>"
      ,"<th>Last Name</th", "<th>Email</th>",
      "<th>LevelID</th>");
    $.each(data, function (ID, PlayerObject) {
      var rowData = $('<tr></tr>');
      //rowData.append("<td>" + PlayerObject.PlayerID + "</td>");
      rowData.append("<td>" + PlayerObject.username + "</td>");
      rowData.append("<td>" + PlayerObject.fName + "</td>");
      rowData.append("<td>" + PlayerObject.lName + "</td>");
      rowData.append("<td>" + PlayerObject.email + "</td>");
      rowData.append("<td>" + PlayerObject.levelID + "</td>");
      //rowData.append("<td>" + PlayerObject.dataCreated + "</td>");
           
      table.append(rowData);
     
    });
  });
}

function updateLevel(PlayerID) {
  
}

function deletePerson(PersonID) {
  console.log("Delete Person");
  window.location.href = "/deletePerson/" + PersonID;
}
});
