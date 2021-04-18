const mysql = require('mysql');
const inquirer = require('inquirer');
const table = require('console.table');
require('custom-env').env(false);

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.USER || '',
    password: process.env.PASSWORD || '',
    database: 'employee_DB'
});

const start = () => {
    console.log('');
    console.log('EEEEEEE                     lll                                 DDDDD           tt            bb                          ');
    console.log('EE      mm mm mmmm  pp pp   lll  oooo  yy   yy   eee    eee     DD  DD    aa aa tt      aa aa bb        aa aa  sss    eee  ');
    console.log('EEEEE   mmm  mm  mm ppp  pp lll oo  oo yy   yy ee   e ee   e    DD   DD  aa aaa tttt   aa aaa bbbbbb   aa aaa s     ee   e');
    console.log('EE      mmm  mm  mm pppppp  lll oo  oo  yyyyyy eeeee  eeeee     DD   DD aa  aaa tt    aa  aaa bb   bb aa  aaa  sss  eeeee  ');
    console.log('EEEEEEE mmm  mm  mm pp      lll  oooo       yy  eeeee  eeeee    DDDDDD   aaa aa  tttt  aaa aa bbbbbb   aaa aa     s  eeeee');
    console.log('                    pp                  yyyyy                                                                  sss        ');
    console.log('');

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

const addToDB = () => {


};

const viewDB = () => {

    
};

const updateDB = () => {

    
};







// connect to the mysql server and sql database
connection.connect((err) => {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });