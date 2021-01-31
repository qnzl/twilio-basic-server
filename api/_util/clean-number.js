module.exports = (number) => {
  number = number.trim()
  number = number.replace(/(\(|\)|\-|\+|\s)/g, '').trim()

  if (number.length > 0) {
    number = number.slice(-10)
  }

  return number
}
