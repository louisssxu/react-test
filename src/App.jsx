import { useState } from "react";
import "./App.css";
import VisualMemoryPage from "./assets/pages/VisualMemoryPage";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Header from "./assets/components/header";
import Home from "./assets/pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/VisualMemory" element={<VisualMemoryPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
