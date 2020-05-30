INSERT INTO department (department_name) 
VALUES
("Engineering"),
("Affiliate"),
("Finance"),
("Legal"),
("Marketing");


INSERT INTO roles (title, salary, department_id) VALUES ("Lead Engineer", 750000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ("Software Enginner", 85000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ("Affiliate", 50000, 2);
INSERT INTO roles (title, salary, department_id) VALUES ("Accountant", 65000, 3);
INSERT INTO roles (title, salary, department_id) VALUES ("Lawyer", 80000, 4);
INSERT INTO roles (title, salary, department_id) VALUES ("Marketing Manager", 70000, 5);



INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("William","Adam",1,3);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("Tom","Suh",null,2);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("May","Hume",null,1);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("Cass","Craven",null,4);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("Nick","Roy",3,2);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("Matt","Benton",null,6);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("Mika","Marks",7,3);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES ("Ryan","John",null,5);

