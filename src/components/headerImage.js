import "./LeftNav.css";

const HeaderImage = ({displayName}) => {
  return (
    <>
      <div className="container-fluid d-flex align-items-center ">
        <p className="heading header-name mb-0">{displayName}</p>
        <img
          src={require("../assets/Logo.svg").default}
          className="header-logo rounded mx-auto"
          alt="..."
        />
      </div>
  
    </>
  );
};
export default HeaderImage;
