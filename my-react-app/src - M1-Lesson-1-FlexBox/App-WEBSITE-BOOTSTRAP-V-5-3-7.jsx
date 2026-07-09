import React from "react";
//COMMENT AND UNCOMMNET TO TEST BOOTSTRAP [ "version": "5.3.7" ] IN ACTION
//npm install bootstrap@5.3.7
import "bootstrap/dist/css/bootstrap.min.css";
import "./test1.css"; // Include any additional styling here

import banner from "./assets/1.jpg";
import banner2 from "./assets/2.jpg";
import img1 from "./assets/1.png";
import img2 from "./assets/2.png";
import img3 from "./assets/3.png";
import img4 from "./assets/4.png";

//npm install bootstrap@5.3.7

const images = [img1, img2, img3, img4];

function App() {
  return (
    <div className="container py-4">
      {/* 🔵 Row 1: Banner */}
      <div className="row mb-4">
        <div className="col-12 text-center">
          <h2 className="responsive-title gradient-bg">Legendary Website</h2>
          <img
            src={banner}
            alt="Banner"
            className="img-fluid"
            style={{ height: "300px", objectFit: "cover", width: "100%" }}
          />
        </div>
      </div>

      {/* 🔵 Row 2: Image and Text Side by Side */}
      <div className="row align-items-center mb-5">
        <div className="col-md-6 text-center">
          <img
            src={banner2}
            alt="Side"
            className="img-fluid"
            style={{ maxWidth: "400px" }}
          />
        </div>
        <div className="col-md-6">
          <h3 className="responsive-title">Our Guarantee</h3>
          <p className="fst-italic text-center text-muted">
            This is a description section where you can put some text about the
            image or the content. It adjusts on all screen sizes.
          </p>
          <div className="p-3 bg-light rounded">
            <p>
              What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
              printing and typesetting industry... Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s...
            </p>
          </div>
        </div>
      </div>

      {/* 🔵 Row 3: Four Cards */}
      <div className="row g-4 mb-5">
        {images.map((image, index) => {
          const colors = ["#f5f7fa", "#e0e7ff", "#fef3c7", "#e2f0cb"];
          const bgColor = colors[index % colors.length];

          return (
            <div className="col-lg-3 col-md-6" key={index}>
              <div
                className="card h-100 text-center shadow-sm"
                style={{ backgroundColor: bgColor, borderRadius: "12px" }}
              >
                <div className="card-body">
                  <img
                    src={image}
                    alt={`Card ${index + 1}`}
                    className="rounded-circle mb-3"
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                      border: "3px solid #fff",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    }}
                  />
                  <h5 className="card-title">Image {index + 1}</h5>
                  <p className="card-text text-muted">
                    Some professional content related to image {index + 1}.
                  </p>
                  <div className="d-flex justify-content-center gap-2 mb-2">
                    <button className="btn btn-primary btn-sm">View</button>
                    <button className="btn btn-warning btn-sm">Edit</button>
                  </div>
                  <div className="text-warning">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star}>&#9733;</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 🔵 Row 4: Footer */}
      <footer className="text-center py-3 bg-dark text-white rounded">
        © 2025 5datainc.com. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
