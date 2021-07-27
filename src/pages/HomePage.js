import React from "react";
import ProductList from "../components/home/ProductList";
import Navbar from "../components/Navbar";
import UserNavbar from "../components/home/UserNavbar";

export default function HomePage() {

  return (
    <div>

      <Navbar/>

      <ProductList />
    </div>
  );
}
