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
function viewCompany() {
    db.query('SELECT employee.id, CONCAT(employee.first_name," ", employee.last_name) AS employee, role.title, department.name AS department, role.salary FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id').then(dbres => {
        console.table(dbres);
        mainMenu();
    });
}

mainMenu();
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
                viewCompany();
                break;
            case "Add Employee":
                addEmployee(choice);
                break;
            case "View All Employees":
                viewEmployees(choice);
                break;
            case "Add Role":
                addRole(choice);
                break;
            case "View All Roles":
                viewRoles(choice);
                break;
            case "Add a Department":
                addDepartment(choice);
                break;
            case "View All Departments":
                viewDep(choice);
                break;
            case "Quit":
                return console.log("To quit, hit command C on your keyboard, and have a wonderful day!");
            default:
                break;

        }
    })
}


//adds a new employee
async function addEmployee() {
    const roles = await db.query('SELECT * FROM role');
const roleArr = roles.map(({id, title}) => ({
    name: title, 
    value: id,
}))
const employees = await db.query('SELECT * FROM employee')
const empArr = employees.map(({id, first_name, last_name}) => ({
    name: first_name + " " + last_name, 
    value: id,
}))
    inquirer.prompt([
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
            type: "list",
            message: "What is the employee's role?",
            name: "employee_role",
            choices: roleArr
        },
        {
            type: "list",
            message: "Who is the employees reporting Manager?",
            name: "manager_id",
            choices: empArr
        }

    ]).then((answer) => {
        db.query("INSERT INTO employee SET ?", { first_name: answer.employee_first_name, last_name: answer.employee_last_name, role_id: answer.employee_role, employee_manager_id: answer.manager_id}).then((res, err) => {
            if (err) {
                console.log(err);
            };
            mainMenu();
        });
    })
};


//views all the employees
function viewEmployees() {
    db.query('SELECT employee.id, CONCAT(employee.first_name," ", employee.last_name) AS employee FROM employee').then(employeeDBres => {
        console.table(employeeDBres);
        mainMenu();
    })
};

//adds new role
function addRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the role name?",
            name: "role_name"
        },
        {
            type: "input",
            message: "What is the role salary?",
            name: "role_salary"
        }
    ]).then((answer) => {
        db.query("INSERT INTO role SET ?", { title: answer.role_name, salary: answer.role_salary }, function (err, res) {
            if (err) {
                console.log(err)
            }
        });

        mainMenu();
    });
};
//views all the roles
function viewRoles() {
    db.query('SELECT * FROM role').then(employeeDBres => {
        console.table(employeeDBres);
        mainMenu();
    })
};

//adds a new department 
function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the department name?",
            name: "department_name"
        }
    ])
        .then((answer) => {
            db.query("INSERT INTO department SET ?", { name: answer.department_name }).then((err, res) => {
                if (err) {
                    console.log(err);
                };
                mainMenu();
            });
        })
}
//views all the departments
function viewDep() {
    db.query('SELECT * FROM department').then(employeeDBres => {
        console.table(employeeDBres);
        mainMenu();
    })
};
