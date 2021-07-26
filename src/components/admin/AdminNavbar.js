import React, { Component } from "react";
import {
  Link,
  useHistory,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/Navbar.css";

export default function AdminNavbar() {
  const history = useHistory();

  localStorage.getItem("auth");

  function Logout(event) {
    event.preventDefault();

    try {
      localStorage.clear();
      sessionStorage.clear();
      history.push("/");
    } catch (e) {
      alert(e.message);
    }
  }
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/admin"} className="navbar-brand">
          BookStore
        </Link>
        <li className="nav-item">
          <Link to={"/product"} className="nav-link">
            Product
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/category"} className="nav-link">
            Category
          </Link>
        </li>

        <li className="nav-item">
          <Link to={"/home"} className="nav-link">
            <a
              onClick={(e) => {
                Logout(e);
              }}
              data-item="Logout">
              Logout
            </a>
          </Link>
        </li>
      </nav>
    </div>
  );
}
