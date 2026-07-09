import React from "react";
import "./index.css"; // Make sure Tailwind is configured here
import banner from "./assets/1.jpg";
import banner2 from "./assets/2.jpg";
import img1 from "./assets/1.png";
import img2 from "./assets/2.png";
import img3 from "./assets/3.png";
import img4 from "./assets/4.png";
import TailwindResponsiveGridDemo from "./TailwindResponsiveGridDemo";

const images = [img1, img2, img3, img4];
const globalDivStyle = `
  div {
    border: 1px solid navy;
  }
`;
function App() {
  return (
    <>
     <TailwindResponsiveGridDemo/>
    </>
  );
}

export default App;
/*
TAILWIND CSS INSTALLATION
FOLLOW SETTINGS FROM TAILWIND VITE TAB
https://tailwindcss.com/docs/installation/using-vite
npm install tailwindcss @tailwindcss/vite

E:\MURALI\REACT-JS-TRAINING\my-react-app>npm install tailwindcss @tailwindcss/vite
added 22 packages, and audited 561 packages in 12s
92 packages are looking for funding
  run `npm fund` for details
found 0 vulnerabilities

*/
/*
Default Tailwind CSS breakpoints:
| Prefix | Min Width |
| ------ | --------- |
| `sm`   | `640px`   |
| `md`   | `768px`   |
| `lg`   | `1024px`  |
| `xl`   | `1280px`  |
| `2xl`  | `1536px`  |
*/
