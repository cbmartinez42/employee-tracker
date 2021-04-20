const mysql = require('mysql');
const inquirer = require('inquirer');
const table = require('console.table');
require('custom-env').env(true);
// const chalk = require('chalk');
// const error = chalk.bold.red;
const colors = require('colors');

const connection = mysql.createConnection({
    host: 'localhost',
    port: process.env.PORT || 3306,
    user: process.env.USER || '',
    password: process.env.PASSWORD || '',
    database: 'employee_DB',
});

const title = () => {

    console.log('');
    console.log('∙∙∙∙∙·ₒₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒₒ∙∙∙∙∙·'.bgBlue);
    console.log('.                                                                                                                            .'.bgBlue);
    console.log('. EEEEEEE                     lll                                 DDDDD           tt            bb                           .'.bgBlue);
    console.log('. EE      mm mm mmmm  pp pp   lll  oooo  yy   yy   eee    eee     DD  DD    aa aa tt      aa aa bb        aa aa  sss    eee  .'.bgBlue);
    console.log('. EEEEE   mmm  mm  mm ppp  pp lll oo  oo yy   yy ee   e ee   e    DD   DD  aa aaa tttt   aa aaa bbbbbb   aa aaa s     ee   e .'.bgBlue);
    console.log('. EE      mmm  mm  mm pppppp  lll oo  oo  yyyyyy eeeee  eeeee     DD   DD aa  aaa tt    aa  aaa bb   bb aa  aaa  sss  eeeee  .'.bgBlue);
    console.log('. EEEEEEE mmm  mm  mm pp      lll  oooo       yy  eeeee  eeeee    DDDDDD   aaa aa  tttt  aaa aa bbbbbb   aaa aa     s  eeeee .'.bgBlue);
    console.log('.                     pp                  yyyyy                                                                  sss         .'.bgBlue);
    console.log('.                                                                                                                            .'.bgBlue);
    console.log('∙∙∙∙∙·ₒₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒₒ∙∙∙∙∙·'.bgBlue);
    console.log('');
    start();
}

const start = () => {

    inquirer
      .prompt({
        name: 'functionChoice',
        type: 'list',
        message: 'Hello. What would you like to do, O Great One?',
        choices: ['Add an employee', 'View departments', 'View roles', 'View all employees', 'Update employee roles', 'EXIT'],
      })
      .then((answer) => {
        // based on their answer, call the appropriate function
        // switch/case? 
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

// const viewEmployees = () => 
//     new Promise ((resolve, reject) => {
//         connection.query('SELECT * FROM employee_db.employee', (err, res) => {
//         if (err) reject(new Error('Oops! Something went wrong --->', err));
//         const employees = console.table(res);
//         resolve (employees);
//         start();
//     });
    
// });

const viewEmployees =  () => 
    new Promise ((resolve, reject) => {
        connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary,department.name AS department, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON department_id = department.id LEFT JOIN employee manager on employee.manager_id = manager.id', (err, res) => {
        // if (err) reject(new Error(" Oops! Something went wrong ¯\_(ツ)_/¯ ".bold.bgRed, err));
        const employees = console.table(res);
        resolve (employees);
        start();
    });
        
    
}).catch(err => console.error(" Oops! Something went wrong ¯\_(ツ)_/¯ ".bold.bgRed, err));

const updateRole = () => {

    
};



// connect to the mysql server and sql database
connection.connect((err) => {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    title();
  });