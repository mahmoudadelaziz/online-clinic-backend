const { randomInt } = require("crypto");

let start = "09:00"
let end = "16:00"

// console.log(faker.datatype.number({ min: 0, max: 500 }))
let x = randomInt(24).toString()+':'+"00"
let y = randomInt(24).toString()+':'+"00"

console.log(`${x} to ${y}`)

