// App.jsx
import './grid-responsive.css';

export default function App() {
  return (
    <div className="container">
      <h2 style={{ textAlign: 'center', margin: '20px 0' }}>12 Column Grid Demo</h2>

      <div class="row">
        <div class="col col-3"><div class="box">Column 1</div></div>
        <div class="col col-4"><div class="box">Column 2</div></div>
        <div class="col col-6"><div class="box">Column 3</div></div>
        <div class="col col-8"><div class="box">Column 2</div></div>
        <div class="col col-12"><div class="box">Column 3</div></div>
      </div>
      <div class="row">
        <div class="col col-1"><div class="box">Column 11</div></div>
        <div class="col col-2"><div class="box">Column 22</div></div>
        <div class="col col-3"><div class="box">Column 33</div></div>
        <div class="col col-4"><div class="box">Column 44</div></div>
        <div class="col col-6"><div class="box">Column 66</div></div>
      </div>
      </div>
  );
}
