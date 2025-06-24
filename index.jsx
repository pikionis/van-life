import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Home from "./Home"
import About from "./About"
import Vans from "./Vans/Vans"
import VanDetail from "./Vans/VanDetail"
import Layout from "./components/Layout"

import Header from "./components/Header"


// import "./server" // Importing the server file to set up the mock server
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/vans" element={<Vans />} />
        <Route path="/vans/:id" element={<VanDetail />} />
        <Route path="host" element={<HostLayout />} />

        
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App />);