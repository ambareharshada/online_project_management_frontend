// LeftNav.js
import React from "react";
import { NavLink } from "react-router-dom";
import "./LeftNav.css"; 

const LeftNav = () => {
  return (
    <>
    <div
      className="left-nav"
      // d-flex flex-column align-items-center
      style={{ width: "68px", height: "100vh" }}
    >
      <ul className="nav flex-column mb-auto text-center" style={{marginTop:"145px"}}>
        <li className="nav-item mb-4">
          <NavLink to="/dashboard" className="nav-link p-0">
            <img
              src={require("../assets/Dashboard-active.svg").default}
              alt="Dashboard"
            />
          </NavLink>
        </li>
        <li className="nav-item mb-4">
          <NavLink to="/project-list" className="nav-link p-0">
          <img
              src={require("../assets/Project-list-active.svg").default}
              alt="Dashboard"
            />
            {/* Project List Icon */}
          </NavLink>
        </li>
        <li className="nav-item mb-4">
          <NavLink to="/add-project" className="nav-link p-0">
          <img
              src={require("../assets/create-project-active.svg").default}
              alt="Dashboard"
            />
          </NavLink>
        </li>
      </ul>

      <div className="mt-auto mb-3">
        <NavLink to="/" className="nav-link p-0">
        <img
              src={require("../assets/Logout.svg").default}
              alt="Dashboard"
            />
        </NavLink>
      </div>
    </div>


    <div className="bottom-nav">
  <ul className="nav justify-content-around text-center">
    <li className="nav-item">
      <NavLink to="/dashboard" className="nav-link p-0">
        <img
          src={require("../assets/Dashboard-active.svg").default}
          alt="Dashboard"
        />
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink to="/project-list" className="nav-link p-0">
        <img
          src={require("../assets/Project-list-active.svg").default}
          alt="Project List"
        />
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink to="/add-project" className="nav-link p-0">
        <img
          src={require("../assets/create-project-active.svg").default}
          alt="Create Project"
        />
      </NavLink>
    </li>
  </ul>
</div>

    </>
  );
};

export default LeftNav;
