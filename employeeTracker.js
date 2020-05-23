const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: 8889,
    database: "employee_db"
});

connection.connect(err => {
    if(err) throw err;

    console.log(`Connection created on ${connection.threadId}`);
});

getStarted = () => {
    return inquirer.prompt({
        name: "choice",
        type: "list",
        choices: [
            "View all employees",
            "View all employees by department",
            "View all employees by manager",
            "Add employee",
            "Remove employee",
            "Update employee role",
            "Update employee's manager",
            "View all roles",
            "Add role",
            "Remove role",
            "exit"
        ]
    }).then(ans => {
        switch(ans.choice) {
            case "View all employees":
            viewAllEmp();
            break;

            case "View all employees by department":
            viewAllEmpDep();
            break; 
             
            case  "View all employees by manager":
            viewManager();
            break;
              
            case "Add employee":
            addEmp();
            break;

            case  "Remove employee":
            removeEmp();
            break;

            case "Update employee role":
            updateEmp();
            break;

            case "Update employee's manager":
            updateManager();
            break;

            case "View all roles":
            viewRoles();
            break;

            case "Add role":
            addRole();
            break;

            case "Remove Role":
			removeRole();
			break;

			case "Exit":
			connection.end();
			break; 

        }
    });
};

const viewAllEmp = () => {
    const query = connection.query(
        `SELECT `
    )
}