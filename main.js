const readline = require('readline'),
      cities = require("zipcode-ja"),
      stdio = readline.createInterface({
        input: process.stdin,
        output: process.stdout
});

stdio.question('Enter your zipCode.',(zipcode) => {
  let myAdress = cities[zipcode];
  console.log(myAdress);
});
