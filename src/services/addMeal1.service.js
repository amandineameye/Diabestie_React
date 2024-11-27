import axios from "axios";

const baseUrl = "http://localhost:8000/addMeal1/";

export const postAndFetchCarbsOptions = async (inputText) => {
	try {
		const response = await axios.post(baseUrl + "getCarbsOptions", {
			inputText,
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