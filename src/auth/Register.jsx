// Register.jsx
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/Register.css';

function Register() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    group: '9/A',
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/register', form);
      alert('Qeydiyyat uğurla tamamlandı');
    } catch (err) {
      alert(err.response?.data?.message || 'Xəta baş verdi');
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <p className="title">Qeydiyyat</p>
      <p className="message">İndi qoşul və sistemə tam giriş əldə et.</p>

      <div className="flex">
        <label>
          <input
            required
            name="firstName"
            type="text"
            className="input"
            value={form.firstName}
            onChange={handleChange}
            placeholder=" "
          />
          <span>Ad</span>
        </label>

        <label>
          <input
            required
            name="lastName"
            type="text"
            className="input"
            value={form.lastName}
            onChange={handleChange}
            placeholder=" "
          />
          <span>Soyad</span>
        </label>
      </div>

      <label>
        <input
          required
          name="username"
          type="text"
          className="input"
          value={form.username}
          onChange={handleChange}
          placeholder=" "
        />
        <span>İstifadəçi adı</span>
      </label>

      <label>
        <input
          required
          name="password"
          type="password"
          className="input"
          value={form.password}
          onChange={handleChange}
          placeholder=" "
        />
        <span>Şifrə</span>
      </label>

      <label>
        <select
          required
          name="group"
          className="input"
          value={form.group}
          onChange={handleChange}
        >
          {['9/A', '9/B', '9/C', '11/A', '11/B', '11/C'].map((gr) => (
            <option key={gr} value={gr}>
              {gr}
            </option>
          ))}
        </select>
        <span>Qrup</span>
      </label>

      <button type="submit" className="submit">
        Qeydiyyatdan keç
      </button>

      <p className="signin">
        Hesabın var? <Link to="/login">Giriş et</Link>
      </p>
    </form>
  );
}

export default Register;
