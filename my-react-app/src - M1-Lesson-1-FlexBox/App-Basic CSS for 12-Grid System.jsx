// App.jsx
import './grid-basic.css';

export default function App() {
  return (
    <div className="container">
      <h2 style={{ textAlign: 'center', margin: '20px 0' }}>12 Column Grid Demo</h2>

      <div className="row">
        <div className="col-4">Column 4</div>
        <div className="col-4">Column 4</div>
        <div className="col-4">Column 4</div>
      </div>

      <div className="row">
        <div className="col-3">Column 3</div>
        <div className="col-6">Column 6</div>
        <div className="col-3">Column 3</div>
      </div>

      <div className="row">
        <div className="col-2">Col 2</div>
        <div className="col-8">Col 8</div>
        <div className="col-2">Col 2</div>
      </div>

      <div className="row">
        <div className="col-12">Full-width Column (12)</div>
      </div>
    </div>
  );
}
