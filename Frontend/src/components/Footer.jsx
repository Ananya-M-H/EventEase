import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.content}>
        <p>© {new Date().getFullYear()} College Event Registration. All rights reserved.</p>
        <p>
          Developed with ❤️ by <strong>Ananya M</strong>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

const styles = {
  footer: {
    width: "100%",
    backgroundColor: "#2c3e50",
    color: "#ecf0f1",
    padding: "1rem 0",
    marginTop: "2rem",
    textAlign: "center",
  },
  content: {
    maxWidth: "1200px",
    margin: "0 auto",
    fontSize: "0.9rem",
  },
};
