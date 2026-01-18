import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Signup = () => {
  const { signup, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    year: "",
    isAdmin: false,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { name, email, password, year } = formData;

  const { confirmPassword } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Client-side password confirmation check
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await signup({ name, email, password, confirmPassword, year, isAdmin: formData.isAdmin });
      const role = res?.user?.role;
      if (role === "ADMIN") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/events", { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={onSubmit}>
        <h2 style={styles.title}>Create Account ✨</h2>
        <p style={styles.subtitle}>Join college events easily</p>

        {error && <p style={styles.error}>{error}</p>}

        <input
          id="signup-name"
          type="text"
          name="name"
          placeholder="Full Name"
          value={name}
          onChange={onChange}
          required
          autoComplete="name"
          style={styles.input}
        />

        <input
          id="signup-email"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={onChange}
          required
          autoComplete="email"
          style={styles.input}
        />

        <select
          id="signup-year"
          name="year"
          value={year}
          onChange={onChange}
          required
          autoComplete="off"
          style={styles.input}
        >
          <option value="">Select Year</option>
          <option value="First Year">First Year</option>
          <option value="Second Year">Second Year</option>
          <option value="Third Year">Third Year</option>
          <option value="Fourth Year">Fourth Year</option>
        </select>

        <input
          id="signup-password"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
          required
          autoComplete="new-password"
          style={styles.input}
        />

        <input
          id="signup-confirm-password"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={onChange}
          required
          autoComplete="new-password"
          style={styles.input}
        />

        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="isAdmin"
            checked={formData.isAdmin}
            onChange={(e) => setFormData({ ...formData, isAdmin: e.target.checked })}
            style={styles.checkbox}
          />
          Register as Admin
        </label>

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <p style={styles.footer}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;

/* 🎨 Inline styles */
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #43cea2, #185a9d)",
  },
  card: {
    background: "#fff",
    padding: "2.5rem",
    borderRadius: "12px",
    width: "380px",
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
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "1rem",
    fontSize: "14px",
    color: "#333",
  },
  checkbox: {
    width: "18px",
    height: "18px",
    cursor: "pointer",
  },
  button: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#43cea2",
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
    color: "#185a9d",
    fontWeight: "bold",
    textDecoration: "none",
  },
};
