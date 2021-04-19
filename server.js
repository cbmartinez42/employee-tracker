const mysql = require('mysql');
const inquirer = require('inquirer');
const table = require('console.table');
require('custom-env').env(true);

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.USER || '',
    password: process.env.PASSWORD || '',
    database: 'employee_DB'
});

const start = () => {
    console.log('');
    console.log('EEEEEEE                     lll                                 DDDDD           tt            bb                           ');
    console.log('EE      mm mm mmmm  pp pp   lll  oooo  yy   yy   eee    eee     DD  DD    aa aa tt      aa aa bb        aa aa  sss    eee  ');
    console.log('EEEEE   mmm  mm  mm ppp  pp lll oo  oo yy   yy ee   e ee   e    DD   DD  aa aaa tttt   aa aaa bbbbbb   aa aaa s     ee   e ');
    console.log('EE      mmm  mm  mm pppppp  lll oo  oo  yyyyyy eeeee  eeeee     DD   DD aa  aaa tt    aa  aaa bb   bb aa  aaa  sss  eeeee  ');
    console.log('EEEEEEE mmm  mm  mm pp      lll  oooo       yy  eeeee  eeeee    DDDDDD   aaa aa  tttt  aaa aa bbbbbb   aaa aa     s  eeeee ');
    console.log('                    pp                  yyyyy                                                                  sss         ');
    console.log('');

    inquirer
      .prompt({
        name: 'functionChoice',
        type: 'list',
        message: 'Hello. What would you like to do, O Great One?',
        choices: ['Add an employee', 'View departments', 'View roles', 'View all employees', 'Update employee roles', 'EXIT'],
      })
      .then((answer) => {
        // based on their answer, either call the bid or the post functions
        if (answer.functionChoice === 'Add an employee') {
            addToDB();
        } else if (answer.functionChoice === 'View departments') {
            viewDept();
        } else if (answer.functionChoice === 'View roles') {
            viewRoles();
        } else if (answer.functionChoice === 'View all employees') {
            viewEmployees();
        } else if (answer.functionChoice === 'Update employee roles') {
            updateRole();
        } else {
          connection.end();
        }
      });
  };

const addToDB = () => {


};

const viewDept = () => {
    connection.query('SELECT name FROM department'), (err, res) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'department',
                    type: 'list',
                    choices() {
                        const departmentArray = [];
                        res.forEach(({ name }) => {
                            departmentArray.push(name);
                        });
                        return departmentArray
                    },
                    message: 'Which department would you like to view?',
                }
            ])
            .then((answer) => {
                connection.query(`SELECT * FROM `) // <------------------ NEED TO FINISH THIS -------------------------------
            })
    }
    
};

const viewRoles = () => {
    connection.query('SELECT title FROM role'), (err, res) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'role',
                    type: 'list',
                    choices() {
                        const roleArray = [];
                        res.forEach(({ title }) => {
                            roleArray.push(title);
                        });
                        return roleArray
                    },
                    message: 'Which role would you like to view?'
                }
            ])
            .then((answer) => {
                connection.query(`SELECT * FROM `) // <----------------------need to finish this --------------------
            })
    }
    
};

const viewEmployees = () => {
    connection.query('SELECT * FROM employee_db.employee'), (err, res) => {
        if (err) throw err;
        // const values = res;
        // console.table('All Employees', ['First Name', 'Last Name', 'Role ID', 'Manager ID'], values)
        console.table(res);
    }

    
};

const updateRole = () => {

    
};







// connect to the mysql server and sql database
connection.connect((err) => {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });