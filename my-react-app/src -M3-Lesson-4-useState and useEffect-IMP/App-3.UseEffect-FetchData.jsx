import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      console.log(response);
      if (!response.ok) throw new Error("Network response was not ok");
      const datax = await response.json();
      console.log(datax);
      setData(datax);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  //fetchData();
  //Runs infinitely if we call fetchData() directly inside your component:
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h2>Fetched Data</h2>
      <ul>
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
