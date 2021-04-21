const mysql = require("mysql");

// module.exports = {
const connection = mysql.createConnection({
    host: 'localhost',
    port: process.env.PORT || 3306,
    user: process.env.USER || '',
    password: process.env.PASSWORD || '',
    database: 'employee_DB',
});

// connect to the mysql server and sql database
connection.connect((err) => {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    // title();
  });
// }
module.exports = connection;