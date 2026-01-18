import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import axios from "../../api/axios";

const EditEvent = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams(); // event ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    totalSeats: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch event details on mount
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`/events/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        setFormData({
          title: res.data.title,
          description: res.data.description,
          date: res.data.date.split("T")[0], // format YYYY-MM-DD
          totalSeats: res.data.totalSeats,
        });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch event");
      } finally {
        setFetching(false);
      }
    };

    fetchEvent();
  }, [id, user.token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.put(`/events/${id}`, formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      setSuccess("Event updated successfully!");
      setTimeout(() => navigate("/admin"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update event");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setLoading(true);
      setError("");

      try {
        await axios.delete(`/events/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setSuccess("Event deleted successfully!");
        setTimeout(() => navigate("/admin"), 2000);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to delete event");
        setLoading(false);
      }
    }
  };

  if (fetching) return <p style={{ textAlign: "center" }}>Loading event details...</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Edit Event</h1>

      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>{success}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Title
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </label>

        <label style={styles.label}>
          Description
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={styles.textarea}
            required
          />
        </label>

        <label style={styles.label}>
          Date
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </label>

        <label style={styles.label}>
          Total Seats
          <input
            type="number"
            name="totalSeats"
            value={formData.totalSeats}
            onChange={handleChange}
            style={styles.input}
            required
            min={1}
          />
        </label>

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Updating..." : "Update Event"}
        </button>

        <button type="button" style={styles.deleteButton} onClick={handleDelete} disabled={loading}>
          {loading ? "Deleting..." : "Delete Event"}
        </button>
      </form>
    </div>
  );
};

export default EditEvent;

const styles = {
  container: {
    maxWidth: "600px",
    margin: "2rem auto",
    padding: "2rem",
    background: "linear-gradient(135deg, #f0f2f5, #e2e6ea)",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    fontSize: "2rem",
    marginBottom: "1.5rem",
    color: "#185a9d",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    padding: "0.5rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginTop: "0.3rem",
  },
  textarea: {
    padding: "0.5rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginTop: "0.3rem",
    resize: "vertical",
  },
  button: {
    padding: "0.7rem",
    backgroundColor: "#185a9d",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "1rem",
  },
  deleteButton: {
    padding: "0.7rem",
    backgroundColor: "#e74c3c",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "0.5rem",
  },
  error: {
    color: "#e74c3c",
    textAlign: "center",
  },
  success: {
    color: "#2ecc71",
    textAlign: "center",
  },
};
