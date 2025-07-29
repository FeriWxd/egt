// src/admin/AdminDashboard.jsx
import { useNavigate } from "react-router-dom";
import "../style/AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleGoToPanel = () => {
    navigate("/admin-panel");
  };

  return (
    <div className="admin-dashboard">
      <h1>👋 Xoş gəlmisiniz, Admin!</h1>
      <p>Buradan idarəetmə panelinə keçid edə bilərsiniz.</p>
      <button className="panel-btn" onClick={handleGoToPanel}>
        🔧 Admin Panelə Keç
      </button>
    </div>
  );
}

export default AdminDashboard;
