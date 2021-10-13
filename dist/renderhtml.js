const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("../lib/manager");
const Engineer = require("../lib/engineer");
const Intern = require("../lib/intern");
const teamArr = [];
const cardArr = [];

const promptManager = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the employee name?",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("You need to enter a name to continue!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "id",
        message: "Enter their employee ID?",
        validate: (idInput) => {
          if (idInput) {
            return true;
          } else {
            console.log("You need to enter an ID to continue!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "email",
        message: "Enter their email address?",
        validate: (emailInput) => {
          if (emailInput) {
            return true;
          } else {
            console.log("You need to enter an email to continue!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "officeNumber",
        message: "Enter their office number",
        validate: (emailInput) => {
          if (emailInput) {
            return true;
          } else {
            console.log("You need to enter an email to continue!");
            return false;
          }
        },
      },
    ])
    .then((data) => {
      const manager = new Manager(
        data.name,
        data.id,
        data.email,
        data.officeNumber
      );
      teamArr.push(manager);
    });
};
const promptUser = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the employee name?",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("You need to enter a name to continue!");
            return false;
          }
        },
      },
      {
        type: "list",
        name: "role",
        message: "What is this their role? (Choose the correct option)",
        choices: ["Engineer", "Intern"],
        validate: (roleInput) => {
          if (roleInput) {
            return true;
          } else {
            console.log("You need to select a role to continue!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "id",
        message: "Enter their employee ID",
        validate: (idInput) => {
          if (idInput) {
            return true;
          } else {
            console.log("You need to enter an ID to continue!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "email",
        message: "Enter their email address",
        validate: (emailInput) => {
          if (emailInput) {
            return true;
          } else {
            console.log("You need to enter an email to continue!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "github",
        message: "Enter their GitHub username",
        when: (data) => data.role === "Engineer",
        validate: (githubInput) => {
          if (githubInput) {
            return true;
          } else {
            console.log("You need to enter a gitHub username to continue!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "school",
        message: "Enter their school",
        when: (data) => data.role === "Intern",
        validate: (schoolInput) => {
          if (schoolInput) {
            return true;
          } else {
            console.log("You need to enter a school to continue!");
            return false;
          }
        },
      },
      {
        type: "confirm",
        name: "anotherUser",
        message: "Would you like to add another employee?",
      },
    ])
    .then((data) => {
      let employee;
      if (data.role === "Engineer") {
        employee = new Engineer(data.name, data.id, data.email, data.github);
      } else if (data.role === "Intern") {
        employee = new Intern(data.name, data.id, data.email, data.school);
      }
      teamArr.push(employee);
      if (data.anotherUser) {
        return promptUser();
      } else {
        console.log(teamArr);
        return teamArr;
      }
    });
};
const generateManager = (manager) => {
  return `
  <div class="card" style="width: 18rem">
    <div class="card-body cardHeader">
      <h5 class="card-title">${manager.name}</h5>
      <p class="card-text"><i class="fas fa-mug-hot"></i>Manager</p>
    </div>
    <div class="cardBody">
      <ul class="list-group list-group-flush employeeInfo">
        <li class="list-group-item">${manager.id}</li>
        <li class="list-group-item"><a href="mailto:${manager.email}">${manager.email}</a></li>
        <li class="list-group-item">${manager.officeNumber}</li>
      </ul>
    </div>
  </div>`;
};
const generateEngineer = (employee) => {
    return `
    <div class="card" style="width: 18rem">
      <div class="card-body cardHeader">
        <h5 class="card-title">${employee.name}</h5>
        <p class="card-text"><i class="fas fa-glasses"></i>Engineer</p>
      </div>
      <div class="cardBody">
        <ul class="list-group list-group-flush employeeInfo">
          <li class="list-group-item">${employee.id}</li>
          <li class="list-group-item"><a href="mailto:${employee.email}">${employee.email}</a></li>
          <li class="list-group-item"><a href="github.com/${employee.github}">${employee.github}</a></li>
        </ul>
      </div>
    </div>`;
};
const generateIntern = (employee) => {
    return `
    <div class="card" style="width: 18rem">
      <div class="card-body cardHeader">
        <h5 class="card-title">${employee.name}</h5>
        <p class="card-text"><i class="fas fa-user-graduate"></i>Intern</p>
      </div>
      <div class="cardBody">
        <ul class="list-group list-group-flush employeeInfo">
          <li class="list-group-item">${employee.id}</li>
          <li class="list-group-item"><a href="mailto:${employee.email}">${employee.email}</a></li>
          <li class="list-group-item">${employee.school}</li>
        </ul>
      </div>
    </div>`;
};
const generateCards = (data) =>{
    data.forEach((employee)=>{
      let role = employee.getRole()
      if(role ==="Manager"){
          const managerCard = generateManager(employee);
          cardArr.push(managerCard);
      }
      if(role ==="Engineer"){
          const engineerCard = generateEngineer(employee);
          cardArr.push(engineerCard);
      }
      if(role === "Intern"){
          const internCard = generateIntern(employee);
          cardArr.push(internCard);
      }
    })
    let cardStr = cardArr.join("");
    const renderPage = renderHTML(cardStr);
    return renderPage
};
const renderHTML = (cardData) => {
 return `
 <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
          integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
          crossorigin="anonymous"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossorigin="anonymous"
        />
        <link rel="stylesheet" href="./css/style.css" />
        <title>Team Profile Page</title>
      </head>
      <header class="red">My Team</header>
      <main>
      ${cardData}
      </main>
      <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
      crossorigin="anonymous"
    ></script>
  </body>
</html>
`
};

module.exports = {
    promptManager,
    promptUser,
    generateCards,
    teamArr
}