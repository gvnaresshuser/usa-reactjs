import "./Flexbox.css";

function Flexbox() {
  const cards = [
    {
      id: 1,
      title: "HTML",
      description: "Build the structure of web pages.",
    },
    {
      id: 2,
      title: "CSS",
      description: "Style and beautify your web pages.",
    },
    {
      id: 3,
      title: "JavaScript",
      description: "Add interactivity to websites.",
    },
    {
      id: 4,
      title: "React",
      description: "Create reusable UI components.",
    },
    {
      id: 5,
      title: "Node.js",
      description: "Build backend applications.",
    },
    {
      id: 6,
      title: "MongoDB",
      description: "Store application data.",
    },
  ];

  return (
    <div className="container">
      <h1>Flexbox + Responsive Web Design</h1>

      <div className="card-container">
        {cards.map((card) => (
          <div key={card.id} className="card">
            <h2>{card.title}</h2>
            <p>{card.description}</p>
            <button>Learn More</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Flexbox;
