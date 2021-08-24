const inquirer = require('inquirer');
const mysql = require('mysql2');
const ascci = require("ascii-art")
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
    mainMenu();
});

//art thingie for the top of the menu

// try {
//     let rendered = await art.font("Employee Tracker", 'doom').completed()
//     //rendered is the ascii
// } catch (err) {
//     //err is an error
// }

function mainMenu() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do? (Use Arrow Keys)",
            name: "main-prompt",
            choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add a Department", "Quit"]
        }
    ]).then(answers => {
        switch (answers.direction) {
            case "View All Employees":
                db.query('SELECT * FROM employee', function (err, results) {
                    console.log(results);
                });
                break;
            case "Add Employee":
                employee(answers);
                break;
            case "Update Employee Role":
                //not sure
                break;
            case "View All Roles":
                role(answers);
                break;
            case "Add a Department":
                department(answers);
                break;
            case "Quit":
                return "quit";
            default:
                break;

        }
    })
}


//information to be entered in to the department table rows 
function department() {
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
//information to be entered into the table rows for the course table
function role() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the role id number?",
            name: "course_id"
        },
        {
            type: "input",
            message: "What is the role name?",
            name: "role_name"
        },
        {
            type: "input",
            message: "What is the role salary?",
            name: "role_salary"
        },
        {//validate function inside of here? to sync to department_id (if (user reponse === deparment_id) return "this is a valid department" else return "Please enter a valid department number"
            type: "",
            message: "What is the role, department_id number?",
            name: "role_department_id"
        }
    ])
}

function employee() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the employee id?",
            name: "role_id"
        },
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "employee_first_name"
        },
        {
            type: "input",
            message: "What is the employee's last name?",
            name: "employee_last_name"
        },
        {
            type: "input",
            message: "What is the employee's role id?",
            name: "employee_role"
        },
        {//if employee role is manager prompt for manager id should this be a list type?
            type: ""
        }
    ])
}

