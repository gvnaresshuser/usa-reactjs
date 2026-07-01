import React,{useState} from 'react'

function App() {
    //let x = 10;
    const [x, setX] = useState(10);
    function test(){
        //x = 200;
        setX(x+1);
        console.log(x);
    }
  return (
    <>
        <div>{x}</div>
        <button onClick={test}>Click</button>
    </>
  )
}

export default App


