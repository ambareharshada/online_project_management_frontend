import "./LeftNav.css";
import { NavLink } from "react-router-dom";

const HeaderImage = ({ displayName, displayImage }) => {
  return (
    <>
      <div className="container-fluid d-flex align-items-center ">
        <p className="heading header-name mb-0">{displayName}</p>
          <img
            src={require("../assets/Logo.svg").default}
            className="header-logo rounded mx-auto"
            alt="..."
          />
          <div className="logout-mobile mt-auto mb-3">
            <NavLink to="/" className="nav-link p-0">
              <img src={require("../assets/Logout.svg").default} alt="Logout" />
            </NavLink>
          </div>
      </div>
    </>
  );
};
export default HeaderImage;
