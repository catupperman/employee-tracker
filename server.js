const inquirer = require('inquirer');
const mysql = require('mysql2');
// connecting to sql files
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'rootr00t!',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );

  db.query('SELECT * FROM employee', function (err, results) {
    console.log(results);
  });

  function department(){
      inquirer.prompt([
          {
              type: "input",
              message: "What is the department id number?",
              name: "department_id"
          },
          {
              type: "input",
              message: "What is the department name?",
              name: "department_name"
          }
      ])
  }

  function course_name(){
    inquirer.prompt([
        {
            type: "input",
            message: "What is the course id number?",
            name: "course_id"
        },
        {
            type: "input",
            message: "What is the course name?",
            name: "course_name"
        },
        {
            type: ""
        }
    ])
}

  