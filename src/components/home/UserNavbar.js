import React, { Component } from "react";
import { Link, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/Navbar.css";

export default function AdminNavbar() {
  const history = useHistory();

  const token = localStorage.getItem("auth");

  let check;
  if (!token) {
    check = "NOT_LOGGED_IN";
  } else {
    check = "LOGGED_IN";
  }

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
        <Link to={"/user"} className="navbar-brand">
          BookStore
        </Link>
        <li className="nav-item">
          <Link to={"/home"} className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            Account
          </a>
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
