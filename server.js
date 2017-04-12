var mysql = require('mysql')
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

function connectToDb() {
  var config = {
    user: 'root',
    password: '491capstoneteam10a+',
    host: '127.0.0.1:42000',
    database: 'master',
  }
  return mysql.createConnection(config, function (err) {
	  if (err) console.log(err);
  })
  
}

//Select all users in table


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

function loginPlayer(username, password) {
 
   if (!password || !username)
    {      
        console.log('Error:Missing username or password');
        return null;
    }
    console.log(new sql.Request().query("SELECT * FROM guruUsers"));
	
    var request = new sql.Request().query("SELECT * FROM guruUsers");
	request.then(function(){
		return request;
	})
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
	
	app.post('/', function(req, res) {
    connectToDb().then(function () {
		var password = req.body.username;
		var username = req.body.password;
		loginPlayer(username, password).then(function () {
			res.redirect('/')
		})
      }).catch(function (error) {
      console.log(error);
      })
    })
 
}



function startParty() {

  console.log("Connecting to guru_db");
 // connectToDb();
  //.then(() => {
    makeRouter();
	//app.listen(process.env.PORT || 3000);
}
//}

startParty();


var server = app.listen(42000, function () {
    console.log('Server is running..');
})
