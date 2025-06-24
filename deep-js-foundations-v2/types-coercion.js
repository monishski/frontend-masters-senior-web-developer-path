// Solution for isValidName 😅
function isValidName(name) {
  if (typeof name === "string" && name.trim().length >= 3) return true;
  return false;
}

function hoursAttended(attended, length) {
  // Either parameter may only be a string or a number
  if (typeof attended !== "number" && typeof attended !== "string")
    return false;

  if (typeof length !== "number" && typeof length !== "string") return false;
  // Both parameters must be treated as numbers (NOTE: Number("") evalues to 0)
  if (typeof attended === "string" && attended.trim() === "") return false;
  if (typeof length === "string" && length.trim() === "") return false;
  if (Number.isNaN(Number(attended)) || Number.isNaN(Number(length)))
    return false;
  // Both numbers must be 0 or highe
  if (Number(attended) < 0 || Number(length) < 0) return false;
  // Both numbers must be whole numbers
  if (
    String(Number(attended)).includes(".") ||
    String(Number(length)).includes(".")
  )
    return false;
  // attended must be less than or equal to length
  return Number(attended) <= Number(length);
}

// Solution
function _hoursAttended(attended, length) {
  if (typeof attended === "string" && attended.trim() === "") {
    attended = Number(attended);
  }

  if (typeof length === "string" && length.trim() === "") {
    length = Number(length);
  }

  if (
    typeof attended === "number" &&
    typeof length === "number" &&
    attended > 0 &&
    length > 0 &&
    Number.isInteger(attended) &&
    Number.isInteger(length) &&
    attended <= length
  ) {
    return true;
  }

  return false;
}

// tests:
console.log("isValidName");
console.log(isValidName("Frank") === true);
console.log(isValidName(false) === false);
console.log(isValidName(null) === false);
console.log(isValidName(undefined) === false);
console.log(isValidName("") === false);
console.log(isValidName("  \t\n") === false);
console.log(isValidName("X") === false);

console.log("hoursAttended");
console.log(hoursAttended(6, 10));
console.log(hoursAttended(6, "10"));
console.log(hoursAttended("6", 10));
console.log(hoursAttended("6", "10"));
console.log(hoursAttended("", 6) === false);
console.log(hoursAttended(6, "") === false);
console.log(hoursAttended("", "") === false);
console.log(hoursAttended("foo", 6) === false);
console.log(hoursAttended(6, "foo") === false);
console.log(hoursAttended("foo", "bar") === false);
console.log(hoursAttended(null, null) === false);
console.log(hoursAttended(null, undefined) === false);
console.log(hoursAttended(undefined, null) === false);
console.log(hoursAttended(undefined, undefined) === false);
console.log(hoursAttended(false, false) === false);
console.log(hoursAttended(false, true) === false);
console.log(hoursAttended(true, false) === false);
console.log(hoursAttended(true, true) === false);
console.log(hoursAttended(10, 6) === false);
console.log(hoursAttended(10, "6") === false);
console.log(hoursAttended("10", 6) === false);
console.log(hoursAttended("10", "6") === false);
console.log(hoursAttended(6, 10.1) === false);
console.log(hoursAttended(6.1, 10) === false);
console.log(hoursAttended(6, "10.1") === false);
console.log(hoursAttended("6.1", 10) === false);
console.log(hoursAttended("6.1", "10.1") === false);
