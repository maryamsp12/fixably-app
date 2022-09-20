import React from "react";
import "./Styles.css";
const Navbar = () => {

  return (
    <>
      <nav className="navbar">
        <h4 className="brand-title">Fixably</h4>
        <section className="navbar-links">
          <ul className="ul">
            <li  className="li"><a href="/">Task 1</a></li>
            <li  className="li"><a href="/task2">Task 2</a></li>
            <li  className="li"><a href="/task3">Task 3</a></li>
            <li  className="li"><a href="/task4">Task 4</a></li>
            <li  className="li"><a href="/task5">Task 5</a></li>
          </ul>
        </section>
      </nav> 
    </>
  );
};

export default Navbar;
