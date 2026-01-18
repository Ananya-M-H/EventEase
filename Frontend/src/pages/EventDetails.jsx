import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import AuthContext from "../context/AuthContext";

const EventDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`/events/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setEvent(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch event");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id, user.token]);

  const handleRegister = async () => {
    try {
      const res = await axios.post(
        `/events/${id}/register`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setMessage(res.data.message);
      setEvent((prev) => ({
        ...prev,
        availableSeats: prev.availableSeats - 1,
        status: prev.availableSeats - 1 === 0 ? "CLOSED" : prev.status,
      }));
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  if (loading) return <p style={styles.loading}>Loading event...</p>;
  if (error) return <p style={styles.error}>{error}</p>;
  if (!event) return null;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{event.title}</h1>
      <p style={styles.description}>{event.description}</p>
      <p style={styles.info}>Date: {new Date(event.date).toLocaleDateString()}</p>
      <p style={styles.info}>Seats Available: {event.availableSeats}</p>
      <p
        style={{
          ...styles.status,
          backgroundColor: event.status === "UPCOMING" ? "#43cea2" : "#e74c3c",
        }}
      >
        {event.status}
      </p>

      {event.status === "UPCOMING" && event.availableSeats > 0 ? (
        <button style={styles.button} onClick={handleRegister}>
          Register
        </button>
      ) : (
        <p style={styles.closed}>Registration Closed</p>
      )}

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

export default EventDetails;

const styles = {
  container: {
    padding: "2rem",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
    textAlign: "center",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  description: {
    fontSize: "1.1rem",
    marginBottom: "0.5rem",
  },
  info: {
    fontSize: "1rem",
    marginBottom: "0.5rem",
  },
  status: {
    display: "inline-block",
    padding: "5px 12px",
    borderRadius: "8px",
    color: "#fff",
    fontWeight: "bold",
    marginBottom: "1rem",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#185a9d",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "1rem",
  },
  closed: {
    color: "#e74c3c",
    fontWeight: "bold",
    marginTop: "1rem",
  },
  message: {
    marginTop: "1rem",
    fontWeight: "bold",
    color: "#333",
  },
  loading: {
    textAlign: "center",
    marginTop: "2rem",
  },
  error: {
    textAlign: "center",
    color: "red",
    marginTop: "2rem",
  },
};
