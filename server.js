const mysql = require('mysql');
const inquirer = require('inquirer');
const table = require('console.table');
require('dotenv').config()
const colors = require('colors');

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
            choices: ['Add employee, role or department', 'View employees, roles or departments', 'Update employee role', 'EXIT'],
        })
        // based on user choices, move on to submenu
        .then (async (startAnswer) => {
            switch (startAnswer.choice) {
                case 'Add employee, role or department':
                    await addFunction();
                    break;

                case 'View employees, roles or departments':
                    await viewFunction();
                    break;

                case 'Update employee role':
                    await updateRole();
                    start();
                    break;

                case 'EXIT':
                    console.log('\nHave fun storming the castle!'.red)
                    console.log('    ()==[:::::::::::::>')
                    connection.end();
            }
        })        
}

// submenu for add functions
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
                    await addEmployee();
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

// submenu for view functions
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
                    await start();
                    break;
            }
        }) 
}

//  start helper functions
const getTitles = async () => {
    return new Promise ((resolve, reject) => {
        let roleArray = [];
        connection.query('SELECT title FROM role', (err, res) => {  
  
            roleArray = res.map(({ title }) => title)
            resolve (roleArray)
        });
    })
}

const getDepartmentName = async () => {
    return new Promise (async(resolve, reject) => {
        let departmentNameArray = [];
        connection.query('SELECT name FROM department', (err, res) => {
            departmentNameArray = res.map(({name}) => name)
            resolve(departmentNameArray)
        })
    })
}

const getEmployees = async () => {
    return new Promise ((resolve, reject) => {
        let employeeArray = ['No one - They serve only themselves'];
            connection.query('SELECT id, CONCAT (first_name, " ", last_name) AS name FROM employee', (err, res) => { 

            res.forEach(({ name }) => {
                employeeArray.push(name);
            })
            resolve (employeeArray)
        });  
    })
}

const getEmployeeId = async (employee) => {
    return new Promise ((resolve, reject) => {
        let workingEmployee;
        // since reusing this function, check to see if data is a string or undefined and split the one that is a string
        if (typeof employee.manager === "string") {
            workingEmployee = employee.manager.split(" ");
        } else {
            workingEmployee = employee.employeeName.split(" ");
        }
        connection.query(`SELECT id FROM employee WHERE first_name = '${workingEmployee[0]}' AND last_name = '${workingEmployee[1]}'`, (err, res) => {
            if (err) throw err;
            resolve (res[0].id);
        })
    })
}

const getRoleId = async (employee) => {
    return new Promise (async(resolve, reject) => {
        connection.query(`SELECT id FROM role WHERE title = '${employee.title}'`, (err, res) => {
            if (err) throw err;
            resolve (res[0].id);
        })
    })
}

const getDepartmentId = async (addRoleAnswers) => {
    return new Promise (async(resolve, reject) => {
        connection.query(`SELECT id FROM department WHERE name = "${addRoleAnswers.department}"`,  (err, res) => {
            if (err) throw err;
            resolve (res[0].id);
        })
    })    
}
// end helper functions



const addEmployee = async () => {
    return new Promise (async(resolve, reject) => {
        const roleArray = await getTitles();
        const employeeArray = await getEmployees();

        inquirer
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
                    choices: roleArray
                },
                {
                    name: 'manager',
                    type: 'list',
                    message: 'Choose whom this scalawag will serve:',
                    choices: employeeArray
                }
            ])
            .then(async(addEmployeeAnswers) => {
                // if user selected the "none" option, this changes it to null to be passed to the sql database
                if (addEmployeeAnswers.manager === 'No one - They serve only themselves') {
                    return addEmployeeAnswers.manager = null;
                }
                // run helper functions to get integer data before inserting to db
                addEmployeeAnswers.title = await getRoleId(addEmployeeAnswers);
                addEmployeeAnswers.manager = await getEmployeeId(addEmployeeAnswers);

                connection.query('INSERT INTO employee SET ?', 
                {
                    first_name: addEmployeeAnswers.firstName,
                    last_name: addEmployeeAnswers.lastName,
                    role_id: addEmployeeAnswers.title,
                    manager_id: addEmployeeAnswers.manager
                }, (err, res) => {
                    if (err) throw err;
                    const employeeAdded = console.log('\nAssimilation of new employee has been completed, my leige\n'.green);
                    resolve (employeeAdded)
                })
            }).catch((err) => {
                console.log(" Oops! Something went wrong (╯°□°）╯︵ ┻━┻ ".bgRed, err)
        })
    })
};

const addRole = () => {
    return new Promise (async(resolve, reject) => {
        // run helper function to get names of departments for list prompt
        const departmentArray = await getDepartmentName()
        inquirer
            .prompt([
                {
                    name: "title",
                    type: 'input',
                    message: 'What role would you like to add, highness?'
                },
                {
                    name: "salary",
                    type: 'input',
                    message: "What is the going rate for this type of minion's services?"
                },
                {
                    name: 'department',
                    type: 'list',
                    message: 'What department shall the this report under, my lord?',
                    choices: departmentArray,
                }
            ])
            .then( async (addRoleAnswers) => {
                // run helper function to get department id integer
                addRoleAnswers.department = await getDepartmentId(addRoleAnswers)
                connection.query(`INSERT INTO role (title, salary, department_id) VALUES ("${addRoleAnswers.title}", ${addRoleAnswers.salary}, ${addRoleAnswers.department});`, (err, res) => {
                const departmentAdded = console.log(`\n New role ${addRoleAnswers.title} has been added, my leige\n`.green)
                resolve (departmentAdded)
            })
            }).catch((err) => {
                console.log(" Oops! Something went wrong (╯°□°）╯︵ ┻━┻ ".bgRed, err)
            })
    })
};

const addDepartment = () => {
    return new Promise ((resolve, reject) => {
    inquirer
        .prompt([
            {
                name: "department",
                type: 'input',
                message: 'What department would you like to add, highness?'
            }
        ])
        .then((answer) => {
            connection.query(`INSERT INTO department (name) VALUES ("${answer.department}");`, (err, res) => {
            const departmentAdded = console.log(`\n New department ${answer.department} has been added, my leige\n`.green)
            resolve (departmentAdded)
        })
        }).catch((err) => {
            console.log(" Oops! Something went wrong (╯°□°）╯︵ ┻━┻ ".bgRed, err)
        })
})
};

const viewDept = async () => {
    return new Promise (async (resolve, reject) => {
        // run helper function to get names of departments for list prompt
        const departmentNameArray = await getDepartmentName();
        inquirer
            .prompt([
                {
                    name: 'department',
                    type: 'list',
                    choices: departmentNameArray,
                    message: 'Which department would you like to view?',
                }
            ])
            .then((answer) => {
                const query = `SELECT CONCAT (employee.first_name, " ", employee.last_name) AS employee, role.title
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
            }).catch((err) => {
                console.log(" Oops! Something went wrong (╯°□°）╯︵ ┻━┻ ".bgRed, err)
            })
    });
};

const viewRoles = async () => {
    return new Promise ( async(resolve, reject) => {
        //  run helper function to get titles from role table
       const roleArray = await getTitles();
        inquirer
            .prompt([
                {
                    name: 'role',
                    type: 'list',
                    choices: roleArray,
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
                    console.log(`\nHere are your results for all employees in the ${answer.role} role, my leige\n`.green);
                    const roles = console.table(res);
                    resolve (roles);
                }); 
            }).catch((err) => {
                console.log(" Oops! Something went wrong (╯°□°）╯︵ ┻━┻ ".bgRed, err)
            })
})};

const viewEmployees = () => 
    new Promise ((resolve, reject) => {
        connection.query(`SELECT CONCAT (employee.first_name, " ", employee.last_name) AS employee, 
        role.title, role.salary,department.name AS department, 
        CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee 
        LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON department_id = department.id 
        LEFT JOIN employee manager on employee.manager_id = manager.id`, (err, res) => {
        if (err) reject (new Error(" Oops! Something went wrong ¯\_(ツ)_/¯ ".bold.bgRed, err));   // (╯°□°）╯︵ ┻━┻  ||  ╯‵Д′)╯ 彡 ┻━┻   
        console.log(`\nHere are your results for all employees, my leige\n`.green);
        const employees = console.table(res);
        resolve (employees);       
    })
});

const updateRole = () => {
    return new Promise (async (resolve, reject) => {
        // run helper functions to get employee names and get titles
        const titleArray = await getTitles();
        let employeeArray = await getEmployees();
        // since reusing the getEmployees function, remove the first index from since that isn't needed in prompt
        employeeArray.splice(0, 1);
        inquirer
            .prompt([
                {
                    name: 'employeeName',
                    type: 'list',
                    message: 'Which employee would you like to assign to a new role?',
                    choices: employeeArray
                },
                {
                    name: 'title',
                    type: 'list',
                    message: "What will this minion's new title be?",
                    choices: titleArray
                }
            ])
            .then(async(updateRoleAnswers) => {
                // run helper functions to translate employee name to id and title to integer to push to sql db
                updateRoleAnswers.employeeName = await getEmployeeId(updateRoleAnswers);
                updateRoleAnswers.title = await getRoleId(updateRoleAnswers);
                connection.query(`UPDATE employee SET role_id = ${updateRoleAnswers.title} WHERE id = ${updateRoleAnswers.employeeName}`, (err, res) => {
                    if (err) throw err;
                    const employeeUpdated = console.log('\nEmployee role updated!\n'.green);
                    resolve (employeeUpdated)
                })
            })
    })
};

// connect to the mysql server and sql database
connection.connect((err) => {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    title();
  });