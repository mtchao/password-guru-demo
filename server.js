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


function connectToDb(db_config) {
  connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(connectToDb, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      connectToDb();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}


function getConfig() {
	
  var db_config = ({
    user: 'bf229b15bc2a3e',
    password: '478b8184',
    host: 'us-cdbr-iron-east-03.cleardb.net',
    database: 'heroku_155a5011faf681f',
  });
 
  return db_config;
 

//end copied code


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
  
}

//Select all users in table



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
	
}
    

//ROUTES
function makeRouter(connection) {
    app.use(cors())  
    console.log("Creating routes");
    // frames
    app.get('/', function (req, res) {
      res.sendFile('/index.html', { root: __dirname })
    })

	
	app.post('/', function(req, res) {
    console.log("got to the post request");
		var password = req.body.username;
		var username = req.body.password;
		loginPlayer(username, password).then(function () {
			res.redirect('/')
		})
  })
  
  app.post('/createnewuser', function(req, res) {
	 

	 
	connection.query("INSERT into Users (username, password) VALUES ('" + req.body.username + "', '" + req.body.password + "');", function(err, rows, fields) {
      if (err) {
        console.log('error: ', err);
        throw err;
      }
	  
	// res.header("Access-Control-Allow-Origin", "*");
	 res.send('Created user ' + req.body.username + ' successfully.');
	 
	 // res.send('Created user: ' + req.body.username + ' successfully.');
     // response.send(['Hello World!!!! HOLA MUNDO!!!!', rows]);

	
  });
  });
 
  app.post('/loginuser', function(req, res) {
	  
	  if (!req.body.password || !req.body.username)
    {      
        res.send('Error: Missing username or password');
    }

	  connection.query("SELECT 1 FROM Users where username = '" + req.body.username + "' AND password = '" + req.body.password + "' ORDER BY username LIMIT 1;"), function(err, rows, fields) {
      
	  res.send(rows);
	  
	  if (err) {
        console.log('error: ', err);
        throw err;
		
		
      }
	  /*
	  if(rows){
		  res.send('Login Successful');
	  } else {
		  res.send('Login Unsuccessful');
	  }
	  */
     // response.send(['Hello World!!!! HOLA MUNDO!!!!', rows]);
	  };
  });
	  
	/*
	var con;
	con = connectToDb(db_config).then(function (connection) {
		return connection;
	});
	
	con.then(function (connection) {
	connection.query("SELECT 1 FROM Users where username = '" + req.body.username + "' AND password = '" + req.body.password + " ORDER BY username LIMIT 1;"), function(err, rows, fields) {
      if (err) {
        console.log('error: ', err);
        throw err;
      }
	  if(rows){
		  res.send('Login Successful');
	  } else {
		  res.send('Login Unsuccessful');
	  }
     // response.send(['Hello World!!!! HOLA MUNDO!!!!', rows]);
    };
	});
	*/
}; 







function startParty() {

console.log("Starting Party...");
 var db_config = getConfig();
 var con = mysql.createConnection(db_config)
 makeRouter(con);
}

startParty();


var server = app.listen(process.env.PORT || 3001, function () {
    console.log('Server is running..');
})
