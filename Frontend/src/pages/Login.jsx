import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Login = () => {
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
      navigate("/events");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={onSubmit}>
        <h2 style={styles.title}>Welcome Back </h2>
        <p style={styles.subtitle}>Login to continue</p>

        {error && <p style={styles.error}>{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={onChange}
          required
          autoComplete="email"
          style={styles.input}
        />

        <input
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
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={styles.footer}>
          Don’t have an account?{" "}
          <Link to="/signup" style={styles.link}>
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

/* 🎨 Inline styles (simple & clean) */
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
  },
  card: {
    background: "#fff",
    padding: "2.5rem",
    borderRadius: "12px",
    width: "350px",
    boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  title: {
    marginBottom: "0.5rem",
  },
  subtitle: {
    marginBottom: "1.5rem",
    color: "#666",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "1rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#667eea",
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
    color: "#667eea",
    fontWeight: "bold",
    textDecoration: "none",
  },
};
