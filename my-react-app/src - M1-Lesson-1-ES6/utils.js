// ES6 module export
export const add = (x, y) => x + y;

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