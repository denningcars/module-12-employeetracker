const connection = require("./database");

class employeeDB {

    constructor(connection) {
        this.connection = connection;
    }

    // Show all employees
    allEmployees() {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        );
    }



    // Show all roles
    allRoles() {
        return this.connection.promise().query(
            "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
        );
    }

    // Create a new role
    addRole(role) {
        return this.connection.promise().query("INSERT INTO role SET ?", role);
    }



}

console.log(new employeeDB(connection))
module.exports = new employeeDB(connection);