const connection = require ('./connection');
class DB{
    constructor(connection){
        this.connection = connection
    }
    viewAllDepartments(){
        return this.connection.query(
            `
            SELECT 
                department.id,
                department.name
            FROM 
                department
            ORDER BY
                department.id
            `
        )
    }
    viewAllRoles(){
        return this.connection.query(
            `
            SELECT 
                role.id,
                role.title,
                role.salary,
                department.name AS department
            FROM 
                role
            LEFT JOIN
                department ON department.id = role.department_id
            ORDER BY
                role.id
            `
        )
    }
    viewAllEmployees(){
        return this.connection.query(
            `
            SELECT
            employee.id, 
            employee.first_name, 
            employee.last_name,
            role.title,
            department.name AS department,
            role.salary,
            CONCAT(manager.first_name, ' ', manager.last_name) AS manager
        FROM
            employee LEFT JOIN role
            on employee.role_id = role.id LEFT JOIN department
            on role.department_id = department.id LEFT JOIN employee manager 
            on manager.id = employee.manager_id;
            `
        )
    }

    addDepartment(department) {
        return this.connection.query(
            `
        INSERT INTO
            department
        SET
            ?
        `, department
        );
    }

    addRole(role) {
        return this.connection.query(
            `
        INSERT INTO
            role
        SET
            ?
        `, role
        );
    }

    addEmployee(employee) {
        return this.connection.query(
            `
        INSERT INTO
            employee
        SET
            ?
        `, employee
        );
    }
    
    updateEmployee(role_id, id) {
        return this.connection.query(
            `
        UPDATE 
            employee
        SET
            ?
        WHERE
            ?
        `, [id, role_id]
        );
    }

    deleteEmployee(id) {
        return this.connection.query(
            `
        DELETE FROM
            employee
        WHERE
            ?
        `, id
        );
    }

    viewSalesDepartment(){
        return this.connection.query(
            `
            SELECT 
            employee.id,
            employee.first_name,
            employee.last_name,
            role.title,
            CONCAT(employee.first_name, ' ', employee.last_name) AS manager,
            department.name AS department
        FROM 
            employee

        LEFT JOIN
            role ON employee.role_id = role.id
        LEFT JOIN
            department ON role.department_id = department.id    
        LEFT JOIN
            employee manager ON employee.manager_id = employee.id
        WHERE 
            department_id = 1
        ORDER BY
            employee.role_id
            `
        )
    }

}

 












module.exports = new DB(connection)