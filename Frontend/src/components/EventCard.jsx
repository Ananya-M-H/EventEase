import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ event, isAdmin }) => {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{event.title}</h3>
      <p style={styles.description}>{event.description}</p>
      <p style={styles.info}>
        Date: <strong>{new Date(event.date).toLocaleDateString()}</strong>
      </p>
      <p style={styles.info}>
        Available Seats: <strong>{event.availableSeats}</strong>
      </p>
      <p style={styles.status}>
        Status:{" "}
        <span
          style={{
            color: event.status === "UPCOMING" ? "#27ae60" : "#c0392b",
            fontWeight: "bold",
          }}
        >
          {event.status}
        </span>
      </p>

      {/* Buttons */}
      <div style={styles.buttons}>
        <Link to={`/events/${event._id}`} style={styles.button}>
          View Details
        </Link>

        {isAdmin && (
          <Link to={`/admin/edit-event/${event._id}`} style={styles.buttonAdmin}>
            Edit
          </Link>
        )}
      </div>
    </div>
  );
};

export default EventCard;

const styles = {
  card: {
    background: "#fff",
    padding: "1.5rem",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    width: "280px",
    transition: "transform 0.3s, box-shadow 0.3s",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  title: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
  },
  description: {
    fontSize: "0.95rem",
    color: "#555",
    marginBottom: "0.5rem",
  },
  info: {
    fontSize: "0.9rem",
    color: "#333",
    marginBottom: "0.25rem",
  },
  status: {
    fontSize: "0.9rem",
    marginBottom: "1rem",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "auto",
    gap: "0.5rem",
  },
  button: {
    flex: 1,
    textAlign: "center",
    backgroundColor: "#2980b9",
    color: "#fff",
    padding: "0.5rem",
    borderRadius: "50px",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "0.3s",
  },
  buttonAdmin: {
    flex: 1,
    textAlign: "center",
    backgroundColor: "#27ae60",
    color: "#fff",
    padding: "0.5rem",
    borderRadius: "50px",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "0.3s",
  },
};
