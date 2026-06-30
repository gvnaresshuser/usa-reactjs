import NavBar from "./NavBar";
import MainPage from "./MainPage";

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
  function test(){
    const id = setTimeout(handleClickTimeout, 3000);
    console.log(id);
  }
  //-----------------------------
  return (
    <>
      <div>
        hello all 123 {x} {myName()}
      </div>
      {/* <NavBar />
      <MainPage /> */}
      <button onClick={handleClick}>Click Me 1</button>
      <button onClick={() => handleClick()}>Click Me 2</button>
      {/* WILL NOT WORK */}
      {/* Because the function executes during rendering. */}
      <button onClick={handleClick()}>Click Me 3</button>
      <button onClick={() => handleClick}>Click Me 4</button>
      {/* calling funtion with arguments */}
      <button onClick={() => handleClickWithArgs(1, 2)}>Click Me 5</button>
      {setTimeout(handleClickTimeout, 3000)} - 
      {setTimeout(() => handleClickTimeout(), 3000)}
      <button onClick={test}>Click Me 6</button>
    </>
  );
}

export default App;
