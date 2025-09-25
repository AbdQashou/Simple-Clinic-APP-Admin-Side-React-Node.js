const Navbar = ({ onHome }) => {
  return (
    <div className="navbar">
      <div className="brand">Clinic</div>
      <div className="nav-actions">
        <button className="nav-btn" onClick={onHome}>Home</button>
      </div>
    </div>
  );
};

export default Navbar;
