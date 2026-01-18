import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import AuthContext from "../context/AuthContext";

const Events = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("/events", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setEvents(res.data.events);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [user.token]);

  if (loading) return <p style={styles.loading}>Loading events...</p>;
  if (error) return <p style={styles.error}>{error}</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>All Events 🎫</h1>
      <div style={styles.grid}>
        {events.map((event) => (
          <div key={event._id} style={styles.card}>
            <h2 style={styles.eventTitle}>{event.title}</h2>
            <p style={styles.description}>{event.description}</p>
            <p style={styles.info}>
              Date: {new Date(event.date).toLocaleDateString()}
            </p>
            <p style={styles.info}>Seats Available: {event.availableSeats}</p>
            <p
              style={{
                ...styles.status,
                backgroundColor:
                  event.status === "UPCOMING" ? "#43cea2" : "#e74c3c",
              }}
            >
              {event.status}
            </p>
            <Link to={`/events/${event._id}`} style={styles.button}>
              View / Register
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;

const styles = {
  container: {
    padding: "2rem",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
  },
  title: {
    textAlign: "center",
    marginBottom: "2rem",
    fontSize: "2rem",
    color: "#333",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "1.5rem",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "1.5rem",
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
    textAlign: "center",
    position: "relative",
  },
  eventTitle: {
    fontSize: "1.4rem",
    marginBottom: "0.5rem",
  },
  description: {
    fontSize: "0.9rem",
    marginBottom: "0.5rem",
    color: "#555",
  },
  info: {
    fontSize: "0.85rem",
    marginBottom: "0.5rem",
    color: "#333",
  },
  status: {
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: "6px",
    color: "#fff",
    fontWeight: "bold",
    marginBottom: "1rem",
  },
  button: {
    display: "inline-block",
    textDecoration: "none",
    backgroundColor: "#185a9d",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "6px",
    fontWeight: "bold",
    transition: "0.3s",
  },
  loading: {
    textAlign: "center",
    fontSize: "1.2rem",
    marginTop: "2rem",
  },
  error: {
    textAlign: "center",
    color: "red",
    fontWeight: "bold",
    marginTop: "2rem",
  },
};
