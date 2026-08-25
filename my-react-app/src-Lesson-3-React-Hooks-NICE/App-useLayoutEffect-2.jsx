import { useEffect, useLayoutEffect, useState } from "react";

function App() {
  const [width, setWidth] = useState(100);

  useLayoutEffect(() => {
    console.log("useLayoutEffect");
    //setWidth(500);//IF WE SET THE WIDTH HERE - NO FLICKER
  }, []);

  useEffect(() => {
    console.log("useEffect");
    setWidth(500);//IF WE SET THE WIDTH HERE - IT FLICKERS
  }, []);

  return (
    <div
      style={{
        width: width,
        height: 100,
        background: "orange",
      }}
    >
      Hello
    </div>
  );
}
export default App;
