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
                role.salary,
                manager.id CONCAT(employee.first_name, ' ', employee.last_name) AS manager,
                department.name AS department
            FROM 
                employee
            LEFT JOIN
                role ON employee.role_id = role.id
            LEFT JOIN
                department ON role.department_id = department.id    
            LEFT JOIN
                employee manager ON employee.manager_id = employee.id
            ORDER BY
                employee.id
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
            role_id = ?
        WHERE
            id = ?
        `, [id, role_id]
        );
    }

    deleteEmployee(employee) {
        return this.connection.query(
            `
        DELETE 
            employee
        FROM
            employee
        WHERE
            id = ?
        `, employee
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

 





//THEN I am presented with the following options: , view all employees, add an employee, and update an employee role//






module.exports = new DB(connection)