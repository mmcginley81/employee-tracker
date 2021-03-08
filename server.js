const inquirer = require('inquirer');
const db = require('./db');
const { listenerCount} = require('./db/connection');
require('console.table');


function mainMenu(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add Department',
                'Add Role',
                'Add Employee',
                'Update Employee',
                'Delete Employee'
            ]
        }
    ]).then(res => {
        switch(res.choice){
            case 'View all departments':
                return viewAllDepartments();
            case 'View all roles' :
                return viewAllRoles(); 
            case 'View all employees' :
                return viewAllEmployees();
            case 'View all employees by department':
                return viewEmployeesByDepartment();
            case 'Add Department':
                return addDepartment(); 
            case 'Add Role':
                return addRole();
            case 'Add Employee':
                return addEmployee();
            case 'Update Employee':
                return updateEmployee();
            case 'Delete Employee':
                return deleteEmployee();
        }
    })
};

async function viewAllDepartments(){
    const departments = await db.viewAllDepartments()
    console.log('\n')
    console.table(departments)
    mainMenu();

}

async function viewAllRoles(){
    const roles = await db.viewAllRoles()
    console.log('\n')
    console.table(roles)
    mainMenu();

}



//Adds Department to Department Table
async function addDepartment(){
    const department = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of this new department?'
        }
    ])
    await db.addDepartment(department)
    console.log("New Department Added")
    mainMenu();
}

//Adds Role to Roles Table
async function addRole(){
    let roleChoices = await db.viewAllDepartments()
    let roles = roleChoices.map(({id, name})=>{
        return {
            name:name,
            value:id
        }
    })
    const role = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of this new role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'How much is the salary for this position? Do not include commas'
        },
        {
            type: 'list',
            name: 'department_id',
            message: 'Which department is this role in',
            choices: roles
            
        }
    ])
    // remove value and replace it with department_id
    console.log(role)
    await db.addRole(role)

    console.log("New Role Added")
    mainMenu();
}

async function viewAllEmployees(){
    const employeeList = await db.viewAllEmployees()
    
    
    console.log('\n')
    
    console.table(employeeList)
    mainMenu();

}
// ADD EMPLOYEE FUNCTION
async function addEmployee(){
    const employee = await db.viewAllEmployees()
    let managerChoice = employee.map(({id, manager})=>{
        
        return {
            name:manager,
            value:id
            
            }
        
    })
    console.log(managerChoice)
    let roleChoices = await db.viewAllRoles()
    let roles = roleChoices.map(({id, title})=>{
        return {
            name:title,
            value:id
        }
    })
    const newEmployee = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the the first name of this employee?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the the last name of this employee?'
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Which role does this employee have?',
            choices: roles
            
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Who is this employees manager?',
            choices: managerChoice
        }
    ]);
    // remove value and replace it with department_id
    console.log(newEmployee)
    await db.addEmployee(newEmployee)

    console.log("New Employee Added")
    mainMenu();
}

async function deleteEmployee(){
    //Lines 205-210 set up the employees to delete
    let employee = await db.viewAllEmployees()
    let employeeChoice = employee.map(({id, first_name, last_name})=>{   
        return {
            name:first_name + " " + last_name,
            value:id
            
            }
    })
    //ask which employee to remove
    const removeEmployee = await inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'Which employee would you like to remove?',
            choices: employeeChoice
        }
    ]).then(db.deleteEmployee(removeEmployee));
    console.log(removeEmployee)
    console.log(employeeChoice)
    console.log("Employee Removed ")
    // Have to end to see employees deleted.
    end();
}

// View all employees by Department

// async function viewEmployeesByDepartment(){
//     const employeeList = await db.viewEmployeesByDepartment()
//     const seeDepartmentList = viewAllDepartments();
//     console.log('\n')
//     const selectedDepartment = await inquirer.prompt([
//         {
//             type: 'list',
//             name: 'Department',
//             message: 'Which of these departments do you want to see employees from?',
//             choice: ['Sales', 'Marketing', 'Engineering', 'Logistics']
//         },
//         {
//             type: 'list',
//             name: 'Department',
//             message: 'Which of these departments do you want to see employees from?',
//             choice: seeDepartmentList
//         },
//     ]).then(res => {
//     switch(res.choice){
//     case 'Sales':
//     return viewSalesDepartment();

//         }
//     })
//     await db.viewEmployeesByDepartment(selectedDepartment)
//     console.log("function finished")
//     console.table(employeeList)
//     mainMenu();

// }



async function updateEmployee(){
    const employee = await db.viewAllEmployees()
    console.log("line 180")
    let empChoice = employee.map(({id, first_name, last_name})=>{
        return {
            name:first_name + " " + last_name,
            value:id
            
        }
    })
    let roleChoices = await db.viewAllRoles()
    let roles = roleChoices.map(({id, title})=>{
        return {
            name:title,
            value:id
        }
    })

    const update = await inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'Which employee do you want to update?',
            choices: empChoice
        },

    ]).then(response => {
            inquirer.prompt([
                {
                type: 'list',
                name: 'role_id',
                message: 'What new role do you want this employee to have?',
                choices: roles
                }
            ]).then(res =>{
                db.updateEmployee(response, res)
                console.log(response, res)
                console.log("Role Updated")
                mainMenu()
            })
    });

}

mainMenu();