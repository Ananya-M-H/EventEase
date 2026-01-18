import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.brand}>
        <Link to="/" style={styles.brandLink}>
          CollegeEvents
        </Link>
      </div>

      <ul style={styles.navLinks}>
        <li>
          <Link to="/" style={styles.link}>
            Home
          </Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to="/events" style={styles.link}>
                Events
              </Link>
            </li>
            <li>
              <Link to="/profile" style={styles.link}>
                Profile
              </Link>
            </li>
            {user.role === "ADMIN" && (
              <li>
                <Link to="/admin" style={styles.link}>
                  Admin Dashboard
                </Link>
              </li>
            )}
            <li>
              <button style={styles.logoutBtn} onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" style={styles.link}>
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" style={styles.link}>
                Signup
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.75rem 2rem",
    backgroundColor: "#2c3e50",
    color: "#ecf0f1",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  brand: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  brandLink: {
    color: "#ecf0f1",
    textDecoration: "none",
  },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    margin: 0,
    padding: 0,
  },
  link: {
    color: "#ecf0f1",
    textDecoration: "none",
    fontWeight: "500",
    transition: "color 0.2s",
  },
  logoutBtn: {
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    padding: "0.4rem 0.8rem",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "background-color 0.2s",
  },
};
