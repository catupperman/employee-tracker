const inquirer = require('inquirer');
const mysql = require('mysql2');
const ascci = require("ascii-art");
const util = require('util')
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

db.query = util.promisify(db.query);

//makes the company table
const viewCompany = db.query('SELECT employee.id, CONCAT(employee.first_name," ", employee.last_name) AS employee, role.title, department.name AS department, role.salary FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id').then(dbres => {
    console.table(dbres);
    mainMenu();
});

//art thingie for the top of the menu

// try {
//     let rendered = await art.font("Employee Tracker", 'doom').completed()
//     //rendered is the ascii
// } catch (err) {
//     //err is an error
// }
//starts the prompt
function mainMenu() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do? (Use Arrow Keys)",
            name: "main_prompt",
            choices: ["View Company", "Add Employee", "View All Employees", "Add Role", "View All Roles", "Add a Department", "View All Departments", "Quit"]
        }
    ]).then(choice => {
        switch (choice.main_prompt) {
            case "View Company":
                viewCompany;
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "View All Employees":
                viewEmployees;
                break;
            case "Add Role":
                addRole();
                break;
            case "View All Roles":
                viewRoles();
                break;
            case "Add a Department":
                addDepartment(choice);
                break;
            case "View All Departments":
                viewDepartments();
                break;
            case "Quit":
                return "quit";
            default:
                break;

        }
    })
}


//adds a new employee
function addEmployee() {
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
};
//views all the employees
// const viewEmployees = db.query('SELECT employee.id, CONCAT(employee.first_name," ", employee.last_name) AS employee, department.name AS department').then(dbres => {
//     console.table(dbres);
//     mainMenu();
// });
//adds a new department 
function addDepartment() {
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
    //.then(dbres => {
    //     db.query("INSERT INTO department SET ?", { name: dbres.name }).then(dbres => {
    //         console.table(dbres);
    //         mainMenu();
    //     });
    //})
}
//adds new role
function addRole() {
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

