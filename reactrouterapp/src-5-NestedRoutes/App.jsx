import React from 'react'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import ContactLayout from './layout/ContactLayout';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from './layout/RootLayout';
import ContactInfo from './components/ContactInfo';
import ContactForm from './components/ContactForm';
const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="about" element={<About />} />
        {/* <Route path="contact" element={<Contact />} /> */}
        {/* NESTED ROUTES */}
        {/* 
        http://localhost:5173/contact/info 
        http://localhost:5173/contact/form 
        */}

        <Route path="contact" element={<ContactLayout />}>
          <Route path="info" element={<ContactInfo />} />
          <Route path="form" element={<ContactForm />} />
        </Route>
      </Route>,
    ),
  );
  return (
    <RouterProvider router={router} />
  );
}

export default App