import axios from "./axios"; // axios instance with baseURL and token

// 📊 Get Admin Dashboard Stats
export const getAdminStats = async () => {
  try {
    const response = await axios.get("/admin/stats");
    return response.data;
  } catch (error) {
    console.error("Error fetching admin stats:", error.response?.data || error.message);
    throw error;
  }
};

// 🛠 Create Event (Admin)
export const createEvent = async (eventData) => {
  try {
    const response = await axios.post("/events", eventData);
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error.response?.data || error.message);
    throw error;
  }
};

// ✏️ Update Event (Admin)
export const updateEvent = async (eventId, eventData) => {
  try {
    const response = await axios.put(`/events/${eventId}`, eventData);
    return response.data;
  } catch (error) {
    console.error("Error updating event:", error.response?.data || error.message);
    throw error;
  }
};

// ❌ Delete Event (Admin)
export const deleteEvent = async (eventId) => {
  try {
    const response = await axios.delete(`/events/${eventId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting event:", error.response?.data || error.message);
    throw error;
  }
};
