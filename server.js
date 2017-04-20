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
	
	console.log("connecting...")
  var connection = mysql.createConnection({
    user: 'bf229b15bc2a3e',
    password: '478b8184',
    host: 'us-cdbr-iron-east-03.cleardb.net',
    database: 'heroku_155a5011faf681f',
  });
  
  
  connection.connect();
   
  
  return connection;
	/*
	
	console.log("connecting...")
  var connection = mysql.createConnection({
    user: 'root',
    password: '491capstoneteam10a+',
    host: 'localhost',
    port: 42001,
    database: 'guru_db',
  });
  
  connection.connect();
  
  return connection;
 */
 return null;
  
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
	
	Console.log("got to server login player");
 
   if (!password || !username)
    {      
        console.log('Error:Missing username or password');
        return null;
    }
	
	var query = "insert into Users (username, password) values ('" + username + 
	"', '" + password + "');"
	
connection.query(query, function(err, rows, fields) {
    if (err) throw err;
 
});

Console.log("Database updated.");

/* 
 var request = new sql.Request().query("IN * FROM guruUsers");
	request.then(function(){
		return request;
	})
*/
	
}
    

//ROUTES
function makeRouter() {
    app.use(cors())  
    console.log("Creating routes");
    // frames
    app.get('/', function (req, res) {
      res.sendFile('/index.html', { root: __dirname })
    })

    app.get('/Players/all', function (req, res) {
      displayAllPlayers().then(function (data) {
        return res.json(data);
      });
    })
	
	app.post('/', function(req, res) {
    console.log("got to the post request");
		var password = req.body.username;
		var username = req.body.password;
		loginPlayer(username, password).then(function () {
			res.redirect('/')
		})
  })
 
}

app.post('createnewuser', function(req, res) {
	connection.query("INSERT into Users (username, password) VALUES ('" + req.body.username + "', '" + req.body.password + "');", function(err, rows, fields) {
      if (err) {
        console.log('error: ', err);
        throw err;
      }
	  res.send('Created user: ' + req.body.username + ' successfully.');
     // response.send(['Hello World!!!! HOLA MUNDO!!!!', rows]);
    });
	
});





function startParty() {

console.log("Connecting to guru_db");
 connectToDb();
 makeRouter();
}

startParty();


var server = app.listen(process.env.PORT || 3001, function () {
    console.log('Server is running..');
})
