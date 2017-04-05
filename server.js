var sql = require('mssql')
var express = require('express')
var cors = require('cors')
var path = require('path')
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/static/public'));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

function getPass() {
  var pass = 'gohuskies'
  if (!pass) {
    throw new Error('Missing PASSWORD environment variable')
  }
  return pass
}

var sql = require("mssql");

function connectToDb() {
  var config = {
    user: 'guru',
    password: 'gohuskies',
    server: 'localhost',
    database: 'master',
  }
  sql.connect(config, function (err) {
	  if (err) console.log(err);
  })
}

/*
Returns the top 100 players in the DB
*/
function displayAllPlayers() {
  console.log("displaying top 100 Players");
  return new sql.Request().query(
    'SELECT TOP 100 username, fName, lName, email, levelID FROM dbo.Player ORDER BY playerID DESC');
}

// This will update the player level
// Takes player first name, last name, email, and level
function updatePlayerLevel(data) {
    var fName = data.fname;
    var lName = data.lname;
    var email = data.email;
    var level = data.level;

    if (!fName || !lName || !email || !level)
    {      
        console.log('Error: [updatePlayerLevel] Missing fname, lname, email, or level');
        return null;
    }
    return new sql.Request().query("UPDATE Player SET levelID = " + level + " WHERE fName='" + fName + "' AND lName='" + lName + "' AND email='" + email + "'");
}

function deletePlayer(data) {
    var fName = data.fname;
    var lName = data.lname;
    var email = data.email;

    if (!fName || !lName || !email)
    {      
        console.log('Error: [deletePlayer] Missing fname, lname, or email');
        return null;
    }

    return new sql.Request().query("DELETE FROM Player WHERE fName='" + fName + "' AND lName='" + lName + "' AND email='" + email + "'");
}


function insertPlayer(data) {
    var fName = data.fname;
    var lName = data.lname;
    var email1 = data.email;
    var username1 = data.username;
    var levelID = data.level;

    if (!fName || !lName || !email1)
    {      
        console.log('Error: [insertPlayer] Missing fname, lname, or email');
        return null;
    }

    return new sql.Request().query("INSERT INTO dbo.Player(username, fName, lName, email, levelID, datecreated) \
                                   VALUES('" + username1 + "', '" + fName + "', '" + lName + "', '" + email1 +"', " + levelID +", (SELECT GETDATE()))");
}

//ROUTES
function makeRouter() {
    app.use(cors())  
    console.log("Creating routes");
    // frames
    app.get('/', function (req, res) {
      res.sendFile('/static/views/index.html', { root: __dirname })
    })

    app.get('/Players/all', function (req, res) {
      displayAllPlayers().then(function (data) {
        return res.json(data);
      });
    })

    app.post('/', function (req, res) {
      var PPlayerID = req.body.PlayerID
      var WhatToDo = req.body.whatToDo
      switch (WhatToDo)
      {
          case 'updatePlayerLevel':
          {
              updatePlayerLevel(req.body).then(function ()
              {
                  res.redirect('/');
              });
              break;
          }
          case 'deletePlayer':
          {
              deletePlayer(req.body).then(function()
              {                
                  return res.redirect('/');
              });
              break;
          }
          case 'insertPlayer':
          {
              insertPlayer(req.body).then(function()
              {
                  return res.redirect('/')
              });
              break;
          }
          default:
          {
              console.log('Unknown form type');
              break;
          }
      }
      // if(WhatToDo == 'updatePlayerLevel')
      // {      
      //   updatePlayerLevel(req.body).then(function (data) {
      //     return res.json(data);
      //   });
      // }
      // else if(WhatToDo == 'deletePlayer'){
      //   console.log("got to delete if")
      //   deletePlayer(req.body).then(function (data) {
      //       if (data)
      //       {
      //           return res.json(data);
      //       } 
      //       else
      //       {
      //           console.log('Error getting data from SQL');
      //       }
      //   });
      // } else if ()
    });
}

function startParty() {

  console.log("Connecting to guru_db");
  connectToDb();
  makeRouter();
//.then() => {
//    makeRouter();
//    app.listen(process.env.PORT || 3000);
//}
}

startParty();


var server = app.listen(1433, function () {
    console.log('Server is running..');
});