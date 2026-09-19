// npm install express

import express from "express";
const app = express();
const PORT = 5000;
// Hello World endpoint
// GET http://localhost:5000/api/hello
app.get("/api/hello", (req, res) => {
  res.status(200).json({
    message: "Hello World!Express JS",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
/*

Client Request
      ↓
app.get("/api/hello", ...)
      ↓
Does URL match /api/hello?
      │
   ┌──┴───┐
   │      │
  YES     NO
   │      │
   ↓      ↓
Response  app.use((req, res) => {
             404 Response
          })
*/
/*
------------------------------------------
// 404 - Route not found - This is middleware in Express:
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
}); 
------------------------------------------
*/
