const mysql = require('mysql');
const inquirer = require('inquirer');

const start = () => {
    inquirer
      .prompt({
        name: 'functionChoice',
        type: 'list',
        message: 'Hello. What would you like to do, O Great One?',
        choices: ['Add departments, roles, or employees', 'View departments, roles, or employees', 'Update employee roles', 'EXIT'],
      })
      .then((answer) => {
        // based on their answer, either call the bid or the post functions
        if (answer.functionChoice === 'Add departments, roles, or employees') {
          addToDB();
        } else if (answer.functionChoice === 'View departments, roles, or employees') {
          viewDB();
        } else if (answer.functionChoice === 'Update employee roles') {
          updateDB();
        } else {
          connection.end();
        }
      });
  };






const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: "yourRootPassword",
    database: 'employee_DB'
})




