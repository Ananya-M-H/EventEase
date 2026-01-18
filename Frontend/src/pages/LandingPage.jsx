import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <h1 style={styles.title}>Welcome to College Event Registration</h1>
        <p style={styles.subtitle}>
          Discover, register, and manage events effortlessly. Join your college
          community and never miss an event!
        </p>
        <div style={styles.buttons}>
          <Link to="/signup" style={{ ...styles.button, backgroundColor: "#27ae60" }}>
            Sign Up
          </Link>
          <Link to="/login" style={{ ...styles.button, backgroundColor: "#2980b9" }}>
            User Login
          </Link>
          <Link to="/admin-login" style={{ ...styles.button, backgroundColor: "#e74c3c" }}>
            Admin Login
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.features}>
        <h2 style={styles.featuresTitle}>Features</h2>
        <div style={styles.cards}>
          <div style={styles.card}>
            <h3>Browse Events</h3>
            <p>Explore all upcoming college events at a glance.</p>
          </div>
          <div style={styles.card}>
            <h3>Register Easily</h3>
            <p>One click registration and real-time seat availability.</p>
          </div>
          <div style={styles.card}>
            <h3>Admin Dashboard</h3>
            <p>Admins can create, edit, and manage events efficiently.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© 2026 College Event Registration. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#333",
  },
  hero: {
    background: "linear-gradient(135deg, #6dd5ed, #2193b0)",
    color: "#fff",
    textAlign: "center",
    padding: "5rem 2rem",
    borderBottomLeftRadius: "50% 20%",
    borderBottomRightRadius: "50% 20%",
  },
  title: {
    fontSize: "3rem",
    marginBottom: "1rem",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: "1.25rem",
    marginBottom: "2rem",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
  },
  button: {
    padding: "0.8rem 2rem",
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    borderRadius: "50px",
    transition: "0.3s",
  },
  features: {
    padding: "4rem 2rem",
    textAlign: "center",
  },
  featuresTitle: {
    fontSize: "2rem",
    marginBottom: "2rem",
    color: "#185a9d",
  },
  cards: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "2rem",
  },
  card: {
    background: "#f0f2f5",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "250px",
    textAlign: "center",
    transition: "transform 0.3s",
  },
  cardHover: {
    transform: "scale(1.05)",
  },
  footer: {
    textAlign: "center",
    padding: "2rem",
    background: "#f0f2f5",
    marginTop: "3rem",
    fontSize: "0.9rem",
    color: "#555",
  },
};
