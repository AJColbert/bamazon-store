var mysql = require("mysql");
// create the connection information for the sql database
var conndb = function ()
{
    var conn = mysql.createConnection({
        host: "localhost",
        // Your port; if not 3306
        port: 3306,
        // Your username
        user: "root",
        // Your password
        password: "root",
        database: "bamazon"
    });
    return conn;
}


module.exports = {
    conndb: conndb
}