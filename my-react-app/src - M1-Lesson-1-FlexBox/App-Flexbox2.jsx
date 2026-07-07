import React from 'react';
import './flexbox2.css';
//https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout
function App() {
  return (
    <div className="flex-container">
      <div className="box">Item 1</div>
      <div className="box">Item 2</div>
      <div className="box">Item 3</div>
      <div className="box">Item 4</div>
      <div className="box">Item 5</div>
      <div className="box">Item 6</div>
    </div>
  );
}

export default App;
