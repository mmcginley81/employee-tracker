const inquirer = require('inquirer');
const db = require('./db');
const { listenerCount } = require('./db/connection');
require('console.table');

// let choices;
// db.viewAllDepartments().then(data =>{
//     choices = data
// })
// console.log(choices)

function mainMenu(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to see?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add Department',
                'Add Role',
                'Update Employee'
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
            case 'Add Department':
                return addDepartment(); 
            case 'Add Role':
                return addRole();
            case 'Update Employee Role':
                return updateEmployee();
        }
    })
};

async function viewAllDepartments(){
    const departments = await db.viewAllDepartments()
    console.log('\n')
    console.table(departments)
    mainMenu();

    // let inquireArray = []

    // name:'1.) Sales',
    // message: '1.) Sales',
    // value:1

    // for(let i = 0; i < departments.length; i+=1)
    // {
    //     let newObject = {}
    //     newObject["name"] = departments[i].name;
    //     //newObject["message"] = departments[i].message;
    //     newObject["value"] = i+1;
    //     inquireArray.push(newObject)
    // }
    // console.log(inquireArray, "this is the inquire Array")
    // console.log(departments)
    // // return array of objects that is filtered from database
    // return inquireArray;
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
    const employees = await db.viewAllEmployees()
    
    console.log('\n')
    
    console.table(employees)
    mainMenu();

}

async function updateEmployee(){
    const employees = await db.updateEmployee()
    let viewEmployeeChoices = employees.map(({role_id, name})=>{
        return {
            name:name,
            value:role_id
        }
    })

    console.log('\n')
    
    console.table(employees)
    const employeeSelect = await inquirer.prompt([
        {
            type: 'list',
            name: 'role_id',
            message: 'Which employee do you want to update?',
            choices: viewEmployeeChoices
        }
    ]);
    console.log(employeeSelect)
    await db.addRole(employeeSelect)

    console.log("Employee Updated")

    mainMenu();

}

mainMenu();