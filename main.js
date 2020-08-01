const readline = require('readline')
.createInterface({
  input: process.stdin,
  output: process.stdout
});
const cities = require("zipcode-ja");

readline.question('Enter your zipCode.',(zipcode) => {
  let myAdress = cities[zipcode];
  console.log(myAdress);
})
