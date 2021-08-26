USE employee_db;
INSERT INTO department (name) VALUES ("sales"), ("accounting");

INSERT INTO role (title, salary, department_id) VALUES ("salesman", 70000, 1), ("accountant", 80000, 2);

INSERT INTO employee (first_name, last_name, role_id, employee_manager_id) VALUES ("Doug", "Smith", 1, NULL), ("Jim", "Swift", 2, NULL);

