import { useState, useEffect } from "react";
import "./App.css";

function App() {
  console.log("APP");
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  function increment() {
    //setCount((count)=>count + 1);
    setCount(11);
    //setCount((prevCount) => prevCount + 1);
    console.log("Inside increment:" + count);
  }

  const fetchData = async () => {
    console.log("FETCH DATA");
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
      );
      console.log(response);
      if (!response.ok) throw new Error("Network response was not ok");
      const datax = await response.json();
      console.log(datax);
      setData(datax);
      console.log("SET DATA");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  //Runs infinitely if we call fetchData() directly inside your component:
  //fetchData();

/*   useEffect(() => {
    console.log("USE EFFECT");
    fetchData();
  }, []);
 */

  useEffect(() => {
    console.log("USE EFFECT");
    increment();
  }, [count]);

  return (
    <>
      <h2>Fetched Data</h2>
      <ul>
        {console.log("RENDERING")}
        {data.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
