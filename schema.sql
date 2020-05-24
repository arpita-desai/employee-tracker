DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;
CREATE TABLE department(
    department_id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    department_name VARCHAR(255)
);
CREATE TABLE roles(
    role_id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(255),
    salary DECIMAL,
    department_id INTEGER,
    FOREIGN KEY (department_id) REFERENCES department(department_id)
);
CREATE TABLE employee(
    emp_id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    role_id INTEGER,
    manager_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES roles(role_id),
    FOREIGN KEY (manager_id) REFERENCES employee(emp_id)
);

SELECT e.emp_id, e.first_name, e.last_name, e.manager_id, 
r.title, r.salary, d.department_name
FROM ((employee e
INNER JOIN roles r ON e.role_id = r.role_id)
INNER JOIN department d ON d.department_id = r.department_id);

-- //Same as previous just use full table name//
-- SELECT employee.emp_id, employee.first_name, employee.last_name, employee.manager_id, 
-- roles.title, roles.salary, department.department_name
-- FROM ((employee
-- INNER JOIN roles ON employee.role_id = roles.role_id)
-- INNER JOIN department ON department.department_id = roles.department_id);

-- //Same as previous both just used USING because column names are same for foreign key\\
-- SELECT employee.emp_id, employee.first_name, employee.last_name, employee.manager_id, 
-- roles.title, roles.salary, department.department_name
-- FROM ((employee
-- INNER JOIN roles using (role_id))
-- INNER JOIN department using (department_id));