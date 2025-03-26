import axios from "axios";

const baseUrl = "https://diabestie-node.vercel.app/auth/";
const apiURL = import.meta.env.VITE_API_URL + "/auth";

export const postCredentials = async (username, password) => {
  try {
    const response = await axios.post(apiURL + "/login", {
      username,
      password,
    });
    return response;
  } catch (error) {
    if (error.response) {
      console.log("Error response status:", error.response.status);
      console.log("Error response data:", error.response.data);
      return error.response; // Return error response so it can be checked in handleSubmit (as the response of the request)
    }
    console.log("Unexpected error:", error.message);
    throw error; // Rethrow if it's a non-HTTP error
  }
};

export const postRegistration = async (firstName, username, password) => {
  try {
    const response = await axios.post(apiURL + "/register", {
      username,
      password,
      firstName,
    });
    return response;
  } catch (error) {
    if (error.response) {
      console.log("Error response status:", error.response.status);
      console.log("Error response data:", error.response.data);
      return error.response; // Return error response so it can be checked in handleSubmit (as the response of the request)
    }
    console.log("Unexpected error:", error.message);
    throw error; // Rethrow if it's a non-HTTP error
  }
};
