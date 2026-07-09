import "./ResponsiveFlexbox.css";

function ResponsiveFlexbox() {
  return (
    <div className="page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">TechNova</div>

        <div className="menu">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}

      <section className="hero">
        <div>
          <h1>Responsive Web Design</h1>

          <p>
            This page demonstrates Responsive Web Design using Flexbox and Media
            Queries.
          </p>

          <button>Learn More</button>
        </div>

        <img src="https://picsum.photos/500/300" alt="Hero" />
      </section>

      {/* Cards */}

      <section className="cards">
        <div className="card">
          <h2>HTML</h2>
          <p>Create web page structure.</p>
        </div>

        <div className="card">
          <h2>CSS</h2>
          <p>Design beautiful layouts.</p>
        </div>

        <div className="card">
          <h2>JavaScript</h2>
          <p>Add interactivity.</p>
        </div>

        <div className="card">
          <h2>React</h2>
          <p>Build reusable UI Components.</p>
        </div>
      </section>

      {/* Sidebar Layout */}

      <section className="layout">
        <aside className="sidebar">
          <h2>Sidebar</h2>

          <ul>
            <li>Dashboard</li>
            <li>Students</li>
            <li>Courses</li>
            <li>Settings</li>
          </ul>
        </aside>

        <main className="content">
          <h2>Main Content</h2>

          <p>
            Resize the browser window to see the responsive behaviour. The
            sidebar moves above the content automatically on smaller devices.
          </p>
        </main>
      </section>
    </div>
  );
}

export default ResponsiveFlexbox;
