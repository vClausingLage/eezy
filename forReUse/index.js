// const submit = (input) => {
//   return validator(input)
// }

// const validator = (input) => {
//   let output = Number.isNaN(input)
//   return output
// }

// let result = submit("string")

let input = 1000

const validator = input => {
  return input
}
const submit = validator => {
  console.log(input)
}


let result = submit(validator(input))