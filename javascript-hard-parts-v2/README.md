# JavaScript the Hard Parts v2 - Will Sentance

- Callbacks
- Higher order functions
- Closure
- Classes/Prototypes
- Asynchronicity

---

When JS code runs, it:

- Goes through the code line-by-line and runs/'executes' each line - known as the **thread of execution**
- Saves 'data' like strings/arrays so we can use that data later - in its **memory** (we can even save code AKA functions)

```
...
// This a FUNCTION CALL
// We can only store VALUES in memory, not COMMANDS as in here
const output = multiplyBy2(num)
...
```

**Functions**
Code we save ('define') functions & can use (call/invoke/execute/run) later with the function's name & ()

NOTE: the argument is the value while parameter is the label assigned to the value

**Execution context**
Create to run the code of a function - has 2 parts (we've already seen them!)

- Thread of execution
- Memory

JS has 1 execution thread as a result it can only do 1 thing at a time

**Call stack**

- JS keep tracks of what function is currently running (where's the thread of execution)
- Run a function - add to call stack
- Finish running the function - JS removes it from call stack
- Whatever is top of the call stack - that's the function we're currently running

**Generalised functions (or functions)**

- Functions obeys the DRY principle
- 'Parameters' (placeholders) mean we don't need to decide what data to run our functionality on until we run the function
  - THEN, provide an actual value ('argument') when we run the function
- Higher order functions (HOF) follow this same principle
  - We may not want to decide exactly what some of our functionality IS until we run our function

HOF takes in a function or passes out a function

```js
function copyArrayAndManipulate(array, instructions) {
  const output = [];
  // NOTE: the for loop does NOT get its own execution stack
  // It is however reserved its own namespace
  for (let i = 0; i < array.length; i++) {
    output.push(instructions(array[i]));
  }
  return output;
}

function multiplyBy2(input) {
  return input * 2;
}
const result = copyArrayAndManipulate([1, 2, 3], multiplyBy2);
```

Functions are **first class objects** in JS:

They can co-exist with and can be treated like any other JS object:

- Assigned to variables and properties of other objects
- Passed as arguments into functions
- Returned as values from functions (AKA **CLOSURE**)

**Callbacks** and HOF simplify our code and keep it DRY

- **Declarative readable code:** Map, filter, reduce - the most readable way to write code to work with data
- **Asynchronous JS**: Callbacks are a core aspect of async JS, and are under-the-hood of promises, async/await

Arrow functions are a shorthand way to save function - they are more **legible** but not necessarily more **readable**

**Anonymous and arrow functions:**

- Improve immediate legibility of the code
- But at least for our process here they are 'synthatic sugar'
- Understanding how they're working under-the-hood is vital to avoid confusion

---

**Closure** - Scope & Execution Context

- Enables powerful pro-level function like 'once' (they will only run once, i.e. they will remember that they've run before) and 'memoize' (performance optimizer, not repeat calculations)
- Many JS design patterns including the module pattern use closure
- Build iterators, handle partial application and maintain state in an async world

**Functions with memories**

- When our functions get called, we create a live store of data (local memory) for that function's execution context
- When the function finishes executing, its local memory is deleted (except the returned value)
- But what if our functions could hold on to live data between executions
- This would let out function definitions have an associated cache/persistent memory
- But it all stars with us **returning a function from another function**

```js
function createFunction() {
  function multipleBy2(num) {
    return num * 2;
  }
  return multipleBy2;
}

const generatedFunc = createFunction(); // generatedFunc is the result of createFunction(), so multipleBy2
const result = generatedFunc(3);
```

```js
function outer() {
  let counter = 0;
  function incrementCounter() {
    counter++;
  }
  incrementCounter();
}
outer();
```

Here another variation of the above:

```js
function outer() {
  let marksCounter = 0;
  let counter = 0;
  function incrementCounter() {
    count++;
  }
  return incrementCounter;
  // The backpack (or 'closure') of live data is attached `incrementCounter` (then to `myNewFunction`) through a hidden property know as [[scope]] which persis when the inner function is returned out
  // Note that additional properties that are referenced in incrementCounter will not get transferred over (otherwise we'd have a memory leak)
}

const myNewFunction = outer();
myNewFunction();
myNewFunction();
```

**What can we call the 'backpack' of data we attach to the returning function?**

- Closed over Variable Environment (COVE)
- Persistent Lexical/Static Scoped Referenced Data (P.L.S.R.D)
- 'Backpack'
- Closure

Lets run `outer` again

```js
const anotherFunction = outer();
anotherFunction();
anotherFunction();
```

If we were to `console.log` this, we would see `1, 2, 1, 2` as `anotherFunction` gets its own 'backpack' (as a new `incrementCounter` function was created in a new execution context)

**Closures give our functions persistent memories and entirely new toolkit for writing code**

- **Helper functions:** everyday helper functions like 'once' (immutable) and 'memoize' (cache, efficient)
- **Iterators and generators:** which use lexical scoping and closure to achieve the most contemporary patterns for handling data in JS
- **Module pattern:** preserve state for the life an application without polluting the global namespace
- **Async JS:** callbacks and promises rely on closure to persist state in an async environment

---

**Promises, Async JS & the Event Loop**

- **Asynchronicity** - the feature that makes web applications dynamic
- **Event loop** - JS triage
- **Microtask queue, callback queue** and **web browser feature (API)**

**Asynchronicity** is the backbone of modern web development in JS yet...

- JS is single threaded (one command runs at a time)
- Synchronously executed (each line is run in order the code appears)

JS is not enough - we need new pieces which are not JS at all. Our core JS engine has 3 main parts:

- Thread of execution
- Memory/variable environment
- Call stack

We need to add some new components:

- Web browser API/Node background API
- Promises
- Event loop, callback/task queue and micro task queue

The browser is much more than just JS. The browser has:

- console -> console
- sockets
- network requests -> fetch/xhr
- HTML DOM (Document Object Model) -> document
- timer -> setTimeout
  The labels (RHS) are wrappers that allows us to interact with these browser features

The **event loop** is constantly checking if the **call stack** is empty so that anything in the **callback queue** (i.e. callbacks using the browser API) can be moved over to the call stack

**ES5 Web Browser APIs with callback functions:**

- Problems:
  - Our response data is only available in the callback function - callback hell
  - Maybe it feels a little odd to think of passing a function into another function only for it to run much later
- Benefits:
  - Super explicit once you understand how it works under-the-hood

---

**ES6+ Solution (Promises):**

Using two-pronged 'facade' functions that both:

- Initiate background web browser work and
- Return a placeholder object (promise) immediately in JS

```js
function display(data) {
	console.log(data)
}

// While the fetch happens, it creates an object { value, onfulfilled: [] } AKA promise
const futureData = fetch(...);

futureData.then(display);

console.log('Me first')
```

The **then** method and functionality to call on completion

- Any code we want to run on the returned data must also be saved on the promise object
- Added using then method to the hidden property 'onfulfilment'
- Promise objects will automatically trigger the attached function to run (with its inputs as the returned data)

```js
// We need to know how our promisees-deferred functionality get back into JS to be run
function display(data) {
	console.log(data);
}

function printHello() {
	console.log('Hello');
}

function blockFor300ms() {
	/* Blocks thread for 300ms */
}

setTimeout(printHello, 0);

const futureData = fetch(...); //Assume it returns string 'Hi'
futureData.then(display);

blockFor300ms();
console.log('Me first!');
```

> Note that there are 2 queues, `task queue` (this is where `setTimeout/printHello` ends up) and `micro-task queue`(this is where `display` ends up i.e. two-pronged facade functions). The functions `micro-task queue` are moved into the `call stack` before those in the `task queue`
>
> So the console looks like this:
>
> - 'Me first!'
> - 'Hi'
> - 'Hello'

We have rules for execution of our asynchronously delayed code:

- Hold promise-deferred functions in a `micro-task queue` and a callback function in `task queue` when the Web Browser Feature (API) finishes
- Add the function to the call stack (i.e. run the function) when
  - Call stack is empty & all global code run (have **event loop** check this condition)
- Prioritise tasks in the `micro-task queue` over those in the `callback queue`

**Promises**, **Web API**s, the **callback** and **micro-tasks queues** and **event loop** enable:

- **Non-blocking applications:** this means we don't have to wait in the single thread and dont block further code from running
- **However long it takes:** we cannot predict when our Browser features work will finish so we let JS handle automatically running the function on its completion
- **Web applications:** asynchronous JS is the backbone of the modern web - letting us build fast 'non-blocking' apps

---

**Classes and Prototyping - Object Oriented JS:**

- An enormously popular paradigm for structuring complex code;
- Prototype chain - the feature behind the scenes that enables emulation of OOP but is a compelling tool itself;
- Understanding the different between `__prototype__` and `prototype`
- The `new` and `class` keywords as tools to automate our object & method creation

Objects store functions with their associated data!

- This is the principle of encapsulation - and its going to transform how we can 'reason' about our code

```js
const user1 = {
  name: "Will",
  score: 3,
  increment: function () {
    user1.score++;
  },
};

user1.increment();
```

Note: we can create empty objects using `Object.create` (this gives us fine-grained control over our object's later on)

```js
const user3 = Object.create(null);
```

**Factory functions:**

```js
function userGenerator(name, score) {
  const newUser = {};
  newUser.name = name;
  newUser.score = score;
  newUser.increment = function () {
    newUser.score++;
  };
  return newUser;
}

const user1 = userCreator("Will", 3);
const user2 = userCreate("Tim", 5);
user1.increment();
```

Note the above works as it simple and easy to reason about, it comes with a problem:

- Each time we create a new user we have to make space in our computer memory for all our data and functions (even though the structure of our functions/methods are the same)

**Using the prototype chain:**

```js
function userGenerator(name, score) {
	const newUser = Object.create(userFunctionStore);
	newUser.name = name;
	newUser.score = score;
	return newUser;
}

const userFunctionStore = {
	increment: function() { this.score++; };
	login: function() { console.log('Logged in!'); }
}

const user1 = userCreator('Will', 3);
const user2 = userCreate('Tim', 5);
user1.increment();
// Note that increment() is accessible to us because to prototype chaning feature in JS
// It is appended to user1 via the __proto__ property

user1.hasOwnProperty('score')
// Note that user1, nor userFunctionStore (which is attached to user1 via JS prototype chaining feature) have it
// It actually comes from JS Object.prototype property has all objs in JS have it
```

```js
const userFunctionStore = {
	increment: function() {
		function add1() { this.score++; }

		add1()
	};
}
```

Note that this doesnt work as you'd expect because **this** here refers to 'global' object and in fact, it'll try increment the 'score' field globally. The solution to this is to manually use the '.call' or '.reply' methods e.g. `add1.call(this)` as they will do the binding of the **this** keyword correctly

```js
const userFunctionStore = {
	increment: function() {
		const add1 = () => { this.score++; };
		add1()
	};
}
```

For arrow functions, the **this** keyword assignment is lexically scoped. That is to say, the **this** keyword is determined by where the function was saved.

Introducing the **new** keyword that automates the hard-work. When we call the function that returns an object with the **new** keyword in front we automate 2 things:

1. Create a new user object
2. Return the new user object

```js
const user1 = new userCreator("Will", 3);
const user2 = new userCreator("Tim", 5);
```

But now we need to adjust how we write the body of the `userCreator` function. How can we

- Refer to the auto-created object?
- Know where to put our single copy of functions?

```js
function userGenerator(name, score) {
  this.name = name;
  this.score = score;
}

userCreator.prototype.increment = function () {
  this.score++;
};
userCreator.prototype.login = function () {
  console.log("login");
};

const user1 = new userCreator("Will", 3);

user1.increment();
```

---

**Interlude - functions are both objects and functions in JS**

```js
function multiplyBy2() {
  return num + 2;
}

multiplyBy2.stored = 5;
multiplyBy2(2);

multiplyBy2.stored; //5;
multiplyBy2.prototype; //{}
```

We could use the fact all functions have built-in default property `prototype` on their object version (itself an object) - to replace our `functionStore` object

---

The **class** syntactic sugar:

- We were writing our shared methods separately from our object 'constructor' itself (off in the `useCreator.prototype` object)

Other languages let us do that all in one place. ES2015 lets us to so too.

```js
class UserCreator {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }

  increment() {
    this.score++;
  }
  login() {
    console.log("login");
  }
}

const user1 = new UserCreator("Eva", 9);
user1.increment();
```
