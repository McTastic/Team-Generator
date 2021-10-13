const {promptManager,promptUser,generateCards,teamArr} = require("./dist/renderhtml")
const fs = require("fs")

const init = () => {
    promptManager()
      .then(promptUser)
      .then(() => fs.writeFileSync("index.html", generateCards(teamArr)))
      .then(() => console.log("Successfully wrote to index.html"))
      .catch((err) => console.error(err));
  };
  
  init();