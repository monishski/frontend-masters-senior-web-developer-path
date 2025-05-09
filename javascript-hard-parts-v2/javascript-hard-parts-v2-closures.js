/* 
CHALLENGE 1

Create a function createFunction that creates and returns a function. When that created function is called, it should print "hello". When you think you completed createFunction, un-comment out those lines in the code and run it to see if it works.
*/
function createFunction() {
  // You didn't need to label the function
  return function printHello() {
    console.log("hello");
  };
}

// /*** Uncomment these to check your work! ***/
const function1 = createFunction();
function1(); // => should console.log('hello');

/*
CHALLENGE 2

Create a function createFunctionPrinter that accepts one input and returns a function. When that created function is called, it should print out the input that was used when the function was created. 
*/
function createFunctionPrinter(input) {
  // You could have created a labelled function e.g function printer() { console.log(input); } and then returned printer
  return function () {
    console.log(input);
  };
}

// /*** Uncomment these to check your work! ***/
const printSample = createFunctionPrinter("sample");
printSample(); // => should console.log('sample');
const printHello = createFunctionPrinter("hello");
printHello(); // => should console.log('hello');

/* 
CHALLENGE 3

Examine the code for the outer function. Notice that we are returning a function and that function is using variables that are outside of its scope.
Uncomment those lines of code. Try to deduce the output before executing. Now we are going to create a function addByX that returns a function that will add an input by x. 
*/
function outer() {
  let counter = 0; // this variable is outside incrementCounter's scope
  function incrementCounter() {
    counter++;
    console.log("counter", counter);
  }
  return incrementCounter;
}

const willCounter = outer();
const jasCounter = outer();

// Uncomment each of these lines one by one.
// Before your do, guess what will be logged from each function call.

// /*** Uncomment these to check your work! ***/
willCounter();
willCounter();
willCounter();

jasCounter();
willCounter();

function addByX(x) {
  function add(y) {
    // console.log('total', y + x);
    return y + x;
  }
  return add;
}

// /*** Uncomment these to check your work! ***/
const addByTwo = addByX(2);
addByTwo(1); // => should return 3
addByTwo(2); // => should return 4
addByTwo(3); // => should return 5

const addByThree = addByX(3);
addByThree(1); // => should return 4
addByThree(2); // => should return 5

const addByFour = addByX(4);
addByFour(4); // => should return 8
addByFour(5); // => should return 9

/*
CHALLENGE 4

Write a function once that accepts a callback as input and returns a function. When the returned function is called the first time, it should call the callback and return that output. If it is called any additional times, instead of calling the callback again it will simply return the output value from the first time it was called. 
*/
function once(func) {
  let counter = 0;
  let result = 0;
  return function (x) {
    if (counter > 0) return result;
    result = func(x);
    counter++;
    return result;
  };
}

// Solution is similar but only stores 'result'
// function once(func) {
// 	let output;
//   function callOnce(x) {
//     if(output > 0){
//       return output;
//     } else {
//       output = func(x)
//       return output;
//     }
//   }
//   return callOnce;
// }

// /*** Uncomment these to check your work! ***/
const onceFunc = once(addByTwo);
console.log(onceFunc(4)); // => should log 6
console.log(onceFunc(10)); // => should log 6
console.log(onceFunc(9001)); // => should log 6

/*
Challenge 5

Write a function after that takes the number of times the callback needs to be called before being executed as the first parameter and the callback as the second parameter. 
*/
function after(count, func) {
  let counter = 0;
  return function () {
    counter++;
    if (counter < count) return;
    func();
  };
}

// /*** Uncomment these to check your work! ***/
const called = function () {
  console.log("hello");
};
const afterCalled = after(3, called);
afterCalled(); // => nothing is printed
afterCalled(); // => nothing is printed
afterCalled(); // => 'hello' is printed

/*
Challenge 6

Write a function delay that accepts a callback as the first parameter and the wait in milliseconds before allowing the callback to be invoked as the second parameter. Any additional arguments after wait are provided to func when it is invoked. HINT: research setTimeout(); 
*/
function delay(func, wait) {
  return function (...params) {
    setTimeout(fun(...params), wait);
  };
}

// Solution:
function _delay(func, wait, ...params) {
  setTimeout(() => {
    func(...params);
  }, wait);
}

// Testing Challenge 6 (tests were not included in the exercise for this challenge)
const cb = function (...params) {
  console.log("called!", ...params);
};
// _delay(cb, 1000); // "called!" printed after 1000 ms
// _delay(cb, 2000, "param1", "param2"); // "called! param1 param2" printed after 2000 ms

/*
Challenge 7

Write a function rollCall that accepts an array of names and returns a function. The first time the returned function is invoked, it should log the first name to the console. The second time it is invoked, it should log the second name to the console, and so on, until all names have been called. Once all names have been called, it should log 'Everyone accounted for'. 
*/
function rollCall(names) {
  let index = 0;
  return function () {
    const name = names[index];
    index++;
    if (name) {
      console.log(name);
      return;
    }
    console.log("Everyone accounted for");
  };
}

// /*** Uncomment these to check your work! ***/
const rollCaller = rollCall(["Victoria", "Juan", "Ruth"]);
rollCaller(); // => should log 'Victoria'
rollCaller(); // => should log 'Juan'
rollCaller(); // => should log 'Ruth'
rollCaller(); // => should log 'Everyone accounted for'

// Solution:
function _rollCall(names) {
  let roll = names;
  function caller() {
    if (roll.length > 0) {
      console.log(roll.shift());
    } else {
      console.log("Everyone accounted for");
    }
  }

  return caller;
}

/* 
Challenge 8

Create a function saveOutput that accepts a function (that will accept one argument), and a string (that will act as a password). saveOutput will then return a function that behaves exactly like the passed-in function, except for when the password string is passed in as an argument. When this happens, the returned function will return an object with all previously passed-in arguments as keys, and the corresponding outputs as values. 
*/
function saveOutput(func, magicWord) {
  const store = {};
  return function (arg) {
    if (arg === magicWord) return store;
    const result = func(arg);
    store[arg] = result;
    return result;
  };
}

// /*** Uncomment these to check your work! ***/
const multiplyBy2 = function (num) {
  return num * 2;
};
const multBy2AndLog = saveOutput(multiplyBy2, "boo");
console.log(multBy2AndLog(2)); // => should log 4
console.log(multBy2AndLog(9)); // => should log 18
console.log(multBy2AndLog("boo")); // => should log { 2: 4, 9: 18 }

/*
Challenge 9

Create a function cycleIterator that accepts an array, and returns a function. The returned function will accept zero arguments. When first invoked, the returned function will return the first element of the array. When invoked a second time, the returned function will return the second element of the array, and so forth. After returning the last element of the array, the next invocation will return the first element of the array again, and continue on with the second after that, and so forth. 
*/
function cycleIterator(array) {
  let counter = 0;
  return function () {
    const elem = array[counter % array.length];
    counter++;
    return elem;
  };
}

// /*** Uncomment these to check your work! ***/
const threeDayWeekend = ["Fri", "Sat", "Sun"];
const getDay = cycleIterator(threeDayWeekend);
console.log(getDay()); // => should log 'Fri'
console.log(getDay()); // => should log 'Sat'
console.log(getDay()); // => should log 'Sun'
console.log(getDay()); // => should log 'Fri'

/*
Challenge 10

Create a function defineFirstArg that accepts a function and an argument. Also, the function being passed in will accept at least one argument. defineFirstArg will return a new function that invokes the passed-in function with the passed-in argument as the passed-in function's first argument. Additional arguments needed by the passed-in function will need to be passed into the returned function.
*/
function defineFirstArg(func, arg) {
  return function (...args) {
    return func(arg, ...args);
  };
}

/*** Uncomment these to check your work! ***/
const subtract = function (big, small) {
  return big - small;
};
const subFrom20 = defineFirstArg(subtract, 20);
console.log(subFrom20(5)); // => should log 15

/*
Challenge 11

Create a function dateStamp that accepts a function and returns a function. The returned function will accept however many arguments the passed-in function accepts, and return an object with a date key that contains a timestamp with the time of invocation, and an output key that contains the result from invoking the passed-in function. HINT: You may need to research how to access information on Date objects. 
*/
function dateStamp(func) {
  return function (...args) {
    const output = func(...args);
    return { date: new Date().toDateString(), output };
  };
}

// /*** Uncomment these to check your work! ***/
const stampedMultBy2 = dateStamp((n) => n * 2);
console.log(stampedMultBy2(4)); // => should log { date: (today's date), output: 8 }
console.log(stampedMultBy2(6)); // => should log { date: (today's date), output: 12 }

/*
Challenge 12

Create a function censor that accepts no arguments. censor will return a function that will accept either two strings, or one string. When two strings are given, the returned function will hold onto the two strings as a pair, for future use. When one string is given, the returned function will return the same string, except all instances of first strings (of saved pairs) will be replaced with their corresponding second strings (of those saved pairs). 
*/
function censor() {
  const store = {};
  return function (string1, string2) {
    if (string2) {
      store[string1] = string2;
      return;
    }

    const storeKeys = Object.keys(store);

    let string = "";
    storeKeys.map((key) => {
      string = string1.replace(key, store[key]);
    });

    return string;
  };
}

// /*** Uncomment these to check your work! ***/
const changeScene = censor();
changeScene("dogs", "cats");
changeScene("quick", "slow");
console.log(changeScene("The quick, brown fox jumps over the lazy dogs.")); // => should log 'The slow, brown fox jumps over the lazy cats.'

/*
Challenge 13

There's no such thing as private properties on a JavaScript object! But, maybe there are? Implement a function createSecretHolder(secret) which accepts any value as secret and returns an object with ONLY two methods. getSecret() which returns the secret setSecret() which sets the secret 
*/
function createSecretHolder(secret) {
  let _secret = secret;
  return {
    getSecret: function () {
      console.log(_secret);
      return _secret;
    },
    setSecret: function (newSecret) {
      _secret = newSecret;
    },
  };
}

// /*** Uncomment these to check your work! ***/
const obj = createSecretHolder(5);
obj.getSecret(); // => returns 5
obj.setSecret(2);
obj.getSecret(); // => returns 2

/*
Challenge 14

Write a function, callTimes, that returns a new function. The new function should return the number of times it’s been called. 
*/
function callTimes() {
  let counter = 0;
  return function () {
    counter++;
    console.log(counter);
    return counter;
  };
}

// /*** Uncomment these to check your work! ***/
let myNewFunc1 = callTimes();
let myNewFunc2 = callTimes();
myNewFunc1(); // => 1
myNewFunc1(); // => 2
myNewFunc2(); // => 1
myNewFunc2(); // => 2

/*
Challenge 15

Create a function roulette that accepts a number (let us call it n), and returns a function. The returned function will take no arguments, and will return the string 'spin' the first n - 1 number of times it is invoked. On the very next invocation (the nth invocation), the returned function will return the string 'win'. On every invocation after that, the returned function returns the string 'pick a number to play again'. 
*/
function roulette(n) {
  let counter = 0;
  return function () {
    counter++;
    if (counter < n) return "spin";
    else if (counter === n) return "win";
    return "pick a number to play again";
  };
}

// /*** Uncomment these to check your work! ***/
const play = roulette(3);
console.log(play()); // => should log 'spin'
console.log(play()); // => should log 'spin'
console.log(play()); // => should log 'win'
console.log(play()); // => should log 'pick a number to play again'
console.log(play()); // => should log 'pick a number to play again'

// CHALLENGE 16
function average() {
  let counter = 0;
  let sum = 0;
  return function (n) {
    if (n === undefined) {
      if (counter === 0) return 0;
      return sum / counter;
    }
    sum += n;
    counter++;
    return sum / counter;
  };
}

// Solution uses arrays:
function _average() {
  let numbers = [];
  return function (num) {
    if (num) {
      numbers.push(num);
    }

    let avg = 0;
    if (numbers.length) {
      avg = numbers.reduce((acc, curr) => acc + curr, 0) / numbers.length;
    }
    return avg;
  };
}

// /*** Uncomment these to check your work! ***/
const avgSoFar = average();
console.log(avgSoFar()); // => should log 0
console.log(avgSoFar(4)); // => should log 4
console.log(avgSoFar(8)); // => should log 6
console.log(avgSoFar()); // => should log 6
console.log(avgSoFar(12)); // => should log 8
console.log(avgSoFar()); // => should log 8

/*
Challenge 17

Create a function makeFuncTester that accepts an array (of two-element sub-arrays), and returns a function (that will accept a callback). The returned function should return true if the first elements (of each sub-array) being passed into the callback all yield the corresponding second elements (of the same sub-array). Otherwise, the returned function should return false. 
*/
function makeFuncTester(arrOfTests) {
  return function (cb) {
    let isValid = true;
    for (let i = 0; i < arrOfTests.length; i++) {
      const [elem0, elem1] = arrOfTests[i];
      if (cb(elem0) !== elem1) {
        isValid = false;
        break;
      }
    }
    return isValid;
  };
}

// /*** Uncomment these to check your work! ***/
const capLastTestCases = [];
capLastTestCases.push(["hello", "hellO"]);
capLastTestCases.push(["goodbye", "goodbyE"]);
capLastTestCases.push(["howdy", "howdY"]);
const shouldCapitalizeLast = makeFuncTester(capLastTestCases);
const capLastAttempt1 = (str) => str.toUpperCase();
const capLastAttempt2 = (str) => str.slice(0, -1) + str.slice(-1).toUpperCase();
console.log(shouldCapitalizeLast(capLastAttempt1)); // => should log false
console.log(shouldCapitalizeLast(capLastAttempt2)); // => should log true

/*
Challenge 18

Create a function makeHistory that accepts a number (which will serve as a limit), and returns a function (that will accept a string). The returned function will save a history of the most recent "limit" number of strings passed into the returned function (one per invocation only). Every time a string is passed into the function, the function should return that same string with the word 'done' after it (separated by a space). However, if the string 'undo' is passed into the function, then the function should delete the last action saved in the history, and return that deleted string with the word 'undone' after (separated by a space). If 'undo' is passed into the function and the function's history is empty, then the function should return the string 'nothing to undo'. 
*/
function makeHistory(limit) {
  let history = [];
  return function (str) {
    if (str === "undo") {
      if (history.length === 0) return "nothing to undo";
      const elem = history.pop();
      return `${elem} undone`;
    }
    history.push(str);
    return `${str} done`;
  };
}

// /*** Uncomment these to check your work! ***/
const myActions = makeHistory(2);
console.log(myActions("jump")); // => should log 'jump done'
console.log(myActions("undo")); // => should log 'jump undone'
console.log(myActions("walk")); // => should log 'walk done'
console.log(myActions("code")); // => should log 'code done'
console.log(myActions("pose")); // => should log 'pose done'
console.log(myActions("undo")); // => should log 'pose undone'
console.log(myActions("undo")); // => should log 'code undone'
console.log(myActions("undo")); // => should log 'walk undone'
console.log(myActions("undo")); // => should log 'nothing to undo'

/*
Challenge 19

Inspect the commented out test cases carefully if you need help to understand these instructions.
Create a function blackjack that accepts an array (which will contain numbers ranging from 1 through 11), and returns a DEALER function. The DEALER function will take two arguments (both numbers), and then return yet ANOTHER function, which we will call the PLAYER function.

On the FIRST invocation of the PLAYER function, it will return the sum of the two numbers passed into the DEALER function.

On the SECOND invocation of the PLAYER function, it will return either:

    the first number in the array that was passed into blackjack PLUS the sum of the two numbers passed in as arguments into the DEALER function, IF that sum is 21 or below, OR
    the string 'bust' if that sum is over 21.


If it is 'bust', then every invocation of the PLAYER function AFTER THAT will return the string 'you are done!' (but unlike 'bust', the 'you are done!' output will NOT use a number in the array). If it is NOT 'bust', then the next invocation of the PLAYER function will return either:

    the most recent sum plus the next number in the array (a new sum) if that new sum is 21 or less, OR
    the string 'bust' if the new sum is over 21.


And again, if it is 'bust', then every subsequent invocation of the PLAYER function will return the string 'you are done!'. Otherwise, it can continue on to give the next sum with the next number in the array, and so forth.

You may assume that the given array is long enough to give a 'bust' before running out of numbers.

BONUS: Implement blackjack so the DEALER function can return more PLAYER functions that will each continue to take the next number in the array after the previous PLAYER function left off. You will just need to make sure the array has enough numbers for all the PLAYER functions.
*/
function blackjack(array) {
  let counter = 0;
  function dealer(n1, n2) {
    let sum = 0;
    function player() {
      if (sum === 0) {
        sum += n1 + n2;
        return sum;
      }
      if (sum <= 21) {
        sum += array[counter];
        counter++;
        if (sum > 21) {
          return "bust";
        }
        return sum;
      }
      return "you are done!";
    }
    return player;
  }
  return dealer;
}

// /*** Uncomment these to check your work! ***/

// /*** DEALER ***/
const deal = blackjack([
  2, 6, 1, 7, 11, 4, 6, 3, 9, 8, 9, 3, 10, 4, 5, 3, 7, 4, 9, 6, 10, 11,
]);

// /*** PLAYER 1 ***/
const i_like_to_live_dangerously = deal(4, 5);
console.log(i_like_to_live_dangerously()); // => should log 9
console.log(i_like_to_live_dangerously()); // => should log 11
console.log(i_like_to_live_dangerously()); // => should log 17
console.log(i_like_to_live_dangerously()); // => should log 18
console.log(i_like_to_live_dangerously()); // => should log 'bust'
console.log(i_like_to_live_dangerously()); // => should log 'you are done!'
console.log(i_like_to_live_dangerously()); // => should log 'you are done!'

// /*** BELOW LINES ARE FOR THE BONUS ***/

// /*** PLAYER 2 ***/
const i_TOO_like_to_live_dangerously = deal(2, 2);
console.log(i_TOO_like_to_live_dangerously()); // => should log 4
console.log(i_TOO_like_to_live_dangerously()); // => should log 15
console.log(i_TOO_like_to_live_dangerously()); // => should log 19
console.log(i_TOO_like_to_live_dangerously()); // => should log 'bust'
console.log(i_TOO_like_to_live_dangerously()); // => should log 'you are done!
console.log(i_TOO_like_to_live_dangerously()); // => should log 'you are done!

// /*** PLAYER 3 ***/
const i_ALSO_like_to_live_dangerously = deal(3, 7);
console.log(i_ALSO_like_to_live_dangerously()); // => should log 10
console.log(i_ALSO_like_to_live_dangerously()); // => should log 13
console.log(i_ALSO_like_to_live_dangerously()); // => should log 'bust'
console.log(i_ALSO_like_to_live_dangerously()); // => should log 'you are done!
console.log(i_ALSO_like_to_live_dangerously()); // => should log 'you are done!
