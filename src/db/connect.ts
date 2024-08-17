var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
 // password: "mysql"
});

con.connect(function(err: Error) {
  if (err) throw err;
  console.log("Connected!");
});