import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "../../api/axios";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/admin/stats", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setStats(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [user.token]);

  const handleDeleteEvent = async (eventId, eventTitle) => {
    if (window.confirm(`Are you sure you want to delete "${eventTitle}"?`)) {
      try {
        await axios.delete(`/events/${eventId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        alert("Event deleted successfully!");
        // Refresh stats
        const res = await axios.get("/admin/stats", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setStats(res.data);
      } catch (err) {
        alert(err.response?.data?.message || "Failed to delete event");
      }
    }
  };

  if (loading) return <p style={styles.loading}>Loading dashboard...</p>;
  if (error) return <p style={styles.error}>{error}</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Admin Dashboard</h1>

      <Link to="/admin/create-event" style={styles.createButton}>
        + Create Event
      </Link>

      <div style={styles.statsContainer}>
        <div style={styles.card}>
          <h2>Total Users</h2>
          <p>{stats.totalUsers}</p>
        </div>
        <div style={styles.card}>
          <h2>Total Events</h2>
          <p>{stats.totalEvents}</p>
        </div>
        <div style={styles.card}>
          <h2>Total Registrations</h2>
          <p>{stats.totalRegistrations}</p>
        </div>
      </div>

      <h2 style={styles.subTitle}>Registrations per Event</h2>
      <div style={styles.listContainer}>
        {stats.registrationsPerEvent.map((event) => (
          <div key={event.eventId} style={styles.listCard}>
            <strong>{event.title}</strong>
            <p>Registrations: {event.registrations}</p>
            <Link to={`/admin/edit-event/${event.eventId}`} style={styles.link}>
              Edit Event
            </Link>
          </div>
        ))}
      </div>

      <h2 style={styles.subTitle}>Remaining Seats per Event</h2>
      <div style={styles.listContainer}>
        {stats.remainingSeats.map((event) => (
          <div key={event._id} style={styles.listCard}>
            <strong>{event.title}</strong>
            <p>
              Available Seats: {event.availableSeats} / {event.totalSeats}
            </p>
            <div style={styles.buttonGroup}>
              <Link to={`/admin/edit-event/${event._id}`} style={styles.link}>
                ✏️ Edit
              </Link>
              <button
                style={styles.deleteBtn}
                onClick={() => handleDeleteEvent(event._id, event.title)}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;

const styles = {
  container: {
    padding: "2rem",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
  },
  title: {
    fontSize: "2.5rem",
    textAlign: "center",
    marginBottom: "2rem",
    color: "#185a9d",
  },
  subTitle: {
    fontSize: "1.8rem",
    marginTop: "2rem",
    marginBottom: "1rem",
    color: "#333",
  },
  createButton: {
    display: "inline-block",
    marginBottom: "2rem",
    textDecoration: "none",
    backgroundColor: "#2ecc71",
    color: "#fff",
    padding: "0.8rem 1.5rem",
    borderRadius: "8px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
  statsContainer: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    gap: "1rem",
  },
  card: {
    backgroundColor: "#fff",
    padding: "1.5rem",
    borderRadius: "10px",
    width: "200px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  listContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
  },
  listCard: {
    flex: "1 1 250px",
    backgroundColor: "#fff",
    padding: "1rem",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  link: {
    marginTop: "0.5rem",
    display: "inline-block",
    textDecoration: "none",
    color: "#fff",
    backgroundColor: "#185a9d",
    padding: "5px 10px",
    borderRadius: "5px",
    marginRight: "0.5rem",
  },
  buttonGroup: {
    marginTop: "0.8rem",
    display: "flex",
    gap: "0.5rem",
  },
  deleteBtn: {
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
  loading: {
    textAlign: "center",
    marginTop: "2rem",
  },
  error: {
    color: "#e74c3c",
    textAlign: "center",
    marginTop: "2rem",
  },
};
