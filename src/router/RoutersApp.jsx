import { Routes, Route } from "react-router-dom";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Profile from "../pages/Profil";
import Menu from "../pages/Menu";
import Homework from "../pages/Homework";
import AdminLogin from "../admin/AdminLogin";
import AdminPanel from "../admin/AdminPanel";
import AdminDashboard from "../admin/AdminDashboard"; // ✅ Yeni səhifə

function RoutersApp() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/homework" element={<Homework />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* ✅ Əlavə edildi */}
      <Route path="/admin-panel" element={<AdminPanel />} />
    </Routes>
  );
}

export default RoutersApp;
