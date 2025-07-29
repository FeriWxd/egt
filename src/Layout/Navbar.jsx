import { useNavigate } from "react-router-dom";
import "../style/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2 className="logo" onClick={() => navigate("/")}>Platform</h2>
      <ul className="nav-links">
        <li onClick={() => navigate("/profile")}>Profil</li>
        <li onClick={handleLogout}>Çıxış</li>
      </ul>
    </nav>
  );
};

export default Navbar;
