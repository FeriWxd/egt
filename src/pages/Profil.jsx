import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/Profil.css";
import Navbar from "../Layout/Navbar";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (err) {
        alert("Token etibarsız və ya vaxtı keçib");
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <Navbar />
      <div className="profile-wrapper">
        <div className="profile-card">
          <h2 className="profile-title">👤 Şəxsi Məlumatlar</h2>
          {user ? (
            <div className="profile-info">
              <p>
                <span>Ad:</span> {user.firstName}
              </p>
              <p>
                <span>Soyad:</span> {user.lastName}
              </p>
              <p>
                <span>İstifadəçi adı:</span> {user.username}
              </p>
              <p>
                <span>Qrup:</span> {user.group}
              </p>
              <div className="profile-buttons">
                <button
                  className="profile-btn logout-btn"
                  onClick={handleLogout}
                >
                  Çıxış
                </button>
                <button
                  className="profile-btn menu-btn"
                  onClick={() => navigate("/menu")}
                >
                  🔙 Menü
                </button>
              </div> 
            </div>
          ) : (
            <p className="loading-text">Yüklənir...</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
