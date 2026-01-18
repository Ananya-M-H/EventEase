import axios from "./axios"; // axios instance with baseURL and token

// 🔹 Fetch all events (logged-in users)
export const getEvents = async () => {
  try {
    const response = await axios.get("/events");
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error.response?.data || error.message);
    throw error;
  }
};

// 🔹 Fetch single event by ID
export const getEventById = async (eventId) => {
  try {
    const response = await axios.get(`/events/${eventId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching event:", error.response?.data || error.message);
    throw error;
  }
};

// 🛠 Admin: Create event
export const createEvent = async (eventData) => {
  try {
    const response = await axios.post("/events", eventData);
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error.response?.data || error.message);
    throw error;
  }
};

// 🛠 Admin: Update event by ID
export const updateEvent = async (eventId, eventData) => {
  try {
    const response = await axios.put(`/events/${eventId}`, eventData);
    return response.data;
  } catch (error) {
    console.error("Error updating event:", error.response?.data || error.message);
    throw error;
  }
};

// 🛠 Admin: Delete event by ID
export const deleteEvent = async (eventId) => {
  try {
    const response = await axios.delete(`/events/${eventId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting event:", error.response?.data || error.message);
    throw error;
  }
};

// 🔹 User: Register for event
export const registerForEvent = async (eventId) => {
  try {
    const response = await axios.post(`/events/${eventId}/register`);
    return response.data;
  } catch (error) {
    console.error("Error registering for event:", error.response?.data || error.message);
    throw error;
  }
};

// 🔹 Admin: Get all registrations for an event
export const getRegistrationsForEvent = async (eventId) => {
  try {
    const response = await axios.get(`/events/${eventId}/registrations`);
    return response.data;
  } catch (error) {
    console.error("Error fetching registrations:", error.response?.data || error.message);
    throw error;
  }
};
