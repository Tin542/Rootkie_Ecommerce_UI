import React from "react";
import ProductList from "../components/home/ProductList";
import Navbar from "../components/Navbar";
import UserNavbar from "../components/home/UserNavbar";

export default function HomePage() {
  const token = localStorage.getItem("auth");

  let check;
  if (token !== null) {
    check = "NOT_LOGGED_IN";
  } else {
    check = "LOGGED_IN";
  }

  return (
    <div>

      {check === "LOGGED_IN" ? <UserNavbar /> :  <Navbar/>}

      <ProductList />
    </div>
  );
}
