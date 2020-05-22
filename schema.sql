DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employee(
    emp_id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    FOREIGN KEY (role_id) REFERENCES roles(role_id),
    manager_id INTEGER NULL
);

CREATE TABLE roles(
    role_id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(255),
    salary DECIMAL,
    FOREIGN KEY (department_id) REFERENCES department(department_id)
);

CREATE TABLE department(
    department_id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    depatment_name VARCHAR(255)
);