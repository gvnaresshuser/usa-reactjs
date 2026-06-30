//util.js

//In this case, the value is returned automatically.
//This is an arrow function with an implicit return.ES6 module export
export const add = (x, y) => x + y; //import with {}

const minus = (x, y) => x - y;
export default minus; //import directly without {}

// Example class (ES6)
export class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello, ${this.name}`;
  }
}

/*
function add(x, y) {
  return x + y;
}

export { add };
//----------- OR -------------
const add = (x, y) => {
  return x + y;
};

export { add };
*/
