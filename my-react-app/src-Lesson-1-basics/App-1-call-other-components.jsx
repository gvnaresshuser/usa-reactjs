import NavBar  from "./NavBar";
import MainPage from "./MainPage";

function App() {//FUNCTIONAL COMPONENT
  //-----------------------------
  //javascript code - empty - var - let, const - ES6 features - jsx expression
  const x = 10;
  function myName() {
    return "GV Naressh";
  }
  //-----------------------------
  return (
    <>
      <div>
        hello all 123 {x} {myName()}
      </div>
      <NavBar />
      <MainPage />
    </>
  );
}

export default App;
//var y = myName();
//use y