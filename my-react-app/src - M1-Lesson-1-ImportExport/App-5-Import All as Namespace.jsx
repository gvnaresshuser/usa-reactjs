//5. Import All as Namespace
import * as MathUtils from './mathUtils';
import "./App.css";
function App() {
  return (
    <div>
      <p>4 + 2 = {MathUtils.add(4, 2)}</p>
      <p>4 - 2 = {MathUtils.subtract(4, 2)}</p>
    </div>
  );
}
export default App;