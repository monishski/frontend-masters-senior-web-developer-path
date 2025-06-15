if (!Object.is || true) {
  Object.is = function (x, y) {
    if (Number.isNaN(x) && Number.isNaN(y)) return true;
    if (x === 0 && y === 0) return 1 / x === 1 / y;
    return x === y;
  };
}

// Solution
function ObjectIs(x, y) {
  function isItNegZero(n) {
    // NOTE: -0 === 0
    return n === 0 && 1 / n === -Infinity;
  }

  function isItNaN(n) {
    // NOTE: NaN is the only value in JavaScript that is not equal to itself
    return n !== n;
  }

  var xNegZero = isItNegZero(x);
  var yNegZero = isItNegZero(y);

  if (xNegZero || yNegZero) return xNegZero && yNegZero;
  else if (isItNaN(x) && isItNaN(y)) return true;
  else if (x === y) return true;

  return false;
}

// tests:
console.log(Object.is(42, 42) === true);
console.log(Object.is("foo", "foo") === true);
console.log(Object.is(false, false) === true);
console.log(Object.is(null, null) === true);
console.log(Object.is(undefined, undefined) === true);
console.log(Object.is(NaN, NaN) === true);
console.log(Object.is(-0, -0) === true);
console.log(Object.is(0, 0) === true);

console.log(Object.is(-0, 0) === false);
console.log(Object.is(0, -0) === false);
console.log(Object.is(0, NaN) === false);
console.log(Object.is(NaN, 0) === false);
console.log(Object.is(42, "42") === false);
console.log(Object.is("42", 42) === false);
console.log(Object.is("foo", "bar") === false);
console.log(Object.is(false, true) === false);
console.log(Object.is(null, undefined) === false);
console.log(Object.is(undefined, null) === false);
