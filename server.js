require('dotenv').config()
const inquirer = require("inquirer");
//const { addRole } = require('./db/index');
const db = require("./db");
require("console.table");
const connection = require('./db/database')



function runQuestions() {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View All Departments",
                    value: "VIEW_DEPARTMENTS"
                },
                {
                    name: "View All Roles",
                    value: "VIEW_ROLES"
                },
                {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES"
                },

                {
                    name: "Add a Department",
                    value: "ADD_DEPARTMENT"
                },
                {
                    name: "Add a Role",
                    value: "ADD_ROLE"
                },
                {
                    name: "Add an Employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "Update Employee Role",
                    value: "UPDATE_EMPLOYEE_ROLE"
                },
                {
                    name: "Quit",
                    value: "QUIT"
                }
            ]
        }

    ]).then(res => {
        let choice = res.choice;
        // Call the functions from what the user selects
        switch (choice) {
            case "VIEW_DEPARTMENTS":
                viewAllDepartments();
                break;
            case "VIEW_ROLES":
                viewAllRoles();
                break;
            case "VIEW_EMPLOYEES":
                viewAllEmployees();
                break;
            case "ADD_DEPARTMENT":
                createDepartment();
                break;
            case "ADD_ROLE":
                createRole();
                break;
            case "ADD_EMPLOYEE":
                createEmployee();
                break;
            case "UPDATE_EMPLOYEE_ROLE":
                updateEmployeeRole();
                break;
            default:
                quit();
        }
    }
    )
}


// View all employees
function viewAllEmployees() {
    db.allEmployees()
        .then(([rows]) => {
            let employees = rows;
            console.log("\n");
            console.table(employees);
        })
        .then(() => runQuestions());
}

// View all roles
function viewAllRoles() {
    db.allRoles()
        .then(([rows]) => {
            let roles = rows;
            console.log("\n");
            console.table(roles);
        })
        .then(() => runQuestions());
}

// View all departments
function viewAllDepartments() {
    db.allDepartments()
        .then(([rows]) => {
            let departments = rows;
            console.log("\n");
            console.table(departments);
        })
        .then(() => runQuestions());
}

// Add a role
function createRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the new role title?",
        },
        {
            // look up number type
            type: "number", 
            name: "salary",
            message: "What is the new role salary?",
        },
        {
            type: "number",
            name: "department_id",
            message: "What is the department's ID?",
        }

    ])
    .then(answers => {
        // connection.promise().query("INSERT INTO role SET ?", answers).then(() => runQuestions());
        db.addRole(answers).then(() => runQuestions());
    })
    
}
    


// Add a department
// function createDepartment() {

// }

// // Add an employee
// function createEmployee() {

// }
  

// // Update an employee's role
// function updateEmployeeRole() {

// }

runQuestions();