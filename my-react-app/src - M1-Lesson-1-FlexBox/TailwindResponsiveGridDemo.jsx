import React from "react";

function TailwindResponsiveGridDemo() {
  const cards = Array.from({ length: 12 }, (_, index) => index + 1);

  console.log({
    Width: window.innerWidth,
    Height: window.innerHeight,
  });
  alert(`Current Window Size: Width = ${window.innerWidth}px, Height = ${window.innerHeight}px`);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-2">
        Tailwind Responsive Grid Demo
      </h1>

      <p className="text-center text-gray-600 mb-8">
        Resize the browser window to see the number of columns change.
      </p>

      {/* Breakpoint Information */}
      <div className="overflow-x-auto mb-10">
        <table className="w-full border border-gray-300 text-center">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="border p-3">Breakpoint</th>
              <th className="border p-3">Screen Width</th>
              <th className="border p-3">Columns</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="border p-2">Default</td>
              <td className="border p-2">0px - 639px</td>
              <td className="border p-2">1</td>
            </tr>

            <tr>
              <td className="border p-2">sm</td>
              <td className="border p-2">640px - 767px</td>
              <td className="border p-2">2</td>
            </tr>

            <tr>
              <td className="border p-2">md</td>
              <td className="border p-2">768px - 1023px</td>
              <td className="border p-2">3</td>
            </tr>

            <tr>
              <td className="border p-2">lg</td>
              <td className="border p-2">1024px - 1279px</td>
              <td className="border p-2">4</td>
            </tr>

            <tr>
              <td className="border p-2">xl</td>
              <td className="border p-2">1280px - 1535px</td>
              <td className="border p-2">5</td>
            </tr>

            <tr>
              <td className="border p-2">2xl</td>
              <td className="border p-2">1536px and above</td>
              <td className="border p-2">6</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Responsive Grid */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-6
        "
      >
        {cards.map((card) => (
          <div
            key={card}
            className="bg-white rounded-xl shadow-lg p-6 text-center hover:scale-105 transition duration-300"
          >
            <h2 className="text-2xl font-bold text-blue-600">
              Card {card}
            </h2>

            <p className="mt-3 text-gray-600">
              Responsive Tailwind Card
            </p>

            <button className="mt-5 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              View Details
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default TailwindResponsiveGridDemo;