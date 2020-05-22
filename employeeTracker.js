const mysql = require('mysql');
const inquirer = require('inquirer');

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