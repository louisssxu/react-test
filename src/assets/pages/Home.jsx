import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="page">
      <Link to="/VisualMemory">Visual Memory Game</Link>
    </div>
  );
}

export default Home;
