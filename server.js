const mysql = require('mysql');
const inquirer = require('inquirer');
const table = require('console.table');
require('custom-env').env(true);
const colors = require('colors');
// const connection = require('./db/connection.js');

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

const start = async () => {

    await inquirer
        .prompt({
            name: 'choice',
            type: 'list',
            message: 'Hello. What would you like to do, O Great One?',
            choices: ['Add employee, role or department', 'View employees, roles or departments', 'Update employee information', 'EXIT'],
        })
        .then (async (answer) => {
            // if (answer.choice === 'Add employee, role or department') {
            //     inquirer
            //         .prompt({
            //                 name: 'addChoice',
            //                 type: 'list',
            //                 message: 'Choose wisely:',
            //                 choices: ['Add employee', 'Add role', 'Add department', 'BACK'],
            //             })
            //             .then((choice) => {
            //                     if (choice.addChoice === 'Add employee') {
            //                         addEmployee();
            //                     } else if (choice.addChoice === )


            //                     case 'Add employee':
            //                         addEmployee();
            //                         break;

            //                     case 'View roles': 
            //                         addRole();
            //                         break;

            //                     case 'View departments':
            //                         addDepartment();
            //                         break;
            //                     case 'Back':
            //                         start();
            //                         break;
                            
            //                 }
            //             })

                    
            //     addToDB();
            // } else if (answer.functionChoice === 'View employees, roles or departments') {
            //     viewDept();
            // } else if (answer.functionChoice === 'Update employee information') {
            //     viewRoles();
            // } else {
            //   connection.end();
            // }
            switch (answer.choice) {
                case 'Add employee, role or department':
                    inquirer
                        .prompt ({
                            name: 'addChoice',
                            type: 'list',
                            message: 'Choose wisely:',
                            choices: ['Add employees', 'Add role', 'Add department', 'BACK'],
                        })
                        .then((choice) => {
                            switch(choice.addChoice) {
                                case 'Add employee':
                                    addEmployee();
                                    break;

                                case 'Add role': 
                                    addRole();
                                    break;

                                case 'Add department':
                                    addDepartment();
                                    break;
                                case 'Back':
                                    start();
                                    break;
                            
                            }
                        })

                case 'View employees, roles or departments':
                    inquirer
                        .prompt ({
                            name: 'viewChoice',
                            type: 'list',
                            message: 'Choose wisely:',
                            choices: ['View employees', 'View roles', 'View departments', 'BACK'],
                        })
                        .then(async (choice) => {
                            switch(choice.viewChoice) {
                                case 'View employees':
                                    viewEmployees();
                                    break;

                                case 'View roles': 
                                    await viewRoles();
                                    break;

                                case 'View departments':
                                    await viewDept();
                                    break;
                                case 'Back':
                                    await start()
                                    break;
                            }
                        }) 
                case 'Update employee information':
                    await inquirer
                        .prompt ({
                            name: 'updateChoice',
                            type: 'list',
                            message: 'Choose wisely:',
                            choices: ['Update employee role', 'Update employee manager'],
                        })
                        .then((choice) => {
                            switch(choice.updateChoice) {
                                case 'Update employee role':
                                    updateRole();
                                    break;

                                case 'Update employee manager':
                                    updateManager();
                                    break;
                            }
                        })
                case 'EXIT':
                    console.log('');
                    console.log('Have fun storming the castle!'.red)
                    console.log('    ()==[:::::::::::::>')
                    connection.end();
            }
        })
    }

    

const addEmployee = () => {

    console.log('Employee added!'.green);
    start();
};

const addRole = () => {

    console.log('Role added!'.green);
    start();
};

const addDepartment = () => {

    console.log('Department added!'.green);
    start();
};

const viewDept = () => {
// new Promise ((resolve, reject) => {
//     connection.query('SELECT name FROM department', (err, res) => {
//     // if (err) reject (new Error(" Oops! Something went wrong ¯\_(ツ)_/¯ ".bold.bgRed, err));
//     if (err) throw err;

    
//     const employees = console.table(res);
//     console.log('');
//     resolve (employees);
//     start();
// });
// }    

// })
    connection.query('SELECT name FROM department'), (err, res) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'department',
                    type: 'list',
                    choices() {
                        let departmentArray = [];
                        res.forEach(({ name }) => {
                            departmentArray.push(name);
                        });
                        return departmentArray
                    },
                    message: 'Which department would you like to view?',
                }
            ])
            .then((answer) => {
                const query = `SELECT employee.id, CONCAT (employee.first_name, " ", employee.last_name) AS employee, role.title
                FROM employee
                LEFT JOIN role on employee.role_id = role.id
                LEFT JOIN department ON department_id = department.id
                WHERE department.name = ?`
                connection.query(query, { name: answer.department }, (err, res) => {
                    if (err) throw err;
                    console.table(res)
                }) // <------------------ NEED TO FINISH THIS -------------------------------
            })
    }
    start();
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

const viewEmployees =  () => new Promise((resolve, reject) => {
        connection.query(`SELECT employee.id, CONCAT (employee.first_name, " ", employee.last_name) AS employee, 
        role.title, role.salary,department.name AS department, 
        CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee 
        LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON department_id = department.id 
        LEFT JOIN employee manager on employee.manager_id = manager.id`, (err, res) => {
        if (err) reject (new Error(" Oops! Something went wrong ¯\_(ツ)_/¯ ".bold.bgRed, err));
        // const employees = console.table(res);
        const employees = res
        resolve (employees);
        
    })
        .then((employees) => {
            console.log('');
            console.table(employees)
            start();
    });
});

const updateRole = () => {

    console.log('Employee role updated!'.green);
    start();
};

const updateManager = () => {

    console.log('Employee manager updated!'.green);
    start();
};

// title();
// connect to the mysql server and sql database
connection.connect((err) => {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    title();
  });