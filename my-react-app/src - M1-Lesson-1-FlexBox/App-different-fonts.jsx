import React from "react";
import "./grid1.css"; // Make sure this file contains your CSS grid system
import "./test.css"; // Make sure this file contains your CSS grid system

import banner from "./assets/1.jpg";
import banner2 from "./assets/2.jpg";
import img1 from "./assets/1.png";
import img2 from "./assets/2.png";
import img3 from "./assets/3.png";
import img4 from "./assets/4.png";

const images = [img1, img2, img3, img4];

function App() {
  return (
    <div className="container">
      {/* 🔵 Row 1: Full-width Banner Image */}
      <div className="row">
        <div className="col col-sm-12 col-md-12 col-lg-12">
          <p className="responsive-title  gradient-bg">Legendary Website</p>
          <p className="responsive-title gradient-bg legendary-title">
            Legendary Website
          </p>
          <img
            src={banner}
            alt="Banner"
            style={{ width: "100%", height: "300px", objectFit: "cover" }}
          />
        </div>
      </div>

      {/* 🔵 Row 2: Two columns - Image and Description */}
      <div className="row image-text-section">
        {/* Image Column */}
        <div className="col-sm-12 col-md-6 col-lg-6 image-column">
          <img
            src={banner2}
            alt="Side"
            style={{
              width: "100%",
              maxWidth: "400px",
              height: "auto",
            }}
          />
        </div>

        {/* Text Column */}
        <div className="col-sm-12 col-md-6 col-lg-6">
          <p className="responsive-title">Our Guarantee</p>

          <p
            style={{
              fontSize: "1.1rem",
              fontFamily: "'Pacifico', cursive",
              color: "#555",
              lineHeight: "1.6",
              textAlign: "center",
              marginBottom: "1.5rem",
            }}
          >
            This is a description section where you can put some text about the
            image or the content. It adjusts on all screen sizes.
          </p>

          <p
            style={{
              fontSize: "1.1rem",
              backgroundColor: "#f0f0f0",
              padding: "20px",
              borderRadius: "6px",
            }}
          >
            What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
            printing and typesetting industry... Lorem Ipsum is simply dummy
            text of the printing and typesetting industry. Lorem Ipsum has been
            the industry's standard dummy text ever since the 1500s, when an
            unknown printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially
            unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently
            with desktop publishing software like Aldus PageMaker including
            versions of Lorem Ipsum.
          </p>
        </div>
      </div>

      {/* 🔵 Row 3: Four cards with content and buttons */}
      <div className="row">
        {[1, 2, 3, 4].map((num, index) => {
          const colors = ["#f5f7fa", "#e0e7ff", "#fef3c7", "#e2f0cb"];
          const bgColor = colors[index % colors.length];
          const image = images[index]; // pick image by index

          return (
            <div key={num} className="col col-sm-12 col-md-6 col-lg-3">
              <div
                className="box"
                style={{
                  backgroundColor: bgColor,
                  color: "#333",
                  border: "1px solid #ccc",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
                  padding: "20px",
                  borderRadius: "12px",
                  textAlign: "center",
                }}
              >
                {/* Circular Image inside the card */}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img
                    src={image}
                    alt={`Card ${num}`}
                    style={{
                      width: "100%",
                      maxWidth: "150px",
                      aspectRatio: "1 / 1",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "3px solid white",
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
                      backgroundColor: "#fff",
                      marginBottom: "12px",
                    }}
                  />
                </div>

                {/* Title */}
                <h4
                  style={{
                    fontSize: "1.25rem",
                    marginBottom: "0.3rem",
                    fontWeight: "bold",
                  }}
                >
                  Image {num}
                </h4>

                {/* Description */}
                <p
                  style={{
                    fontSize: "0.95rem",
                    marginBottom: "1rem",
                    fontFamily: "cursive",
                    color: "#555",
                  }}
                >
                  Some professional content related to image {num}.
                </p>

                {/* Buttons */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    justifyContent: "center",
                  }}
                >
                  <button className="btn btn-view">View</button>
                  <button className="btn btn-edit">Edit</button>
                </div>
                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="star">
                      &#9733;
                    </span> // Unicode star
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 🔵 Row 4: Footer */}
      <div className="row">
        <div className="col col-sm-12 col-md-12 col-lg-12">
          <footer
            style={{
              textAlign: "center",
              padding: "20px",
              background: "#020b56",
              color: "white",
              borderRadius: "6px",
            }}
          >
            © 2025 5datainc.com. All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
