import { useEffect, useState } from "react";
import "./JavaScriptConcepts.css";

function JavaScriptConcepts() {
  const [products, setProducts] = useState([]);

  // Logical OR and AND
  function getName(name) {
    return name;
  }

  const a = true;
  const b = false;

  // If first value is true, second value is not executed
  const logicalOr1 = a || getName("Naressh Gudimetla");
  // If first value is false, second value is executed
  const logicalOr2 = b || getName("Naressh Gudimetla");

  // If first value is true, second value is executed
  const logicalAnd1 = a && getName("Naressh Gudimetla");
  // If first value is false, second value is not executed
  const logicalAnd2 = b && getName("Naressh Gudimetla");

  // Template Literals
  const name1 = "John";
  const name2 = "Doe";

  // Ternary Operator
  const showRecipeOne = true;

  // Object Destructuring
  const id = 1;
  const productName = "Apple Watch";
  const rating = 5;

  const product = {
    id,
    productName,
    rating,
  };

  const product2 = {
    description: "Product 2 description",
    id,
    productName,
    rating,
  };

  const { description } = product2;

  // Array Destructuring
  const array = [1, 2, 3, 4];

  const [first, second, third, fourth] = array;

  // Default Parameters
  function multiply(num1 = 1, num2 = 2) {
    return num1 * num2;
  }

  // Spread Operator
  const array2 = [2, 3, 4];
  const array3 = [10, 11, 12];

  const mergedArray = [999, ...array2, 90, ...array3, 10000];

  // Rest Operator
  function getInfo(a, ...c) {
    return { firstValue: a, restValues: c };
  }

  const info = getInfo(1, 2, 3, 4, 5, 6);

  // Array Methods
  const personsArray = [
    {
      name: "Person 1",
      age: 30,
      country: "USA",
    },
    {
      name: "Person 2",
      age: 40,
      country: "RUSSIA",
    },
    {
      name: "Person 3",
      age: 50,
      country: "INDIA",
    },
  ];

  const names = personsArray.map(
    (person) => `${person.name} age is ${person.age}`,
  );

  const usaPerson = personsArray.find((person) => person.country === "USA");

  const usaPersons = personsArray.filter((person) => person.country === "USA");

  const someExample = personsArray.some((person) => person.age > 40);

  const everyExample = personsArray.every((person) => person.age > 25);

  const fruits = ["apple", "banana", "orange"];

  const includesResult = fruits.includes("apple");
  const indexResult = fruits.indexOf("banana");

  const findIndexResult = personsArray.findIndex(
    (person) => person.country === "RUSSIA",
  );

  // Fetch API
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("https://dummyjson.com/products");

        const result = await response.json();

        setProducts(result.products);
      } catch (error) {
        console.log(error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="container">
      <h1>JavaScript Concepts Before React</h1>

      <div className="card">
        <h2>Logical OR (||)</h2>
        <p>{String(logicalOr1)}</p>
        <p>{logicalOr2}</p>
      </div>

      <div className="card">
        <h2>Logical AND (&&)</h2>
        <p>{logicalAnd1}</p>
        <p>{String(logicalAnd2)}</p>
      </div>

      <div className="card">
        <h2>Template Literals</h2>
        <p>{`${name1} ${name2}`}</p>
      </div>

      <div className="card">
        <h2>Ternary Operator</h2>
        <p>{showRecipeOne ? "Pizza" : "Coke"}</p>
      </div>

      <div className="card">
        <h2>Object Destructuring</h2>
        <pre>{JSON.stringify(product, null, 2)}</pre>
        <p>{description}</p>
      </div>

      <div className="card">
        <h2>Array Destructuring</h2>
        <p>
          {first}, {second}, {third}, {fourth}
        </p>
      </div>

      <div className="card">
        <h2>Default Parameters</h2>
        <p>{multiply(10)}</p>
      </div>

      <div className="card">
        <h2>Spread Operator</h2>
        <p>{mergedArray.join(", ")}</p>
      </div>

      <div className="card">
        <h2>Rest Operator</h2>
        <p>First Value: {info.firstValue}</p>
        <p>Rest Values: {info.restValues.join(", ")}</p>
      </div>

      <div className="card">
        <h2>Array Methods</h2>

        <p>
          <strong>Map:</strong>
        </p>
        {names.map((name, index) => (
          <p key={index}>{name}</p>
        ))}

        <p>
          <strong>Find:</strong> {usaPerson?.name}
        </p>

        <p>
          <strong>Filter:</strong> {usaPersons.length}
        </p>

        <p>
          <strong>Some:</strong> {String(someExample)}
        </p>

        <p>
          <strong>Every:</strong> {String(everyExample)}
        </p>

        <p>
          <strong>Includes:</strong> {String(includesResult)}
        </p>

        <p>
          <strong>IndexOf:</strong> {indexResult}
        </p>

        <p>
          <strong>FindIndex:</strong> {findIndexResult}
        </p>
      </div>

      <div className="card">
        <h2>Products from API</h2>

        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <h4>{product.title}</h4>
              <p>${product.price}</p>
              <p>⭐ {product.rating}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default JavaScriptConcepts;
