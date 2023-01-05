const n = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function specialExponent(n) {
  for (x in n) {
    console.log((-1)**x)
  }
}

specialExponent(n)