import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import axios from "../api/axios";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    year: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/users/profile", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setFormData({
          name: res.data.name,
          email: res.data.email,
          year: res.data.year,
        });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user.token]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.put(
        "/users/profile",
        { name: formData.name, year: formData.year },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setMessage("Profile updated successfully!");
      setUser({ ...user, name: res.data.name, year: res.data.year });
    } catch (err) {
      setError(err.response?.data?.message || "Profile update failed");
    }
  };

  if (loading) return <p style={styles.loading}>Loading profile...</p>;
  if (error) return <p style={styles.error}>{error}</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>My Profile</h1>
      <form style={styles.form} onSubmit={handleSubmit}>
        <label style={styles.label}>Name</label>
        <input
          style={styles.input}
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label style={styles.label}>Email (Cannot change)</label>
        <input
          style={{ ...styles.input, backgroundColor: "#eee" }}
          type="email"
          name="email"
          value={formData.email}
          disabled
        />

        <label style={styles.label}>Year</label>
        <select
          name="year"
          value={formData.year}
          onChange={handleChange}
          style={styles.input}
          required
        >
          <option value="First Year">First Year</option>
          <option value="Second Year">Second Year</option>
          <option value="Third Year">Third Year</option>
          <option value="Fourth Year">Fourth Year</option>
          <option value="Others">Others</option>
        </select>

        <button type="submit" style={styles.button}>
          Update Profile
        </button>
        {message && <p style={styles.message}>{message}</p>}
        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default Profile;

const styles = {
  container: {
    padding: "2rem",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #ece9e6, #ffffff)",
    textAlign: "center",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "2rem",
  },
  form: {
    maxWidth: "400px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "0.2rem",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    padding: "10px",
    backgroundColor: "#185a9d",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "1rem",
  },
  message: {
    color: "#27ae60",
    fontWeight: "bold",
    marginTop: "1rem",
  },
  error: {
    color: "#e74c3c",
    fontWeight: "bold",
    marginTop: "1rem",
  },
  loading: {
    textAlign: "center",
    marginTop: "2rem",
  },
};
