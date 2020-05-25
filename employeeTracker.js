const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  port: 8889,
  database: "employee_db",
});

connection.connect((err) => {
  if (err) throw err;

  console.log(`Connection created on ${connection.threadId}`);
  getStarted();
});

getStarted = () => {
  return inquirer
    .prompt({
      name: "choice",
      type: "list",
      message: "What do you like to do?",
      choices: [
        "View all employees",
        "View all departments",
        "View all employees by department",
        "View all employees by manager",
        "Add employee",
        "Remove employee",
        "Update employee role",
        "Update employee's manager",
        "View all roles",
        "Add role",
        "Remove role",
        "Exit",
      ],
    })
    .then((ans) => {
      switch (ans.choice) {
        case "View all employees":
          viewAllEmp();
          break;

        case "View all departments":
          viewAllDep();
          break;

        case "View all employees by department":
          viewAllEmpDep();
          break;

        case "View all employees by manager":
          viewManager();
          break;

        case "Add employee":
          addEmp();
          break;

        case "Remove employee":
          removeEmp();
          break;

        case "Update employee role":
          updateEmpRole();
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

        case "Remove role":
          removeRole();
          break;

        case "Exit":
          connection.end();
          break;
      }
    });
};

const viewAllEmp = () => {
  const q = `SELECT e.emp_id, e.first_name, e.last_name, e.manager_id,
    r.title, r.salary, d.department_name
    FROM ((employee e
    INNER JOIN roles r ON e.role_id = r.role_id)
    INNER JOIN department d ON d.department_id = r.department_id)`;
  const query = connection.query(q, (err, res) => {
    if (err) throw err;

    console.table(res);
    getStarted();
  });
};

const viewAllDep = () => {
  const q = `SELECT * FROM department`;
  const query = connection.query(q, (err, res) => {
    if (err) throw err;

    console.table(res);
    getStarted();
  });
};

const viewRoles = () => {
  const q = `SELECT * FROM roles`;
  const query = connection.query(q, (err, res) => {
    if (err) throw err;

    console.table(res);
    getStarted();
  });
};

// const removeEmp = () => {

//     const q = `SELECT first_name FROM employee`;
//     const query = connection.query(q,(err, res) => {
//         if(err) throw err;
//         const emp_name = [];

//         emp_name.push(res);
//         console.log(emp_name);

//     });

//     return inquirer.prompt([
//        {
//         name: "Which employee you want to remove?",
//         type: "list",
//         choices: "",
//        },
//     ]).then(function() {
//         const q = `SELECT * FROM roles`;
//     const query = connection.query(q,(err, res) => {
//         if(err) throw err;

//        console.table(res);
//         getStarted();
//     });
// });
// };

const addEmp = () => {
 
    connection.query("SELECT * FROM roles", function (err, roles) {
        if (err) throw err;
       connection.query("SELECT * FROM employee", function (err, employees) {
        inquirer.prompt([

            {
                type: "input",
                name: "firstname",
                message: "What is the employee's first name?"
            },
            {
                type: "input",
                name: "lastname",
                message: "What is the employee's last name?"
            },
            {
                name: "role",
                type: "rawlist",
                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < roles.length; i++) {
                        choiceArray.push(roles[i].title);
                    }
                    return choiceArray;
                },
                message: "What is the employee's role?"
            },

            {
                type: "rawlist",
                name: "manager",
                message: "What is the employee's manager?",
                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < employees.length; i++) {
                        choiceArray.push(employees[i].first_name + " " + employees[i].last_name);
                    }
                    return choiceArray;
                }
            }

        ]).then(function (res) {
          console.log(res);
            for (var i = 0; i < roles.length; i++) {
                if (roles[i].title == res.role) {
                    res.role_id = roles[i].id;
                }
            }
            for (var i = 0; i < employees.length; i++) {
                if (employees[i].first_name + " " + employees[i].last_name == res.manager) {
                    res.manager_id = employees[i].id;
                }
            }
            var query = "INSERT INTO employee SET ?"
            const VALUES = {
                first_name: res.firstname,
                last_name: res.lastname,
                role_id: res.role_id,
                manager_id: res.manager_id
            }
            connection.query(query, VALUES, function (err) {
                if (err) throw err;
                console.log("Employee successfully added!");
                getStarted()
            }

            )
        });
    });
    });

};

const addRole = () => {
  inquirer
    .prompt([
      {
        name: "newRole",
        message: "Enter title of new role",
      },
      {
        name: "salary",
        message: "Enter salary for new role",
      },
      {
        type: "list",
        name: "department",
        message: "Choose department of employee",
        choices: ["Engineering", "Affiliate", "Finance", "Legal", "Marketing"],
      },
    ])
    .then(function (resp) {
      const q = `SELECT department_id FROM department WHERE department_name = '${resp.department}'`;
      const query = connection.query(q, (err, res) => {
        if (err) throw err;

        console.log(res[0].department_id);

        const qq = `INSERT INTO roles (title, salary, department_id) VALUES ("${resp.newRole}", ${resp.salary}, ${res[0].department_id})`;
        const query = connection.query(qq, (err, res) => {
          if (err) throw err;

          getStarted();
        });
      });
    });
};

const removeRole = () => {

    connection.query("SELECT title FROM roles ", function (err, results) {
        if (err) throw err;

    inquirer
          .prompt([
      {
        type: "rawlist",
        name: "role",
        message: "Choose role you want to remove",
        choices:  function () {
                    var choiceArray = [];
                    for (var i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].title);
                    }

                    return choiceArray;
                }
       
    }]).then(function (resp) {
      var query = "DELETE FROM roles WHERE title = ?"
      const VALUES = [{title: resp.role}]
      connection.query(query, VALUES, function (err) {
         if (err) throw err;
         console.log("Role Successfully Deleted!");
          getStarted();
      });
     
    });
   
   
  });
};

const updateEmpRole = () => {

    var roleQuery = "SELECT * FROM role;";
    var empQuery = "SELECT * FROM employee;";


    connection.query(roleQuery, function (err, roles) {
        connection.query(empQuery, function (err, employees) {

            if (err) throw err;
            inquirer.prompt([{
                    name: "employee",
                    type: "rawlist",
                    choices: function () {
                        var arrayOfChoices = [];
                        for (var i = 0; i < roles.length; i++) {
                            arrayOfChoices.push(employees[i].first_name);
                        }

                        return arrayOfChoices;
                    },
                    message: "Which employee do you like to update role?"
                },{
                    name: "role",
                    type: "rawlist",
                    choices: function () {
                        var arrayOfChoices = [];
                        for (var i = 0; i < roles.length; i++) {
                            arrayOfChoices.push(roles[i].title);
                        }
                        return arrayOfChoices;
                    },
                    message: "Which role the emp belongs to?"
                }
            ]).then(function (result) {

                for (var i = 0; i < employees.length; i++) {
                    if (employees[i].first_name === result.employee) {
                        result.employee_id = employees[i].id;
                    }
                }
                for (var i = 0; i < roles.length; i++) {
                    if (roles[i].title === result.role) {
                        result.role_id = roles[i].id;
                    }
                }
                var query = "UPDATE employee SET role_id=? WHERE employee_id= ?"
                const VALUES = [

                    { role_id: result.result.role_id },
                    { employee_id: result.employee_id }
                ]
                let query1 = connection.query(query, VALUES, function (err) {
                    if (err) throw err;
                    console.table("Employee role Successfully Updated!");
                    getStarted()
                });

            })
        })
    })
};

const updateManager = () => {

       connection.query("SELECT * FROM employee", function (err, employees) {
        inquirer.prompt([

            {
                type: "rawlist",
                name: "employee",
                message: "Which employee do you like to update manager?",
                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < employees.length; i++) {
                        choiceArray.push(employees[i].first_name + " " + employees[i].last_name);
                    }
                    return choiceArray;
                }
            },
            {
                type: "rawlist",
                name: "manager",
                message: "What is the employee's manager?",
                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < employees.length; i++) {
                        choiceArray.push(employees[i].first_name + " " + employees[i].last_name);
                    }
                    return choiceArray;
                }
            }

        ]).then(function (res) {

            for (var i = 0; i < employees.length; i++) {
                if (employees[i].first_name + " " + employees[i].last_name === res.employee) {
                    res.employee_id = employees[i].id;
                }
            }
            for (var i = 0; i < employees.length; i++) {
                if (employees[i].first_name + " " + employees[i].last_name === res.manager) {
                    res.manager_id = employees[i].id;
                }
            }
            if(res.employee_id == res.manager_id){
              console.log("Employee Id and Manager id can't be same. Please try again.");
              getStarted()
            }
            var query = "UPDATE employee SET manager_id=? WHERE employee_id= ?"
            const VALUES = {
                manager_id: res.manager_id,
                employee_id: res.employee_id
            }
            connection.query(query, VALUES, function (err) {
                if (err) throw err;
                console.log("Employee manager successfully updated!");
                getStarted()
            }

            )
        })
    });
};
