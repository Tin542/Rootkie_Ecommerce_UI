import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

import "./assets/Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  async function access() {
    const body = {
      username: username,
      password: password,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    let response = await axios.post(
      "http://localhost:9999/BookStore/auth/signin",
      body,
      { headers }
    );
    localStorage.setItem(
      "auth",
      response.data.type + " " + response.data.token
    );
    return response;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const authortication = await access();
      if (authortication.data.roles[0] === "ROLE_ADMIN") {
        history.push("/admin");
      } else if (authortication.data.roles[0] === "ROLE_USER") {
        history.push("/user");
      } else {
        history.push("/");
      }
    } catch (e) {
      alert("Username or password incoorect !");
      console.log(e.stack);
    }
  }

  return (
    <>
      <Navbar />
      <form class="login">
        <div class="login-screen">
          <div class="app-title">
            <h1>Login</h1>
          </div>
          <div class="control-group">
            <input
              type="text"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              class="login-field"
              id="login-name"
            />
            <label class="login-field-icon fui-user" for="login-name"></label>
          </div>
          <div class="control-group">
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              class="login-field"
              id="login-pass"
            />
            <label class="login-field-icon fui-lock" for="login-pass"></label>
          </div>
          <button
            onClick={(e) => {
              handleSubmit(e);
            }}
            class="button">
            Login
          </button>
          Dont have an account ? <Link to="/register">Register</Link>
        </div>
      </form>
    </>
  );
}
