import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });

      const token = res.data.token;
      localStorage.setItem("token", token);
      alert("Giriş uğurludur!");

      const payload = JSON.parse(atob(token.split(".")[1]));

      if (payload.role === "admin") {
        navigate("/admin-panel");
      } else {
        navigate("/Menu");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Giriş zamanı xəta baş verdi");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <p className="title">Giriş</p>
      <p className="message">Hesabınıza daxil olun və davam edin</p>

      <label>
        <input
          type="text"
          name="username"
          className="input"
          placeholder=""
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <span>İstifadəçi adı</span>
      </label>

      <label>
        <input
          type="password"
          name="password"
          className="input"
          placeholder=""
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span>Şifrə</span>
      </label>

      <button type="submit" className="submit">Daxil ol</button>

      <p className="signin">
        Hesabın yoxdur? <Link to="/register">Qeydiyyatdan keç</Link>
      </p>
    </form>
  );
}

export default Login;
