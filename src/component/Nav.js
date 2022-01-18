import React from "react";
import { Link } from 'react-router-dom';
function Nav() {
  return (

    <nav className="">
      <ul className="nav m-5 justify-content-center">
        <Link to="/Home">
          <li className="nav-item">
            <span className="nav-link active text-danger">Home</span>
          </li>
        </Link>
        <Link to="/List">
          <li className="nav-item">
            <span className="nav-link active text-danger">List</span>
          </li>
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;
