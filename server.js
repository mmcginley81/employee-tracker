const inquirer = require('inquirer');
const db = require('./db');
const { listenerCount } = require('./db/connection');
require('console.table');

function mainMenu(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to see?',
            choices: [
                'View all departments',
                'View all roles',
                'Add Department',
                'Add Role'
            ]
        }
    ]).then(res => {
        switch(res.choice){
            case 'View all departments':
                return viewAllDepartments();
            case 'View all roles' :
                return viewAllRoles(); 
            case 'Add Department':
                return addDepartment(); 
            case 'Add Role':
                return addRole();
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
            choices: [
                { 
                  name:'1.) Sales',
                  message: '1.) Sales',
                  value:1
                },   
                { 
                  name:'2.) Marketing',
                  message: '2.) Marketing',
                  value:2
                },   
                { 
                  name:'3.) Engineering',
                  message: '3.) Engineering',
                  value:3
                },   
                {
                  name:'4.) Logisitcs',
                  message: '4.) Logisitcs',
                  value:4
                }
                
                
                
            ]
            
        }
    ])
    await db.addRole(role)
    console.log("New Role Added")
    mainMenu();
}

// async function viewAllEmployees(){
//     const roles = await db.viewAllEmployees()

//     console.table(roles)

// }

mainMenu();