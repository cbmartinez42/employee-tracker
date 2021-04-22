const mysql = require('mysql');
const inquirer = require('inquirer');
const table = require('console.table');
require('custom-env').env(true);
const colors = require('colors');
const { registerPrompt } = require('inquirer');
// const connection = require('./db/connection.js');

const connection = mysql.createConnection({
    host: 'localhost',
    port: process.env.PORT || 3306,
    user: process.env.USER || '',
    password: process.env.PASSWORD || '',
    database: 'employee_DB',
});

const title = () => {
    console.log('\n∙∙∙∙∙·ₒₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒₒ∙∙∙∙∙·'.bgBlue);
    console.log('.                                                                                                                            .'.bgBlue);
    console.log('. EEEEEEE                     lll                                 DDDDD           tt            bb                           .'.bgBlue);
    console.log('. EE      mm mm mmmm  pp pp   lll  oooo  yy   yy   eee    eee     DD  DD    aa aa tt      aa aa bb        aa aa  sss    eee  .'.bgBlue);
    console.log('. EEEEE   mmm  mm  mm ppp  pp lll oo  oo yy   yy ee   e ee   e    DD   DD  aa aaa tttt   aa aaa bbbbbb   aa aaa s     ee   e .'.bgBlue);
    console.log('. EE      mmm  mm  mm pppppp  lll oo  oo  yyyyyy eeeee  eeeee     DD   DD aa  aaa tt    aa  aaa bb   bb aa  aaa  sss  eeeee  .'.bgBlue);
    console.log('. EEEEEEE mmm  mm  mm pp      lll  oooo       yy  eeeee  eeeee    DDDDDD   aaa aa  tttt  aaa aa bbbbbb   aaa aa     s  eeeee .'.bgBlue);
    console.log('.                     pp                  yyyyy                                                                  sss         .'.bgBlue);
    console.log('.                                                                                                                            .'.bgBlue);
    console.log('∙∙∙∙∙·ₒₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒ▫ᵒᴼᵒ▫ₒₒ▫ᵒᴼᵒ▫ₒₒ∙∙∙∙∙·\n'.bgBlue);
    start();
}

const start = async () => {
    await inquirer
        .prompt({
            name: 'choice',
            type: 'list',
            message: 'Hello. What would you like to do, O Great One?',
            choices: ['Add employee, role or department', 'View employees, roles or departments', 'Update employee information', 'Remove an employee', 'EXIT'],
        })
        .then (async (startAnswer) => {

            switch (startAnswer.choice) {
                case 'Add employee, role or department':
                    await addFunction();
                    break;

                case 'View employees, roles or departments':
                    await viewFunction();
                    break;

                case 'Update employee information':
                    await updateFunction();
                    break;

                case 'Remove an employee':
                    await removeFunction();
                    break;

                case 'EXIT':
                    console.log('\nHave fun storming the castle!'.red)
                    console.log('    ()==[:::::::::::::>')
                    connection.end();
            }
        })        
}



const addFunction = async () => {
    await inquirer
        .prompt ({
            name: 'addChoice',
            type: 'list',
            message: 'Choose wisely:',
            choices: ['Add employee', 'Add role', 'Add department', 'BACK'],
        })
        .then( async (choice) => {
            switch(choice.addChoice) {
                case 'Add employee':
                    console.log('add employee selected')
                    await addEmployee();
                    console.log('after employee function called')
                    start();
                    break;

                case 'Add role': 
                    await addRole();
                    start();
                    break;

                case 'Add department':
                    await addDepartment();
                    start();
                    break;

                case 'BACK':
                    await start();
                    break;
            
            }
        })
    }

const viewFunction = async () => {
    await inquirer
        .prompt ({
            name: 'viewChoice',
            type: 'list',
            message: 'Choose wisely:',
            choices: ['View employees', 'View roles', 'View departments', 'BACK'],
        })
        .then(async (choice) => {
            switch(choice.viewChoice) {
                case 'View employees':
                    await viewEmployees();
                    start();
                    break;

                case 'View roles': 
                    await viewRoles();
                    start();
                    break;

                case 'View departments':
                    await viewDept();
                    start();
                    break;

                case 'BACK':
                    await start()
                    break;
            }
        }) 
}
                    
const updateFunction = async () => {               
    await inquirer
        .prompt ({
            name: 'updateChoice',
            type: 'list',
            message: 'Choose wisely:',
            choices: ['Update employee role', 'Update employee manager', 'BACK'],
        })
        .then(async (choice) => {
            switch(choice.updateChoice) {
                case 'Update employee role':
                    await updateRole();
                    break;

                case 'Update employee manager':
                    await updateManager();
                    break;

                case 'BACK':
                    await start()
                    break;
            }
        })
}
   

const addEmployee = async () => {
    console.log('addemployee')
        await inquirer
            .prompt([
                {
                    name: "firstName",
                    type: 'input',
                    message: "What is the new recruit's first name, sir?"
                },
                {
                    name: "lastName",
                    type: 'input',
                    message: "What is the new recruit's last name, sir?"
                },
                {
                    name: "title",
                    type: 'list',
                    message: "And what is the new recruit's title, excellency?",
                    choices: () => {
                        let roleArray = [];
                            connection.query('SELECT title FROM role', (err, res) => { 
                                if (err) reject (new Error(" Oops! Something went wrong (╯°□°）╯︵ ┻━┻ ".bgRed, err));      // (╯°□°）╯︵ ┻━┻  ||  ╯‵Д′)╯ 彡 ┻━┻                    
                            res.forEach(({ title }) => {
                            roleArray.push(title);
                        });
                        return roleArray
                        })

                    }
                },
                {
                    name: 'manager',
                    type: 'list',
                    message: 'Choose whom this scalawag will serve:',
                    choices: () => {
                        let employeeArray = ['No one - They serve only themselves'];
                            connection.query('SELECT id, CONCAT (first_name, " ", last_name) AS name FROM employee', (err, res) => { 
                                if (err) reject (new Error(" Oops! Something went wrong (╯°□°）╯︵ ┻━┻ ".bgRed, err));
                            res.forEach(({ name }) => {
                            employeeArray.push(name);
                            });
                            return employeeArray
                        });
                        
                    }
                }
            ])
    
    console.log('\n\n-------------------------------------------------------------\n');
    console.log(`Assimilation of new employee ${to.be.completed} has been completed, my leige`.green);
    console.log('\n-------------------------------------------------------------\n');

};

const addRole = () => {

    console.log('Role added!'.green);

};

const addDepartment = () => {

    console.log('Department added!'.green);

};

const viewDept = async () => {
    return new Promise ((resolve, reject) =>
    connection.query('SELECT name FROM department', (err, res) => {
        if (err) reject (new Error(" Oops! Something went wrong (╯°□°）╯︵ ┻━┻ ".bgRed, err));
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
                connection.query(query, answer.department, (err, res) => {
                    if (err) reject (new Error(" Oops! Something went wrong (╯°□°）╯︵ ┻━┻ ".bgRed, err));
                    console.log(`\nHere are your results for all employees in ${answer.department} department, my leige\n`.green);
                    const departments = console.table(res);
                    resolve (departments);
                }); 
            });
     
    }));
};

const viewRoles = async () => {
    return new Promise ((resolve, reject) => {
    connection.query('SELECT title FROM role', (err, res) => { 
        if (err) reject (new Error(" Oops! Something went wrong (╯°□°）╯︵ ┻━┻ ".bgRed, err));      // (╯°□°）╯︵ ┻━┻  ||  ╯‵Д′)╯ 彡 ┻━┻  
        inquirer
            .prompt([
                {
                    name: 'role',
                    type: 'list',
                    choices: () => {
                        let roleArray = [];
                        res.forEach(({ title }) => {
                            roleArray.push(title);
                        });
                        return roleArray
                    },
                    message: 'Which role would you like to view?'
                }
            ])
            .then((answer) => {
                const query = `SELECT CONCAT (employee.first_name, " ", employee.last_name) AS employee, 
                CONCAT (manager.first_name, " ", manager.last_name) AS manager
                FROM employee
                LEFT JOIN role on employee.role_id = role.id
                LEFT JOIN department ON department_id = department.id
                LEFT JOIN employee manager on employee.manager_id = manager.id
                WHERE role.title = ?`
                connection.query(query, answer.role, (err, res) => {
                    if (err) reject (new Error(" Oops! Something went wrong (╯°□°）╯︵ ┻━┻ ".bgRed, err)); // (╯°□°）╯︵ ┻━┻  ||  ╯‵Д′)╯ 彡 ┻━┻  
                    console.log(`\nHere are your results for all employees in the ${answer.role} role, my leige\n`.green);
                    const roles = console.table(res);
                    resolve (roles);
                }); 
            });
        
    });
  
})};

const viewEmployees = () => 
    new Promise ((resolve, reject) => {
        connection.query(`SELECT CONCAT (employee.first_name, " ", employee.last_name) AS employee, 
        role.title, role.salary,department.name AS department, 
        CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee 
        LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON department_id = department.id 
        LEFT JOIN employee manager on employee.manager_id = manager.id`, (err, res) => {
        if (err) reject (new Error(" Oops! Something went wrong ¯\_(ツ)_/¯ ".bold.bgRed, err));   // (╯°□°）╯︵ ┻━┻  ||  ╯‵Д′)╯ 彡 ┻━┻  
        console.log('\n\n-------------------------------------------------\n');
        console.log(`Here are your results for all employees, my leige`.green);
        console.log('\n-------------------------------------------------\n');
        const employees = console.table(res);
        resolve (employees);
       
    });
    
});

const updateRole = () => {

    console.log('Employee role updated!'.green);

};

const updateManager = () => {

    console.log('Employee manager updated!'.green);

};

const removeFunction = () => {

    console.log('Employee removed!'.green);

}

// connect to the mysql server and sql database
connection.connect((err) => {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    title();
  });