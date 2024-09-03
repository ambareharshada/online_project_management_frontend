import "./LeftNav.css"

const Header = () => {
  return (
    <>
      <div className="container-fluid" style={{textAlign:"center",marginTop:"3.5rem"}}>
        <img src={require("../assets/Logo.svg").default} class="logo rounded mx-auto d-block" alt="..."></img>
        <p className="heading">Online Project Management</p>
      </div>
    </>
  );
};
export default Header;
