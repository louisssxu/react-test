import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav id="main-nav">
        <ul id="main-nav-list">
          <li>
            <object data="weight.svg" width="60" height="60"></object>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
