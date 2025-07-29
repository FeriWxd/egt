import { useNavigate } from "react-router-dom";
import "../style/Menu.css";
import Navbar from "../Layout/Navbar";

function Menu() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="menu-page">
      <Navbar/>

      <div className="menu-content">
        <div className="cta-box">
          <h1 className="cta-title">📚 Hazırsan?</h1>
          <p className="cta-subtext">Ev tapşırıqlarını yerinə yetirərək uğura doğru ilk addımını at!</p>
          <button
            className="cta-button"
            onClick={() => navigate("/homework")}
          >
            ✅ Tapşırığa Başla
          </button>
        </div>
      </div>
    </div>
  );
}

export default Menu;
