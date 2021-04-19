DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;

USE employee_DB;

CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(30) NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department (id)
);

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES role (id),
  FOREIGN KEY (manager_id) REFERENCES employee (id)
);

INSERT INTO department (name)
VALUES ("Sales"), ("Human Resources"), ("Finance"), ("Engineering"), ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1), ("Salesperson", 60000, 1), ("HR Manager", 80000, 2), ("Recruiter", 60000, 2), 
("Accounting Lead", 80000, 3), ("Accountant", 60000, 3), ("Lead Engineer", 120000, 4), ("Engineer", 90000, 4),
("Legal Lead", 150000, 5), ("Lawyer", 120000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ash", "Williams", 1, null), ("Grogu", "Babyyoda", 2, 1), ("Jean-Luc", "Picard", 3, null), ("William", "Riker", 4, 3),
("Luke", "Skywalker", 5, null), ("Han", "Solo", 6, 5);
