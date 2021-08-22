DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;
--generates the department table in the data base
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);
--generates the role table in the data base
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL
    FOREIGN KEY (department)
    REFERENCES department(id)
    ON DELETE SET NULL
)
--generates the employee table in the data base
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    FOREIGN KEY (role)
    REFERENCES role(id)
    FOREIGN KEY (employee)
    REFERENCES manager(id)
    ON DELETE SET NULL
)