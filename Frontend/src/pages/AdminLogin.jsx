import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const AdminLogin = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Admin login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={onSubmit}>
        <h2 style={styles.title}>Admin Login </h2>
        <p style={styles.subtitle}>Access admin panel</p>

        {error && <p style={styles.error}>{error}</p>}

        <label htmlFor="admin-email" style={styles.label}>Email</label>
        <input
          id="admin-email"
          type="email"
          name="email"
          placeholder="Admin Email"
          value={email}
          onChange={onChange}
          required
          autoComplete="email"
          style={styles.input}
        />

        <label htmlFor="admin-password" style={styles.label}>Password</label>
        <input
          id="admin-password"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
          required
          autoComplete="current-password"
          style={styles.input}
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "Login as Admin"}
        </button>

        <p style={styles.footer}>
          <Link to="/login" style={styles.link}>
            User Login
          </Link>
          {" | "}
          <Link to="/" style={styles.link}>
            Back to Home
          </Link>
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #e74c3c, #c0392b)",
  },
  card: {
    background: "#fff",
    padding: "2.5rem",
    borderRadius: "12px",
    width: "350px",
    boxShadow: "0 15px 30px rgba(0,0,0,0.3)",
    textAlign: "center",
  },
  title: {
    marginBottom: "0.5rem",
    color: "#e74c3c",
  },
  subtitle: {
    marginBottom: "1.5rem",
    color: "#666",
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "0.3rem",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "1rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#e74c3c",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginBottom: "1rem",
  },
  footer: {
    marginTop: "1rem",
    fontSize: "14px",
  },
  link: {
    color: "#e74c3c",
    fontWeight: "bold",
    textDecoration: "none",
  },
};
