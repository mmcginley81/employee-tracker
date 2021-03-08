USE office_db;

INSERT INTO department
    (name) 
VALUES
    ('Sales'),
    ('Marketing'),
    ('Engineering'),
    ('Logistics')

;

-- Question how to convert id into role id?
INSERT INTO role(title, salary, department_id) 
VALUES
    ('Sales Manager', 100000.75, 1),
    ('Sales Specialist', 90000.75, 1),
    ('Sales Associate', 60000.75, 1),
    ('Marketing Manager', 95000.75, 2),
    ('Marketing Specialist', 85000.75, 2),    
    ('Marketing Associate', 55000.75, 2),
    ('Engineering Manager', 115000.75, 3),
    ('Engineering Specialist', 105000.75, 3),
    ('Engineering Associate', 85000.75, 3),
    ('Logistics Manager', 85000.75, 4),
    ('Logistics Specialist', 75000.75, 4),
    ('Logistics Associate', 45000.75, 4)

;

INSERT INTO employee
    (first_name, last_name, role_id, manager_id) 
VALUES
     
    ('Charles','Henderson', 1, NULL),
    ('Chante','Breeding', 2, 1),
    ('Sheila','Ellars', 3, 1),
    ('Natalee','Barfield', 4, NULL),
    ('April','Brandano', 5, 4),
    ('Paul','Bruniges', 6, 4),
    ('Lauren','Cuevas', 7, NULL),
    ('Maria','Fontanez', 8, 7),
    ('Michael','Fraga', 9, 7),
    ('Shelly','Garibay', 10, NULL),
    ('Eleanor','Genina', 11, 10),
    ('Darina','Gray', 12, 10)
;