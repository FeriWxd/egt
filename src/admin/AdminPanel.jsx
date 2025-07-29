import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/AdminPanel.css";

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/admin");
      return;
    }

    let payload;
    try {
      payload = JSON.parse(atob(token.split(".")[1]));
    } catch (err) {
      alert("Token pozulub və ya etibarsızdır");
      navigate("/admin");
      return;
    }

    if (payload.role !== "admin") {
      alert("Bu səhifəyə yalnız admin daxil ola bilər");
      navigate("/admin");
      return;
    }

    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const onlyStudents = res.data.filter((user) => user.role !== "admin");
        setUsers(onlyStudents);
      } catch (err) {
        alert("İstifadəçilər yüklənmədi");
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    const confirm = window.confirm("Bu istifadəçini silmək istədiyinizə əminsiniz?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (err) {
      alert("Silinmə zamanı xəta baş verdi");
    }
  };

  const handleGroupChange = async (id, newGroup) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:5000/api/users/${id}`,
        { group: newGroup },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUsers((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, group: newGroup } : user
        )
      );

      alert("Qrup uğurla dəyişdirildi");
    } catch (err) {
      alert("Qrup dəyişdirilə bilmədi");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const groupedUsers = {
    9: [],
    11: [],
  };

  users.forEach((user) => {
    if (user.group.startsWith("9")) groupedUsers[9].push(user);
    else if (user.group.startsWith("11")) groupedUsers[11].push(user);
  });

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h2>👨‍💼 Admin Paneli</h2>
        <div className="admin-buttons">
          <button onClick={() => navigate("/admin-dashboard")} className="back-btn">
            ← Dashboarda Qayıt
          </button>
          <button onClick={handleLogout} className="logout-btn">
            Çıxış
          </button>
        </div>
      </div>

      {[9, 11].map((sinif) => (
        <div key={sinif} className="group-section">
          <h3>{sinif}-lar</h3>
          <table>
            <thead>
              <tr>
                <th>Ad</th>
                <th>Soyad</th>
                <th>İstifadəçi adı</th>
                <th>Qrup</th>
                <th>Əməliyyat</th>
              </tr>
            </thead>
            <tbody>
              {[...groupedUsers[sinif]]
                .sort((a, b) => a.group.localeCompare(b.group))
                .map((user) => (
                  <tr key={user._id}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.username}</td>
                    <td>
                      <select
                        value={user.group}
                        onChange={(e) =>
                          handleGroupChange(user._id, e.target.value)
                        }
                      >
                        {["9/A", "9/B", "9/C", "11/A", "11/B", "11/C"].map((gr) => (
                          <option key={gr} value={gr}>
                            {gr}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(user._id)}>Sil</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default AdminPanel;
