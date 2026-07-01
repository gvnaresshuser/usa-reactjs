import NavBar from "./NavBar";
import MainPage from "./MainPage";
import "./App.css";

function App() {
  //FUNCTIONAL COMPONENT
  //-----------------------------
  //javascript code - empty - var - let, const - ES6 features - jsx expression
  const x = 10;
  function myName() {
    return "GV Naressh";
  }
  function handleClick() {
    console.log("inside handleClick");
  }

  function handleClickWithArgs(a, b) {
    console.log("inside handleClickWithArgs : " + a, " " + b);
  }

  function handleClickTimeout() {
    console.log("inside handleClickTimeout");
  }
  function test() {
    const id = setTimeout(handleClickTimeout, 3000);
    console.log(id);
  }
  //-----------------------------
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          padding: "20px",
        }}
      >
        {" "}
        hello all 123 {x} {myName()}
      </div>
      {/* <NavBar />
      <MainPage /> */}
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          padding: "20px",
        }}
      >
        <button className="myButton" onClick={handleClick}>
          Click Me 1
        </button>
        <button className="myButton" onClick={() => handleClick()}>
          Click Me 2
        </button>
        {/* WILL NOT WORK */}
        {/* Because the function executes during rendering. */}
        <button className="myButton" onClick={handleClick()}>
          Click Me 3
        </button>
        <button className="myButton" onClick={() => handleClick}>
          Click Me 4
        </button>
        {/* calling funtion with arguments */}
        <button className="myButton" onClick={() => handleClickWithArgs(1, 2)}>
          Click Me 5
        </button>
        {setTimeout(handleClickTimeout, 3000)} -
        {setTimeout(() => handleClickTimeout(), 3000)}
        <button className="myButton" onClick={test}>
          Click Me 6
        </button>
      </div>
    </>
  );
}

export default App;
