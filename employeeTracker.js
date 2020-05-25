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
  inquirer
    .prompt([
      {
        name: "fName",
        message: "Enter first name of employee",
      },
      {
        name: "lName",
        message: "Enter last name of employee",
      },
      {
        type: "list",
        name: "role",
        message: "Enter role of employee",
        choices: [
          "Lead Engineer",
          "Software Engineer",
          "Affiliate",
          "Accountant",
          "Lawyer",
          "Marketing Manager",
        ],
      },
      {
        name: "managerName",
        message: "Enter first name of your manager if there",
      },
    ])
    .then((answers) => {
      const role_id = connection.query(
        `SELECT role_id FROM roles WHERE title = '${answers.role}'`,
        // "SELECT role_id FROM roles WHERE ?",
        // {
        //     title: "answers.role"
        // },
        (err, res) => {
          if (err) throw err;

          var role_id = res[0].role_id;
          console.log(role_id);
        }
      );

      console.log(role_id);

      if (answers.managerName) {
        connection.query(
          `SELECT emp_id FROM employee WHERE first_name = '${answers.managerName}'`,
          (err, res) => {
            if (err) {
              console.log("No such manager exists");
            } else {
              var emp_id = res[0].emp_id;
            }

            console.log(emp_id);
          }
        );
      }
      // console.log(emp_id);
      // connection.query(
      //     `INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("${answers.fName}","${answers.lName}","${emp_id}","${role_id}")`,
      //     (err, res) => {
      //         if (err) throw err;

      //         console.log("Data inserted in table.")
      //     }
      // );
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
   
    const rq = `SELECT title FROM roles`;
    const query = connection.query(rq, (err, res) => {
    if (err) throw err;

    remove(res);

    //console.log(res[0].title);
    
  });
   

   function remove(res) {
  
    let roles = [];
    for(i=0; i < res.length; i++){
        roles = res[i].title;
        roles.push;
       // console.log(roles);
        
    }

   inquirer
    .prompt([
      {
        type: "list",
        name: "department",
        message: "Choose role you want to remove",
        choices: roles
      },
    ])
    .then(function (resp) {
      console.log(resp);
      getStarted();
    });
  };
};

