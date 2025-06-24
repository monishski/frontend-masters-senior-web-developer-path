# Complete Intro to React v9 - Brian Holt

**React** is the universal interface for React and then the rendering layer underneath it that's specific to the browser is called **React-DOM**

- Linting is much more semantics/syntax and content focused (enforcing opinions on someone)
- Prettier is just formatting and new lines, it doesn't enforce anything about the code - it just ensures that all white space ends up in the right place

Vite is not the bundler. Its Roll Up.

> Dont optimise for the couple of hours you are going to spend writing for something (even its long), but the hundreds of hours it'll save in maintaining it

**Error boundaries** can only be implemented with _class components_

- Remember with class components when you are defining custom handlers, you have to go 'bind' the methods with 'this' in the constructor

```jsx
class CustomComponent extends Component {
  constructor() {
    this.handler = this.handler.bind(this);
  }

  componentDidMount() {}

  handler() {}
}
```

- Alternatively, you can use arrow functions. This is because they have a different context setting methodology. They are **lexical** (i.e. the context is set where it is written, not where it is called, while in functions like `componentDidMount`, the context is set where its **invoked**, not where it is created).

**Uncontrolled forms** is where you allow the browser handle all the state for you and listen only to the submit events (**Controlled forms** is where we manage the states internally)
